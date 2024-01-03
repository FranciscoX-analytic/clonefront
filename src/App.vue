<template>
  <PaginaPrincial />
</template>

<script setup>
import PaginaPrincial from "./PaginaPrincipal.vue";
import { Store } from "@/store";
import { ref, onMounted, onBeforeUnmount } from "vue";

const store = Store();
const windowWidth = ref(store.windowWidth);

const onResize = () => {
  windowWidth.value = window.innerWidth;
  store.setWindowWidth(window.innerWidth);
};

onMounted(() => {
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<style scoped></style>
