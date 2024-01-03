<template>
  <div class="grid" style="margin-top: 10px;">
    <div class="flex items-center">
      <Dropdown
      v-model="selectedModel"
      :options="modelos"
      placeholder="Seleccionar Equipo"
      optionLabel="name"
      class="dropdown"
      @change="changeEquipos()"
    />
  <MultiSelect
    v-model="selectedComponent"
    :options="options"
    optionLabel="label"
    placeholder="Seleccionar Componente"
    :maxSelectedLabels="3"
    class="w-full md:w-20rem"
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
 

      <DataTable
        classType="col-12 xl:col-12 card"
        :chancadoLine="chartData"
        title="Monitoreo de Vibraciones"
        tooltipContent="Se grafica en base al valor de los componentes seleccionados por equipo y su respectiva fecha"
        :key="date + componentToCall"
      />
    </div>

</template>

<script setup>
import DataTable from "../Componentes Globales/DataTableMonitoreo.vue";
import { getComponentesByTag, getVibracionesParams } from "@/service/CAllVibraciones.js";
import { getListadoEquiposVibraciones } from "@/service/CallApiRendimientoPala";
import { Store } from "@/store";
import { ref, computed, watch } from "vue";
import {setVibrationOptions, getRandomColor, setChartData} from "@/utils/hpgr/MonitoreoVibraciones.js"

// Variables utilizadas
const store = Store();
const date = computed(() => store.mainDate);
const selectedModel = ref(null)
const modelos = ref([]);
const options = ref([]);
const componentData = ref([]);
const selectedComponent = ref([]);
const componentToCall = ref('');
const chartData = ref({});

// Crear una cadena a partir del array de objetos seleccionados
const CreateSensorString = (component) => {
  const selectedValues = component.map(item => item.label).join(', ');
  return selectedValues;
};
const setListadoEquipos = async () =>{
  let listaEquipos = await getListadoEquiposVibraciones();
  // console.log("probando la lista de equipos", listaEquipos)
  if(listaEquipos.length > 0){
    modelos.value = listaEquipos.map((equipo) => {
      return { name: equipo.Tag, code: equipo.Tag };
    });
    selectedModel.value = modelos.value[0]; 
    await setDefaultData();
    // console.log("probando selectedModel", selectedModel.value)
  } 
  
}
setListadoEquipos()
// Aplicar las selecciones de componentes
const applySelections = async () => {
  const start = date.value.toLocaleString("fr-CA").substring(0, 10) + ' 00:00:00';
  const end = date.value.toLocaleString("fr-CA").substring(0, 10) + ' 23:59:59';
  componentToCall.value = CreateSensorString(selectedComponent.value);
  await changeComponentList()
  const selectedComponents = componentToCall.value.split(', '); // Dividir la cadena en componentes individuales
  // const promises = selectedComponents.map(componente => {
  //   // Realizar una llamada a getVibracionesParams para cada componente
  //   return getVibracionesParams(selectedModel.value.name, componente, start, end);
  // });
  let list = []
  for (let i = 0; i < selectedComponents.length; i++){
    let componentListData = await getVibracionesParams(selectedModel.value.name, selectedComponents[i], start, end);
    list = [...list,...componentListData]
  }
  
  try {
    // const results = await Promise.all(promises); // Esperar a que se completen todas las llamadas
    // Combinar los resultados en un solo conjunto de datos
    // const combinedData = [].concat(...results);
    // componentData.value = combinedData;
    chartData.value = setChartData(list,selectedComponent.value);
  } catch (error) {
    console.error(error);
  }
};

const changeComponentList = async ()  =>{
    const vibraciones = await getComponentesByTag(selectedModel.value.name);
    options.value = setVibrationOptions(vibraciones);
}

const changeEquipos = async () =>{
  await changeComponentList();
  getData();
}

const setDefaultData = async () => {
  try {
    const start = date.value.toLocaleString("fr-CA").substring(0, 10) + ' 00:00:00';
    const end = date.value.toLocaleString("fr-CA").substring(0, 10) + ' 23:59:59';
    const vibraciones = await getComponentesByTag(selectedModel.value.name);
    options.value = setVibrationOptions(vibraciones);
    const vibracionesParams = await getVibracionesParams(selectedModel.value.name, options.value[0].label, start, end);
    
    selectedComponent.value = [options.value[0]]
    
    componentData.value = vibracionesParams;
    chartData.value = setChartData(componentData.value,selectedComponent.value);

  } catch (error) {
    console.error(error);
  }
};

// Obtener los datos
const getData = async () => {
  try {
    const start = date.value.toLocaleString("fr-CA").substring(0, 10) + ' 00:00:00';
    const end = date.value.toLocaleString("fr-CA").substring(0, 10) + ' 23:59:59';
    componentData.value = await getVibracionesParams(selectedModel.value.name, componentToCall.value, start, end);
    chartData.value = setChartData(componentData.value,selectedComponent.value);
  } catch (error) {
    console.error(error);
  }
};

// watchs
// watch(selectedModel, async () => {
//   await setVibrationOptions();
// });
watch(date, async () => {
  await getData();
});
</script>

<style scoped>
</style>
