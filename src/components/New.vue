<script setup>
import { ref, computed, watch } from "vue";
import { themeColor } from "../data/items";
import { newsItems } from "../data/news";

const props = defineProps({
  heading: {
    type: String,
    default: "ล่าสุด",
  },
  subHeading: {
    type: String,
    default: "ข่าวประชาสัมพันธ์",
  },
  sectionId: {
    type: String,
    default: "news-section",
  },
  limit: {
    type: Number,
    default: null,
  },
});

const formatThaiDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const blogItems = computed(() => {
  const sortedItems = [...newsItems]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((item) => ({
      ...item,
      displayDate: formatThaiDate(item.date),
    }));

  return props.limit ? sortedItems.slice(0, props.limit) : sortedItems;
});

const showModal = ref(false);
const selectedItem = ref(null);
const selectedImage = ref(null);
const fullscreenImage = ref(null);
const slider = ref(null);

const currentIndex = ref(0);
const itemsPerPage = 3;

const totalPages = computed(() =>
  Math.ceil(blogItems.value.length / itemsPerPage),
);

const isAtStart = computed(() => currentIndex.value === 0);
const isAtEnd = computed(() => currentIndex.value >= totalPages.value - 1);

const openModal = (item) => {
  selectedItem.value = item;
  selectedImage.value = item.photos?.[0] || null;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedItem.value = null;
  selectedImage.value = null;
  fullscreenImage.value = null;
};

const openImageViewer = (img) => {
  fullscreenImage.value = img;
};

const closeImageViewer = () => {
  fullscreenImage.value = null;
};

const scrollToCurrent = () => {
  if (!slider.value) return;

  const width = slider.value.clientWidth;
  slider.value.scrollTo({
    left: width * currentIndex.value,
    behavior: "smooth",
  });
};

const next = () => {
  if (isAtEnd.value) return;
  currentIndex.value++;
  scrollToCurrent();
};

const prev = () => {
  if (isAtStart.value) return;
  currentIndex.value--;
  scrollToCurrent();
};

const goTo = (index) => {
  currentIndex.value = index;
  scrollToCurrent();
};

watch([showModal, fullscreenImage], ([modal, image]) => {
  if (modal || image) {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = scrollBarWidth + "px";
  } else {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
});
</script>

<template>
  <div class="untree_co-section news-section" :id="sectionId">
    <div class="container">
      <div class="row">
        <div class="col-12 mb-4" data-aos="fade-up" data-aos-delay="300">
          <div class="section-header">
            <div class="text-left">
              <span class="caption" :style="[{ color: themeColor }]">
                {{ heading }}
              </span>
              <h2 class="heading mb-0">{{ subHeading }}</h2>
            </div>

            <div class="d-flex align-items-center" v-if="totalPages > 1">
              <a
                href="#"
                class="custom-prev"
                :class="{ disabled: isAtStart }"
                @click.prevent="prev"
              >
                <span>
                  <svg
                    class="bi bi-arrow-left"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </span>
              </a>
              &nbsp;&nbsp;&nbsp;
              <a
                href="#"
                class="custom-next"
                :class="{ disabled: isAtEnd }"
                @click.prevent="next"
              >
                <span>
                  <svg
                    class="bi bi-arrow-right"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12" data-aos="fade-up" data-aos-delay="500">
          <div ref="slider" class="news-slider">
            <div
              v-for="(item, index) in blogItems"
              :key="item.id ?? index"
              class="news-slide"
            >
              <article class="news-card" @click="openModal(item)">
                <div class="news-card-media">
                  <img
                    :src="item.photos?.[0] || 'images/default.jpg'"
                    alt="Image"
                    class="news-card-image"
                  />
                </div>

                <div class="news-card-body">
                  <div class="news-meta">
                    <span class="news-badge">{{ item.category }}</span>
                    <span class="news-meta-dot">•</span>
                    <span class="news-date">{{ item.displayDate }}</span>
                  </div>

                  <h3 class="news-title">
                    {{ item.title }}
                  </h3>

                  <p class="news-detail">
                    {{ item.detail }}
                  </p>

                  <div class="news-footer">
                    <div class="news-author">โดย {{ item.name }}</div>
                    <span class="news-link">อ่านเพิ่มเติม →</span>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div class="dots" v-if="totalPages > 1">
            <span
              v-for="(_, index) in totalPages"
              :key="index"
              class="dot"
              :class="{ active: index === currentIndex }"
              @click="goTo(index)"
            ></span>
          </div>
        </div>
      </div>

      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showModal"
          class="news-modal-overlay"
          @click.self="closeModal"
        >
          <div class="news-modal">
            <button
              @click="closeModal"
              class="news-modal-close"
            >
              ✕
            </button>

            <div v-if="selectedItem" class="news-modal-content">
              <div class="news-modal-hero">
                <img
                  :src="selectedImage || selectedItem.photos?.[0] || 'images/default.jpg'"
                  alt="News image"
                  class="news-modal-hero-image clickable-image"
                  @click="openImageViewer(selectedImage || selectedItem.photos?.[0] || 'images/default.jpg')"
                />
              </div>

              <div class="news-modal-body">
                <div class="news-modal-meta-top">
                  <span class="news-modal-badge">{{ selectedItem.category }}</span>
                  <span class="news-modal-date">{{ selectedItem.displayDate }}</span>
                </div>

                <h1 class="news-modal-title">
                  {{ selectedItem.title }}
                </h1>

                <div class="news-modal-author-row">
                  <img
                    :src="selectedItem.photos?.[0] || 'images/default.jpg'"
                    alt="Author"
                    class="news-modal-author-image"
                  />
                  <div>
                    <div class="news-modal-author-label">เผยแพร่โดย</div>
                    <div class="news-modal-author-name">{{ selectedItem.name }}</div>
                  </div>
                </div>

                <div
                  v-if="selectedItem?.photos?.length > 1"
                  class="news-modal-gallery"
                >
                  <img
                    v-for="(img, imgIndex) in selectedItem.photos"
                    :key="imgIndex"
                    :src="img"
                    alt="News image"
                    class="news-modal-thumb"
                    :class="{ active: selectedImage === img }"
                    @click="selectedImage = img; openImageViewer(img)"
                  />
                </div>

                <div class="news-modal-divider"></div>

                <div class="news-modal-detail">
                  {{ selectedItem.detail }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="fullscreenImage"
          class="image-viewer-overlay"
          @click.self="closeImageViewer"
        >
          <button
            class="image-viewer-close"
            @click="closeImageViewer"
          >
            ✕
          </button>

          <img
            :src="fullscreenImage"
            alt="Fullscreen image"
            class="image-viewer-image"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.news-section {
  background: transparent;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.news-slider {
  display: flex;
  gap: 28px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 4px 4px 14px;
}

.news-slider::-webkit-scrollbar {
  display: none;
}

.news-slide {
  flex: 0 0 calc((100% - 56px) / 3);
  display: flex;
}

.news-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease;
  box-shadow: 0 6px 18px rgba(0, 76, 255, 0.04);
}

.news-card:hover {
  transform: translateY(-4px);
  border-color: #93c5fd;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.1);
}

.news-card-media {
  padding: 16px 16px 0;
  flex-shrink: 0;
}

.news-card-image {
  width: 100%;
  height: 210px;
  object-fit: cover;
  display: block;
  border-radius: 16px;
}

.news-card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 18px 20px 20px;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  font-size: 14px;
  color: #64748b;
  flex-wrap: wrap;
}

.news-badge {
  display: inline-flex;
  align-items: center;
  padding: 7px 12px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-weight: 600;
  line-height: 1;
}

.news-meta-dot {
  color: #94a3b8;
}

.news-date {
  color: #64748b;
}

.news-title {
  margin: 0 0 12px;
  font-size: 21px;
  line-height: 1.35;
  font-weight: 800;
  color: #0f172a;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 56px;
}

.news-detail {
  margin: 0 0 18px;
  font-size: 15px;
  line-height: 1.7;
  color: #64748b;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 76px;
}

.news-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 6px;
}

.news-author {
  font-size: 14px;
  color: #94a3b8;
}

.news-link {
  color: #2563eb;
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
}

.custom-prev,
.custom-next {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #111827;
  transition: all 0.2s ease;
  text-decoration: none;
}

.custom-prev:hover,
.custom-next:hover {
  background: #f8fafc;
  border-color: #93c5fd;
  color: #111827;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.08);
}

.dots {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  background: #d1d5db;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
}

.dot.active {
  background: #2563eb;
  width: 22px;
  border-radius: 999px;
}

.custom-prev.disabled,
.custom-next.disabled {
  opacity: 0.4;
  pointer-events: none;
  cursor: not-allowed;
}

button:focus,
button:focus-visible,
button:active {
  outline: none;
  box-shadow: none;
}

.news-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(15, 23, 42, 0.58);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.news-modal {
  width: 100%;
  max-width: 920px;
  max-height: 92vh;
  overflow: hidden;
  background: #ffffff;
  border-radius: 28px;
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.24);
  position: relative;
}

.news-modal-content {
  max-height: 92vh;
  overflow-y: auto;
}

.news-modal-close {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 3;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #0f172a;
  font-size: 18px;
  line-height: 1;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12);
  transition: all 0.2s ease;
  cursor: pointer;
}

.news-modal-close:hover {
  transform: translateY(-1px);
  background: #ffffff;
}

.news-modal-hero {
  width: 100%;
  height: 380px;
  background: #e2e8f0;
}

.news-modal-hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.news-modal-body {
  padding: 28px 32px 32px;
}

.news-modal-meta-top {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.news-modal-badge {
  display: inline-flex;
  align-items: center;
  padding: 7px 14px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 13px;
  font-weight: 700;
}

.news-modal-date {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.news-modal-title {
  margin: 0 0 20px;
  font-size: 34px;
  line-height: 1.28;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.news-modal-author-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}

.news-modal-author-image {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e2e8f0;
  flex-shrink: 0;
}

.news-modal-author-label {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 2px;
}

.news-modal-author-name {
  font-size: 15px;
  color: #0f172a;
  font-weight: 700;
}

.news-modal-gallery {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin-bottom: 22px;
}

.news-modal-thumb {
  width: 110px;
  height: 86px;
  object-fit: cover;
  border-radius: 14px;
  flex-shrink: 0;
  border: 2px solid transparent;
  cursor: pointer;
}

.news-modal-thumb:hover {
  opacity: 0.5;
}


.news-modal-divider {
  height: 1px;
  background: linear-gradient(to right, #e2e8f0, transparent);
  margin-bottom: 24px;
}

.news-modal-detail {
  font-size: 17px;
  line-height: 2;
  color: #334155;
  white-space: pre-line;
}

.clickable-image {
  cursor: zoom-in;
}

.image-viewer-overlay {
  position: fixed;
  inset: 0;
  z-index: 10050;
  background: rgba(15, 23, 42, 0.88);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.image-viewer-image {
  max-width: 92vw;
  max-height: 88vh;
  object-fit: contain;
  border-radius: 18px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.image-viewer-close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 46px;
  height: 46px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
}

.image-viewer-close:hover {
  background: rgba(255, 255, 255, 0.24);
  transform: translateY(-1px);
}

@media (max-width: 991px) {
  .news-slide {
    flex: 0 0 calc((100% - 28px) / 2);
  }

  .news-card-image {
    height: 220px;
  }
}

@media (max-width: 767px) {
  .section-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .news-slide {
    flex: 0 0 100%;
  }

  .news-card-image {
    height: 200px;
  }

  .news-title {
    font-size: 20px;
    min-height: auto;
  }

  .news-detail {
    min-height: auto;
  }

  .news-modal-overlay {
    padding: 14px;
  }

  .news-modal {
    max-height: 95vh;
    border-radius: 22px;
  }

  .news-modal-hero {
    height: 240px;
  }

  .news-modal-body {
    padding: 22px 18px 24px;
  }

  .news-modal-title {
    font-size: 26px;
    line-height: 1.35;
  }

  .news-modal-detail {
    font-size: 15px;
    line-height: 1.9;
  }

  .news-modal-thumb {
    width: 90px;
    height: 72px;
  }
}
</style>