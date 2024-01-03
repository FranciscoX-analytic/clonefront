<template>
  <!-- Componente InfoBanner para mostrar información general -->
  <InfoBanner
    style="margin-bottom: 10px;"
    :title="dashboardTitle"
    :location="dashboardLocation"
    :weather="dashboardWeather"
    :temperature="dashboardTemperature.toString()"
  />

  <!-- Grid para colocar las tarjetas y las imágenes -->
  <div class="grid">
    <!-- Tarjetas personalizadas -->
    <IndicadoresKpi :data="card1" classType="col-12 xl:col-4" />
    <IndicadoresKpi :data="card2" classType="col-12 xl:col-4" />
    <IndicadoresKpi :data="card3" classType="col-12 xl:col-4" />

    <!-- Imágenes en tarjetas -->
    <CardImages classType="col-12 xl:col-6" :imageSrc="firstImageSrc" style="align-items: center;" />
    <CardImages classType="col-12 xl:col-6" :imageSrc="firstImageSrc" />
    <CardImages classType="col-12 xl:col-6" :imageSrc="firstImageSrc" />
    <CardImages classType="col-12 xl:col-6" :imageSrc="firstImageSrc" />
  </div>
</template>

<script setup>
import IndicadoresKpi from './Componentes Globales/IndicadoresKpi.vue';
import InfoBanner from './Componentes Globales/InfoBanner.vue';
import CardImages from './Componentes Globales/CardImages.vue';
import FirstImage from '../../public/layout/images/Image4670.png';

// Datos del banner superior
const firstImageSrc = FirstImage;
const dashboardTitle = 'DASHBOARD';
const dashboardLocation = 'Antofagasta';
const dashboardWeather = 'Despejado';
const dashboardTemperature = 18;

// Función para determinar el color de las tarjetas según un valor
const setColor = (value) => {
  let color = 1;
  if (value >= 50 && value < 80) color = 2;
  if (value > 80) color = 3;
  return color;
};

// Datos de las tarjetas personalizadas
const card1 = {
  title: 'KPI',
  value: '6,452',
  percentage: 5.39,
  color: setColor(5.39),
};

const card2 = {
  title: 'KPI',
  value: '42,502',
  percentage: 0.65,
  color: setColor(0.65),
};

const card3 = {
  title: 'KPI',
  value: '56,201',
  percentage: 2.29,
  color: setColor(81),
};
</script>

<style scoped>
/* Estilos generales */

.flex {
  display: flex;
  flex-wrap: wrap;
}

/* Estilos para los botones de máquinas */
.button-machine {
  width: 135px;
  height: 36px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter;
  font-size: 14px;
  line-height: 22px;
  color: #ffffffff;
  background: #6f3ed1ff;
  opacity: 1;
  border: none;
  border-radius: 4px;
}

/* Estilos de hover para los botones de máquinas */
.button-machine:hover {
  color: #ffffffff;
  background: #582ab4ff;
}
</style>
