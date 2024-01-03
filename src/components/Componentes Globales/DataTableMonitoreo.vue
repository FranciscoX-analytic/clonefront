<template>
    <div :class="props.classType">
      <div class="chart-container">
        <h6 class="chart-title" v-tooltip="tooltipContent">
          {{ title }}
          <i class="pi pi-info-circle" style="font-size: 0.8rem;"></i> <!-- Agregar el ícono y ajustar el tamaño -->
        </h6>
        <Chart
        type="line"
        :data="props.chancadoLine"
        :options="chartOptions"
        class="h-30rem"
        style="width: 100%;"
        
      />
      </div>
      
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import { configuracionGeneral } from '../../data/config';
  
  const props = defineProps({
    classType: {
      type: String,
      required: true,
    },
    chancadoLine: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tooltipContent:{
      type: String,
      required: true
    }
  });
  
  const textColor = configuracionGeneral.colorText;
  const textColorSecondary = configuracionGeneral.colorText;
  const surfaceBorder = configuracionGeneral.colorPrimario;
  const chartOptions = {
    stacked: false,
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
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
  /* Dropdown button 60 */
  .dropdown {
    position: relative;
    opacity: 1;
    width: 189px;
    height: 25px;
    font-family: Inter;
    font-size: 12px;
    color: #8353E2FF;
    background: #F5F2FDFF;
    border-radius: 6px;
    border-width: 0px;
    outline: none;
  }
  .chart-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: flex-start;
  }
  
  .chart-title {
    font-size: 1.5rem; /* Tamaño fijo para el título */
    margin-bottom: 0.5rem; /* Ajusta según tus preferencias */
    white-space: nowrap; /* Evita que el título se desborde si es demasiado largo */
    overflow: hidden; /* Oculta el texto que desborda */
    text-overflow: ellipsis; /* Agrega puntos suspensivos al texto que desborda */
  }
  </style>
