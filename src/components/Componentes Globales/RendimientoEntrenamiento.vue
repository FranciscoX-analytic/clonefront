<template>
  <!-- Contenedor principal del componente -->
  <div class="card">
    <!-- Título del componente con un icono de información -->
    <p class="text">{{ props.title }}</p>
    <!-- Tabla de datos utilizando el componente DataTable -->
    <DataTable :value="props.rendimientos" tableStyle="full-width-table" responsiveLayout="scroll">
      <!-- Columnas de la tabla -->
      <Column class="column" field="Precision">
        <!-- Agrega el tooltip al encabezado de columna -->
        <template #header>
          <span>
            Precisión
            <i v-tooltip="'Procentaje de predicciones correctas cuando se genera una alerta'" class="pi pi-info-circle"></i>
          </span>
        </template>
      </Column>
      <Column class="column" field="Recall">
        <!-- Agrega el tooltip al encabezado de columna -->
        <template #header>
          <span>
            Recall
            <i v-tooltip="'Porcentaje de eventos correctamente alertados con anticipación'" class="pi pi-info-circle"></i>
          </span>
        </template>
      </Column>
      <Column class="column" field="F1score">
        <!-- Agrega el tooltip al encabezado de columna -->
        <template #header>
          <span>
            F1 Score
            <i v-tooltip="'Media armónica  entre precisión y recall.Permite comparar el rendimiento entre modelos'" class="pi pi-info-circle"></i>
          </span>
        </template>
      </Column>
      <Column class="column" field="Accuracy">
        <!-- Agrega el tooltip al encabezado de columna -->
        <template #header>
          <span>
            Accuracy
            <i v-tooltip="'Porcentaje de total alertas correctas'" class="pi pi-info-circle"></i>
          </span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  rendimientos: {
    type: Object,
    required: true
  },
});
</script>

<style scoped>
/* Estilos para el componente card */
.card {
  width: 100%;
}

/* Estilos para el texto del título */
.text {
  text-align: center;
  justify-content: center;
  width: 100%;
  font-family: var(--font-family);
  font-size: 14px;
  font-weight: bold;
  line-height: 22px;
  color: var(--text-color);
}
</style>
