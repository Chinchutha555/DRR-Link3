<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import short from "../assets/images/short.png";
import medium from "../assets/images/medium.png";
import long from "../assets/images/long.png";

const heading = "Phase 1";
const subHeading = "ผลการศึกษา";
const themeColor = "#2563eb";

const items = [
  {
    id: 1,
    name: "ระยะสั้น",
    des: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
    colorClass: "color-1",
    icon: "app-indicator",
    photo: short,
  },
  {
    id: 2,
    name: "ระยะกลาง",
    des: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
    colorClass: "color-2",
    icon: "arrow-repeat",
    photo: medium,
  },
  {
    id: 3,
    name: "ระยะยาว",
    des: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
    colorClass: "color-3",
    icon: "briefcase",
    photo: long,
  },
];

const total = items.length;

const showModal = ref(false);
const selectedImage = ref(null);
const selectedItem = ref(null);

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

const imageTransform = computed(() => {
  return `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`;
});

const openImage = (item) => {
  selectedItem.value = item;
  selectedImage.value = item.photo;
  resetZoom();
  showModal.value = true;
  document.body.style.overflow = "hidden";
};

const closeImage = () => {
  showModal.value = false;
  selectedImage.value = null;
  selectedItem.value = null;
  resetZoom();
  document.body.style.overflow = "";
};

const resetZoom = () => {
  scale.value = 1;
  translateX.value = 0;
  translateY.value = 0;
  isDragging.value = false;
};

const zoomIn = () => {
  scale.value = Math.min(MAX_SCALE, +(scale.value + SCALE_STEP).toFixed(2));
};

const zoomOut = () => {
  const next = Math.max(MIN_SCALE, +(scale.value - SCALE_STEP).toFixed(2));
  scale.value = next;

  if (next === 1) {
    translateX.value = 0;
    translateY.value = 0;
  }
};

const handleWheel = (e) => {
  if (!showModal.value) return;
  e.preventDefault();

  if (e.deltaY < 0) {
    zoomIn();
  } else {
    zoomOut();
  }
};

const startDrag = (event) => {
  if (scale.value <= 1) return;

  isDragging.value = true;
  startX = event.clientX;
  startY = event.clientY;
  originX = translateX.value;
  originY = translateY.value;
};

const onDrag = (event) => {
  if (!isDragging.value) return;

  translateX.value = originX + (event.clientX - startX);
  translateY.value = originY + (event.clientY - startY);
};

const stopDrag = () => {
  isDragging.value = false;
};

const handleKeydown = (event) => {
  if (!showModal.value) return;

  if (event.key === "Escape") closeImage();
  if (event.key === "+" || event.key === "=") zoomIn();
  if (event.key === "-") zoomOut();
  if (event.key === "0") resetZoom();
};

onMounted(() => {
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
  <div class="untree_co-section bg-light" id="result-section">
    <div class="container">
      <div class="row justify-content-between">
        <!-- LEFT -->
        <div class="col-lg-5 order-lg-2 js-custom-dots">
          <div class="text-right" style="margin-bottom: 30px">
            <span class="caption" :style="[{ color: themeColor }]">
              {{ heading }}
            </span>
            <h3 class="heading mb-0">{{ subHeading }}</h3>
          </div>

          <a
            v-for="(item, index) in items"
            :key="item.id"
            class="service link horizontal d-flex phase-card"
            :class="{ active: index === 0 }"
            data-aos="fade-left"
          >
            <div class="service-icon mb-4" :class="item.colorClass">
              <svg
                v-if="item.icon === 'app-indicator'"
                class="bi bi-app-indicator"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z"
                />
                <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              </svg>

              <svg
                v-else-if="item.icon === 'arrow-repeat'"
                class="bi bi-arrow-repeat"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.854 7.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L2.5 8.207l1.646 1.647a.5.5 0 0 0 .708-.708l-2-2zm13-1a.5.5 0 0 0-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708z"
                />
                <path
                  fill-rule="evenodd"
                  d="M8 3a4.995 4.995 0 0 0-4.192 2.273.5.5 0 0 1-.837-.546A6 6 0 0 1 14 8a.5.5 0 0 1-1.001 0 5 5 0 0 0-5-5zM2.5 7.5A.5.5 0 0 1 3 8a5 5 0 0 0 9.192 2.727.5.5 0 1 1 .837.546A6 6 0 0 1 2 8a.5.5 0 0 1 .501-.5z"
                />
              </svg>

              <svg
                v-else-if="item.icon === 'briefcase'"
                class="bi bi-briefcase"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6h-1v6a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-6H0v6z"
                />
                <path
                  fill-rule="evenodd"
                  d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5v2.384l-7.614 2.03a1.5 1.5 0 0 1-.772 0L0 6.884V4.5zM1.5 4a.5.5 0 0 0-.5.5v1.616l6.871 1.832a.5.5 0 0 0 .258 0L15 6.116V4.5a.5.5 0 0 0-.5-.5h-13zM5 2.5A1.5 1.5 0 0 1 6.5 1h3A1.5 1.5 0 0 1 11 2.5V3h-1v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V3H5v-.5z"
                />
              </svg>

              <svg
                v-else
                class="bi bi-collection"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.5 13.5h-13A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5zm-13 1A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"
                />
              </svg>
            </div>

            <div class="service-contents">
              <h3>{{ item.name }}</h3>
              <p>{{ item.des }}</p>
            </div>
          </a>
        </div>

        <!-- RIGHT -->
        <div class="col-lg-7">
          <div class="img-shadow rounded-xl">
            <div class="owl-single no-dots owl-carousel">
              <div v-for="item in items" :key="item.id" class="item">
                <span class="number">{{ item.id }}/{{ total }}</span>
                <img
                  :src="item.photo"
                  alt="Image"
                  class="img-fluid clickable-image"
                  @click="openImage(item)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <teleport to="body">
      <transition name="modal-fade">
        <div
          v-if="showModal"
          class="image-modal"
          @click.self="closeImage"
        >
          <div class="image-modal-content">
            <button
              type="button"
              class="close-btn"
              @click="closeImage"
              aria-label="ปิดหน้าต่าง"
            >
              ×
            </button>

            <div class="image-modal-header">
              <div class="modal-title-group">
                <strong>{{ heading }}</strong>
                <span class="modal-divider">|</span>
                <span>{{ selectedItem?.name || subHeading }}</span>
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
                :src="selectedImage"
                alt="Preview"
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
.clickable-image {
  cursor: zoom-in;
}

/* ===== left cards ===== */
.phase-card {
  align-items: flex-start;
  gap: 16px;
  padding: 18px 20px;
  margin-bottom: 14px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  text-decoration: none;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.04);
}

.phase-card:hover {
  transform: translateY(-4px);
  border-color: #93c5fd;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.1);
  background: #ffffff;
}

.phase-card.active {
  border-color: #93c5fd;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.12);
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
}

.phase-card .service-icon {
  flex: 0 0 56px;
  width: 56px;
  height: 56px;
  margin-bottom: 0 !important;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eff6ff;
  color: #2563eb;
  box-shadow: inset 0 0 0 1px rgba(147, 197, 253, 0.35);
}

.phase-card .service-icon svg {
  width: 24px;
  height: 24px;
}

.phase-card .service-contents {
  flex: 1;
  min-width: 0;
}

.phase-card .service-contents h3 {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.35;
  color: #0f172a;
}

.phase-card .service-contents p {
  margin: 0;
  font-size: 14px;
  line-height: 1.65;
  color: #64748b;
}

.phase-card .service-icon.color-1 {
  background: #d566b0;
  color: #ffffff;
}

.phase-card .service-icon.color-2 {
  background: #2563eb;
  color: #ffffff;
}

.phase-card .service-icon.color-3 {
  background: #16a34a;
  color: #ffffff;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.item img {
  display: block;
  margin: 0 auto;
}

.img-shadow {
  padding: 24px 14px;
}

.img-shadow {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 22px;
  padding: 14px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}

.number {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.75);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
}

/* modal */
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

:global(.modal-divider) {
  color: #cbd5e1;
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
</style>