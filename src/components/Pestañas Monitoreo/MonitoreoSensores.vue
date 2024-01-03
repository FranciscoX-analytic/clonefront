<template>
  <div class="grid" style="margin-top: 10px;">
    <div class="flex items-center mb-4">
      <!-- Multiselect para seleccionar sensores -->
      <MultiSelect
        v-model="selectedSensor"
        :options="filteredOptions"
        optionLabel="label"
        placeholder="Seleccionar Sensor"
        :maxSelectedLabels="3"
        class="w-full md:w-20rem mr-4"
      >
        <!-- Contenido del slot -->
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

    <!-- Gráfico de polar de sensores -->
    <DataTable
      classType="col-12 xl:col-12 card"
      :chancadoLine="chartData"
      title="Monitoreo de Sensores"
      tooltipContent="Se grafica en base al valor de los sensores seleccionados por equipo y su respectiva fecha"
      :key="date + sensoresToCall"
    />
  </div>
</template>

<script setup>
import DataTable from "../Componentes Globales/DataTableMonitoreo.vue";
import { getSensores, getSensoresFilters } from "@/service/CallSensores.js";
import { Store } from "@/store";
import { ref, computed, watch } from "vue";
import {getFormArraytoDropdown,setChartData,CreateSensorString} from "../../utils/hpgr/MonitoreoSensores"

const store = Store();
const date = computed(() => store.mainDate);
const sensoresData = ref([]);
const chartData = ref([]);
const Options = ref([]);
const selectedSensor = ref([]);
const sensoresToCall = ref("");

const filteredOptions = computed(() => {
  return Options.value.filter(
    (option) => option.label !== "index" && option.label !== "Time"
  );
});

const setSensorOptions = async () => {
  const sensores = await getSensores();
  if (sensores.length > 0) {
    Options.value = getFormArraytoDropdown(Object.keys(sensores[0]));
    selectedSensor.value = [Options.value[2]];
    applySelections();
  }
};
setSensorOptions();


const applySelections = async () => {
  sensoresToCall.value = CreateSensorString(selectedSensor.value);
  await getData();
};


const getData = async () => {
  try {
    const start =
      date.value.toLocaleString("fr-CA").substring(0, 10) + " 00:00:00";
    const end =
      date.value.toLocaleString("fr-CA").substring(0, 10) + " 23:59:59";
    const sensorValues = await getSensoresFilters(
      sensoresToCall.value,
      start,
      end
    );

    sensoresData.value = sensorValues;
    chartData.value = setChartData(sensoresData.value, selectedSensor.value);
  } catch (error) {
    console.error(error);
  }
};

watch(date, async () => {
  await getData();
});
</script>

<style scoped>
</style>
