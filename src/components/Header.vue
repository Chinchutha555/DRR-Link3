<script setup>
import { themeColor, siteName } from "../data/items";
import logo from "../assets/images/logo_DRR.svg";
</script>
<template>
  <nav class="site-nav dark js-site-navbar mb-5 site-navbar-target">
    <div class="container">
      <div class="site-navigation">
        <a href="" class="logo m-0 float-left"
          >
          <img :src="logo" alt="Image" class="h-10 w-auto" />
          </a>
  
        <ul class="js-clone-nav d-none d-lg-inline-block site-menu float-left ml-8">
          <li class="active">
            <a href="#home-section" class="nav-link">หน้าแรก</a>
          </li>
          <!-- <li class="has-children">
            <a href="#" class="nav-link">Dropdown</a>
            <ul class="dropdown">
              <li>
                <a href="#testimonials-section" class="nav-link"
                  >Testimonials</a
                >
              </li>
              <li><a href="#" class="nav-link">Menu Two</a></li>
              <li><a href="#" class="nav-link">Menu Three</a></li>
            </ul>
          </li> -->
          <li><a href="#features-section" class="nav-link">ที่มาและความสำคัญ</a></li>
           <li><a href="#objective-section" class="nav-link">วัตถุประสงค์</a></li>
          <li><a href="#pricing-section" class="nav-link">ความคืบหน้าโครงการ</a></li>
          <li><a href="#result-section" class="nav-link">ผลการศึกษา</a></li>
          <li><a href="#status-section" class="nav-link">สถานะการดำเนินงาน</a></li>
          <li><a href="#file-section" class="nav-link">เอกสาร</a></li>
          <li><a href="#new-section" class="nav-link">ข่าวประชาสัมพันธ์</a></li>
          <li><a href="#contact-section" class="nav-link">ติดต่อ</a></li>
        </ul>
        <!-- <ul
          class="js-clone-nav d-none mt-1 d-lg-inline-block site-menu float-right"
        >
          <li class="cta-button-outline" style="margin-right: 5px;"><a href="#">Sign in</a></li>
          <li class="cta-primary">
            <a href="#" :style="[{ backgroundColor: themeColor }]">Register</a>
          </li>
        </ul> -->
        <a
          href="#"
          class="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block dark d-lg-none"
          data-toggle="collapse"
          data-target="#main-navbar"
        >
          <span></span>
        </a>
      </div>
    </div>
  </nav>
</template>
