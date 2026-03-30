<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Header from "./components/Header.vue";
import Hero from "./components/Hero.vue";
import Service1 from "./components/Service1.vue";
import Service2 from "./components/Service2.vue";
import Feature from "./components/Feature.vue";
import Pricing from "./components/Pricing.vue";
import Advantage from "./components/Advantage.vue";
import Testimonial from "./components/New.vue";
import About from "./components/About.vue";
import Blog from "./components/New_all.vue";
import Contact from "./components/Contact.vue";
import Footer from "./components/Footer.vue";
import Customer from "./components/Customer.vue";
import banner from "./components/Content.vue";
import Dashboard from "./components/Dashboard.vue";
import Status from "./components/Status.vue";
import File from "./components/File.vue";

const showButton = ref(false);

const handleScroll = () => {
  showButton.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <Header />
  <Banner />
  <Hero />
  <Testimonial />
  <Service1 />
  <Feature />
  <Dashboard />
  <Service2 />
  <Status />
  <File/>
  <!-- <Map/> -->
  <!-- <Pricing /> -->
  <!-- <Advantage /> -->
  <!-- <banner /> -->
  <!-- <Testimonial /> -->
  <!-- <Customer /> -->
  <!-- <About /> -->
  <Blog />
  <Contact />
  <Footer />

  <h1></h1>

  <Transition name="zoom-btn">
    <button
      v-if="showButton"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-blue-500 text-white shadow-xl/20 shadow-blue-400 hover:bg-blue-600 transition"
      style="border-radius: 15px"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
        />
      </svg>
    </button>
  </Transition>
</template>

<style>
.zoom-btn-enter-active,
.zoom-btn-leave-active {
  transition: all 0.35s ease;
}

.zoom-btn-enter-from,
.zoom-btn-leave-to {
  opacity: 0;
  transform: scale(0.4);
}

.zoom-btn-enter-to,
.zoom-btn-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
