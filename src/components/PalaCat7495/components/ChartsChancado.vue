<template>
  <div :class="classType">
    <div class="card mb-0 border-1 border-gray-400">
      <div class="card">
        <span
          class="p-d-flex p-flex-column p-flex-md-row p-justify-center p-align-center block mb-3 text"
          style="text-align: center !important; width: 100%"
        >
          {{ probabilityText }}
          <i class="pi pi-angle-left"></i>
          {{ failureText }}
          <i class="pi pi-angle-right">
            <i v-tooltip="'Click to proceed'" class="pi pi-info-circle"></i>
          </i>
        </span>
        <div class="flex" :style="getPercentageStyle">
          <div class="text-900 text-xl" :style="getPercentageTextStyle">
            <h2 class="textColor" :style="getPercentageColorStyle">
              {{ failurePercentage }}%
            </h2>
            <p class="font-small text-sm">{{ lastDaysText }}</p>
          </div>
          <div class="flex items-center ml-4">
            <div class="circle" :style="getCircleStyle"></div>
            <div class="ml-2">
              <p></p>
              <p class="font-small text-sm">{{ getProbabilityText }}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="text" style="width: 100%; text-align: center">
          {{ tendencyFailure }}
          <i v-tooltip="'Click to proceed'" class="pi pi-info-circle"></i>
        </p>
        <div
          class="flex"
          style="
            width: 100% !important;
            align-items: center;
            justify-content: space-around !important;
          "
        >
          <span :style="getPercentageColorStyle"
            ><i class="pi pi-angle-down"></i> {{ failureProbability }}%</span
          >
          <button class="button-info">
            Ultimos 7 días<i class="pi pi-angle-down"></i>
          </button>
        </div>
        <div>
          <ChartChancadoLine
            v-if="chancadoLine"
            :chancadoLine="chancadoLine"
            title="Modelo de estimación de RUL"
            class="anomalia"
          />
        </div>
      </div>
      <div>
        <TendenciaProbabilidad
          v-if="chancado"
          :chancadoData="chancado"
          title="Incidencia de falla"
        />
      </div>
      <div>
        <RendimientoChancado
          v-if="rendimientos"
          :rendimientos="metricas['bomba hidraulica']"
          title="Rendimiento de entrenamiento"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, defineProps } from "vue";
import TendenciaProbabilidad from "../../Componentes Globales/TendenciaProbabilidad.vue";
import RendimientoChancado from "../../Componentes Globales/RendimientoEntrenamiento.vue";
import ChartChancadoLine from "../../Componentes Globales/DataTableMonitoreo.vue";
import { incidenciaFalla } from "@/service/CallApiTableRendimiento";
import { chartData } from "@/service/CallApiChartLinePala";
import { getLubricantePrediccion } from "@/service/CallApiRendimientoPala";

const props = defineProps({
  classType: {
    type: String,
    required: true,
  },
  probabilityText: {
    type: String,
    required: true,
  },
  tendencyFailure: {
    type: String,
  },
  failureText: {
    type: String,
    required: true,
  },
  failureProbability: {
    type: String,
    required: true,
  },
  failurePercentage: {
    type: String,
    required: true,
  },
  lastDaysText: {
    type: String,
    required: true,
  },
});

const getPercentageStyle = computed(() => ({
  justifyContent: "space-around !important",
  textAlign: "center !important",
  width: "100%",
}));

const getPercentageTextStyle = computed(() => ({
  color: "green",
}));

const getPercentageColorStyle = computed(() => {
  const failurePercentage = Number(props.failurePercentage);

  if (failurePercentage < 40) {
    return { color: "green" };
  } else if (failurePercentage < 60) {
    return { color: "yellow" };
  } else {
    return { color: "red" };
  }
});

const getCircleStyle = computed(() => {
  const failurePercentage = Number(props.failurePercentage);

  if (failurePercentage < 40) {
    return { backgroundColor: "green" };
  } else if (failurePercentage < 60) {
    return { backgroundColor: "yellow" };
  } else {
    return { backgroundColor: "red" };
  }
});

const getProbabilityText = computed(() => {
  const failurePercentage = Number(props.failurePercentage);

  if (failurePercentage < 40) {
    return "Baja probabilidad de falla < 40%";
  } else if (failurePercentage < 60) {
    return "Probabilidad de falla entre 40% y 60%";
  } else {
    return "Alta probabilidad de falla > 60%";
  }
});
const chancado = ref();
const rendimientos = ref();
const metricas = ref({});
const chancadoLine = ref(null);

onMounted(async () => {
  try {
    const start = "2023-01-01";
    const end = "2023-01-09";
    const equipo = "CR011";

    const response = await incidenciaFalla();
    chancado.value = response;
    const response2 = await chartData();
    chancadoLine.value = response2;
    // console.log("revisando variables",start, end, equipo)
    const response1 = await getLubricantePrediccion(start, end, equipo);
    rendimientos.value = response1;
    // console.log(rendimientos.value);
    rendimientos.value.forEach((element) => {
      const { Nombremodelo, F1score, Accuracy, Precision, Recall } = element;
      // console.log("Revisando cada elemento",element)
      metricas.value[Nombremodelo] = [{ F1score, Accuracy, Precision, Recall }];
    });
    // console.log("Probando metricas",metricas.value)
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: green;
}
.text {
  text-align: center;
  justify-content: center;
  width: 318px;
  height: 23px;
  font-family: var(--font-family);
  font-size: 14px;
  font-weight: bold;
  line-height: 22px;
  color:var(--text-color);
}
.button-machine {
  width: 135px;
  height: 36px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter;
  font-size: 14px;
  line-height: 22px;
  color: #ffffffff;
  background: #6f3ed1ff;
  opacity: 1;
  border: none;
  border-radius: 4px;
}
/* Hover */
.button-machine:hover {
  color: #ffffffff;
  background: #582ab4ff;
}
/* Pressed */
.button-machine:hover:active {
  color: #ffffffff;
  background: #45218cff;
}
/* Disabled */
.button-machine:disabled {
  opacity: 0.4;
}
.percent {
  margin-left: 50px;
  margin-top: 2px;
}
.button-info {
  height: 36px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter;
  font-size: 14px;
  line-height: 22px;
  color: #565e6cff;
  background: #f3f4f6ff;
  opacity: 1;
  margin-left: 100px;
  border: none;
  border-radius: 3px;
  gap: 6px;
}
.button-info .icon {
  width: 16px;
  height: 16px;
  fill: #565e6cff;
}
/* Hover */
.button-info:hover {
  color: #565e6cff;
  background: #dee1e6ff;
}
/* Pressed */
.button-info:hover:active {
  color: #565e6cff;
  background: #cfd2daff;
}
/* Disabled */
.button-info:disabled {
  opacity: 0.4;
}
.textColor {
  font-size: 40px;
  font-weight: bold;
  font-family: var(--font-family);
}
</style>
