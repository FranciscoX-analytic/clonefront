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
    </div>
  </div>
  <div class="grid">
    <div class="col-12 xl:col-6 lg:col-6">
      <div class="card">
        <DataTable
          :value="dataResumen"
          tableStyle="{ 'min-width': '100%', 'max-height': '300px' }"
          responsiveLayout="scroll"
        >
          <Column field="" header=""></Column>
          <Column field="subsistema" header="Subsistema"></Column>
          <Column field="kpi" header="KPI"></Column>
          <Column field="ene22" header="Enero 2022"></Column>
          <Column field="feb22" header="Febrero 2022"></Column>
          <Column field="mar22" header="Marzo 2022"></Column>
          <Column field="abr22" header="Abril 2022"></Column>
          <Column field="may22" header="Mayo 2022"></Column>
          <Column field="jun22" header="Junio 2022"></Column>
          <Column field="jul22" header="Julio 2022"></Column>
          <Column field="ago22" header="Agosto 2022"></Column>
          <Column field="sep22" header="Septiembre 2022"></Column>
          <Column field="oct22" header="Octubre 2022"></Column>
          <Column field="nov22" header="Noviembre 2022"></Column>
          <Column field="dic22" header="Diciembre 2022"></Column>
        </DataTable>
      </div>
    </div>
    <div class="col-12 xl:col-6 lg:col-6">
      <ModeloRuls v-if="modeloR" :modeloR="modeloR" title="" class="anomalia" />
    </div>
  </div>
  <div class="scatter-chart">
    <canvas ref="scatterChart"></canvas>
    <div
      v-for="(tooltip, index) in tooltips"
      :key="index"
      class="label"
      :style="{ top: tooltip.y, left: tooltip.x }"
    >
      {{ tooltip.label }}
    </div>
    <div class="label top-left">Agudo</div>
    <div class="label top-right">Agudo Crónico</div>
    <div class="label bottom-left">Bajo Control</div>
    <div class="label bottom-right">Crónico</div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { getListadoEquipos } from "@/service/CallApiRendimientoPala";
import { getResumenKpi, getResumenLine } from "@/service/CallApiResumenKpi";
import ModeloRuls from "../../PalaCat7495/components/ModeloRuls.vue";
import {
  createScatterChart,
  scatterData,
  scatterOptions,
} from "@/utils/hpgr/ResumenKpiHpgr";

const modelos = ref();
const selectedModel = ref(null);
const dataResumen = ref();
const modeloR = ref(null);
const scatterChart = ref(null);
const tooltips = ref([]);

const setListadoEquipos = async () => {
  let listaEquipos = await getListadoEquipos();

  if (listaEquipos.length > 0) {
    modelos.value = listaEquipos.map((equipo) => {
      return { name: equipo.Tagequipo, code: equipo.Tagequipo };
    });
    selectedModel.value = modelos.value[0];
  }
  await getData();
};

onMounted(() => {
  createScatterChart(scatterChart.value, scatterData, tooltips);
  setListadoEquipos();
});

const getData = async () => {
  try {
    if (selectedModel.value !== null) {
      dataResumen.value = await getResumenKpi(selectedModel.value.code);
      console.log("probando dataResumen", dataResumen.value);
      modeloR.value = await getResumenLine();
    } else {
      console.error("selectedModel es null");
    }
  } catch (error) {
    console.error(error);
  }
};

watch(selectedModel, async () => {
  getData();
});
</script>

<style>
/* Estilos para el contenedor del gráfico de dispersión */
.scatter-chart {
  position: relative;
  width: 100%; /* Utiliza un ancho del 100% del contenedor padre */
  height: 350px;
}

/* Línea horizontal */
.scatter-chart::before {
  content: "";
  position: absolute;
  left: 2%; /* Utiliza porcentajes para la posición izquierda */
  right: 0.6%; /* Utiliza porcentajes para la posición derecha */
  top: 38%; /* Utiliza porcentajes para la posición vertical */
  border-top: 1px solid black; /* Estilo de la línea horizontal */
}

/* Línea vertical */
.scatter-chart::after {
  content: "";
  position: absolute;
  top: 3%; /* Utiliza porcentajes para la posición superior */
  bottom: 8%; /* Utiliza porcentajes para la posición inferior */
  left: 50.5%; /* Utiliza porcentajes para la posición horizontal */
  border-left: 1px solid black; /* Estilo de la línea vertical */
}

/* Estilos para los labels */
.label {
  position: absolute;
  padding: 5px;
  border-radius: 5px;
}

.top-left {
  top: 3%; /* Utiliza porcentajes para la posición superior */
  left: 1.9%; /* Utiliza porcentajes para la posición izquierda */
}

.top-right {
  top: 3%; /* Utiliza porcentajes para la posición superior */
  right: 0.5%; /* Utiliza porcentajes para la posición derecha */
}

.bottom-left {
  bottom: 7%; /* Utiliza porcentajes para la posición inferior */
  left: 1.9%; /* Utiliza porcentajes para la posición izquierda */
}

.bottom-right {
  bottom: 7%; /* Utiliza porcentajes para la posición inferior */
  right: 0.5%; /* Utiliza porcentajes para la posición derecha */
}
</style>
