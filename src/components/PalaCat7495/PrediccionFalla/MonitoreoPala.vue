<template>
  <div>
    <div class="grid">
      <IndicadoresKpi :data="card1" classType="col-12 md:col-4" />
      <IndicadoresKpi :data="card2" classType="col-12 md:col-4" />
      <IndicadoresKpi :data="card3" classType="col-12 md:col-4" />
      <CardImages
        classType="col-12 xl:col-4 lg:col-6"
        :imageSrc="secondImageSrc"
      />
      <MonitoreoTable
        v-if="monitoreo"
        :tableData="monitoreo"
        classType="col-12 xl:col-8 lg:col-6"
        sistemas="Sistemas 1"
        alerta="Estado"
        nivel="Nivel de Anomalia"
      />
      <ChartsMonitoro
        v-if="monitoreoData"
        :monitoreoData="monitoreoData"
        title="Tendencia nivel total de malía"
      />
      <h3 class="anomalia">Ranking de señales con anomalías</h3>
      <MonitoreoTable
        v-if="monitoreo"
        :tableData="monitoreo"
        style="width: 100%"
        sistemas="Sistemas 2"
        alerta="Nivel de Alarmas"
        nivel="Porcentaje de  Anomalia"
      />
      <ModeloRuls
        v-if="modeloR"
        :modeloR="modeloR"
        title="Modelo de estimación de RUL"
        class="anomalia"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import IndicadoresKpi from "../../Componentes Globales/IndicadoresKpi.vue";
import CardImages from "../../Componentes Globales/CardImages.vue";
import MonitoreoTable from "../../Componentes Globales/MonitoreoTable.vue";
import ChartsMonitoro from "../../Componentes Globales/ChartsMonitoreo.vue";
import ModeloRuls from "../components/ModeloRuls.vue";
import { rankingAnomaliaPala } from "@/service/CallApiRangingAnomaly";
import { monitoreoTableData } from "@/service/CallApiMonitoreoTableData";
import { chartData } from "@/service/CallApiChartLinePala";
import SecondImage from "../../../../public/images/pala7495.png";

const secondImageSrc = SecondImage;
const monitoreo = ref(null);
const monitoreoData = ref(null);
const modeloR = ref(null);

const setColor = (value) => {
  let color = 1;
  if (value >= 50 && value < 80) color = 2;
  if (value > 80) color = 3;

  return color;
};

const card1 = {
  title: "Stress Index",
  value: "67,97",
  percentage: "5.39%",
  color: setColor(5.39),
};

const card2 = {
  title: "N° de pases",
  value: "3,35",
  percentage: "0.65%",
  color: setColor(0.65),
};

const card3 = {
  title: "Factor de Carga [TM]",
  value: "106,75",
  percentage: "2,39%",
  color: setColor(81),
};

onMounted(async () => {
  try {
    const response = await rankingAnomaliaPala();
    monitoreo.value = response;
    const response1 = await monitoreoTableData();
    monitoreoData.value = response1;
    const response2 = await chartData();
    modeloR.value = response2;
    console.log(response2)
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped></style>
