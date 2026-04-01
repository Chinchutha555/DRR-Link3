<script setup>
const service1SubHeading = "Mobile Mapping System";
const service1Title = "ระบบ MMS (Mobile Mapping System)";
</script>
<template>
  <div class="untree_co-section" id="features-section" data-aos="fade-up"
    data-aos-duration="800">
    <div class="container">
<div class="row d-flex align-items-center justify-content-between">
  
  <div
    class="col-lg-6 d-flex justify-content-center align-items-center order-lg-1"
    data-aos="fade-up"
    data-aos-delay="400"
  >
    <img
      src="../assets/images/01.jpg"
      alt="Image"
      class="img-fluid feature-image"
    />
  </div>

  <div class="col-lg-6 order-lg-2">
  <div class="feature-label">{{ service1SubHeading }}</div>

          <h3 class="heading feature-title">
            {{ service1Title }}
          </h3>
    <div class="mb-4" data-aos="fade-up" data-aos-delay="200">
      <p>
      ระบบ MMS (Mobile Mapping System) หรือระบบจัดทำแผนที่แบบเคลื่อนที่ ในยุคใหม่นี้ มีขนาดที่เล็กลง มีความสะดวกรวดเร็วในการสำรวจข้อมูลภาคสนาม ประกอบกับเทคโนโลยีการถ่ายภาพหรือกล้องดิจิตอล แบบ 360 องศาที่ความละเอียดสูงขึ้นพร้อมทั้งระบบระบุพิกัดจากดาวเทียม GNSS ซึ่งจะได้ข้อมูลภาพพาโนรามา 360 องศา พร้อมกับตำแหน่งพิกัด ทางภูมิศาสตร์อีกทั้งยังสามารถวัดขนาดและระยะทางของวัตถุต่าง ๆ ทำการจัดเก็บข้อมูล และประมวลผลลัพธ์ข้อมูลส่งออกเป็นไฟล์ ที่สามารถดูในซอฟต์แวร์รหัสเปิด (Open-source) เช่น QGIS ได้ ทำให้สามารถนำไปใช้งานด้านต่าง ๆ ที่ต้องการใช้งานพิกัดภูมิสารสนเทศที่เกี่ยวข้องได้อีกมากมาย อาทิเช่น ระบบ การนำไปใช้ในงานด้าน การสำรวจสภาพถนน สิ่งปลูกสร้าง การป้องกันภัยพิบัติ กรณีที่เกิดความเสียหายจากภัยพิบัติบนถนน และยังสามารถนำไปใช้ในส่วนการทำแผนที่ การออกแบบเส้นทาง การผังเมือง และด้านอื่น ๆ ในส่วนของการจัดเก็บ การใช้ประโยชน์ที่ดิน
        
      </p>
    </div>
  </div>

</div>
    </div>
  </div>
</template>

<style scope>
.feature-label {
  display: inline-block;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.08);
  padding: 8px 14px;
  border-radius: 999px;
}

.feature-image {
  width: 100%;
  max-width: 460px;

  border-radius: 16px;

  background: transparent;
  padding: 0;

  border: 1px solid rgba(0, 0, 0, 0.05);

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);

  display: block;
}

</style>
