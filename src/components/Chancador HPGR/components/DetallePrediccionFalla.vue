<template>
  <div :class="classType">
    <div class="card mb-0 border-1 border-gray-400">
      <div class="card">
        <!-- Probabilidad -->
        <div class="flex">
          <span
            class="p-d-flex p-flex-column p-flex-md-row p-justify-center p-align-center block mb-3 text"
            style="text-align: center !important; flex-grow: 2"
          >
            Probabilidad
            <i class="pi pi-angle-left"></i>
            {{ failureText }}
            <i class="pi pi-angle-right">
              <i v-tooltip="'Click to proceed'" class="pi pi-info-circle"></i>
            </i>
          </span>
          <button class="button-info" @click="toggleDetails">
            Ver detalles<i class="pi pi-angle-down" style="flex-grow: 1"></i>
          </button>
        </div>

        <div class="flex" :style="getPercentageStyle">
          <div class="text-900 text-xl" :style="getPercentageTextStyle">
            <!-- Porcentaje de probabilidad -->
            <h2
              class="textColor"
              :style="
                getPercentageColorStyle(lastPredictionData['Prediccion'] * 100)
              "
            >
              {{ (lastPredictionData["Prediccion"] * 100).toFixed(2) }}%
            </h2>
            <p class="font-small text-sm">dentro de 3 días</p>
          </div>
          <div class="flex items-center ml-4">
            <!-- Círculo con color de acuerdo a la probabilidad -->
            <div
              class="circle"
              style="width: 50px; height: 50px; border-radius: 50%;"
              :style="getCircleStyle(lastPredictionData['Prediccion'] * 100)"
            ></div>
            <div class="ml-2">
              <br />
              <!-- Texto de probabilidad -->
              <p class="font-small text-sm">
                {{ getProbabilityText(lastPredictionData["Prediccion"]) }}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p class="text" style="width: 100%; text-align: center">
            Tendencia de probabilidad de falla
            <i v-tooltip="'Se grafica la muestra de la tendencia de probabilidad de la falla del equipo en 7, 14 y 28 días'" class="pi pi-info-circle"></i>
          </p>
          <div
            class="flex"
            style="
              width: 100% !important;
              align-items: center;
              justify-content: space-around !important;
            "
          >
            <!-- Resultado de la tendencia de probabilidad -->
            <span :style="restaPredicciones?.color"
              ><i
                :class="
                  restaPredicciones?.incrementa
                    ? 'pi pi-angle-up'
                    : 'pi pi-angle-down'
                "
              ></i
              >{{ restaPredicciones?.diferencia }}%</span
            >
            <Dropdown
              v-model="selectedDias"
              editable
              :options="diasOptions"
              optionLabel="name"
              placeholder="Ultimos 7 días"
              class="w-full md:w-8rem"
              :class="{
                'dropdown-custom': true
              }"
            />
          </div>
          <div>
            <!-- Gráfico de tendencia de probabilidad -->
            <ChartChancadoLine v-if="chartDatas" :chancadoLine="chartDatas" />
          </div>
        </div>
      </div>
      <div>
        <!-- Tabla de incidencia de falla -->
        <TendenciaProbabilidad
          v-if="showDetails"
          :chancadoData="chancado"
          title="Incidencia de falla"
        />
      </div>
      <div>
        <!-- Rendimiento de entrenamiento -->
        <RendimientoEntrenamiento
          v-if="showDetails"
          :rendimientos="metricas[props.nombreModelo]"
          title="Rendimiento de entrenamiento"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, defineProps } from "vue";
import TendenciaProbabilidad from "../../Componentes Globales/TendenciaProbabilidad.vue";
import RendimientoEntrenamiento from "../../Componentes Globales/RendimientoEntrenamiento.vue";
import ChartChancadoLine from "../../Componentes Globales/ChartChancadoLine.vue";
import { incidenciaFalla } from "@/service/CallApiTableRendimiento";
import { getLubricantePrediccion } from "@/service/CallApiRendimientoPala";
import { Store } from "@/store";

const store = Store();
const date = computed(() => store.mainDate);

const props = defineProps({
  classType: {
    type: String,
    required: true,
  },
  nombreModelo: {
    type: String,
    required: true,
  },
  equipo: {
    type: String,
    required: true,
  },
  failureText: {
    type: String,
    required: true,
  },
});

const diasOptions = [
  { name: "7 días", code: "7" },
  { name: "14 días", code: "14" },
  { name: "28 días", code: "28" },
];
const selectedDias = ref(diasOptions[0]);
const showDetails = ref(false);

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};

const chartDatas = ref(null);
const restaPredicciones = ref(null);

const chancado = ref();
const rendimientos = ref();
const metricas = ref({});

let lastPredictionData = ref({
  Prediccionid: "",
  Fecha: "",
  Prediccion: 0,
  Rangodias: "",
  Tagequipo: "",
  Modofalla: "",
  Nombremodelo: "",
  F1score: 0,
  Accuracy: 0,
  Precision: 0,
  Recall: 0,
});

const setChart = (listValues, modelo) => {
  let labels = [];
  let data = [];
  listValues.forEach((element) => {
    if (modelo == element.Nombremodelo) {
      labels.push(element["Fecha"]);
      data.push(element["Prediccion"] * 100);
    }
  });

  return {
    labels: labels,
    datasets: [
      {
        label: "Probabilidad",
        fill: false,
        borderColor: "rgba(0,0,225,1)",
        yAxisID: "y",
        tension: 0.4,
        data: data,
      },
    ],
  };
};

const getRestaPredicciones = (list) => {
  let tendencia = {};
  if (list.length > 1) {
    tendencia.diferencia =
      list[list.length - 1].Prediccion - list[0].Prediccion;
    tendencia.diferencia = (tendencia.diferencia * 100).toFixed(2);
  }
  tendencia.incrementa = tendencia.diferencia > 0;
  tendencia.color = { color: tendencia.incrementa ? "red" : "green" };
  return tendencia;
};

const getPercentageStyle = computed(() => ({
  justifyContent: "space-around !important",
  textAlign: "center !important",
  width: "100%",
}));

const getPercentageTextStyle = computed(() => ({
  color: "green",
}));

const getPercentageColorStyle = (value) => {
  let color = { color: "green" };
  if (value >= 50 && value < 80) {
    color = { color: "yellow" };
  }
  if (value >= 80) {
    color = { color: "red" };
  }
  return color;
};

const getCircleStyle = (value) => {
  let color = { background: "green" };
  if (value >= 50 && value < 80) {
    color = { background: "yellow" };
  }
  if (value >= 80) {
    color = { background: "red" };
  }
  return color;
};

const getProbabilityText = (value) => {
  let text = "Baja probabilidad de falla < a 50%";
  value = value * 100;
  if (value >= 50 && value < 80) {
    text = "Advertencia probabilidad de falla > a 50% < a 80%";
  } else if (value >= 80) {
    text = "Alta probabilidad de falla > a 80%";
  }
  return text;
};

const getStartDate = (days) => {
  const end = date.value.toLocaleString("fr-CA").substring(0, 10);
  const start = new Date(end + " 00:00:00");
  start.setDate(start.getDate() - days);
  return start.toLocaleString("fr-CA").substring(0, 10);
};

const getData = async () => {
  try {
    const start = getStartDate(selectedDias.value.code);
    const end = date.value.toLocaleString("fr-CA").substring(0, 10);
    
    const response = await incidenciaFalla();
    chancado.value = response;
    const response1 = await getLubricantePrediccion(start, end, props.equipo);
    rendimientos.value = response1;
    
    if (response1.length > 0) {
      let last = response1.filter(
        (element) => element.Nombremodelo == props.nombreModelo
      );
      lastPredictionData.value = last[last.length - 1];
      chartDatas.value = setChart(last, props.nombreModelo);
      restaPredicciones.value = getRestaPredicciones(last);
    }
    
    rendimientos.value.forEach((element) => {
      const { Nombremodelo, F1score, Accuracy, Precision, Recall } = element;
      const F1scorePorcentaje = (F1score * 100) + '%';
      const AccuracyPorcentaje = (Accuracy * 100) + '%';
      const PrecisionPorcentaje = (Precision * 100) + '%';
      const RecallPorcentaje = (Recall * 100) + '%';
      metricas.value[Nombremodelo] = [
        {
          F1score: F1scorePorcentaje,
          Accuracy: AccuracyPorcentaje,
          Precision: PrecisionPorcentaje,
          Recall: RecallPorcentaje,
        },
      ];
    });
  } catch (error) {
    console.error(error);
  }
};

watch([date, selectedDias], async () => {
  await getData();
});

getData();
</script>

<style scoped>


.flex {
  justify-content: space-between;
  margin-bottom: 35px;
  
}
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
  color: var(--text-color);
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
  /* margin-left: 100px; */
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
.dropdown-custom {
  font-family: var(--font-family);
  font-size: 14px;
  color: var(--text-color);
  background-color: rgb(221, 221, 221); /* Asegúrate de definir este color */
  border: 1px solid white; /* Asegúrate de definir este color */
}
</style>
