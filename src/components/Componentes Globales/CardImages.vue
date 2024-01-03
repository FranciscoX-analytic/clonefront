<template>
  <!-- Contenedor principal con clase proporcionada -->
  <div :class="props.classType">
    <!-- Tarjeta con menú desplegable y una imagen -->
    <div class="card d-flex justify-content-center flex-direction-column">
      <!-- Menú desplegable -->
      <Dropdown
        v-model="selectedModel"
        :options="props.modelos"
        :placeholder="selectedModel ? selectedModel.value.name : (props.modelos.length > 0 ? props.modelos[0].name : 'Seleccionar equipo')"
        optionLabel="name"
        class="dropdown"
        @change="handleModelChange"
      />
      <!-- Imagen -->
      <img :src="props.imageSrc" style="width: 100%; height: 300px" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

// Props que se pasan al componente
const props = defineProps({
  classType: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  modelos: {
    type: Array,
    required: false,
    default: () => [],
  },
});

// Estado de la selección del modelo
const selectedModel = ref(null); // Inicializado como nulo para mostrar el marcador de posición inicial
const emits = defineEmits();

// Función para manejar el cambio de modelo seleccionado
function handleModelChange(model) {
  selectedModel.value = model;
  emits("model-selected", model);
}

</script>

<style scoped>
/* Estilos CSS personalizados */

/* Estilo para el menú desplegable */
.dropdown {
  display: flex;
  text-align: center;
  align-items: center;
  margin-bottom: 10px;
  width: 50%;
  margin-left: 25%;
  margin-right: 25%;
  background: #6f3ed1ff;
}

/* Estilos para el texto en el menú desplegable */
.p-dropdown .p-dropdown-label {
  background: transparent;
  border: 0 none;
  color: white;
}

/* Estilo para la flecha hacia abajo en el menú desplegable */
.pi-chevron-down:before {
  content: "\e902";
  color: white;
}

/* Estilo para el marcador de posición en el menú desplegable */
.p-dropdown .p-dropdown-label.p-placeholder {
  color: #e9ecef;
}
</style>
