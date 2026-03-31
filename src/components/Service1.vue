<script setup>
const service1Heading = "บทบาทของโครงข่ายถนนระดับที่ 3";
const service1SubHeading = "ที่มาและความสำคัญ";
const service1Quote =
  '"Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia."';
const personName = "James Anderson";
const designation = "Facebook, Product Lead";
function youtubeVideoUrl() {
  const youtubeVideoId = "FzRH7y3LbQE";
  return `https://www.youtube.com/watch?v=${youtubeVideoId}&amp;t=9s`;
}
</script>
<template>
  <div class="untree_co-section" id="features-section">
    <div class="container">
      <div class="row d-flex align-items-center justify-content-between">
        <!-- เพิ่ม d-flex เพื่อใช้ flexbox -->
        <div class="col-lg-6">
          <h3 class="heading mb-4" data-aos="fade-up" data-aos-delay="100">
            {{ service1SubHeading }}
          </h3>
          <div class="mb-4" data-aos="fade-up" data-aos-delay="200">
            <p>
              ในปีงบประมาณ พ.ศ. 2566 กรมทางหลวงชนบท
              ได้ดำเนินการศึกษาวิเคราะห์เพื่อจัดลำดับชั้นโครงข่ายถนนทั่วประเทศ
              โดยประยุกต์ใช้หลักการ Link and Place
              เพื่อกำหนดบทบาทและความสำคัญของสายทางอย่างเป็นระบบ
            </p>
            <p style="margin-bottom: 30px">
              ผลการศึกษาพบว่า โครงข่ายถนนของประเทศไทยสามารถจำแนกออกเป็น 5 ระดับ
              โดยเฉพาะ โครงข่ายถนนระดับที่ 3 ซึ่งมีความสำคัญอย่างยิ่งในฐานะ
              “โครงข่ายสายรองที่เชื่อมโยงพื้นที่สำคัญในระดับจังหวัด”
            </p>
            <hr />
            <br />
            <span
              class="caption mb-4"
              data-aos="fade-up"
              data-aos-delay="0"
              :style="[{ color: themeColor }]"
              style="font-size: 20px"
              >{{ service1Heading }}</span
            >
            <ul class="list-unstyled ul-check primary text-black">
              <li>
                ด้านโลจิสติกส์ :
                รองรับการขนส่งสินค้าและเชื่อมโยงโครงข่ายเศรษฐกิจ
              </li>
              <li>
                ด้านการท่องเที่ยว :
                เพิ่มการเข้าถึงแหล่งท่องเที่ยวและกระจายรายได้สู่ท้องถิ่น
              </li>
              <li>
                ด้านเศรษฐกิจชุมชน : ส่งเสริมการค้า การลงทุน
                และกิจกรรมทางเศรษฐกิจในพื้นที่
              </li>
              <li>
                ด้านการเชื่อมโยงระบบคมนาคม : บูรณาการกับระบบขนส่งรูปแบบอื่น
                (Multimodal Transport)
              </li>
            </ul>
          </div>
        </div>

        <div
          class="col-lg-6 d-flex justify-content-center align-items-center"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <img
            src="../assets/images/meeting.jpg"
            alt="Image"
            class="img-fluid feature-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scope>
.feature-image {
  width: 100%;
  max-width: 480px;

  border-radius: 24px;
  padding: 14px;
  background: #ffffff;

  border: 1px solid rgba(148, 163, 184, 0.18);

  box-shadow:
    0 10px 25px rgba(15, 23, 42, 0.08),
    0 24px 50px rgba(37, 99, 235, 0.08);

  display: block;
}

/* hover subtle แบบเดียวกับ card */
.feature-image:hover {
  transform: translateY(-2px);
  box-shadow:
    0 14px 30px rgba(15, 23, 42, 0.12),
    0 30px 60px rgba(37, 99, 235, 0.12);
  transition: 0.25s ease;
}

.col-lg-6:last-child {
  padding-right: 0;
}
</style>
