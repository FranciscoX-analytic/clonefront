<template>
  <div class="grid">
    <!-- Card 1 -->
    <IndicadoresKpi :data="card1" classType="col-12 md:col-4" :key="date.toLocaleString()" />
    <!-- Card 2 -->
    <IndicadoresKpi :data="card2" classType="col-12 md:col-4" />
    <!-- Card 3 -->
    <IndicadoresKpi :data="card3" classType="col-12 md:col-4" />

    <!-- Imágenes de tarjetas y selección de modelo -->
    <CardImages
      classType="col-12 xl:col-4"
      :imageSrc="firstImageSrc"
      :modelos="modelos"
      v-model="selectedModel"
      @model-selected="handleModelSelected"
      placeholder="hola"
    />

    <!-- Check de Maquinaria -->
    <CheckMaquinaria
      v-if="products"
      :productData="products"
      classType="col-12  xl:col-8"
    />

    <!-- Gráficos de Chancado 2 -->
    <DetallePrediccionFalla
      classType="col-12 md:col-6 lg:col-4"
      failureText="Bomba hidráulica"
      nombreModelo="bomba hidraulica"
      :equipo="tagEquipo"
      :key="tagEquipo"
    />
    <DetallePrediccionFalla
      classType="col-12 md:col-6 lg:col-4"
      failureText="Acumulador"
      nombreModelo="acumulador"
      :equipo="tagEquipo"
      :key="tagEquipo"
    />
    <DetallePrediccionFalla
      classType="col-12 md:col-6 lg:col-4"
      failureText="Rodamiento"
      nombreModelo="rodamiento"
      :equipo="tagEquipo"
      :key="tagEquipo"
    />
  </div>
</template>

<script setup>
import IndicadoresKpi from "../../Componentes Globales/IndicadoresKpi.vue";
import CardImages from "../../Componentes Globales/CardImages.vue";
import CheckMaquinaria from "../../Componentes Globales/CheckMaquinaria.vue";
import DetallePrediccionFalla from "../components/DetallePrediccionFalla.vue";
import FirstImage from "../../../../public/layout/images/Image4670.png";
import { getProductsData } from "@/service/CallApi.js";
import { getListadoEquipos } from "@/service/CallApiRendimientoPala";
import { getDetencionesPorTag } from "../../../service/CallDetenciones";
import { Store } from "@/store";
import { ref, computed, watch, onMounted } from "vue";
import {getPercentageColorStyle,getCountByMotivoEspecialidad, setColor,getDisponibilidad} from "../../../utils/hpgr/PrediccionFalla"


const firstImageSrc = FirstImage;
const store = Store();
const date = computed(() => store.mainDate);

// Función para manejar la selección de modelos
function handleModelSelected(selectedModel) {
  tagEquipo.value = selectedModel;
}

const card2 = {
  title: "KPI tpd",
  value: "42,502",
  percentage: 20,
  span: "Respecto al promedio anterior",
  color: setColor(0.65),
};
const card1 = ref({});
const card3 = ref({});
const tagEquipo = ref("CR011");
const modelos = ref([]);
const products = ref(null);
const selectedModel = ref(modelos.value[0]);
const modelLoaded = ref(false);




// Función para obtener los datos
const getData = async () => {
  try {
    const response = await getProductsData();
    let listaEquipos = await getListadoEquipos();
    const detencion = await getDetencionesPorTag("2111" + tagEquipo.value, date.value.toLocaleString("fr-CA").substring(0, 10));

    card1.value = getDisponibilidad(detencion);
    card3.value = getCountByMotivoEspecialidad(detencion);
    modelos.value = listaEquipos.map((equipo) => {
      return { name: equipo.Tagequipo, code: equipo.Tagequipo };
    });
    
    selectedModel.value = modelos.value[0];
    modelLoaded.value = true;
    
    products.value = response;
  } catch (error) {
    console.error(error);
  }
};

watch(date, async () => {
  await getData();
});

onMounted(async () => {
  await getData();
});
</script>

<style scoped>
</style>
