<template>
  <!-- InfoBanner -->
  <InfoBanner
    style="margin-bottom: 10px"
    :title="dashboardTitle"
    :location="dashboardLocation"
    :weather="dashboardWeather"
    :temperature="dashboardTemperature.toString()"
  />
  <div class="card">
    <!-- DataTable -->
    <DataTable
      v-model:filters="filters"
      removableSort=""
      :value="lubricanteData"
      paginator
      showGridlines
      :rows="10"
      dataKey="index"
      filterDisplay="menu"
      :loading="loading"
 
      responsiveLayout="scroll"
    >
      <!-- Filtros y barra de búsqueda -->
      <template #header>
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Limpiar"
          outlined
          @click="clearFilter()"
        />
        
      </template>
      <template #empty> No se encontraron registros. </template>
      <template #loading> Cargando registros, por favor espere. </template>

      <!-- Definición de las columnas -->
      <Column field="index" header="#" sortable style="width: 4rem"></Column>
      <Column field="Semana" sortable header="Semana" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getSemanas()"
            placeholder="Selecciona la semana "
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template>
      </Column>
      <Column field="N° informe" sortable header="N° Informe"></Column>
      <Column field="Codigo laboratorio" sortable header="Código Laboratorio" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getCodigoLab()"
            placeholder="Selecciona el código "
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template>
      </Column>
      <Column field="Muestra" sortable header="Muestra"></Column>
      <Column field="Equipo" sortable header="Equipo" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getEquipos()"
            placeholder="Selecciona el Equipo "
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template>
      </Column>
      <Column field="Componente" sortable header="Componente" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getComponentes()"
            placeholder="Selecciona el Componente "
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template>
      </Column>
      <Column field="IdComp" sortable header="ID Componente"></Column>
      <Column field="Fmuestra" sortable header="Fecha Muestra" dataType="date">
        <template #body="{ data }">
          {{ new Date(data.Fmuestra).toLocaleString("en-US") }}
        </template>
      </Column>
      <Column field="Horo.equipo" sortable header="Hora Equipo"></Column>
      <Column field="Hrs.comp" sortable header="Horas Componente"></Column>
      <Column field="Hrs.aceite" sortable header="Horas Aceite"></Column>
      <Column field="Tpmuestra" sortable header="Tipo Muestra" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getTipoMuestra()"
            placeholder="Selecciona el Tipo de muestra "
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template></Column>
      <Column field="Insumo" sortable header="Insumo" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getInsumos()"
            placeholder="Selecciona el insumo "
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template>
      </Column >
      <Column field="Cod-obs" sortable header="Código Observación" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getCodigoObs()"
            placeholder="Selecciona el codigo "
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template>
      </Column>
      <Column field="Fe" sortable header="Fe"></Column>
      <Column field="Cr" sortable header="Cr"></Column>
      <Column field="Si" sortable header="Si"></Column>
      <Column field="Ni" sortable header="Ni"></Column>
      <Column field="Cu" sortable header="Cu"></Column>
      <Column field="Sn" sortable header="Sn"></Column>
      <Column field="Al" sortable header="Al"></Column>
      <Column field="Na" sortable header="Na"></Column>
      <Column field="Ba" sortable header="Ba"></Column>
      <Column field="Pb" sortable header="Pb"></Column>
      <Column field="Ca" sortable header="Ca"></Column>
      <Column field="Mg" sortable header="Mg"></Column>
      <Column field="Zn" sortable header="Zn"></Column>
      <Column field="Mn" sortable header="Mn"></Column>
      <Column field="Ag" sortable header="Ag"></Column>
      <Column field="Mo" sortable header="Mo"></Column>
      <Column field="B" sortable header="B"></Column>
      <Column field="K" sortable header="K"></Column>
      <Column field="Visc " sortable header="Visc"></Column>
      <Column field="Infl" sortable header="Infl"></Column>
      <Column field="Tbn" sortable header="Tbn"></Column>
      <Column field="Iv" sortable header="Iv"></Column>
      <Column field="Cont" sortable header="Cont"></Column>
      <Column field="Tan" sortable header="Tan"></Column>
      <Column field="P" sortable header="P"></Column>
      <Column field="Ti" sortable header="Ti"></Column>
      <Column field="V" sortable header="V"></Column>
      <Column field="Soot" sortable header="Soot"></Column>
      <Column field="Oxid" sortable header="Oxid"></Column>
      <Column field="Nitra" sortable header="Nitra"></Column>
      <Column field="Sulf" sortable header="Sulf"></Column>
      <Column field="Diesel" sortable header="Diesel"></Column>
      <Column field="Water" sortable header="Water"></Column>
      <Column field="Glyc" sortable header="Glyc"></Column>
      <Column field="Pq" sortable header="Pq"></Column>
      <Column field="Mayor 4" sortable header="Mayor 4"></Column>
      <Column field="Mayor 6" sortable header="Mayor 6"></Column>
      <Column field="Mayor 14" sortable header="Mayor 14"></Column>
      <Column field="Mayor21" sortable header="Mayor 21"></Column>
      <Column field="Mayor 38" sortable header="Mayor 38"></Column>
      <Column field="Mayor 70" sortable header="Mayor 70"></Column>
      <Column field="Iso" sortable header="ISO"></Column>
      <Column field="Estado" sortable header="Estado"></Column>
      <!-- <Column field="Diagnost" header="Diagnóstico"></Column> -->

    </DataTable>
  </div>
</template>

<script setup>
import InfoBanner from "../Componentes Globales/InfoBanner.vue";
import { ref, onMounted } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { getLubricantes } from "@/service/CallAceites";

// Datos de la tabla
const lubricanteData = ref([]);
// Filtros de la tabla
const filters = ref();
// Indicador de carga
const loading = ref(true);
// Título del dashboard
const dashboardTitle = "Aceites";
// Ubicación y clima (puedes personalizar estos valores)
const dashboardLocation = "Antofagasta";
const dashboardWeather = "Despejado";
const dashboardTemperature = 18;
const getUniqueOptions = (data, field) => {
  const uniqueOptions = [...new Set(data.map(item => item[field]))];
  return uniqueOptions.map(option => ({ label: option, value: option }));
};
const getSemanas = () => getUniqueOptions(lubricanteData.value, "Semana");
const getCodigoLab = () => getUniqueOptions(lubricanteData.value, "Codigo laboratorio");
const getEquipos = () => getUniqueOptions(lubricanteData.value, "Equipo");
const getComponentes = () => getUniqueOptions(lubricanteData.value, "Componente");
const getTipoMuestra = () => getUniqueOptions(lubricanteData.value, "Tpmuestra");
const getInsumos = () => getUniqueOptions(lubricanteData.value, "Insumo");
const getCodigoObs = () => getUniqueOptions(lubricanteData.value, "Cod-obs");

const extractDates = () => lubricanteData.value.map(item => item.Fmuestra);
const formatDates = dates => dates.map(dateString => new Date(dateString).toLocaleString("en-US"));
onMounted(async () => {
  try {
    const response = await getLubricantes();
    lubricanteData.value = response.map(item => ({ ...item, Fmuestra: new Date(item.Fmuestra) }));
    loading.value = false;

    const dates = extractDates();
    const formattedDates = formatDates(dates);
  } catch (error) {
    console.error(error);
  }
});
// Inicialización de filtros
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "index": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Semana": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "N° informe": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Codigo laboratorio": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Muestra": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Equipo": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Componente": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "IdComp": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Fmuestra": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Horo.equipo": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Hrs.comp": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Hrs.aceite": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Tpmuestra": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Insumo": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Cod-obs": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Fe": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Cr": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Si": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Ni": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Cu": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Sn": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Al": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Na": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Ba": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Pb": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Ca": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Mg": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Zn": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Mn": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Ag": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Mo": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "B": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "K": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Visc ": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Infl": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Tbn": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Iv": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Cont": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Tan": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "P": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Ti": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "V": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Soot": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Oxid": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Nitra": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Sulf": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Diesel": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Water": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Glyc": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Pq": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Mayor 4": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Mayor 6": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Mayor 14": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Mayor21": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Mayor 38": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Mayor 70": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Iso": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Estado": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  "Diagnost": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  };
};
initFilters();

// Función para limpiar filtros
const clearFilter = () => {
  initFilters();
};
</script>

<style >
/* Estilos personalizados para la tabla */
.p-datatable.p-datatable-gridlines .p-datatable-header {
  border-width: 1px 1px 0 1px;
  display: flex;
  justify-content: space-between;
}
.p-column-filter-overlay-menu .p-column-filter-operator {
    /* padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.87);
    background: #ffffff;
    margin: 0;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px; */
    display: none;
}
</style>
