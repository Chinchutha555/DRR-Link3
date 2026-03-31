<script setup>
import mainPhoto from "../assets/images/file.png";
const documents = [
  {
    title: "Final Report ระยะที่ 1",
    file: "https://infracorpth-my.sharepoint.com/:f:/g/personal/pawarotorn_c_infra-corp_co/IgC4v5-T-1iJTqIlllQ-Yqy5ASZ_k_KA9eGzlJ1XeYaEuBg?e=t0Ckdq",
  },
  {
    title: "Fact Sheet ระยะที่ 1",
    file: "https://infracorpth-my.sharepoint.com/:b:/g/personal/pawarotorn_c_infra-corp_co/IQB4TiiP68p6QpKLVE30M3tTAW0xWVkWOwBUOzQBESoSj-E?e=HMEKnx",
  },
  {
    title: "Definitive Conceptual Design",
    file: "https://infracorpth-my.sharepoint.com/:b:/g/personal/pawarotorn_c_infra-corp_co/IQBXCS6TAUTNSoNkVwGxjC61AfKqYNrmxfswb2xJEsxuELw?e=ywIhDS",
  },
  {
    title: "บทความที่ได้รับการตีพิมพ์",
    file: "https://infracorpth-my.sharepoint.com/:b:/g/personal/pawarotorn_c_infra-corp_co/IQCNMuKf66UtSbIb2jWy9MrHAWX9erowzuOeZqS5laGwHzk?e=D2Zmyc",
  },
];
</script>

<template>
  <div class="untree_co-hero" id="file-section">
    <div class="container">
      <div class="col-12">
        <div class="row align-items-center">
          <div class="col-lg-7" data-aos="fade-right" data-aos-delay="1400">
            <img :src="mainPhoto" alt="Image" class="img-fluid" />
          </div>
          <div class="col-lg-5">
            <div class="doc-header v1" data-aos="fade-up" data-aos-delay="0">
              <div>
                <h2 class="doc-main-title">เอกสารทั้งหมด</h2>
                <p class="doc-sub">คลิกเพื่อเปิดเอกสารในแท็บใหม่</p>
              </div>
            </div>

            <div
              class="doc-grid"
              data-aos="fade-left"
              data-aos-duration="800"
              :data-aos-delay="150 + index * 120"
            >
              <a
                v-for="(doc, index) in documents"
                :key="index"
                :href="doc.file"
                target="_blank"
                class="doc-card"
              >
                <div class="doc-icon">📄</div>

                <div class="doc-content">
                  <h3 class="doc-title">{{ doc.title }}</h3>
                  <p class="doc-desc">{{ doc.description }}</p>

                  <div class="doc-meta">
                    <span class="doc-type">{{ doc.type }}</span>
                    <span class="doc-size">{{ doc.size }}</span>
                  </div>
                </div>

                <div class="doc-arrow">↗</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doc-section {
  padding: 50px 0;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
}

.doc-grid {
  display: grid;
  /* grid-template-columns: repeat(1, 1fr); */
  gap: 20px;
}

.doc-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 18px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  background: #fff;
  text-decoration: none;
  transition: 0.25s;
}

.doc-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.doc-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

.doc-content {
  flex: 1;
}

.doc-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 6px;
}

.doc-desc {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 8px;
}

.doc-meta {
  font-size: 12px;
  color: #9ca3af;
  display: flex;
  gap: 10px;
}

.doc-type {
  background: #e0f2fe;
  color: #0284c7;
  padding: 2px 8px;
  border-radius: 999px;
}

.doc-size {
  color: #6b7280;
}

.doc-arrow {
  font-size: 18px;
  color: #2563eb;
}

@media (max-width: 768px) {
  .doc-grid {
    grid-template-columns: 1fr;
  }
}

.doc-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 18px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  text-decoration: none;

 transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease;
  box-shadow: 0 6px 18px rgba(0, 76, 255, 0.04);
}

/* hover แบบ dashboard สะอาด */
.doc-card:hover {
  transform: translateY(-4px);
  border-color: #93c5fd;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.1);
}

/* icon subtle */
.doc-card:hover .doc-icon {
  transform: scale(1.05);
}

/* arrow ขยับเล็กน้อย */
.doc-card:hover .doc-arrow {
  transform: translateX(4px);
}

/* transition smooth */
.doc-icon {
  transition: transform 0.2s ease;
}

.doc-title {
  transition: color 0.2s ease;
}

.doc-arrow {
  transition: transform 0.2s ease;
}

/* กดแล้ว feedback */
.doc-card:active {
  transform: translateY(-1px) scale(0.99);
}

.doc-header.v1 {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.doc-title-line {
  width: 4px;
  height: 48px;
  border-radius: 6px;
  background: linear-gradient(180deg, #2563eb, #60a5fa);
}

.doc-eyebrow {
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 4px;
}

.doc-main-title {
  /* font-size: 34px;
  font-weight: 800; */
  color: #0f172a;
  margin-bottom: 5px;
}
</style>
