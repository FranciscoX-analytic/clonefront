<template>
  <div class="layout-topbar">
    <router-link to="/dashboard" class="layout-topbar-logo">
      <img alt="Logo" src="../../public/images/logo_X-analityc.png" />
      <span>X-Analityc</span>
    </router-link>
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      :class="{ hidden: isHidden, scalein: enterActive, fadeout: leaveActive }"
      @click="toggleMenu"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <div class="flex justify-content-center">
          <Calendar
            v-model="date"
            showButtonBar
            @date-select="
              () => {
                setCalendar(date);
              }
            "
          />
        </div>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-calendar"></i>
          <span>Events</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-user"></i>
          <span>Profile</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from "vue";
import { Store } from "@/store";

const store = Store();
const date = ref(store.mainDate.toLocaleString("en-GB").substring(0, 10));
const isHidden = ref(true);
const enterActive = ref(false);
const leaveActive = ref(false);

const emit = defineEmits(["menu-toggle"]);

const onMenuToggle = (event) => {
  console.log("menu-toggle");
  emit("menu-toggle", event);
};

const toggleMenu = () => {
  isHidden.value = !isHidden.value;
  enterActive.value = !enterActive.value;
  leaveActive.value = !leaveActive.value;
  console.log(isHidden.value);
};

const logoSrc = computed(() => {
  return "images/logo-dark.svg";
});

const setCalendar = () => {
  store.setMainDate(date.value);
};
</script>

<style scoped></style>
