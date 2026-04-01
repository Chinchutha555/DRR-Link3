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
          @click="zoomToRegion(item.key)"
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
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        />

        <l-geo-json
          v-if="filteredLines.length"
          :geojson="geoJsonCollection"
          :options-style="styleGeoJson"
        />
      </l-map>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";
import routesData from "../data/route_long_phase1.json";  // ใช้ไฟล์ GeoJSON ที่คุณให้มา

const mapRef = ref(null);
const mapInstance = ref(null);
const mapReady = ref(false);

const zoom = ref(6);
const center = ref([16.5, 101.0]);
const selectedRegion = ref("all");

const regionOptions = [
  { key: "all", label: "ทั้งหมด" },
  { key: "north", label: "ภาคเหนือ" },
  { key: "northeast", label: "ภาคอีสาน" },
];

const phaseLabel = computed(() => {
  return "Phase 1"; // ตั้งค่า phase 1
});

const regionLabel = computed(() => {
  return selectedRegion.value === "all" ? "ทั้งหมด" : "ภูมิภาคที่เลือก"; // ปรับข้อความแสดงภูมิภาค
});

const filteredLines = computed(() => {
  return routesData.features.filter(
    (feature) => feature.geometry.type === "MultiLineString"
  );
});

const geoJsonCollection = computed(() => ({
  type: "FeatureCollection",
  features: filteredLines.value,
}));

function styleGeoJson(feature) {
  return {
    color: "#16a34a",
    weight: 5,
  };
}

// ฟังก์ชันที่จะคำนวณตำแหน่งกลางของเส้นทาง
function getLineCenter(coordinates) {
  if (!coordinates || coordinates.length === 0) {
    return [0, 0];  // หรือคืนค่า null หากไม่มีข้อมูล
  }

  let latSum = 0, lonSum = 0;
  coordinates.forEach(coord => {
    latSum += coord[1];
    lonSum += coord[0];
  });
  return [latSum / coordinates.length, lonSum / coordinates.length];
}

// เพิ่ม tooltip หรือข้อความที่จุดกลางของเส้นทาง
function addTooltipToLine(map, feature) {
  const coordinates = feature.geometry.coordinates[0]; // Assuming this is a MultiLineString
  const field2Value = feature.properties.field_2;

  // คำนวณตำแหน่งกลางของเส้นทาง
  const [centerLat, centerLon] = getLineCenter(coordinates);

  // เพิ่ม tooltip ที่ตำแหน่งกลางของเส้นทาง
  L.tooltip({
    permanent: true,
    direction: 'top', // ปรับตำแหน่งของ tooltip
    offset: [0, -10] // ปรับระยะห่าง
  })
    .setLatLng([centerLat, centerLon])  // ใช้ตำแหน่งกลางที่คำนวณได้
    .setContent(`Field 2: ${field2Value}`)
    .addTo(map);
}

// ขยายขอบเขตแผนที่ให้ครอบคลุมเส้นทางทั้งหมด
function fitMapBounds(map) {
  const bounds = L.latLngBounds(); // สร้าง bounds ที่ใช้ขยายขอบเขต

  geoJsonCollection.value.features.forEach((feature) => {
    const coordinates = feature.geometry.coordinates[0];

    // ตรวจสอบว่า coordinates มีข้อมูลก่อนที่จะใช้ forEach
    if (coordinates && coordinates.length > 0) {
      coordinates.forEach((coord) => {
        bounds.extend([coord[1], coord[0]]); // ขยายขอบเขตด้วยพิกัดทั้งหมด
      });
    }
  });

  map.fitBounds(bounds, { padding: [20, 20] }); // เพิ่ม padding เพื่อให้แผนที่ไม่ติดขอบ
}

function onMapReady(map) {
  mapInstance.value = map;

  // วนลูปเพิ่ม tooltip ที่ตำแหน่งกลางของเส้นทาง
  geoJsonCollection.value.features.forEach((feature) => {
    addTooltipToLine(map, feature);
  });

  // ขยายขอบเขตแผนที่ให้ครอบคลุมทุกเส้นทาง
  fitMapBounds(map);

  mapInstance.value.invalidateSize(); // ปรับขนาดแผนที่ใหม่
}

onMounted(() => {
  mapReady.value = true;
});
</script>

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
}

.region-btn {
  border: 1px solid #dbe3ef;
  background: #ffffff;
  color: #334155;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 14px;
}

.region-btn.active {
  background: #407bff;
  color: #ffffff;
}

.map-wrapper {
  width: 100%;
  height: 520px;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
}

:deep(.leaflet-container) {
  width: 100%;
  height: 100%;
}
</style>