<script setup>
const copyrightText = "Copyright 2023, All rights reserved.";
const column4Heading = "ติดต่อ";
const connectHeading = "Connect";

const socialItems = [
  {
    link: "https://www.instagram.com/",
    icon: "icon-instagram",
  },
  {
    link: "https://www.twitter.com/",
    icon: "icon-twitter",
  },
  {
    link: "https://www.facebook.com/",
    icon: "icon-facebook",
  },
  {
    link: "https://www.linkedin.com/",
    icon: "icon-linkedin",
  },
  {
    link: "https://www.pinterest.com/",
    icon: "icon-pinterest",
  },
];

const contactInfo = {
    address: 'กรมทางหลวงชนบท เลขที่ 9 ถ.พหลโยธิน แขวงอนุเสาวรีย์ เขตบางเขน กรุงเทพฯ 10220',
    phone1: '02-551-5000',
    phone2: '02-551-5896',
    email: 'Saraban@drr.go.th',
    tel: '1146'
}

const mapEmbedUrl ="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.6227715366254!2d100.58537387509227!3d13.861667786541755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29d34adca1eb5%3A0xeb6113d5c5d9fca4!2sDepartment%20of%20Rural%20Roads!5e0!3m2!1sen!2sth!4v1774939432555!5m2!1sen!2sth";
</script>

<template>
  <div class="site-footer">
    <div class="footer-main-layout">
      <!-- LEFT : MAP -->
      <div class="footer-map-col">
        <div class="widget footer-map-widget">
          <div class="footer-map-wrap">
            <iframe
              :src="mapEmbedUrl"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <!-- RIGHT : DETAIL -->
      <div class="footer-detail-col">
        <div class="widget">
          <h3>{{ column4Heading }}</h3>

          <address class="footer-address">
            {{ contactInfo.address }}
          </address>

          <ul class="list-unstyled links mb-4 footer-contact-list">
            <li v-if="contactInfo.lat">lat : {{ contactInfo.lat }}</li>
            <li v-if="contactInfo.lng">lng : {{ contactInfo.lng }}</li>
            <li v-if="contactInfo.phone1">โทรศัพท์ : {{ contactInfo.phone1 }}</li>
            <li v-if="contactInfo.phone2">โทรสาร : {{ contactInfo.phone2 }}</li>
            <li v-if="contactInfo.email">อีเมล : {{ contactInfo.email }}</li>
            <li v-if="contactInfo.tel">สายด่วน : {{ contactInfo.tel }}</li>
          </ul>
        </div>

        <div class="widget">
          <h3>{{ connectHeading }}</h3>
          <ul class="list-unstyled social">
            <li style="margin-right: 4px">
              <a :href="socialItems[0].link">
                <span :class="socialItems[0].icon"></span>
              </a>
            </li>
            <li style="margin-right: 4px">
              <a :href="socialItems[1].link">
                <span :class="socialItems[1].icon"></span>
              </a>
            </li>
            <li style="margin-right: 4px">
              <a :href="socialItems[2].link">
                <span :class="socialItems[2].icon"></span>
              </a>
            </li>
            <li style="margin-right: 4px">
              <a :href="socialItems[3].link">
                <span :class="socialItems[3].icon"></span>
              </a>
            </li>
            <li>
              <a :href="socialItems[4].link">
                <span :class="socialItems[4].icon"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-copyright">
      <p>{{ copyrightText }}</p>
    </div>
  </div>
</template>

<style scoped>
.site-footer{
  padding-top: 60px;
  padding-bottom: 30px;
}

.footer-main-layout {
  display: flex;
  align-items: stretch;
  gap: 0;
  max-width: auto;
  margin-top: 0;
  margin-left: 20px;
  margin-right: 20px;
  padding: 0 20px;
}

.footer-map-col {
  flex: 7;
  display: flex;
  padding-right: 16px;
}

.footer-detail-col {
  flex: 3;
  padding-left: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.footer-map-widget {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
}

.footer-map-wrap {
  width: 100%;
  min-height: 420px;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
}

.footer-map-wrap iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  flex: 1;
}

.footer-address {
  margin-bottom: 12px;
  line-height: 1.8;
}

.footer-contact-list li {
  margin-bottom: 4px;
  line-height: 1.8;
}

.footer-copyright {
  text-align: center;
  margin-top: 24px;
}

.footer-copyright p {
  margin: 0;
}

@media (max-width: 991px) {
  .footer-main-layout {
    flex-direction: column;
    padding: 0 20px;
  }

  .footer-map-col,
  .footer-detail-col {
    width: 100%;
    padding: 0;
  }

  .footer-detail-col {
    padding-top: 24px;
  }

  .footer-map-wrap {
    min-height: 280px;
  }

  .footer-copyright {
    margin-top: 32px;
    padding: 0 20px;
  }
}
</style>