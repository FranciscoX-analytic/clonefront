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
      :value="customers"
      paginator
      showGridlines
      :rows="10"
      dataKey="index"
      filterDisplay="menu"
      :loading="loading"
      :globalFilterFields="[
          'Tag',
          'Fijo/movil',
          'Componente',
          'Fecha',
          'Hora',
          'Unidad',
          'Valor',
      ]"
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
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="filters['global'].value"
            placeholder="Búsqueda por palabra clave"
          />
        </span>
      </template>
      <template #empty> No se encontraron registros. </template>
      <template #loading> Cargando registros, por favor espere. </template>

      <!-- Definición de las columnas -->
      <Column field="index" header="#" sortable style="width: 4rem"></Column>
      <Column field="Tag" sortable header="Tag" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getTagOptions()"
            placeholder="Selecciona Tag(s)"
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template>
      </Column>
      <Column field="Fijo/movil" sortable header="Fijo/Movil" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getFijoMovilOptions()"
            placeholder="Selecciona Fijo/Movil(es)"
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
            :options="getComponenteOptions()"
            placeholder="Selecciona Componente(s)"
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template>
      </Column>
      <Column field="Fecha" sortable header="Fecha" dataType="date" :showFilterMatchModes="false">
        <template #body="{ data }">
            {{ data.Fecha.toLocaleString("en-US") }}
          </template>
        <template #filter="{ filterModel, onFilter }">
          <Calendar
            v-model="filterModel.value"
            placeholder="Selecciona una fecha"
            @input="onFilter"
            dateFormat="yy-mm-dd"
          />
        </template>
      </Column>
      <Column field="Unidad" sortable header="Unidad"></Column>
      <Column field="Valor" sortable header="Valor" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getValorOptions()"
            placeholder="Selecciona Valor(es)"
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import InfoBanner from "../Componentes Globales/InfoBanner.vue";
import { ref, onMounted } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { getVibraciones } from "@/service/CAllVibraciones";


const customers = ref();
const filters = ref();
const loading = ref(true);
const dashboardTitle = "Vibraciones";
const dashboardLocation = "Antofagasta";
const dashboardWeather = "Despejado";
const dashboardTemperature = 18;

const getTagOptions = () => extractUniqueOptions(customers.value, 'Tag');
const getComponenteOptions = () => extractUniqueOptions(customers.value, 'Componente');
const getFijoMovilOptions = () => extractUniqueOptions(customers.value, 'Fijo/movil');
const getValorOptions = () => extractUniqueOptions(customers.value, 'Valor');

const extractDates = () => customers.value.reduce((dates, item) => {
  if (item['Fecha'] instanceof Date) dates.push(item['Fecha']);
  return dates;
}, []);

const formatDates = dates => dates.map(dateString => {
  const dateObject = new Date(dateString);
  return `${dateObject.toISOString().slice(0, 19).replace('T', ' ')}`;
});

const extractUniqueOptions = (data, field) => {
  const uniqueOptions = [...new Set(data.map(item => item[field]))];
  return uniqueOptions.map(option => ({ label: option, value: option }));
};



onMounted(async () => {
  try {
    const response = await getVibraciones();
    customers.value = response.map(item => {
      // Formatea la fecha usando las funciones nativas de JavaScript y conviértela a un objeto Date
      const formattedDate = new Date(item.Fecha);
      return {
        ...item,
        Fecha: formattedDate
      };
    });
    loading.value = false;

    // Extraer fechas
    const dates = extractDates();

    // Formatear fechas
    const formattedDates = formatDates(dates);
    console.log('Fechas formateadas:', formattedDates);
  } catch (error) {
    console.error(error);
  }
});



const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "Tag": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    "Fijo/movil": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    "Fecha": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    "Valor": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    "Componente": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
  };
};

initFilters();

// Función para limpiar filtros
const clearFilter = () => {
  initFilters();
};
</script>

<style>
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
