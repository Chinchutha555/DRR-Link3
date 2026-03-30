<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

import phase1North from "../assets/images/North_Phase1.png";
import phase1Northeast from "../assets/images/NorthEast_Phase1.png";
import phase2North from "../assets/images/Phase2.png";
import phase2Northeast from "../assets/images/Phase2.png";

const props = defineProps({
  phase: {
    type: String,
    default: "phase1",
  },
});

const selectedRegion = ref("north");
const isPreviewOpen = ref(false);

const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);
const isDragging = ref(false);

let startX = 0;
let startY = 0;
let originX = 0;
let originY = 0;

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const SCALE_STEP = 0.25;

const regionOptions = [
  { key: "north", label: "ภาคเหนือ" },
  { key: "northeast", label: "ภาคอีสาน" },
];

const regionNameMap = {
  north: "ภาคเหนือ",
  northeast: "ภาคอีสาน",
};

const phaseLabel = computed(() =>
  props.phase === "phase2" ? "Phase 2" : "Phase 1"
);

const regionLabel = computed(() => regionNameMap[selectedRegion.value]);

const imageMap = {
  phase1: {
    north: phase1North,
    northeast: phase1Northeast,
  },
  phase2: {
    north: phase2North,
    northeast: phase2Northeast,
  },
};

const currentImage = computed(() => {
  return imageMap?.[props.phase]?.[selectedRegion.value] || "";
});

const imageTransform = computed(() => {
  return `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`;
});

function zoomToRegion(regionKey) {
  selectedRegion.value = regionKey;
}

function resetZoom() {
  scale.value = 1;
  translateX.value = 0;
  translateY.value = 0;
  isDragging.value = false;
}

function openPreview() {
  isPreviewOpen.value = true;
  resetZoom();
  document.body.style.overflow = "hidden";
}

function closePreview() {
  isPreviewOpen.value = false;
  resetZoom();
  document.body.style.overflow = "";
}

function zoomIn() {
  scale.value = Math.min(MAX_SCALE, +(scale.value + SCALE_STEP).toFixed(2));
}

function zoomOut() {
  const next = Math.max(MIN_SCALE, +(scale.value - SCALE_STEP).toFixed(2));
  scale.value = next;

  if (next === 1) {
    translateX.value = 0;
    translateY.value = 0;
  }
}

function handleWheel(event) {
  if (!isPreviewOpen.value) return;

  event.preventDefault();

  if (event.deltaY < 0) {
    zoomIn();
  } else {
    zoomOut();
  }
}

function startDrag(event) {
  if (scale.value <= 1) return;

  isDragging.value = true;
  startX = event.clientX;
  startY = event.clientY;
  originX = translateX.value;
  originY = translateY.value;
}

function onDrag(event) {
  if (!isDragging.value) return;

  translateX.value = originX + (event.clientX - startX);
  translateY.value = originY + (event.clientY - startY);
}

function stopDrag() {
  isDragging.value = false;
}

function handleKeydown(event) {
  if (!isPreviewOpen.value) return;

  if (event.key === "Escape") closePreview();
  if (event.key === "+" || event.key === "=") zoomIn();
  if (event.key === "-") zoomOut();
  if (event.key === "0") resetZoom();
}

watch(
  () => props.phase,
  () => {
    selectedRegion.value = "north";
    resetZoom();
  }
);

watch(selectedRegion, () => {
  resetZoom();
});

onMounted(() => {
  AOS.init({
    duration: 700,
    easing: "ease-out-cubic",
    once: true,
    offset: 60,
  });

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", stopDrag);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", stopDrag);
  document.body.style.overflow = "";
});
</script>

<template>
  <div class="project-map" data-aos="fade-right">
    <div class="map-header">
      <h3 class="map-title">รูปภาพโครงการ</h3>

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

    <div class="map-wrapper" data-aos="zoom-in" data-aos-delay="150">
      <transition name="fade" mode="out-in">
        <button
          :key="`${props.phase}-${selectedRegion}`"
          type="button"
          class="image-button"
          @click="openPreview"
        >
          <img
            :src="currentImage"
            :alt="`${phaseLabel} - ${regionLabel}`"
            class="map-image"
          />
          <span class="zoom-hint">คลิกเพื่อดูภาพขนาดใหญ่</span>
        </button>
      </transition>
    </div>

    <teleport to="body">
      <transition name="modal-fade">
        <div
          v-if="isPreviewOpen"
          class="image-modal"
          @click.self="closePreview"
        >
          <div class="image-modal-content">
            <button type="button" class="close-btn" @click="closePreview">
              ×
            </button>

            <div class="image-modal-header">
              <div class="modal-title-group">
                <strong>{{ phaseLabel }}</strong>
                <span class="modal-divider">|</span>
                <span>{{ regionLabel }}</span>
              </div>

              <div class="zoom-controls">
                <button type="button" class="zoom-btn" @click="zoomOut">−</button>
                <span class="zoom-level">{{ Math.round(scale * 100) }}%</span>
                <button type="button" class="zoom-btn" @click="zoomIn">+</button>
                <button type="button" class="zoom-reset-btn" @click="resetZoom">
                  รีเซ็ต
                </button>
              </div>
            </div>

            <div
              class="modal-image-stage"
              @wheel.prevent="handleWheel"
              @mousedown="startDrag"
              @dblclick="resetZoom"
            >
              <img
                :src="currentImage"
                :alt="`${phaseLabel} - ${regionLabel}`"
                class="modal-image"
                :class="{ dragging: isDragging, zoomable: scale > 1 }"
                :style="{ transform: imageTransform }"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </transition>
    </teleport>
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
}

.map-title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  white-space: nowrap;
}

.map-toolbar {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.region-btn {
  border: 1px solid #dbe3ef;
  background: #ffffff;
  color: #334155;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 14px;
  font-weight: 500;
}

.region-btn:hover {
  transform: translateY(-2px);
  border-color: #93c5fd;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.08);
}

.region-btn.active {
  background: #407bff;
  color: #ffffff;
  border-color: #407bff;
}

.map-subtitle {
  font-size: 14px;
  color: #475569;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.divider {
  color: #cbd5e1;
}

.map-wrapper {
  width: 100%;
  height: 520px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: #ffffff;
}

.image-button {
  position: relative;
  width: 100%;
  height: 100%;
  border: 0;
  background: #ffffff;
  padding: 16px;
  cursor: zoom-in;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.zoom-hint {
  position: absolute;
  right: 16px;
  bottom: 16px;
  background: rgba(15, 23, 42, 0.72);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 999px;
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:global(.image-modal) {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(15, 23, 42, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

:global(.image-modal-content) {
  position: relative;
  width: min(1200px, 96vw);
  height: min(90vh, 900px);
  background: #ffffff;
  border-radius: 20px;
  padding: 20px 20px 16px;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.2);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

:global(.image-modal-header) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: #334155;
  font-size: 15px;
  padding-right: 44px;
  flex-wrap: wrap;
}

.modal-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.zoom-btn,
.zoom-reset-btn {
  border: 1px solid #dbe3ef;
  background: #ffffff;
  color: #1e293b;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
}

.zoom-btn {
  width: 38px;
  height: 38px;
  font-size: 22px;
  line-height: 1;
}

.zoom-reset-btn {
  height: 38px;
  padding: 0 12px;
  font-size: 14px;
}

.zoom-btn:hover,
.zoom-reset-btn:hover {
  border-color: #93c5fd;
  background: #eff6ff;
}

.zoom-level {
  min-width: 58px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #2563eb;
}

:global(.modal-divider) {
  color: #cbd5e1;
}

.modal-image-stage {
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 14px;
  position: relative;
  cursor: default;
}

:global(.modal-image) {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  transform-origin: center center;
  transition: transform 0.12s ease;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}

:global(.modal-image.zoomable) {
  cursor: grab;
}

:global(.modal-image.dragging) {
  cursor: grabbing;
  transition: none;
}

:global(.close-btn) {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

:global(.close-btn:hover) {
  background: #dbeafe;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .map-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .map-toolbar {
    width: 100%;
    justify-content: flex-start;
  }

  .map-wrapper {
    height: 400px;
  }

  .image-button {
    padding: 12px;
  }

  .zoom-hint {
    right: 12px;
    bottom: 12px;
    font-size: 11px;
    padding: 7px 10px;
  }

  :global(.image-modal) {
    padding: 12px;
  }

  :global(.image-modal-content) {
    width: 100%;
    height: min(88vh, 760px);
    padding: 16px;
  }

  .zoom-controls {
    width: 100%;
    flex-wrap: wrap;
  }
}
</style>