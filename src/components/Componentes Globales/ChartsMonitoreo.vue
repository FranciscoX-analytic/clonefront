<template>
  <!-- Contenedor del componente de gráfico -->
  <div class="card">
    <!-- Encabezado del gráfico con título y tooltip -->
    <div class="flex justify-around items-center">
      <p class="text">
        {{ props.title }}
        <!-- Tooltip informativo -->
        <i v-tooltip="toolTip" class="pi pi-info-circle"></i>
      </p>
    </div>
    <!-- Componente de gráfico -->
    <Chart
      type="bar"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { configuracionGeneral } from '../../data/config';


// Propiedades pasadas al componente
const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  toolTip:{
    type: String,
    required: true
  }
});

// Configuración de colores y opciones del gráfico
const textColor = configuracionGeneral.colorText;
const textColorSecondary = 'azul';
const surfaceBorder = configuracionGeneral.colorPrimario;
const chartOptions = {
  maintainAspectRatio: false,
  aspectRatio: 0.8,
  plugins: {
    tooltip: {
      mode: 'index',
      intersect: false,
      callbacks: {
        title: function (tooltipItems) {
          return tooltipItems[0].label;
        },
        label: function (tooltipItem) {
          const dataset = tooltipItem.chart.data.datasets[tooltipItem.datasetIndex];
          const dataPoint = dataset.data[tooltipItem.dataIndex];
          const date = tooltipItem.chart.data.labels[tooltipItem.dataIndex];
          return `Equipo: ${date}, Horas: ${dataPoint} hrs`;
        },
      },
    },
    legend: {
      labels: {
        color: textColor,
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        color: textColorSecondary,
      },
      grid: {
        color: surfaceBorder,
      },
    },
    y: {
      stacked: true,
      ticks: {
        color: textColorSecondary,
      },
      grid: {
        color: surfaceBorder,
      },
    },
  },
};
</script>

<style scoped>
/* Estilos CSS específicos del componente */
.card {
  margin-top: 10px;
  width: 100%;
}

.dropdown {
  position: relative;
  opacity: 1;
  width: 189px;
  height: 25px;
  font-family: var(--font-family);
  font-size: 12px;
  color: #8353e2ff;
  background: #f5f2fdff;
  border-radius: 6px;
  border-width: 0px;
  outline: none;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.text {
  font-family: var(--font-family);
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  color: var(--text-color);
}
</style>
