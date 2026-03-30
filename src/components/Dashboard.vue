<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import ProjectMap from "../components/Dashboard_filter.vue";

const selectedTab = ref("phase1");

const dashboardData = computed(() => {
  if (selectedTab.value === "phase2") {
    return {
      routeCount: 28,
      routeLabel: "สายทางในระยะ Phase 2",
      distance: "1,245.80",
      progress: 68,
      progressLabel: "ความคืบหน้า",
    };
  }

  return {
    routeCount: 18,
    routeLabel: "สายทางในระยะ Phase 1",
    distance: "842.35",
    progress: 42,
    progressLabel: "ความคืบหน้า",
  };
});

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
  <div class="untree_co-section" id="pricing-section">
    <h3
      class="heading text-center"
      data-aos="fade-up"
      style="margin-bottom: 40px"
    >
      ความคืบหน้าโครงการ
    </h3>

    <div class="tabs" data-aos="fade-up" data-aos-delay="100">
      <button
        type="button"
        :class="['tab-button', { 'active-tab': selectedTab === 'phase1' }]"
        @click="selectedTab = 'phase1'"
      >
        Phase 1
      </button>

      <button
        type="button"
        :class="['tab-button', { 'active-tab': selectedTab === 'phase2' }]"
        @click="selectedTab = 'phase2'"
      >
        Phase 2
      </button>
    </div>

    <div class="container">
      <!-- TOP ROW: 2 กล่อง -->
      <div class="top-row">
        <div class="box stat-box" data-aos="fade-right" data-aos-delay="150">
          <h3>จำนวนสายทาง</h3>
          <p class="stat-value">{{ dashboardData.routeCount }}</p>
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
      <div class="progress-row">
        <div class="box progress-box" data-aos="fade-up" data-aos-delay="280">
          <div class="progress-header">
            <h3>{{ dashboardData.progressLabel }}</h3>
            <span class="progress-percent">{{ dashboardData.progress }}%</span>
          </div>

          <div class="single-progress-wrap">
            <div class="single-progress-top">
              <span class="progress-phase">
                {{ selectedTab === "phase1" ? "Phase 1" : "Phase 2" }}
              </span>
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

.heading {
  color: #0f172a;
  font-weight: 800;
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
}

.bottom-row .box {
  width: 100%;
}

/* PROGRESS ROW */
.progress-row {
  width: 100%;
  margin-bottom: 20px;
}

.progress-row .box {
  width: 100%;
}

.stat-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 170px;
}

.stat-box h3,
.progress-box h3 {
  margin: 0 0 16px;
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
}

.stat-label {
  margin-left: 8px;
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