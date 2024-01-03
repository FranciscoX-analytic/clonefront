<template>
  <InfoBanner style="margin-bottom: 10px" :title="dashboardTitle" />

  <div class="pagePrintable p-col-12">
    <div class="localMenu border">
      <Button
        icon="pi pi-fw pi-home"
        :label="'Monitoreo de activos'"
        :class="screen !== 'estado' ? 'localMenuItem' : 'layout-config-button'"
        @click="setScreen('estado')"
      />
      <Button
        icon="pi pi-fw pi-calendar"
        :label="'Predicción de falla'"
        :class="
          screen !== 'prediccion' ? 'localMenuItem' : 'layout-config-button'
        "
        @click="setScreen('prediccion')"
      />
      <Button
        icon="pi pi-fw pi-calendar"
        :label="'Análisis de confiabilidad'"
        :class="
          screen !== 'confiabilidad' ? 'localMenuItem' : 'layout-config-button'
        "
        @click="setScreen('confiabilidad')"
      />
    </div>
  </div>

  <MonitoreoPala v-if="screen == 'estado'" />
  <PrediccionFalla v-if="screen == 'prediccion'" />
</template>

<script setup>
import { ref } from "vue";
import InfoBanner from "../Componentes Globales/InfoBanner.vue";
import MonitoreoPala from "@/components/PalaCat7495/PrediccionFalla/MonitoreoPala.vue";
import PrediccionFalla from "@/components/PalaCat7495/PrediccionFalla/PrediccionFalla.vue";

const dashboardTitle = "PALA CAT 7495";
let screen = ref("estado");

const setScreen = (screenName) => {
  screen.value = screenName;
};
</script>

<style scoped>
.localMenuItem {
  background: transparent;
  margin-right: 4px;
  color: var(--text-color);
}
.layout-config-button {
  margin-right: 4px;
}
</style>
