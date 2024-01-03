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
        'Area nivel 1',
        'Equipo nombre',
        'Motivo nivel 1',
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
      <Column field="Time" sortable header="Fecha" dataType="date" :showFilterMatchModes="false">
        <template #body="{ data }">
            {{ data.Time.toLocaleString("en-US") }}
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
      <Column field="Sys.2500-wy-10107" sortable header="Sys.2500-wy-10107" />
      <Column field="Pm01Drv01m1001Iia" sortable header="Pm01Drv01m1001Iia" />
      <Column field="Pm01Drv01m1001Si" sortable header="Pm01Drv01m1001Si" />
      <Column field="Pm01Drv01m1001Trq" sortable header="Pm01Drv01m1001Trq" />
      <Column field="Pm01Drv02m1001Iia" sortable header="Pm01Drv02m1001Iia" />
      <Column field="Pm01Drv02m1001Si" sortable header="Pm01Drv02m1001Si" />
      <Column field="Pm01Drv02m1001Trq" sortable header="Pm01Drv02m1001Trq" />
      <Column
        field="Sys.pm01Drv02m1001Eia"
        sortable
        header="Sys.pm01Drv02m1001Eia"
      />
      <Column
        field="Sys.pm01Drv01m1001Eia"
        sortable
        header="Sys.pm01Drv01m1001Eia"
      />
      <Column field="Pm01Run01b8101Tia" sortable header="Pm01Run01b8101Tia" />
      <Column field="Pm01Run01b8102Tia" sortable header="Pm01Run01b8102Tia" />
      <Column field="Pm01Run02b8101Tia" sortable header="Pm01Run02b8101Tia" />
      <Column field="Pm01Run02b8102Tia" sortable header="Pm01Run02b8102Tia" />
      <Column
        field="Sys.pm01Hys01b5001Pia"
        sortable
        header="Sys.pm01Hys01b5001Pia"
      />
      <Column
        field="Sys.pm01Hys01b5002Pia"
        sortable
        header="Sys.pm01Hys01b5002Pia"
      />
      <Column
        field="Sys.pm01Rfr01b65012Gi"
        sortable
        header="Sys.pm01Rfr01b65012Gi"
      />
      <Column field="Pm01Drv01b8104Tia" sortable header="Pm01Drv01b8104Tia" />
      <Column field="Pm01Drv01b8105Tia" sortable header="Pm01Drv01b8105Tia" />
      <Column field="Pm01Drv02b8104Tia" sortable header="Pm01Drv02b8104Tia" />
      <Column field="Pm01Drv02b8105Tia" sortable header="Pm01Drv02b8105Tia" />
      <Column
        field="Pm01Rfr01b6501CalcGap"
        sortable
        header="Pm01Rfr01b6501CalcGap"
      />
      <Column
        field="Pm01Rfr01b6502CalcGap"
        sortable
        header="Pm01Rfr01b6502CalcGap"
      />
      <Column field="Pm01ScewRMinusL" sortable header="Pm01ScewRMinusL" />
      <Column field="Sys.2500-wy-10207" sortable header="Sys.2500-wy-10207" />
      <Column field="Pm02Drv01m1001Iia" sortable header="Pm02Drv01m1001Iia" />
      <Column field="Pm02Drv01m1001Si" sortable header="Pm02Drv01m1001Si" />
      <Column field="Pm02Drv01m1001Trq" sortable header="Pm02Drv01m1001Trq" />
    </DataTable>
  </div>
</template>

<script setup>
import InfoBanner from "../Componentes Globales/InfoBanner.vue";
import { ref, onMounted } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { getSensores } from "@/service/CallSensores";

const customers = ref();
const filters = ref();
const loading = ref(true);
const dashboardTitle = "Sensores";
const dashboardLocation = "Antofagasta";
const dashboardWeather = "Despejado";
const dashboardTemperature = 18;

const extractDates = () => {
  const dates = customers.value ? customers.value.map(item => item.Time) : [];
  return dates;
};

const formatDates = dates => {
  return dates.map(dateString => {
    const dateObject = new Date(dateString);
    const formattedDate = `${dateObject.toISOString().slice(0, 19).replace('T', ' ')}`;
    return formattedDate;
  });
};

onMounted(async () => {
  try {
    const response = await getSensores();
    customers.value = response.map(item => {
      const formattedDate = new Date(item.Time);
      return {
        ...item,
        Time: formattedDate
      };
    });
    loading.value = false;

    const dates = extractDates();
    const formattedDates = formatDates(dates);
  } catch (error) {
    console.error(error);
  }
});

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "Time": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    }
  };
};

initFilters();

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
