<template>
    <!-- Contenedor principal con clase proporcionada -->
    <div :class="props.classType">
    <Dropdown
      v-model="selectedModel"
      :options="props.modelos"
      :placeholder="selectedModel ? selectedModel.value.name : (props.modelos.length > 0 ? props.modelos[0].name : 'Seleccionar equipo')"
      optionLabel="name"
      class="dropdown"
      @change="handleModelChange"
    />
  </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from "vue";
  
  // Props que se pasan al componente
  const props = defineProps({
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
  
  <style >
  /* Estilos CSS personalizados */
  
  /* Estilo para el menú desplegable */
  .dropdown {
  display: flex;
  text-align: center;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  background: #6f3ed1ff !important; 
  color: white !important; 
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
  
  .p-dropdown .p-dropdown-label.p-placeholder {
    color: rgb(255 255 255);
}
.p-dropdown .p-dropdown-trigger {
    background: transparent;
    color: rgb(255 255 255)!important;
    width: 2.357rem;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
  </style>
  