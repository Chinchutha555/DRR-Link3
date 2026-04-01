<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const service1SubHeading = "Mobile Mapping System";
const service1Title = "ระบบ MMS (Mobile Mapping System)";

const images = [
  "images/New/30_03_69_2/01.jpg",
  "images/New/30_03_69_2/02.jpg",
  "images/New/30_03_69_2/03.jpg",
  "images/New/30_03_69_2/04.jpg",
  "images/New/30_03_69_2/05.jpg",
];

const currentIndex = ref(0);
let autoSlide = null;

const startAutoSlide = () => {
  stopAutoSlide();
  autoSlide = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  }, 3000);
};

const stopAutoSlide = () => {
  if (autoSlide) {
    clearInterval(autoSlide);
    autoSlide = null;
  }
};

onMounted(() => {
  startAutoSlide();
});

onBeforeUnmount(() => {
  stopAutoSlide();
});

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
  startAutoSlide();
};

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.length) % images.length;
  startAutoSlide();
};

const goToImage = (index) => {
  currentIndex.value = index;
  startAutoSlide();
};
</script>

<template>
  <div
    class="untree_co-section"
    id="features-section"
    data-aos="fade-up"
    data-aos-duration="800"
  >
    <div class="container">
      <div class="row d-flex align-items-center justify-content-between">
        <div
          class="col-lg-6 d-flex justify-content-center align-items-center order-lg-1"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div
            class="feature-slider"
            @mouseenter="stopAutoSlide"
            @mouseleave="startAutoSlide"
          >
            <div class="image-group">
              <div class="image-wrapper">
                <img
                  :src="images[currentIndex]"
                  alt="Image"
                  class="img-fluid feature-image"
                />
              </div>

              <div class="slider-dots">
                <button
                  v-for="(img, index) in images"
                  :key="img"
                  class="dot"
                  :class="{ active: index === currentIndex }"
                  @click="goToImage(index)"
                ></button>
              </div>
            </div>

            <button class="slider-btn prev" @click="prevImage">
              <svg viewBox="0 0 24 24">
                <path d="M15 18L9 12L15 6" />
              </svg>
            </button>

            <button class="slider-btn next" @click="nextImage">
              <svg viewBox="0 0 24 24">
                <path d="M9 6L15 12L9 18" />
              </svg>
            </button>
          </div>
        </div>

        <div class="col-lg-6 order-lg-2">
          <div class="feature-label">{{ service1SubHeading }}</div>

          <p class="heading feature-title">
            {{ service1Title }}
          </p>

          <div class="mb-4" data-aos="fade-up" data-aos-delay="200">
            <p>
              ระบบ MMS (Mobile Mapping System) หรือระบบจัดทำแผนที่แบบเคลื่อนที่
              ในยุคใหม่นี้ มีขนาดที่เล็กลง มีความสะดวกรวดเร็วในการสำรวจข้อมูลภาคสนาม
              ประกอบกับเทคโนโลยีการถ่ายภาพหรือกล้องดิจิตอล แบบ 360 องศา
              ที่ความละเอียดสูงขึ้นพร้อมทั้งระบบระบุพิกัดจากดาวเทียม GNSS
              ซึ่งจะได้ข้อมูลภาพพาโนรามา 360 องศา พร้อมกับตำแหน่งพิกัดทางภูมิศาสตร์
              อีกทั้งยังสามารถวัดขนาดและระยะทางของวัตถุต่าง ๆ ทำการจัดเก็บข้อมูล
              และประมวลผลลัพธ์ข้อมูลส่งออกเป็นไฟล์ ที่สามารถดูในซอฟต์แวร์รหัสเปิด
              (Open-source) เช่น QGIS ได้
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature-label {
  display: inline-block;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.08);
  padding: 8px 14px;
  border-radius: 999px;
}

.feature-slider {
  position: relative;
  width: 100%;
  max-width: 460px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
}

.image-group {
  position: relative;
  width: 100%;
  max-width: 460px;
  padding-bottom: 34px; /* เว้นที่ให้ dot อยู่ล่างสุด */
}

.image-wrapper {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-fluid.feature-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;

  display: block;
  border-radius: 16px;
  object-fit: cover;
}

.slider-btn {
  position: absolute;
  top: calc(50% - 17px);
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.92);
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  transition: 0.2s ease;
  z-index: 3;
}

.slider-btn:hover {
  transform: translateY(-50%) scale(1.05);
}

.slider-btn.prev {
  left: 20px;  
}

.slider-btn.next {
  right: 20px;  
}

.slider-btn svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.slider-dots {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  backdrop-filter: blur(6px);
  z-index: 2;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  border: none;
  background: #cbd5e1;
  cursor: pointer;
  transition: 0.25s ease;
}

.dot.active {
  width: 18px;
  background: #3b82f6;
}

.feature-title{
  font-size: 24px;
}
</style>