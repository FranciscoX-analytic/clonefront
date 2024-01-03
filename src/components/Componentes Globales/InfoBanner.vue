<template>
  <!-- Contenedor principal de la información -->
  <div class="flex justify-between items-center container-info container">
    <!-- Título -->
    <h1 class="mr-auto title">{{ title }}</h1>

    <!-- Botones de información de clima y PDF -->
    <div class="flex items-center">
      <!-- Botón de ciudad -->
      <button class="button-info button mr-2">
        <i class="pi pi-map-marker"></i>{{ state.city }}
      </button>

      <!-- Botón de estado del tiempo -->
      <button class="button-info button mr-2">
        <img id="wicon" :src="state.icon" alt="Weather icon" />{{
          state.weather.description
        }}
      </button>

      <!-- Botón de temperatura -->
      <button class="button-info button mr-4">
        {{ parseInt(state.result.feels_like) }}°C
      </button>

      <!-- Botón para exportar a PDF -->
      <button
        class="button-pdf button-pdf py-2 px-4 rounded mr-2"
        @click="exportPDF"
      >
        Exportar PDF
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, defineProps } from "vue";

const props = defineProps({
  title: String,
});

const APIKEY = "fcac947b850eb260a0d177ee9a22f6a4";
const lat = "-22.871524";
const lon = "-69.353678";

const state = reactive({
  result: {},
  city: null,
  weather: {},
  icon: "",
});

onMounted(async () => {
  getWeather();
  setInterval(async () => getWeather(), 600000); // Actualizar cada 10 minutos
});

const getWeather = async () => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}`
  );
  const clima = await res.json();
  const { main, name, weather } = clima;
  state.city = name;
  state.result = main;
  state.weather = weather[0];
  const iconcode = weather[0].icon;
  state.icon = "http://openweathermap.org/img/w/" + iconcode + ".png";
};

const exportPDF = () => {
  // Función para exportar a PDF
};
</script>

<style scoped>
/* Estilos generales */
.container {
  display: flex;
  flex-wrap: wrap;
}

/* Estilos para botones de información */
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
  opacity: 1;
  border: none;
  border-radius: 3px;
  gap: 6px;
}

/* Iconos dentro de los botones */
.button-info .icon {
  width: 16px;
  height: 16px;
  fill: #565e6cff;
}

/* Estilos de hover para botones de información */
.button-info:hover {
  color: #565e6cff;
  background: #dee1e6ff;
}

/* Estilos cuando se presiona un botón de información */
.button-info:hover:active {
  color: #565e6cff;
  background: #cfd2daff;
}

/* Estilos para botones de PDF */
.button-pdf {
  height: 36px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter;
  font-size: 14px;
  line-height: 22px;
  color: #ffffffff;
  background: #00bdd6ff;
  opacity: 1;
  border: none;
  border-radius: 3px;
  gap: 6px;
}

/* Iconos dentro de los botones de PDF */
.button-pdf .icon {
  width: 16px;
  height: 16px;
  fill: #ffffffff;
}

/* Estilos de hover para botones de PDF */
.button-pdf:hover {
  color: #ffffffff;
  background: #00a9c0ff;
}

/* Estilos cuando se presiona un botón de PDF */
.button-pdf:hover:active {
  color: #ffffffff;
  background: #0095a9ff;
}

/* Estilos para el título */
.title {
  font-family: var(--font-family);
  font-size: 32px;
  line-height: 48px;
  color: var(--text-color);
}
</style>
