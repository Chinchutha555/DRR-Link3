<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import ProjectMap from "./Map_P1+P2.vue";

const selectedTab = ref("phase1");

const phaseConfig = {
  phase1: {
    label: "Phase 1",
    themeClass: "section-blue",
    overviewPercent: "100", //เปอร์เซ็นต์ความคืบหน้าโดยรวมของโครงการ
    routeCount: 40, //จำนวนสายทาง
    distance: "2,828.57", //ระยะทางรวม
    progress: 100, // ความคืบหน้าการสำรวจ
    statusType: "success", // สถานะความคืบหน้าการสำรวจ
    statusText: "เสร็จสิ้น : 2,828.57 กม.", // ข้อความสถานะความคืบหน้าการสำรวจ
  },
  phase2: {
    label: "Phase 2",
    themeClass: "section-green",
    overviewPercent: "41.44", //เปอร์เซ็นต์ความคืบหน้าโดยรวมของโครงการ
    routeCount: 56, //จำนวนสายทาง
    distance: "3,040.628", //ระยะทางรวม
    progress: 86.64, // ความคืบหน้าการสำรวจ
    statusType: "processing", // สถานะความคืบหน้าการสำรวจ
    statusText: "ดำเนินการไปแล้ว : 2,634.432 กม.", // ข้อความสถานะความคืบหน้าการสำรวจ
  },
};

const phaseList = Object.keys(phaseConfig);

const dashboardData = computed(() => phaseConfig[selectedTab.value]);

const themeClass = computed(() => dashboardData.value.themeClass);

onMounted(() => {
  AOS.init({
    duration: 700,
    easing: "ease-out-cubic",
    once: true,
    offset: 60,
  });
});

watch(selectedTab, async () => {
  await nextTick();
  AOS.refresh();
});
</script>

<template>
  <div class="untree_co-section" id="progress-section">
    <h3
      class="heading text-center"
      data-aos="fade-up"
      style="margin-bottom: 35px"
    >
      ความคืบหน้าโครงการ
    </h3>

    <div class="tabs" data-aos="fade-up" data-aos-delay="100">
      <button
        v-for="phase in phaseList"
        :key="phase"
        type="button"
        class="tab-button"
        :class="{ 'active-tab': selectedTab === phase }"
        @click="selectedTab = phase"
      >
        {{ phaseConfig[phase].label }}
      </button>
    </div>

    <div class="container">
      <!-- OVERVIEW SECTION -->
      <div
        class="overview-section"
        :class="themeClass"
        data-aos="fade-up"
        data-aos-delay="120"
      >
        <div class="overview-content">
          <div>
            <div class="stat-box" data-aos="fade-right" data-aos-delay="150">
              <h3>ภาพรวมโครงการ</h3>
            </div>

            <p class="overview-desc">สรุปภาพรวมผลการดำเนินงานของโครงการ</p>
          </div>

          <div class="overview-percent-wrap">
            <span class="overview-percent">
              {{ dashboardData.overviewPercent }}
            </span>
            <span class="overview-unit">%</span>
          </div>
        </div>
      </div>

      <!-- TOP ROW: 2 กล่อง -->
      <div class="top-row" :class="themeClass">
        <div class="box stat-box" data-aos="fade-right" data-aos-delay="150">
          <h3>จำนวนสายทาง</h3>

          <p class="stat-value">
            {{ dashboardData.routeCount }}
            <span class="stat-label">สายทาง</span>
          </p>
        </div>

        <div class="box stat-box" data-aos="fade-left" data-aos-delay="200">
          <h3>ระยะทางรวม</h3>

          <p class="stat-value">
            {{ dashboardData.distance }}
            <span class="stat-label">กิโลเมตร</span>
          </p>
        </div>
      </div>

      <!-- PROGRESS ROW: เต็มแถว -->
      <div class="progress-row" :class="themeClass" data-aos="fade-right">
        <div class="box progress-box">
          <div class="progress-header">
            <h3>ความคืบหน้าการสำรวจ</h3>

            <span class="progress-percent">
              {{ dashboardData.progress }}%
            </span>
          </div>

          <div class="single-progress-wrap">
            <div class="single-progress-top">
              <div class="progress-phase-row">
                <span class="progress-phase">
                  {{ dashboardData.label }}
                </span>

                <span class="status-badge" :class="dashboardData.statusType">
                  {{ dashboardData.statusText }}
                </span>
              </div>
            </div>

            <div class="progress-bar">
              <div
                class="progress-fill active"
                :style="{ width: dashboardData.progress + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- MAP ROW: ไม่ยุ่งกับรูป -->
      <div class="bottom-row">
        <div
          class="box full-width"
          data-aos="zoom-in-up"
          data-aos-delay="250"
          data-aos-duration="800"
        >
          <ProjectMap :phase="selectedTab" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  padding-left: 0;
  padding-right: 0;
  gap: 0;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tab-button {
  border: 1px solid #407bff;
  background-color: #ffffff;
  color: #407bff;
  padding: 10px 22px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-weight: 600;
}

.tab-button:hover {
  transform: translateY(-2px);
  border-color: #93c5fd;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.08);
}

.tab-button.active-tab {
  background-color: #407bff;
  color: #ffffff;
}

.box {
  background-color: #ffffff;
  padding: 24px;
  border: 1px solid #dbe3ef;
  border-radius: 18px;
  color: #0f172a;
  transition: all 0.25s ease;
}

/* TOP ROW */
.top-row {
  width: 100%;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.top-row .box {
  width: calc(50% - 10px);
}

/* MAP ROW */
.bottom-row {
  width: 100%;
  margin-bottom: 20px;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease;
  box-shadow: 0 6px 18px rgba(0, 76, 255, 0.04);
}

.bottom-row .box {
  width: 100%;
}

/* PROGRESS ROW */
.progress-row {
  width: 100%;
  margin-bottom: 20px;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease;
  box-shadow: 0 6px 18px rgba(0, 76, 255, 0.04);
}

.progress-row .box {
  width: 100%;
}

.stat-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease;
}

.stat-box h3,
.progress-box h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
}

.stat-value {
  margin: 0;
  font-size: 40px;
  font-weight: 800;
  color: #2563eb;
  line-height: 1.1;
  display: flex;
  align-items: baseline;
}

.stat-label {
  margin-left: auto;
  color: #64748b;
  font-size: 15px;
  font-weight: 500;
}

.progress-box {
  min-height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.progress-percent {
  font-size: 28px;
  font-weight: 800;
  color: #2563eb;
  line-height: 1;
}

.single-progress-wrap {
  margin-top: 8px;
}

.single-progress-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.progress-phase-row {
  display: flex;
  align-items: center;
  width: 100%;
}

.progress-phase {
  font-size: 14px;
  font-weight: 600;
  color: #334155;
}

.progress-bar {
  width: 100%;
  height: 14px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #93c5fd 0%, #60a5fa 45%, #2563eb 100%);
  transition: width 0.4s ease;
}

.progress-fill.active {
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
}

.full-width {
  width: 100%;
}

button:focus,
button:focus-visible,
button:active {
  outline: none;
  box-shadow: none;
}

/* BADGE */
.status-badge {
  margin-left: auto;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.status-badge.success {
  background: #dcfce7;
  color: #16a34a;
}

.status-badge.processing {
  background: #fef3c7;
  color: #d97706;
}

/* OVERVIEW SECTION */
.overview-section {
  width: 100%;
  margin-bottom: 24px;
  padding: 24px;
  border-radius: 26px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(64, 123, 255, 0.18);
  background:
    radial-gradient(
      circle at top right,
      rgba(96, 165, 250, 0.32),
      transparent 34%
    ),
    linear-gradient(135deg, #eff6ff 0%, #ffffff 48%, #eef2ff 100%);
}

.overview-section::before {
  content: "";
  position: absolute;
  right: -70px;
  top: -70px;
  width: 220px;
  height: 220px;
  border-radius: 999px;
  background: rgba(64, 123, 255, 0.12);
}

.overview-content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.overview-desc {
  margin: 10px 0 0;
  font-size: 15px;
  color: #64748b;
}

.overview-percent-wrap {
  display: flex;
  align-items: baseline;
  justify-content: center;
  min-width: 180px;
  padding: 18px 24px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(219, 227, 239, 0.9);
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.12);
}

.overview-percent {
  font-size: 58px;
  font-weight: 900;
  line-height: 1;
  color: #1d4ed8;
}

.overview-unit {
  margin-left: 6px;
  font-size: 24px;
  font-weight: 800;
  color: #2563eb;
}

/* SECTION TITLE */
.section-title-row {
  width: 100%;
  margin-bottom: 14px;
}

.section-title-row h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: #1e293b;
}

/* =========================
   PHASE COLOR THEME
   คงสไตล์เดิม แต่เปลี่ยนสีตาม Phase
========================= */

/* Phase 1: ฟ้า */
.section-blue .stat-value,
.section-blue .progress-percent,
.section-blue .overview-percent,
.section-blue .overview-unit {
  color: #2563eb;
}

.section-blue .progress-fill {
  background: linear-gradient(90deg, #93c5fd 0%, #60a5fa 45%, #2563eb 100%);
}

.section-blue .progress-fill.active {
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
}

/* Phase 2: เขียว */
.section-green .stat-value,
.section-green .progress-percent,
.section-green .overview-percent,
.section-green .overview-unit {
  color: #16a34a;
}

.section-green.overview-section {
  border-color: rgba(22, 163, 74, 0.22);
  background:
    radial-gradient(
      circle at top right,
      rgba(134, 239, 172, 0.35),
      transparent 34%
    ),
    linear-gradient(135deg, #f0fdf4 0%, #ffffff 48%, #ecfdf5 100%);
}

.section-green.overview-section::before {
  background: rgba(22, 163, 74, 0.12);
}

.section-green .overview-percent-wrap {
  box-shadow: 0 12px 28px rgba(22, 163, 74, 0.12);
}

.section-green .progress-fill {
  background: linear-gradient(90deg, #86efac 0%, #4ade80 45%, #16a34a 100%);
}

.section-green .progress-fill.active {
  box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.08);
}

/* RESPONSIVE */
@media screen and (max-width: 992px) {
  .top-row {
    flex-wrap: wrap;
  }

  .top-row .box {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .container {
    padding: 12px;
    padding-left: 0;
    padding-right: 0;
  }

  .stat-value {
    font-size: 32px;
  }

  .progress-percent {
    font-size: 24px;
  }

  .box {
    padding: 20px;
  }

  .progress-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
