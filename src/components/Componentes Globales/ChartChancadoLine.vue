<template>
    <!-- Contenedor del gráfico de línea -->
    <Chart type="line" :data="props.chancadoLine" :options="chartOptions" class="h-10rem" />
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import { configuracionGeneral } from '../../data/config'
  
  const props = defineProps({
    chancadoLine: {
      type: Object,
      required: true
    },
    titleLine: {
      type: String,
      require: true
    }
  })
  
  // Colores y opciones del gráfico
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
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
   
    }
  };
  </script>
  
  <style scoped>
  /* Estilos CSS personalizados */
  
  /* Estilo para el contenedor del gráfico */
  .card {
    margin-top: 10px;
    width: 100%;
  }
  
  /* Estilo para el botón desplegable (si corresponde) */
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
  </style>
  