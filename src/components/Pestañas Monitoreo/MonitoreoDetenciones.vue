<template>
  <div class="grid" style="margin-top: 10px">
    <Dropdown
      :modelos="modelos"
      v-model="selectedEquipo"
      @model-selected="handleModelSelected"
    />
    <div class="col-12 xl:col-12">
      <div class="grid">
        <div class="col-12 lg:col-6 xl:col-3">
          <PieChart
            :chartDataPie="chartDataTotalDetencion"
            title="Total detenciones diarias"
            tooltipContent="Se calcula y muestra la cantidad de detenciones al día y cuantas de ellas por mantención"
          />
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
          <PieChart
            :chartDataPie="chartDataMantenciones"
            title="Mantenciones programadas y no programadas"
            tooltipContent="Se realiza calculo y comparación de la cantidad de mantenciones programadas vs no programadas"
          />
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
          <PieChart
            :chartDataPie="chartDataHorasDetenidas"
            title="Total de horas detenidas"
            tooltipContent="Se calcula la cantidad de horas totales del día y se compara vs a las 24 hrs del día"
          />
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
          <PieChart
            :chartDataPie="chartDataDisponibilidad"
            title="Total de disponibilidad diaria"
            tooltipContent="Se realiza calculo para mostrar disponibilidad diaria en base a porcentaje"
          />
        </div>
      </div>
    </div>
  </div>
  <ChartsMonitoreo
    :chartData="chartDetencionBarraEquipos"
    title="Top 10 de detenciones por Equipo"
    toolTip="Muestreo para realizar top 10 de las detenciones totales (mantenciones, no programadas, otras detenciones)"
  />
</template>
<script setup>
import Dropdown from "../Componentes Globales/Dropdown.vue";
import PieChart from "../Componentes Globales/PieChart.vue";
import ChartsMonitoreo from "../Componentes Globales/ChartsMonitoreo.vue";
import {
  getDetencionesFilterDate,
  getDetencionesPorTag,
  getListadoEquiposDetenciones,
} from "../../service/CallDetenciones";
import { Store } from "@/store";
import { ref, computed, watch } from "vue";
import {
  setChartDataTotalMantencion,
  setMantencionesData,
  setHorasDetenidoData,
  setDisponibilidadDiaria,
  setChartBarraEquipos,
  formatDetencionesData,
} from "@/utils/hpgr/MonitoreoDetenciones";

// variables utilizadas
const store = Store();
const date = computed(() => store.mainDate);
const chartDataTotalDetencion = ref({});
const chartDataMantenciones = ref({});
const chartDataHorasDetenidas = ref({});
const chartDataDisponibilidad = ref({});
const chartDetencionBarraEquipos = ref({});
// const selectedEquipo = ref(null);
const modelos = ref([]);
const todasLasDetenciones = ref();
const selectedEquipo = ref(modelos.value[0] ? modelos.value[0].name : null);

function handleModelSelected(selectedModel) {
  selectedEquipo.value = selectedModel.value.name;
}

const getData = async () => {
  try {
    const start = "2020-01-01 00:00:00";
    const end = "2020-01-30 23:59:59";
    let listaEquipos = await getListadoEquiposDetenciones();
    const formattedEquipos = formatDetencionesData(listaEquipos);
    modelos.value = formattedEquipos;
    const allDetentions = await getDetencionesFilterDate(start, end);
    todasLasDetenciones.value = allDetentions;
    const detencion = await getDetencionesPorTag(
      selectedEquipo.value,
      date.value.toLocaleString("fr-CA").substring(0, 10)
    );
    chartDataTotalDetencion.value = setChartDataTotalMantencion(detencion);
    chartDataMantenciones.value = setMantencionesData(detencion);
    chartDataHorasDetenidas.value = setHorasDetenidoData(detencion);
    chartDataDisponibilidad.value = setDisponibilidadDiaria(detencion);
    chartDetencionBarraEquipos.value = setChartBarraEquipos(
      allDetentions,
      formattedEquipos
    );
  } catch (error) {
    console.error(error);
  }
};

watch(date, async () => {
  await getData();
});
getData();
</script>

<style scoped>
/* Estilos CSS para evitar que el texto se desborde en varias líneas */
.pie-chart-label {
  white-space: normal; /* Permite que el texto se divida en varias líneas */
  word-wrap: break-word; /* Divide las palabras largas en varias líneas si es necesario */
  max-width: 100%; /* Limita el ancho del texto al 100% del contenedor */
  overflow: hidden; /* Evita que el texto desborde del contenedor */
}
</style>
