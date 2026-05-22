<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";

import phase1Data from "../data/route_long_phase1.json";
import phase2Data from "../data/route_long_phase2.json";
// import phase3Data from "../data/route_long_phase2.json";

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

/**
 * จุดแก้หลักเวลาเพิ่ม Phase ใหม่ในแผนที่
 * ถ้ามี P3, P4 ให้เพิ่มข้อมูลใน phaseMapConfig
 */
const phaseMapConfig = {
  phase1: {
    label: "Phase 1",
    data: phase1Data,
    regions: [
      {
        key: "ภาคเหนือ",
        label: "ภาคเหนือ",
      },
      {
        key: "ภาคตะวันออกเฉียงเหนือ",
        label: "ภาคอีสานตอนบน",
      },
    ],
  },

  phase2: {
    label: "Phase 2",
    data: phase2Data,
    regions: [
      {
        key: "ภาคอีสานตอนล่าง",
        label: "ภาคอีสานตอนล่าง",
      },
      {
        key: "ภาคตะวันออก",
        label: "ภาคตะวันออก",
      },
      {
        key: "ภาคกลางตอนบน",
        label: "ภาคกลางตอนบน",
      },
    ],
  },

  // phase3: {
  //   label: "Phase 3",
  //   data: phase3Data,
  //   regions: [
  //     {
  //       key: "ภาคกลางตอนล่าง",
  //       label: "ภาคกลางตอนล่าง",
  //     },
  //     {
  //       key: "ภาคใต้",
  //       label: "ภาคใต้",
  //     },
  //   ],
  // },
};

// ── computed: current phase ───────────────────────────
const currentPhaseConfig = computed(() => {
  return phaseMapConfig[props.phase] || phaseMapConfig.phase1;
});

const currentData = computed(() => {
  return currentPhaseConfig.value.data;
});

const phaseLabel = computed(() => {
  return currentPhaseConfig.value.label;
});

const regionOptions = computed(() => {
  return [
    {
      key: "all",
      label: "ทั้งหมด",
    },
    ...currentPhaseConfig.value.regions,
  ];
});

const regionLabel = computed(() => {
  const found = regionOptions.value.find((r) => r.key === selectedRegion.value);
  return found ? found.label : "ทั้งหมด";
});

// ── helper: กรอง features ที่มี coordinates ว่างออก ──
function hasCoordinates(feature) {
  const coords = feature?.geometry?.coordinates;

  if (!coords || coords.length === 0) return false;

  if (feature.geometry.type === "MultiLineString") {
    return coords.some((segment) => segment.length > 0);
  }

  if (feature.geometry.type === "LineString") {
    return coords.length > 0;
  }

  return false;
}

// ── computed: filtered geojson ─────────────────────────
const filteredFeatures = computed(() => {
  const validFeatures = currentData.value.features.filter(hasCoordinates);

  if (selectedRegion.value === "all") {
    return validFeatures;
  }

  return validFeatures.filter((feature) => {
    return feature.properties.region === selectedRegion.value;
  });
});

const geoJsonCollection = computed(() => {
  return {
    type: "FeatureCollection",
    features: filteredFeatures.value,
  };
});

// ── style ─────────────────────────────────────────────
function styleGeoJson(feature) {
  const region = feature.properties.region;

  const colorMap = {
    ภาคเหนือ: "#2563eb",
    ภาคตะวันออกเฉียงเหนือ: "#16a34a",
    ภาคอีสานตอนล่าง: "#0891b2",
    ภาคกลางตอนบน: "#c90f12",
    ภาคตะวันออก: "#7c3aed",
    ภาคกลางตอนล่าง: "#f97316",
    ภาคใต้: "#0f766e",
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

  labelMarkers.value.forEach((marker) => {
    marker.remove();
  });

  labelMarkers.value = [];
}

function getLineCenter(geometry) {
  let latSum = 0;
  let lonSum = 0;
  let count = 0;

  if (geometry.type === "LineString") {
    geometry.coordinates.forEach(([lon, lat]) => {
      latSum += lat;
      lonSum += lon;
      count++;
    });
  } else if (geometry.type === "MultiLineString") {
    geometry.coordinates.forEach((segment) => {
      segment.forEach(([lon, lat]) => {
        latSum += lat;
        lonSum += lon;
        count++;
      });
    });
  }

  if (count === 0) return null;

  return [latSum / count, lonSum / count];
}

function addLabels(map) {
  const seen = new Set();

  filteredFeatures.value.forEach((feature) => {
    const name = feature.properties.field_2;

    if (!name || seen.has(name)) return;

    seen.add(name);

    const labelCenter = getLineCenter(feature.geometry);
    if (!labelCenter) return;

    const icon = L.divIcon({
      className: "route-label",
      html: `<div class="route-label-text">${name}</div>`,
      iconSize: [150, 35],
      iconAnchor: [75, 18],
    });

    const marker = L.marker(labelCenter, {
      icon,
      interactive: false,
    }).addTo(map);

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
  const properties = event.layer?.feature?.properties;

  if (!properties) return;

  L.popup()
    .setLatLng(event.latlng)
    .setContent(`<b>${properties.field_2}</b>`)
    .openOn(mapInstance.value);
}

// ── bounds ────────────────────────────────────────────
function getBoundsFromFeatures(features) {
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLon = Infinity;
  let maxLon = -Infinity;

  features.forEach((feature) => {
    const geometry = feature.geometry;

    const allCoords =
      geometry.type === "LineString"
        ? geometry.coordinates
        : geometry.type === "MultiLineString"
          ? geometry.coordinates.flat()
          : [];

    allCoords.forEach(([lon, lat]) => {
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
    });
  });

  if (minLat === Infinity) return null;

  return [
    [minLat, minLon],
    [maxLat, maxLon],
  ];
}

const ALL_BOUNDS_FALLBACK = [
  [5.5, 97.0],
  [20.5, 105.8],
];

function fitMapToFeatures(features) {
  if (!mapInstance.value) return;

  const bounds = getBoundsFromFeatures(features) || ALL_BOUNDS_FALLBACK;

  mapInstance.value.fitBounds(bounds, {
    padding: [30, 30],
  });
}

function flyToFeatures(features) {
  if (!mapInstance.value) return;

  const bounds = getBoundsFromFeatures(features) || ALL_BOUNDS_FALLBACK;

  mapInstance.value.flyToBounds(bounds, {
    padding: [40, 40],
    duration: 0.8,
  });
}

async function refreshMapView() {
  await nextTick();

  geoJsonKey.value++;
  clearLabels();

  flyToFeatures(filteredFeatures.value);
}

// ── region selection ──────────────────────────────────
async function selectRegion(key) {
  selectedRegion.value = key;
  await refreshMapView();
}

// ── map ready ─────────────────────────────────────────
function onMapReady(map) {
  mapInstance.value = map;

  const validFeatures = currentData.value.features.filter(hasCoordinates);

  fitMapToFeatures(validFeatures);

  map.invalidateSize();
}

// ── watch phase change ────────────────────────────────
watch(
  () => props.phase,
  async () => {
    selectedRegion.value = "all";

    await nextTick();

    geoJsonKey.value++;
    clearLabels();

    const validFeatures = currentData.value.features.filter(hasCoordinates);

    fitMapToFeatures(validFeatures);
  },
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

    <div class="map-subtitle">
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
          :key="geoJsonKey"
          :geojson="geoJsonCollection"
          :options-style="styleGeoJson"
          @click="onLineClick"
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
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;
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

@media screen and (max-width: 768px) {
  .map-header {
    align-items: flex-start;
  }

  .map-wrapper {
    height: 420px;
  }

  .region-btn {
    font-size: 13px;
    padding: 7px 12px;
  }
}
</style>