<template>
  <div class="grid" style="margin-top: 10px">
    <div class="flex items-center">
      <Dropdown
        v-model="selectedModel"
        :options="modelos"
        placeholder="Seleccionar Equipo"
        optionLabel="name"
        class="dropdown"
      />
      <MultiSelect
        v-model="selectedColumns"
        :options="opcionesAceites"
        optionLabel="label"
        placeholder="Seleccionar Muestra"
        :maxSelectedLabels="3"
        class="w-full md:w-20rem ml-2"
      >
        <template v-slot:option="optionProps">
          {{ optionProps.option.label }}
        </template>
        <template v-slot:footer>
          <button @click="applySelections" class="button-machine">
            Aplicar Selecciones
          </button>
        </template>
      </MultiSelect>
    </div>
    <DataTable
      classType="col-12 xl:col-12 card"
      :chancadoLine="chartData"
      title="Monitoreo de lubricantes"
      tooltipContent="Se grafica en base al valor a las muestras de lubricantes seleccionaddas por equipo y su respectiva fecha"
    />
  </div>
</template>

<script setup>
import DataTable from "../Componentes Globales/DataTableMonitoreo.vue";
import {
  getLubricantesFilters,
  getListadoEquiposAceites,
} from "@/service/CallAceites";
import { Store } from "@/store";
import { ref, computed, watch } from "vue";
import { filteredOptions } from "@/utils/hpgr/monitoreo.js";

const store = Store();
const date = computed(() => store.mainDate);
const modelos = ref([]);
const chartData = ref([]);
const aceitesData = ref(null);
const selectedModel = ref(null);
const opcionesAceites = ref(null);
const selectedColumns = ref([]);

const CreateSensorString = () => {
  const selectedValues = selectedColumns.value
    .map((item) => `${item.label}`)
    .join(", ");
  return selectedValues;
};

const applySelections = async () => {
  const selectedValues = CreateSensorString();
  await getData();
};

const setChartData = (sensorList) => {
  const selected = selectedColumns.value.map((item) => item.label);
  let dates = [];
  let lubricantesData = {};
  selected.forEach((lubricantes) => (lubricantesData[lubricantes] = []));

  const randomColor = () =>
    `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
  sensorList.forEach((item) => {
    dates.push(item.Fmuestra);
    selected.forEach((lubricantes) =>
      lubricantesData[lubricantes].push(parseFloat(item[lubricantes]))
    );
  });

  dates.sort((a, b) => {
    const [dayA, monthA, yearA] = a.split("-");
    const [dayB, monthB, yearB] = b.split("-");
    return yearA - yearB || monthA - monthB || dayA - dayB;
  });

  dates = dates.slice(0, 10);
  Object.keys(lubricantesData).forEach((lubricantes) => {
    lubricantesData[lubricantes] = lubricantesData[lubricantes].slice(0, 10);
  });

  const datasets = [];
  Object.keys(lubricantesData).forEach((lubricantes, index) => {
    datasets.push({
      label: lubricantes,
      data: lubricantesData[lubricantes],
      fill: false,
      borderColor: randomColor(),
      tension: 0.4,
    });
  });

  return {
    labels: dates,
    datasets: datasets,
  };
};

const setListadoEquipos = async () => {
  let listaEquipos = await getListadoEquiposAceites();

  if (listaEquipos.length > 0) {
    modelos.value = listaEquipos.map((equipo) => {
      return { name: equipo.Equipo, code: equipo.Equipo };
    });
    selectedModel.value = modelos.value[0];
  }
  await setDefaultData();
};

setListadoEquipos();

const setDefaultData = async () => {
  try {
    const start = date.value.toLocaleString("fr-CA").substring(0, 10);
    const aceites = await getLubricantesFilters(
      selectedModel.value.name,
      start
    );
    aceitesData.value = aceites;
    opcionesAceites.value = filteredOptions(aceites, selectedColumns.value);
    selectedColumns.value = [
      opcionesAceites.value[0],
      opcionesAceites.value[1],
    ];
    chartData.value = setChartData(aceitesData.value);
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

const getData = async () => {
  try {
    const start = date.value.toLocaleString("fr-CA").substring(0, 10);
    const aceites = await getLubricantesFilters(
      selectedModel.value.name,
      start
    );
    aceitesData.value = aceites;
    chartData.value = setChartData(aceitesData.value);
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

watch([date, selectedModel], async () => {
  await getData();
});
</script>

<style scoped>
.left-panel {
  margin-right: 20px; /* Ajusta el margen derecho según sea necesario */
  display: flex;
  align-items: center;
}
</style>
