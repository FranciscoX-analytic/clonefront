<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <img
        src="../public/images/logo_X-analityc.png"
        alt="logo_X-Analityc"
        width="250"
        height="250"
      />
      <p class="text-center">Usuario</p>
      <h6 class="text-center font-bold">Ingeníero de Confiabilidad</h6>
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <router-view />
      </div>
      <AppFooter />
    </div>

    <AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" />
    <transition name="layout-mask">
      <div
        class="layout-mask p-component-overlay"
        v-if="mobileMenuActive"
      ></div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUpdate } from "vue";
import AppTopBar from "./layout/AppTopbar.vue";
import AppMenu from "./layout/AppMenu.vue";
import AppConfig from "./layout/AppConfig.vue";
import AppFooter from "./layout/AppFooter.vue";
import { usePrimeVue } from "primevue/config";

const layoutMode = ref("static");
const staticMenuInactive = ref(false);
const overlayMenuActive = ref(false);
const mobileMenuActive = ref(false);
const menuClick = ref(false); // Agregar esta línea para definir la variable menuClick
const primevue = usePrimeVue();

const menu = [
  {
    label: "Home",
    items: [
      { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/dashboard" },
      {
        label: "Chancado HPGR",
        icon: "pi pi-fw pi-chart-bar",
        to: "/monitoreo-chancador",
      },
      {
        label: "Pala Cat 7495",
        icon: "pi pi-fw pi-chart-bar",
        to: "/pala-cat-7495",
      },
      // {label: 'Reportes', icon: 'pi pi-fw pi-folder-open', to: '/input'},
      // {label: "Alertas", icon: "pi pi-fw pi-bell", to: "/floatlabel"}
    ],
  },
  {
    label: "Fuente de datos",
    icon: "pi pi-fw pi-search",
    items: [
      {
        label: "Detenciones",
        icon: "pi pi-fw pi-database",
        items: [
          {
            label: "Detenciones",
            icon: "pi pi-fw pi-database",
            to: "/detenciones",
          },
        ],
      },
      {
        label: "Vibraciones",
        icon: "pi pi-fw pi-database",
        items: [
          {
            label: "Vibraciones",
            icon: "pi pi-fw pi-database",
            to: "/vibraciones",
          },
        ],
      },
      {
        label: "Sensores",
        icon: "pi pi-fw pi-database",
        items: [
          {
            label: "Sensores",
            icon: "pi pi-fw pi-database",
            to: "/sensores",
          },
        ],
      },
      {
        label: "Aceites",
        icon: "pi pi-fw pi-database",
        items: [
          {
            label: "Aceites",
            icon: "pi pi-fw pi-database",
            to: "/aceites",
          },
        ],
      },
    ],
  },
];

const onWrapperClick = () => {
  if (!menuClick.value) {
    overlayMenuActive.value = false;
    mobileMenuActive.value = false;
  }

  menuClick.value = false;
};

const onMenuToggle = () => {
  menuClick.value = true;
  console.log(isDesktop());
  if (isDesktop()) {
    console.log(layoutMode.value);
    if (layoutMode.value === "overlay") {
      console.log(mobileMenuActive.value);
      if (mobileMenuActive.value === true) {
        overlayMenuActive.value = true;
      }

      overlayMenuActive.value = !overlayMenuActive.value;
      mobileMenuActive.value = false;
    } else if (layoutMode.value === "static") {
      staticMenuInactive.value = !staticMenuInactive.value;
    }
  } else {
    mobileMenuActive.value = !mobileMenuActive.value;
  }
};

const onSidebarClick = () => {
  menuClick.value = true;
};

const onMenuItemClick = (event) => {
  if (event.item && !event.item.items) {
    overlayMenuActive.value = false;
    mobileMenuActive.value = false;
  }
};

const onLayoutChange = (newLayoutMode) => {
  layoutMode.value = newLayoutMode;
};

const addClass = (element, className) => {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += " " + className;
  }
};

const removeClass = (element, className) => {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(
      new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"),
      " "
    );
  }
};

const isDesktop = () => {
  return window.innerWidth >= 992;
};

const isSidebarVisible = () => {
  if (isDesktop()) {
    if (layoutMode.value === "static") {
      return !staticMenuInactive.value;
    } else if (layoutMode.value === "overlay") {
      return overlayMenuActive.value;
    }
  }

  return true;
};

const containerClass = computed(() => [
  "layout-wrapper",
  {
    "layout-overlay": layoutMode.value === "overlay",
    "layout-static": layoutMode.value === "static",
    "layout-static-sidebar-inactive":
      staticMenuInactive.value && layoutMode.value === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive.value && layoutMode.value === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive.value,
    "p-input-filled":
      primevue && primevue.value && primevue.value.inputStyle === "filled",
    "p-ripple-disabled":
      primevue && primevue.value && primevue.value.ripple === false,
  },
]);

onBeforeUpdate(() => {
  if (mobileMenuActive.value) {
    addClass(document.body, "body-overflow-hidden");
  } else {
    removeClass(document.body, "body-overflow-hidden");
  }
});
</script>

<style lang="scss">
@import "./App.scss";
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.layout-container {
  flex-grow: 1;
}

// .col-12 {
//   width: 100%;
// }

// .lg\:6 {
//   width: 50%;
// }

// .xl\:3 {
//   width: 25%;
// }
</style>
