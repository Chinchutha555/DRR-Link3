<script setup>
import { ref, computed } from "vue";
import { themeColor } from "../data/items";

const heading = "ทั้งหมด";
const subHeading = "ข่าวประชาสัมพันธ์";

const blogItems = [
  {
    title: "การประชุมชี้แจงแผนงานโครงการ",
    name: "ฝ่ายโครงการ",
    date: "25 มี.ค. 2569",
    category: "ข่าวประชาสัมพันธ์",
    photo: "images/person_1.jpg",
    detail:
      "รายละเอียดเพิ่มเติมของข่าวประชาสัมพันธ์รายการที่ 1 สามารถใส่ข้อความยาว ๆ ได้ที่นี่ เช่น วัน เวลา สถานที่ และสาระสำคัญของกิจกรรม",
  },
  {
    title: "การลงพื้นที่สำรวจภาคสนาม",
    name: "ฝ่ายสำรวจ",
    date: "20 มี.ค. 2569",
    category: "ข่าวประชาสัมพันธ์",
    photo: "images/person_2.jpg",
    detail:
      "รายละเอียดเพิ่มเติมของข่าวประชาสัมพันธ์รายการที่ 2 สำหรับแสดงใน popup เมื่อผู้ใช้คลิกที่กล่องข่าว",
  },
  {
    title: "สรุปผลการประชุมรับฟังความคิดเห็น",
    name: "ฝ่ายวิชาการ",
    date: "15 มี.ค. 2569",
    category: "ข่าวประชาสัมพันธ์",
    photo: "images/person_3.jpg",
    detail:
      "รายละเอียดเพิ่มเติมของข่าวประชาสัมพันธ์รายการที่ 3 พร้อมข้อมูลสรุปประเด็นสำคัญจากการประชุมรับฟังความคิดเห็น",
  },
  {
    title: "กิจกรรมลงพื้นที่ติดตามความก้าวหน้า",
    name: "ฝ่ายติดตาม",
    date: "10 มี.ค. 2569",
    category: "ข่าวประชาสัมพันธ์",
    photo: "images/person_3.jpg",
    detail:
      "รายละเอียดเพิ่มเติมของข่าวประชาสัมพันธ์รายการที่ 4 ใช้สำหรับทดสอบการเลื่อนการ์ดด้วยปุ่มซ้ายขวา",
  },
  {
    title: "กิจกรรมลงพื้นที่ติดตามความก้าวหน้า",
    name: "ฝ่ายติดตาม",
    date: "10 มี.ค. 2569",
    category: "ข่าวประชาสัมพันธ์",
    photo: "images/person_3.jpg",
    detail:
      "รายละเอียดเพิ่มเติมของข่าวประชาสัมพันธ์รายการที่ 4 ใช้สำหรับทดสอบการเลื่อนการ์ดด้วยปุ่มซ้ายขวา",
  },
  {
    title: "กิจกรรมลงพื้นที่ติดตามความก้าวหน้า",
    name: "ฝ่ายติดตาม",
    date: "10 มี.ค. 2569",
    category: "ข่าวประชาสัมพันธ์",
    photo: "images/person_3.jpg",
    detail:
      "รายละเอียดเพิ่มเติมของข่าวประชาสัมพันธ์รายการที่ 4 ใช้สำหรับทดสอบการเลื่อนการ์ดด้วยปุ่มซ้ายขวา",
  },
];

const showModal = ref(false);
const selectedItem = ref(null);
const slider = ref(null);

const openModal = (item) => {
  selectedItem.value = item;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedItem.value = null;
};

const currentIndex = ref(0);
const itemsPerPage = 3;

const totalPages = computed(() => Math.ceil(blogItems.length / itemsPerPage));
const isAtStart = computed(() => currentIndex.value === 0);
const isAtEnd = computed(() => currentIndex.value === totalPages.value - 1);

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

const scrollToCurrent = () => {
  const width = slider.value.clientWidth;
  slider.value.scrollTo({
    left: width * currentIndex.value,
    behavior: "smooth",
  });
};
</script>

<template>
  <div class="untree_co-section news-section" id="new-section">
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

            <div class="d-flex align-items-center">
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
              :key="index"
              class="news-slide"
            >
              <article class="news-card" @click="openModal(item)">
                <div class="news-card-media">
                  <img :src="item.photo" alt="Image" class="news-card-image" />
                </div>

                <div class="news-card-body">
                  <div class="news-meta">
                    <span class="news-badge">{{ item.category }}</span>
                    <span class="news-meta-dot">•</span>
                    <span class="news-date">{{ item.date }}</span>
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

          <div class="dots">
            <span
              v-for="(dot, index) in totalPages"
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
          class="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          @click.self="closeModal"
        >
          <div
            class="w-full max-w-2xl bg-white rounded-[28px] shadow-2xl overflow-hidden relative"
          >
            <div class="p-6 md:p-8">
              <button
                @click="closeModal"
                class="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-lg transition border-0"
                style="border-radius: 12px;"
              >
                ✕
              </button>

              <div v-if="selectedItem" class="pr-10">
                <div class="d-flex align-items-center mb-4">
                  <img
                    :src="selectedItem.photo"
                    alt="Image"
                    class="rounded-circle border"
                    style="width: 64px; height: 64px; object-fit: cover;"
                  />
                  <div class="ml-3">
                    <p class="mb-1 text-primary font-weight-bold">
                      {{ selectedItem.date }}
                    </p>
                    <h3 class="mb-1 font-weight-bold">
                      {{ selectedItem.title }}
                    </h3>
                    <p class="mb-0 text-muted">
                      {{ selectedItem.category }} | {{ selectedItem.name }}
                    </p>
                  </div>
                </div>

                <div class="mt-4">
                  <p
                    class="text-muted"
                    style="line-height: 1.9; white-space: pre-line"
                  >
                    {{ selectedItem.detail }}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
}

button:focus,
button:focus-visible,
button:active {
  outline: none;
  box-shadow: none;
}
</style>