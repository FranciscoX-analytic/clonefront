<template>
  <div>
    <div class="grid">
      <!-- Custom Cards -->
      <IndicadoresKpi :data="card1" classType="col-12 md:col-4" />
      <IndicadoresKpi :data="card2" classType="col-12 md:col-4" />
      <IndicadoresKpi :data="card3" classType="col-12 md:col-4" />

      <!-- Card Images -->
      <CardImages
        classType="col-12 xl:col-4 lg:col-6"
        :imageSrc="firstImageSrc"
      />

      <!-- Monitoreo Table -->
      <MonitoreoTable
        v-if="monitoreo"
        :tableData="monitoreo"
        classType="col-12 xl:col-8 lg:col-6"
        sistemas="Sistemas"
        alerta="Estado"
        nivel="Nivel de Anomalía"
      />

      <ChartsMonitoreo
        v-if="monitoreoData"
        :chartData="monitoreoData"
        title="Tendencia de Probabilidad de falla"
        toolTip="Muestra la tendencia de la probabilidad de falla para la fecha seleccionada"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import IndicadoresKpi from "../../Componentes Globales/IndicadoresKpi.vue";
import CardImages from "../../Componentes Globales/CardImages.vue";
import ChartsMonitoreo from "../../Componentes Globales/ChartsMonitoreo.vue";
import MonitoreoTable from "../../Componentes Globales/MonitoreoTable.vue";
import { rankingAnomaliaPala } from "@/service/CallApiRangingAnomaly";
import { monitoreoTableData } from "@/service/CallApiMonitoreoTableData";
import FirstImage from "../../../../public/layout/images/Image4670.png";

const firstImageSrc = FirstImage;
const monitoreo = ref(null);
const monitoreoData = ref(null);

// Función para establecer el color de las tarjetas según el valor
const setColor = (value) => {
  let color = 1;
  if (value >= 50 && value < 80) color = 2;
  if (value > 80) color = 3;

  return color;
};

// Datos de las tres tarjetas personalizadas
const card1 = {
  title: "KPI Disponibilidad diaria",
  value: "92.3%",
  percentage: 5,
  span: "Respecto al promedio mensual",
  color: setColor(5.39),
};

const card2 = {
  title: "KPI tpd",
  value: "42,502",
  percentage: 20,
  span: "Respecto al promedio anterior",
  color: setColor(0.65),
};

const card3 = {
  title: "KPI OT cerradas",
  value: "4/11",
  percentage: 30,
  color: setColor(81),
};

// Función para cargar los datos cuando se monta el componente
onMounted(async () => {
  try {
    const response = await rankingAnomaliaPala();
    monitoreo.value = response;
    const response1 = await monitoreoTableData();
    monitoreoData.value = response1;
    console.log(response1);
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
/* Agrega aquí tus estilos CSS si es necesario */
</style>
