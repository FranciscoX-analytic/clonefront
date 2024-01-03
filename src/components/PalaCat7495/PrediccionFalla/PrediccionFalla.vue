<template>
  <div class="grid" style="margin-top: 10px">
    <CardImages
      classType="col-12 xl:col-4 lg:col-6"
      :imageSrc="secondImageSrc"
    />
    <CheckMaquinaria
      v-if="products"
      :productData="products"
      classType="col-12 xl:col-8 lg:col-6"
    />
    <ChartsChancado
      classType="col-12 xl:col-6"
      probabilityText="Probabilidad"
      failureText="Falla en caja de engranaje"
      failurePercentage="20"
      lastDaysText="dentro de 3 dias"
      tendencyFailure="Tendencia de probabilidad de falla"
      failureProbability="2.39"
    />
    <ChartsChancado
      classType="col-12 xl:col-6"
      probabilityText="Probabilidad"
      failureText="Falla en caja de engranaje"
      failurePercentage="60"
      lastDaysText="dentro de 3 dias"
      tendencyFailure="Tendencia de probabilidad de falla"
      failureProbability="5,39"
    />
  </div>
</template>

<script setup>
import CardImages from "../../Componentes Globales/CardImages.vue";
import CheckMaquinaria from "../../Componentes Globales/CheckMaquinaria.vue";
import ChartsChancado from "../components/ChartsChancado.vue";
import { getProductsData } from "@/service/CallApi.js";
import { ref, onMounted } from "vue";
import SecondImage from "../../../../public/images/pala7495.png";

//CONSTANTES PARA PASAR LA INFORMACION DE CADA COMPONENTE HIJO
const secondImageSrc = SecondImage;
const products = ref(null);
const dashboardTitle = "PALA CAT 7495";

const routeInfo = [
  {
    url: "/pala-cat-7495",
    title: "Monitoreo de activos",
  },
  {
    url: "/prediccion-falla-pala",
    title: "Predicción de falla",
  },
  {
    url: "",
    title: "Análisis de",
  },
];

// CONSUMO DE API PARA LOS GRAFICOS DEL COMPONENTE HIJO
onMounted(async () => {
  try {
    const response = await getProductsData();
    products.value = response;
    console.log(products);
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
.center {
  text-align: center;
  justify-content: center;
  margin-left: 35px;
}
.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
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
.container {
  display: flex;
  flex-wrap: wrap;
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
.flex {
  display: flex;
  flex-direction: column;
}
.charts-pala,
.rodillo-pala {
  flex-basis: 50%;
}
@media screen and (min-width: 994px) {
  .flex {
    flex-direction: row;
  }
}
</style>
