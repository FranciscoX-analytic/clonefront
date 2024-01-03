<template>
  <div :class="props.classType">
    <div class="card mb-0 border-1 border-gray-400">
      <div class="center card">
        <span
          class="p-d-flex p-flex-column p-flex-md-row p-justify-center p-align-center block text-500 font-medium mb-3 text"
          style="text-align: center !important; width: 100%"
        >
          Probabilidad
          <i class="pi pi-angle-left"></i>
          Falla en caja de engranaje
          <i class="pi pi-angle-right">
            <i v-tooltip="'Click to proceed'" class="pi pi-info-circle"></i>
          </i>
        </span>
        <div
          class="flex"
          style="
            justify-content: space-between !important;
            text-align: center !important;
            width: 100%;
          "
        >
          <div class="text-900 text-xl" style="color: red">
            <h2 style="color: red; font-size: 30px; font-weight: bold">
              24,5%
            </h2>
            <p class="font-small text-sm">dentro de 3 dias</p>
          </div>
          <div class="flex items-center ml-4">
            <div class="circle"></div>
            <div class="ml-2">
              <p :class="clas">baja probabilidad de falla</p>
              <p class="font-small text-sm">
                <i class="pi pi-angle-left"></i> a 50
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <p class="text" style="width: 100%; text-align: center">
          Tendencia de la probabilidad de falla
          <i v-tooltip="'Click to proceed'" class="pi pi-info-circle"></i>
        </p>
        <div
          class="flex"
          style="
            width: 100%;
            align-items: center;
            justify-content: space-between !important;
          "
        >
          <span class="percent font-medium" style="color: red"
            ><i class="pi pi-angle-down"></i> 5.30%</span
          >
          <button class="button-info">
            Ultimos 7 días<i class="pi pi-angle-down"></i>
          </button>
        </div>
      </div>
      <div>
        <ChartChancadoLine />
      </div>
      <div>
        <TableChancado v-if="chancado" :chancadoData="chancado" />
      </div>
      <div>
        <RendimientoChancado
          v-if="rendimientos"
          :rendimientosData="rendimientos"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import TableChancado from "./TableChancado.vue";
import RendimientoChancado from "./RendimientoEntrenamiento.vue";
import ChartChancadoLine from "./ChartChancadoLine.vue";

import { incidenciaFalla } from "../service/CallApiTableRendimiento";
import { rendimientoData } from "../service/CallApiRendimientoPala";

const props = defineProps({
  classType: {
    type: String,
    require: true,
  },
});

const chancado = ref();
const rendimientos = ref();
onMounted(async () => {
  try {
    const response = await incidenciaFalla();
    chancado.value = response;
    const response1 = await rendimientoData();
    rendimientos.value = response1;
    console.log(chancado);
    console.log(rendimientos);
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
.center {
  text-align: center;
  justify-content: center;
}
.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: red;
}
.text {
  text-align: center;
  justify-content: center;
  width: 318px;
  height: 23px;
  font-family: Inter;
  font-size: 14px;
  line-height: 22px;
  color: #9095a0ff;
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
</style>
