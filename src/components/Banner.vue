<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const slides = ref([
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    title: "Banner 01",
    subtitle: "ตัวอย่างข้อความสำหรับแบนเนอร์ภาพแรก",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1600&auto=format&fit=crop",
    title: "Banner 02",
    subtitle: "ตัวอย่างข้อความสำหรับแบนเนอร์ภาพที่สอง",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    title: "Banner 03",
    subtitle: "ตัวอย่างข้อความสำหรับแบนเนอร์ภาพที่สาม",
  },
]);

const currentIndex = ref(0);
let intervalId = null;

const currentSlide = computed(() => slides.value[currentIndex.value]);

const nextSlide = () => {
  currentIndex.value =
    currentIndex.value === slides.value.length - 1 ? 0 : currentIndex.value + 1;
};

const prevSlide = () => {
  currentIndex.value =
    currentIndex.value === 0 ? slides.value.length - 1 : currentIndex.value - 1;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

const startAutoSlide = () => {
  stopAutoSlide();
  intervalId = setInterval(() => {
    nextSlide();
  }, 4000);
};

const stopAutoSlide = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

onMounted(() => {
  startAutoSlide();
});

onBeforeUnmount(() => {
  stopAutoSlide();
});
</script>

<template>

<div class="untree_co-hero" style="padding-bottom: 0; padding-top: 0;">
    <div >
      <div class="row align-items-center" style="padding-bottom: 0;">
  <div
    class=" w-full overflow-hidden"
    @mouseenter="stopAutoSlide"
    @mouseleave="startAutoSlide"
  >
    <!-- Image -->
    <div class="relative h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px] w-full">
      <img
        :src="currentSlide.image"
        :alt="currentSlide.title"
        class="h-full w-full object-cover transition-all duration-700"
      />

      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/35"></div>

      <!-- Text -->
      <div class="absolute inset-0 flex items-center">
        <div class="px-6 md:px-12 text-white max-w-2xl">
          <h2 class="text-2xl md:text-4xl lg:text-5xl font-bold mb-3">
            {{ currentSlide.title }}
          </h2>
          <p class="text-sm md:text-base lg:text-lg opacity-90">
            {{ currentSlide.subtitle }}
          </p>
        </div>
      </div>

      <!-- Left button -->
      <button
        @click="prevSlide"
        class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-black shadow hover:bg-white"
      >
        ‹
      </button>

      <!-- Right button -->
      <button
        @click="nextSlide"
        class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-black shadow hover:bg-white"
      >
        ›
      </button>
    </div>

    <!-- Indicators -->
    <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        @click="goToSlide(index)"
        class="h-3 w-3 rounded-full transition-all"
        :class="index === currentIndex ? 'bg-white w-7' : 'bg-white/60'"
      />
    </div>
  </div>
  </div>
  </div>
  </div>
</template>