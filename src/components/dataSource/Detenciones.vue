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
        'Turno nombre',
        'Fecha inicio',
        'Fecha fin',
        'Area nivel 1',
        'Area nivel 2',
        'Equipo nombre',
        'Motivo nivel 1',
        'Especialidad',
        'Componente'
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
            v-model="filters.global.value"
            placeholder="Búsqueda por palabra clave"
          />
        </span>
      </template>
      <template #empty> No se encontraron clientes. </template>
      <template #loading> Cargando datos de clientes. Por favor espera. </template>

      <!-- Definición de las columnas -->
      <Column field="index" header="#" sortable style="width: 4rem"></Column>
      <Column field="Turno nombre" sortable header="Turno Nombre" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getTurnoNombreOptions()"
            placeholder="Selecciona el Turno"
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template>
      </Column>
      <Column field="Fecha inicio" sortable header="Fecha Inicio" dataType="date" :showFilterMatchModes="false">
          <template #body="{ data }">
            {{ data['Fecha inicio'].toLocaleString("en-US") }}
          </template>
        <template #filter="{ filterModel, onFilter }">
          <Calendar
            v-model="filterModel.value"
            placeholder="Selecciona una fecha de inicio"
            @input="onFilter"
            dateFormat="dd/mm/yy"
          />
        </template>
      </Column>
      <Column field="Fecha fin" sortable header="Fecha Fin"  dataType="date" :showFilterMatchModes="false">
        <template #body="{ data }">
            {{ data['Fecha fin'].toLocaleString("en-US") }}
          </template>
        <template #filter="{ filterModel, onFilter }">
          <Calendar
            v-model="filterModel.value"
            placeholder="Selecciona una fecha"
            @input="onFilter"
            dateFormat="dd/mm/yy"
          />
        </template>
      </Column>
      <Column field="Duración" sortable header="Duración" :showFilterMatchModes="false"></Column>
      <Column field="Area nivel 1" sortable header="Área Nivel 1" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getAreaNivel1Options()"
            placeholder="Selecciona Área nivel 1"
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template>
      </Column>
      <Column field="Area nivel 2" sortable header="Área Nivel 2" :showFilterMatchModes="false"></Column>
      <Column field="Equipo nombre" sortable header="Equipo Nombre" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getEquipoNombreOptions()"
            placeholder="Selecciona el Equipo"
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template>
      </Column>
      <Column field="Equipo descripcion" sortable header="Equipo Descripción" :showFilterMatchModes="false">
      </Column>
      <Column field="Motivo nivel 1" sortable header="Motivo Nivel 1" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getMotivoNivel1Options()"
            placeholder="Selecciona el Motivo de nivel 1"
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template>
      </Column>
      <Column field="Motivo nivel 2" sortable header="Motivo Nivel 2" :showFilterMatchModes="false"></Column>
      <Column field="Especialidad" sortable header="Especialidad" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getEspecialidadOptions()"
            placeholder="Selecciona la Especialidad"
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template>
      </Column>
      <Column
        field="Modo falla descripcion"
        sortable
        header="Modo Falla Descripción"
      ></Column>
      <Column field="Componente" sortable header="Componente" :showFilterMatchModes="false">
        <template #filter="{ filterModel, onFilter }">
          <MultiSelect
            v-model="filterModel.value"
            :options="getComponenteOptions()"
            placeholder="Selecciona el Componente"
            @change="onFilter"
            optionLabel="label"
            optionValue="value"
          />
        </template>
      </Column>
      <Column field="Comentario" sortable header="Comentario" :showFilterMatchModes="false"></Column>
      <Column
        field="Tipo modo falla codigo"
        sortable
        header="Tipo Modo Falla Código"
      >
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import InfoBanner from "../Componentes Globales/InfoBanner.vue";
import { ref, onMounted } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { getDetenciones } from "@/service/CallDetenciones";

// Datos de la tabla
const customers = ref();
// Filtros de la tabla
const filters = ref();
// Indicador de carga
const loading = ref(true);
// Título del dashboard
const dashboardTitle = "Detenciones";
// Ubicación y clima (puedes personalizar estos valores)
const dashboardLocation = "Antofagasta";
const dashboardWeather = "Despejado";
const dashboardTemperature = 18;

const extractUniqueOptions = (data, field) => {
  const uniqueOptions = [...new Set(data.map(item => item[field]))];
  return uniqueOptions.map(option => ({ label: option, value: option }));
};

const getTurnoNombreOptions = () => extractUniqueOptions(customers.value, 'Turno nombre');
const getAreaNivel1Options = () => extractUniqueOptions(customers.value, 'Area nivel 1');
const getEquipoNombreOptions = () => extractUniqueOptions(customers.value, 'Equipo nombre');
const getMotivoNivel1Options = () => extractUniqueOptions(customers.value, 'Motivo nivel 1');
const getEspecialidadOptions = () => extractUniqueOptions(customers.value, 'Especialidad');
const getComponenteOptions = () => extractUniqueOptions(customers.value, 'Componente');

const extractDates = () => customers.value.reduce((dates, item) => {
  if (item['Fecha inicio'] instanceof Date) dates.fechasInicio.push(item['Fecha inicio']);
  if (item['Fecha fin'] instanceof Date) dates.fechasFin.push(item['Fecha fin']);
  return dates;
}, { fechasInicio: [], fechasFin: [] });

const formatDates = dates => dates.map(dateString => {
  const dateObject = new Date(dateString);
  const formattedDate = `${dateObject.toISOString().slice(0, 19).replace('T', ' ')}`;
  return formattedDate;
});

onMounted(async () => {
  try {
    const response = await getDetenciones();
    customers.value = response.map(item => ({
      ...item,
      'Fecha inicio': new Date(item['Fecha inicio']),
      'Fecha fin': new Date(item['Fecha fin'])
    }));

    const { fechasInicio, fechasFin } = extractDates();
    const formattedFechasInicio = formatDates(fechasInicio);
    const formattedFechasFin = formatDates(fechasFin);
    loading.value = false;
  } catch (error) {
    console.error(error);
  }
});

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "Turno nombre": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    "Fecha inicio": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    "Fecha fin": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    "Area nivel 1": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    "Area nivel 2": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    "Equipo nombre": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    "Motivo nivel 1": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    "Especialidad": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    "Componente": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
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
