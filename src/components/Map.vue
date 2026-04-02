<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";
import routesData from "../data/route_long_phase1.json";

// ── props ──────────────────────────────────────────────
const props = defineProps({
  phase: {
    type: String,
    default: "phase1",
  },
});

// ── refs ──────────────────────────────────────────────
const mapRef = ref(null);
const mapInstance = ref(null);
const mapReady = ref(false);
const zoom = ref(6);
const center = ref([16.5, 101.0]);
const selectedRegion = ref("all");
const labelMarkers = ref([]);
const geoJsonKey = ref(0);

// ── region config ─────────────────────────────────────
const REGION_LABEL_MAP = computed(() => {
  if (props.phase === "phase1") {
    return {
      "ภาคเหนือ": "ภาคเหนือ",
      "ภาคตะวันออกเฉียงเหนือ": "ภาคอีสานตอนบน",
    };
  } else if (props.phase === "phase2") {
    return {
      "lowerNortheast": "ภาคอีสานตอนล่าง",
      "east": "ภาคตะวันออก",
      "upperCentral": "ภาคกลางตอนบน",
    };
  }
  return {};
});

const regionOptions = computed(() => {
  const seen = new Set();
  if (props.phase === "phase1") {
    seen.add("ภาคเหนือ");
    seen.add("ภาคตะวันออกเฉียงเหนือ");
  } else if (props.phase === "phase2") {
    seen.add("lowerNortheast");
    seen.add("east");
    seen.add("upperCentral");
  }
  const dynamicOptions = [...seen].sort().map((r) => ({
    key: r,
    label: REGION_LABEL_MAP.value[r] || r,
  }));
  return [{ key: "all", label: "ทั้งหมด" }, ...dynamicOptions];
});

// ── helper: กรอง features ที่มี coordinates ว่างออก ──
function hasCoordinates(feature) {
  const coords = feature?.geometry?.coordinates;
  if (!coords || coords.length === 0) return false;
  // MultiLineString: coordinates = [segment, ...] ต้องมี segment ที่ไม่ว่าง
  if (feature.geometry.type === "MultiLineString") {
    return coords.some((segment) => segment.length > 0);
  }
  // LineString: coordinates = [[lon,lat], ...]
  return coords.length > 0;
}

// ── computed ──────────────────────────────────────────
const phaseLabel = computed(() => props.phase === "phase1" ? "Phase 1" : "Phase 2");

const regionLabel = computed(() => {
  const found = regionOptions.value.find((r) => r.key === selectedRegion.value);
  return found ? found.label : "ทั้งหมด";
});

const filteredFeatures = computed(() => {
  if (props.phase === "phase2") return [];

  // กรอง features ที่มี coordinates ว่างออกทุกกรณี
  const validFeatures = routesData.features.filter(hasCoordinates);

  if (selectedRegion.value === "all") {
    return validFeatures;
  }
  if (selectedRegion.value === "__null__") {
    return validFeatures.filter((f) => f.properties.region == null);
  }
  return validFeatures.filter(
    (f) => f.properties.region === selectedRegion.value
  );
});

const geoJsonCollection = computed(() => ({
  type: "FeatureCollection",
  features: filteredFeatures.value,
}));

const REGION_COLOR_MAP = {
  "ภาคเหนือ": "#2563eb",
  "ภาคตะวันออกเฉียงเหนือ": "#16a34a",
  "ภาคกลาง": "#d97706",
  "ภาคใต้": "#dc2626",
  "ภาคตะวันออก": "#7c3aed",
  "ภาคตะวันตก": "#0891b2",
  "__null__": "#94a3b8",
};

const legendItems = computed(() => {
  const seen = new Set();
  filteredFeatures.value.forEach((f) => {
    seen.add(f.properties.region ?? "__null__");
  });
  return [...seen].sort().map((r) => ({
    label: REGION_LABEL_MAP.value[r] || r,
    color: REGION_COLOR_MAP[r] || "#94a3b8",
  }));
});

// ── style ─────────────────────────────────────────────
function styleGeoJson(feature) {
  const region = feature.properties.region;
  const colorMap = {
    "ภาคเหนือ": "#2563eb",
    "ภาคตะวันออกเฉียงเหนือ": "#16a34a",
    "ภาคกลาง": "#d97706",
    "ภาคใต้": "#dc2626",
    "ภาคตะวันออก": "#7c3aed",
    "ภาคตะวันตก": "#0891b2",
  };
  return {
    color: colorMap[region] || "#94a3b8",
    weight: 5,
    opacity: 0.85,
  };
}

// ── label helpers ─────────────────────────────────────
function clearLabels() {
  if (!mapInstance.value) return;
  labelMarkers.value.forEach((m) => m.remove());
  labelMarkers.value = [];
}

// FIX: รองรับทั้ง LineString และ MultiLineString
function getLineCenter(geometry) {
  let latSum = 0, lonSum = 0, count = 0;

  if (geometry.type === "LineString") {
    // coordinates = [[lon, lat], [lon, lat], ...]
    geometry.coordinates.forEach(([lon, lat]) => {
      latSum += lat;
      lonSum += lon;
      count++;
    });
  } else if (geometry.type === "MultiLineString") {
    // coordinates = [[[lon, lat], ...], [[lon, lat], ...], ...]
    geometry.coordinates.forEach((segment) => {
      segment.forEach(([lon, lat]) => {
        latSum += lat;
        lonSum += lon;
        count++;
      });
    });
  }

  return count > 0 ? [latSum / count, lonSum / count] : null;
}

function addLabels(map) {
  const seen = new Set();
  filteredFeatures.value.forEach((feature) => {
    const name = feature.properties.field_2;
    if (!name || seen.has(name)) return;
    seen.add(name);

    // FIX: ส่ง geometry object แทนแค่ coordinates
    const labelCenter = getLineCenter(feature.geometry);
    if (!labelCenter) return;

    const icon = L.divIcon({
      className: "route-label",
      html: `<div class="route-label-text">${name}</div>`,
      iconSize: [150, 35],
      iconAnchor: [75, 18],
    });

    const marker = L.marker(labelCenter, { icon, interactive: false }).addTo(map);
    labelMarkers.value.push(marker);
  });
}

// ── zoom handler ──────────────────────────────────────
function onZoomEnd() {
  if (!mapInstance.value) return;
  const currentZoom = mapInstance.value.getZoom();
  clearLabels();
  if (currentZoom >= 9) {
    addLabels(mapInstance.value);
  }
}

// ── click handler ─────────────────────────────────────
function onLineClick(event) {
  const p = event.layer?.feature?.properties;
  if (!p) return;
  L.popup()
    .setLatLng(event.latlng)
    .setContent(`<b>${p.field_2}</b>`)
    .openOn(mapInstance.value);
}

// ── bounds ────────────────────────────────────────────
// FIX: คำนวณ bounds จากข้อมูลจริงของ features ที่กรองแล้ว
function getBoundsFromFeatures(features) {
  let minLat = Infinity, maxLat = -Infinity;
  let minLon = Infinity, maxLon = -Infinity;

  features.forEach((feature) => {
    const geom = feature.geometry;
    const allCoords = geom.type === "LineString"
      ? geom.coordinates
      : geom.type === "MultiLineString"
        ? geom.coordinates.flat()
        : [];

    allCoords.forEach(([lon, lat]) => {
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
    });
  });

  if (minLat === Infinity) return null;
  return [[minLat, minLon], [maxLat, maxLon]];
}

const REGION_BOUNDS = {
  "ภาคเหนือ":               [[16.8215, 97.7533], [20.0983, 101.0210]],
  "ภาคตะวันออกเฉียงเหนือ": [[14.0, 101.0],      [18.2759, 104.7909]],
};

// FIX: ALL_BOUNDS ขยายให้ครอบคลุมทุก feature จริงๆ
// โดยใช้ static fallback กว้างขึ้น หรือคำนวณจาก data
const ALL_BOUNDS_FALLBACK = [[13.5, 97.0], [20.5, 105.5]];

function flyToRegion(key) {
  if (!mapInstance.value) return;

  if (key === "all") {
    // FIX: คำนวณ bounds จาก features จริงทั้งหมด
    const bounds = getBoundsFromFeatures(filteredFeatures.value) || ALL_BOUNDS_FALLBACK;
    mapInstance.value.flyToBounds(bounds, { padding: [40, 40], duration: 0.8 });
  } else if (REGION_BOUNDS[key]) {
    mapInstance.value.flyToBounds(REGION_BOUNDS[key], { padding: [40, 40], duration: 0.8 });
  } else {
    // FIX: ถ้าไม่มีใน REGION_BOUNDS ให้คำนวณจาก features ที่กรองแล้ว
    const features = routesData.features.filter(
      (f) => f.properties.region === key && hasCoordinates(f)
    );
    const bounds = getBoundsFromFeatures(features);
    if (bounds) {
      mapInstance.value.flyToBounds(bounds, { padding: [40, 40], duration: 0.8 });
    }
  }
}

// ── region selection ──────────────────────────────────
async function selectRegion(key) {
  if (props.phase === "phase2") {
    selectedRegion.value = key;
    await nextTick();
    geoJsonKey.value++;
    clearLabels();
    return;
  }

  selectedRegion.value = key;
  await nextTick();
  geoJsonKey.value++;
  clearLabels();
  flyToRegion(key);
}

// ── map ready ─────────────────────────────────────────
function onMapReady(map) {
  mapInstance.value = map;
  // กรอง empty coordinates ออกก่อนคำนวณ bounds
  const validFeatures = routesData.features.filter(hasCoordinates);
  const bounds = getBoundsFromFeatures(validFeatures) || ALL_BOUNDS_FALLBACK;
  map.fitBounds(bounds, { padding: [30, 30] });
  map.invalidateSize();
}

// ── watch ────────────────────────────────────────────
watch(
  () => props.phase,
  (newPhase) => {
    if (newPhase === "phase2" || newPhase === "phase1") {
      selectedRegion.value = "all";
    }
  }
);

onMounted(() => {
  mapReady.value = true;
});
</script>

<template>
  <div class="project-map">
    <div class="map-header">
      <h3 class="map-title">แผนที่โครงการ</h3>
      <div class="map-toolbar">
        <button
          v-for="item in regionOptions"
          :key="item.key"
          type="button"
          class="region-btn"
          :class="{ active: selectedRegion === item.key }"
          @click="selectRegion(item.key)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <div class="map-subtitle" v-if="props.phase === 'phase1'">
      <span>ข้อมูลที่แสดง:</span>
      <strong>{{ phaseLabel }}</strong>
      <span class="divider">|</span>
      <span>พื้นที่:</span>
      <strong>{{ regionLabel }}</strong>
    </div>

    <div class="map-subtitle" v-if="props.phase === 'phase2'">
      <span>ข้อมูลที่แสดง:</span>
      <strong>{{ phaseLabel }}</strong>
      <span class="divider">|</span>
      <span>พื้นที่:</span>
      <strong>{{ regionLabel }}</strong>
    </div>

    <div class="map-wrapper">
      <l-map
        v-if="mapReady"
        ref="mapRef"
        v-model:zoom="zoom"
        :center="center"
        :use-global-leaflet="false"
        @ready="onMapReady"
        @zoomend="onZoomEnd"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        />

        <l-geo-json
          v-if="filteredFeatures.length && props.phase === 'phase1'"
          :key="geoJsonKey"
          :geojson="geoJsonCollection"
          :options-style="styleGeoJson"
          @click="onLineClick"
        />

        <l-geo-json
          v-if="props.phase === 'phase2'"
          :geojson="geoJsonCollection"
          :options-style="styleGeoJson"
        />
      </l-map>
    </div>
  </div>
</template>

<style scoped>
.project-map {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}

.map-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.map-title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
}

.map-toolbar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.region-btn {
  border: 1px solid #dbe3ef;
  background: #ffffff;
  color: #334155;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.15s, color 0.15s;
}

.region-btn:hover {
  background: #f1f5f9;
}

.region-btn.active {
  background: #407bff;
  color: #ffffff;
  border-color: #407bff;
}

.map-subtitle {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #64748b;
  flex-wrap: wrap;
}

.map-subtitle strong {
  color: #1e293b;
}

.divider {
  color: #cbd5e1;
}

.map-wrapper {
  position: relative;
  width: 100%;
  height: 520px;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
}

:deep(.route-label) {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  border-radius: 5px;
  pointer-events: none;
}

.route-label-text {
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
}
</style>