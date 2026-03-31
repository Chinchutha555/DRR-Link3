<script setup>
const timelineItems = [
  {
    id: 1,
    title: "การรวบรวมข้อมูลเบื้องต้น",
    desc: "วิเคราะห์ข้อมูลสถิติราจร จัดลำดับถนนปัจจุบัน และแผนพัฒนาจังหวัด",
    date: "ก.พ. 2569",
    status: "สำเร็จ",
    color: "green",
  },
  {
    id: 2,
    title: "การคัดเลือกสายทาง",
    desc: "คัดเลือกสายทาง 50 แนวเส้นทาง ระยะทางไม่น้อยกว่า 2,500 กิโลเมตร",
    date: "มี.ค. 2569",
    status: "กำลังดำเนินการ",
    color: "blue",
  },
  {
    id: 3,
    title: "การรับฟังความคิดเห็นครั้งที่ 1",
    desc: "ประชุมกลุ่มย่อยระดับหน่วยงานท้องถิ่นและสัมมนาภาคประชาชน",
    date: "มี.ค. 2569",
    status: "กำลังดำเนินการ",
    color: "blue",
  },
  {
    id: 4,
    title: "การสำรวจภาคสนาม",
    desc: "ลงพื้นที่ตรวจสอบสภาพทางกายภาค จุดเสี่ยง และจุดเชื่อมต่อที่สำคัญ",
    date: "เม.ย. 2569",
    status: "เร็วๆนี้",
    color: "gray",
  },
  {
    id: 5,
    title: "ประเมินความคุ้มค่าเบื้องต้น",
    desc: "วิเคราะห์ความคุ้มค่าทางเศรษฐศาสตร์และวิศวกรรมเบื้องต้น",
    date: "พ.ค. 2569",
    status: "เร็วๆนี้",
    color: "gray",
  },
  {
    id: 6,
    title: "การจัดทำร่างแผนแม่บท",
    desc: "วิเคราะห์และจัดลำดับความสำคัญของโครงการพัฒนาโครงข่าย",
    date: "ก.ค. 2569",
    status: "เร็วๆนี้",
    color: "gray",
  },
];
</script>

<template>
  <section class="py-16 bg-white" id="status-section" style="margin-top: 100px">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div
        class="text-center mb-20"
        data-aos="fade-up"
        data-aos-duration="900"
        data-aos-once="true"
      >
        <h2 class="section-title">
          สถานะการดำเนินงานปัจจุบัน
        </h2>

        <p class="section-desc max-w-2xl mx-auto leading-7">
          เรากำลังดำเนินการสำรวจภาคสนามและรับฟังความคิดเห็นจากทุกภาคส่วนอย่างเข้มข้น
          เพื่อให้ได้ข้อมูลที่แม่นยำและตอบโจทย์ต่อความต้องการของคนในพื้นที่มากที่สุด
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- center line -->
        <div
          class="timeline-line absolute left-1/2 top-0 hidden md:block h-full w-px -translate-x-1/2"
          data-aos="zoom-in"
          data-aos-duration="700"
          data-aos-once="true"
        ></div>

        <div class="space-y-10 md:space-y-16">
          <div
            v-for="(item, index) in timelineItems"
            :key="item.id"
            class="relative grid grid-cols-1 md:grid-cols-2 md:gap-14 items-center"
          >
            <!-- Left card -->
            <div
              v-if="index % 2 === 1"
              class="md:pr-10"
              data-aos="fade-right"
              :data-aos-delay="index * 120"
              data-aos-duration="900"
              data-aos-once="true"
            >
              <div
                class="status-card rounded-3xl border-1 p-6"
                :class="{
                  'bg-blue-50 border-blue-300': item.color === 'blue',
                  'bg-green-50 border-green-300': item.color === 'green',
                  'bg-slate-50 border-slate-200': item.color === 'gray',
                }"
              >
                <div class="flex items-start justify-between mb-4 gap-3">
                  <span
                    class="status-badge inline-flex"
                    :class="{
                      'bg-blue-100 text-blue-700': item.color === 'blue',
                      'bg-green-100 text-green-700': item.color === 'green',
                      'bg-slate-200 text-slate-600': item.color === 'gray',
                    }"
                  >
                    {{ item.status }}
                  </span>
                  <span class="card-date text-xs text-slate-400">{{ item.date }}</span>
                </div>

                <h3 class="card-title text-2xl font-extrabold text-slate-900 mb-3">
                  {{ item.title }}
                </h3>
                <p class="card-desc text-sm leading-7 text-slate-500">
                  {{ item.desc }}
                </p>
              </div>
            </div>
            <div v-else class="hidden md:block"></div>

            <!-- Center dot -->
            <div
              class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              data-aos="zoom-in"
              :data-aos-delay="index * 120 + 100"
              data-aos-duration="700"
              data-aos-once="true"
            >
              <div
                class="timeline-dot-outer w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center"
              >
                <div
                  class="w-3 h-3 rounded-full"
                  :class="{
                    'bg-blue-500': item.color === 'blue',
                    'bg-green-500': item.color === 'green',
                    'bg-slate-300': item.color === 'gray',
                  }"
                ></div>
              </div>
            </div>

            <!-- Right card -->
            <div
              v-if="index % 2 === 0"
              class="md:pl-10"
              data-aos="fade-left"
              :data-aos-delay="index * 120"
              data-aos-duration="900"
              data-aos-once="true"
            >
              <div
                class="status-card rounded-3xl border-1 p-6"
                :class="{
                  'bg-blue-50 border-blue-300': item.color === 'blue',
                  'bg-green-50 border-green-300': item.color === 'green',
                  'bg-slate-50 border-slate-200': item.color === 'gray',
                }"
              >
                <div class="flex items-start justify-between mb-4 gap-3">
                  <span
                    class="status-badge inline-flex"
                    :class="{
                      'bg-blue-100 text-blue-700': item.color === 'blue',
                      'bg-green-100 text-green-700': item.color === 'green',
                      'bg-slate-200 text-slate-600': item.color === 'gray',
                    }"
                  >
                    {{ item.status }}
                  </span>
                  <span class="card-date text-xs text-slate-400">{{ item.date }}</span>
                </div>

                <h3 class="card-title text-2xl font-extrabold text-slate-900 mb-3">
                  {{ item.title }}
                </h3>
                <p class="card-desc text-sm leading-7 text-slate-500">
                  {{ item.desc }}
                </p>
              </div>
            </div>
            <div v-else class="hidden md:block"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ===== SECTION ===== */
.section-title {
  margin-bottom: 20px;
  color: #0f172a;
  letter-spacing: -0.5px;
}

.section-desc {
  font-size: 16px;
  line-height: 1.9;
  color: #64748b;
}

/* ===== TIMELINE LINE ===== */
.timeline-line {
  background: linear-gradient(
    to bottom,
    #e2e8f0 0%,
    #cbd5f5 50%,
    #e2e8f0 100%
  );
  opacity: 0.9;
}

/* ===== CARD ===== */
.status-card {
  position: relative;
  overflow: hidden;

  border-radius: 24px;
  border: 1px solid rgba(148, 163, 184, 0.2);

  background: #ffffff;

     box-shadow: 0 6px 18px rgba(0, 76, 255, 0.04);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

/* ===== SOFT GRADIENT ===== */
.status-card::before {
  content: "";
  position: absolute;
  inset: 0;

  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #f8fafc 50%,
    #f1f5f9 100%
  );

  opacity: 0;
  transition: opacity 0.3s ease;

  z-index: 0;
}

/* ===== HOVER ===== */
.status-card:hover::before {
  opacity: 1;
}

.status-card:hover {
  transform: translateY(-3px);

  /* 🔵 กรอบฟ้า */
  border-color: #93c5fd;

  /* 🔵 glow ฟ้าแบบนุ่ม */
  box-shadow:
    0 12px 28px rgba(37, 99, 235, 0.12),
    0 0 0 1px rgba(147, 197, 253, 0.3),
    inset 0 1px 0 rgba(255,255,255,1);
}

/* ===== CONTENT ABOVE EFFECT ===== */
.status-card > * {
  position: relative;
  z-index: 1;
}

/* ===== BADGE ===== */
.status-badge {
  border-radius: 999px;
  padding: 5px 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4px;
  line-height: 1;
}

/* ===== DATE ===== */
.card-date {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
}

/* ===== TITLE ===== */
.card-title {
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.35;
  letter-spacing: -0.2px;
}

/* ===== DESCRIPTION ===== */
.card-desc {
  font-size: 14px;
  line-height: 1.7;
  color: #64748b;
}

/* ===== CENTER DOT ===== */
.timeline-dot-outer {
  box-shadow:
    0 6px 14px rgba(15, 23, 42, 0.08),
    inset 0 1px 0 rgba(255,255,255,0.9);
}

/* ===== MOBILE ===== */
@media screen and (max-width: 768px) {
  .section-title {
    font-size: 30px;
    margin-bottom: 16px;
  }

  .section-desc {
    font-size: 15px;
    line-height: 1.8;
  }

  .status-card {
    border-radius: 20px;
    padding: 20px;
  }

  .card-title {
    font-size: 20px;
  }

  .card-desc {
    font-size: 14px;
    line-height: 1.65;
  }
}
</style>