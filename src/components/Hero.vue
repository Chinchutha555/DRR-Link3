<script setup>
import mainPhoto from "../assets/images/hero.svg";

const heroHeading =
  "โครงการศึกษาและจัดทำแผนแม่บทการพัฒนาโครงข่ายสายรองที่สำคัญ";
const buttonSeeFeature = "See Features";
const buttonPricing = "Pricing";
</script>

<template>
  <div class="untree_co-hero" id="#home-section" style="padding-bottom: 0">
    <div class="container">
      <div class="row align-items-center" style="padding-bottom: 0">
        <div class="col-12">
          <div class="dots"></div>
          <div class="row align-items-center">
            <div
              class="col-lg-7 ml-auto order-lg-2"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <img :src="mainPhoto" alt="Image" class="img-fluid" />
            </div>
            <div class="col-lg-5">
              <h1
                class="heading leading-loose"
                data-aos="fade-up"
                data-aos-delay="0"
                style="font-size: 41px"
              >
                <p style="margin-bottom: 10px">โครงการศึกษาและจัดทำ</p>
                <p style="margin-bottom: 10px">แผนแม่บทการพัฒนา</p>
                <p style="margin-bottom: 10px">โครงข่ายสายรองที่สำคัญ</p>
              </h1>
              <div class="excerpt" data-aos="fade-up" data-aos-delay="100">
                <p>
                  ยกระดับโครงข่ายถนนระดับประเทศ ด้วยการวิเคราะห์ตามหลัก
                  <span
                    style="
                      background-color: rgba(64, 123, 255, 0.07);
                      color: #407bff;
                    "
                    ><br>Link and Place</span
                  >
                  มุ่งเน้นการพัฒนา โครงข่ายถนนระดับที่ 3
                  ซึ่งเป็นเส้นทางเชื่อมโยงเมือง แหล่งเศรษฐกิจ การท่องเที่ยว
                  และระบบขนส่งหลักภายในจังหวัด
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pricing:hover {
  color: #fff !important;
}
</style>
