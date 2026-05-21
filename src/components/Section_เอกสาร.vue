<script setup>
import mainPhoto from "../assets/images/documents.png";
import mainPhoto1 from "../assets/images/documents1.png";

const documents = [
  {
    title: "Final Report ระยะที่ 1",
    file:
      "https://infracorpth-my.sharepoint.com/:b:/g/personal/pawarotorn_c_infra-corp_co/IQCNMuKf66UtSbIb2jWy9MrHAWX9erowzuOeZqS5laGwHzk?e=D2Zmyc",
  },
  {
    title: "Fact Sheet ระยะที่ 1",
    file:
      "https://infracorpth-my.sharepoint.com/:f:/g/personal/pawarotorn_c_infra-corp_co/IgCJEI-bQke5QpQSXFWXaidtAfe2IcMw-Q-olYjjnTAcYIQ?e=PCly9n",
  },
  {
    title: "Definitive Conceptual Design",
    file:
      "https://infracorpth-my.sharepoint.com/:b:/g/personal/pawarotorn_c_infra-corp_co/IQB4TiiP68p6QpKLVE30M3tTAW0xWVkWOwBUOzQBESoSj-E?e=HMEKnx",
  },
  {
    title: "บทความที่ได้รับการตีพิมพ์",
    file:
      "https://infracorpth-my.sharepoint.com/:b:/g/personal/pawarotorn_c_infra-corp_co/IQBXCS6TAUTNSoNkVwGxjC61AfKqYNrmxfswb2xJEsxuELw?e=ywIhDS",
  },
];
</script>

<template>
  <div class="untree_co-hero" id="file-section">
    <div class="container">
      <div class="col-12">
        <div class="row align-items-center doc-layout">
          <div class="col-lg-7" data-aos="fade-right" data-aos-delay="1400">
            <div class="doc-visual-wrap">
              <div class="doc-visual-bg"></div>

              <div class="doc-image-main-card">
                <img :src="mainPhoto" alt="Main document preview" class="doc-image-main" />
              </div>

              <div class="doc-image-sub-card">
                <img :src="mainPhoto1" alt="Secondary document preview" class="doc-image-sub" />
              </div>
            </div>
          </div>

          <div class="col-lg-5">
            <div class="doc-header v1" data-aos="fade-up" data-aos-delay="0">
              <div>
                <h2 class="doc-main-title">เอกสารทั้งหมด</h2>
                <p class="doc-sub">คลิกเพื่อเปิดเอกสารในแท็บใหม่</p>
              </div>
            </div>

            <div class="doc-grid">
              <a
                v-for="(doc, index) in documents"
                :key="index"
                :href="doc.file"
                target="_blank"
                class="doc-card"
                data-aos="fade-left"
              >
                <div class="doc-icon">📄</div>

                <div class="doc-content">
                  <h3 class="doc-title">{{ doc.title }}</h3>
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
.doc-layout {
  row-gap: 40px;
}

.doc-visual-wrap {
  position: relative;
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0
}

.doc-visual-bg {
  /* position: absolute;
  inset: 40px 30px 70px 20px;
  border-radius: 32px;
  background: linear-gradient(135deg, #eff6ff 0%, #f8fbff 55%, #ffffff 100%);
  z-index: 0; */
}

.doc-image-main-card {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 400px;
  padding: 18px;
  border-radius: 28px;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 2px 24px rgba(37, 99, 235, 0.12);
    transform: translateX(-80px);
}

.doc-image-main {
  width: 100%;
  display: block;
  border-radius: 18px;
}

.doc-image-sub-card {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 3;
  width: 260px;
  padding: 12px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 2px 24px rgba(37, 99, 235, 0.12);
  transform: translateX(-50px);
}

.doc-image-sub {
  width: 100%;
  display: block;
  border-radius: 14px;
}

.doc-section {
  padding: 50px 0;
}

.doc-grid {
  display: grid;
  gap: 20px;
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

.doc-card:hover {
  transform: translateY(-4px);
  border-color: #93c5fd;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.1);
}

.doc-card:hover .doc-icon {
  transform: scale(1.05);
}

.doc-card:hover .doc-arrow {
  transform: translateX(4px);
}

.doc-card:active {
  transform: translateY(-1px) scale(0.99);
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
  transition: transform 0.2s ease;
}

.doc-content {
  flex: 1;
}

.doc-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0;
  transition: color 0.2s ease;
}

.doc-arrow {
  font-size: 18px;
  color: #2563eb;
  transition: transform 0.2s ease;
}

.doc-header.v1 {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.doc-main-title {
  color: #0f172a;
  margin-bottom: 5px;
}

.doc-sub {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

@media (max-width: 991px) {
  .doc-visual-wrap {
    min-height: auto;
    padding: 12px 0 24px;
  }

  .doc-visual-bg {
    inset: 20px 0 40px 0;
    border-radius: 24px;
  }

  .doc-image-main-card {
    max-width: 100%;
  }

  .doc-image-sub-card {
    width: 42%;
    right: 8px;
    bottom: -8px;
  }
}

@media (max-width: 767px) {
  .doc-visual-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .doc-image-main-card {
    max-width: 90%;
    transform: translateX(-20px); /* ลดระยะ */
  }

  .doc-image-sub-card {
    position: absolute; /* ✅ กลับมา absolute */
    width: 50%;
    right: 10px;
    bottom: -10px;
    transform: none; /* ล้างของเดิม */
  }
}

</style>