<template>
  <div :class="classType">
    <div class="card flex justify-content-center">
      <div class="chart-container">
        <h6 class="chart-title" v-tooltip="tooltipContent">
          {{ title }}
          <i class="pi pi-info-circle" style="font-size: 0.8rem;"></i> <!-- Agregar el ícono y ajustar el tamaño -->
        </h6>
        <Chart type="pie" :data="chartDataPie" :options="chartOptions" class="w-full md:w-17rem" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: flex-start;
}

.chart-title {
  font-size: 1.1rem; /* Tamaño fijo para el título */
  margin-bottom: 0.5rem; /* Ajusta según tus preferencias */
  overflow: hidden; /* Oculta el texto que desborda */
  text-overflow: ellipsis; /* Agrega puntos suspensivos al texto que desborda */
}
</style>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  chartDataPie: {
    type: Object,
    required: true,
  },
  classType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  tooltipContent: {
    type: String,
    required: true // Asegúrate de proporcionar el contenido del tooltip desde el componente padre
  }
});

const chartOptions = ref({
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  },
});
</script>