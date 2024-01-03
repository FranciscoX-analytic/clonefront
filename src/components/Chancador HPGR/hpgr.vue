<template>
  <!-- InfoBanner -->
  <InfoBanner style="margin-bottom: 10px" :title="dashboardTitle" />

  <div class="pagePrintable p-col-12">
    <!-- Local Menu -->
    <div class="localMenu border">
      <!-- Botones para cambiar de pantalla -->
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
      <Button
        icon="pi pi-fw pi-calendar"
        :label="'Monitoreo de vibraciones'"
        :class="
          screen !== 'vibraciones' ? 'localMenuItem' : 'layout-config-button'
        "
        @click="setScreen('vibraciones')"
      />
      <Button
        icon="pi pi-fw pi-calendar"
        :label="'Análisis de aceites'"
        :class="screen !== 'aceites' ? 'localMenuItem' : 'layout-config-button'"
        @click="setScreen('aceites')"
      />
      <Button
        icon="pi pi-fw pi-calendar"
        :label="'Análisis de sensores'"
        :class="
          screen !== 'sensores' ? 'localMenuItem' : 'layout-config-button'
        "
        @click="setScreen('sensores')"
      />
      <Button
        icon="pi pi-fw pi-calendar"
        :label="'Análisis de detenciones'"
        :class="
          screen !== 'detenciones' ? 'localMenuItem' : 'layout-config-button'
        "
        @click="setScreen('detenciones')"
      />
      <Button
        icon="pi pi-fw pi-calendar"
        :label="'Resumen KPI HPGR'"
        :class="screen !== 'resumen' ? 'localMenuItem' : 'layout-config-button'"
        @click="setScreen('resumen')"
      />
    </div>
  </div>

  <!-- Contenido de las pantallas -->
  <Monitoreo v-if="screen == 'estado'" />
  <PrediccionFalla v-if="screen == 'prediccion'" />
  <MonitoreoVibraciones v-if="screen == 'vibraciones'" />
  <MonitoreoSensores v-if="screen == 'sensores'" />
  <MonitoreoAceites v-if="screen == 'aceites'" />
  <MonitoreoDetenciones v-if="screen == 'detenciones'" />
  <ResumenHpgr v-if="screen == 'resumen'" />
</template>

<script setup>
import InfoBanner from "../Componentes Globales/InfoBanner.vue";
import PrediccionFalla from "../Chancador HPGR/Monitoreo/PrediccionFalla.vue";
import Monitoreo from "../Chancador HPGR/Monitoreo/MonitoreoChancador.vue";
import MonitoreoVibraciones from "../Pestañas Monitoreo/MonitoreoVibraciones.vue";
import MonitoreoSensores from "../Pestañas Monitoreo/MonitoreoSensores.vue";
import MonitoreoAceites from "../Pestañas Monitoreo/MonitoreoAceites.vue";
import MonitoreoDetenciones from "../Pestañas Monitoreo/MonitoreoDetenciones.vue";
import ResumenHpgr from "./Monitoreo/ResumenHpgr.vue";
import { ref } from "vue";

// Título del dashboard
const dashboardTitle = "Chancador HPGR";

// Estado de la pantalla actual
let screen = ref("estado");

// Función para cambiar la pantalla
const setScreen = (screenName) => {
  screen.value = screenName;
};
</script>

<style scoped>
/* Estilos para los botones de navegación */
.localMenuItem {
  background: transparent;
  margin-right: 4px;
  color: var(--text-color);
}
.layout-config-button {
  margin-right: 4px;
}
</style>
