<template>
  <!-- Contenedor del componente con una clase dinámica -->
  <div :class="props.classType">
    <!-- Contenedor de la tabla -->
    <div class="card container">
      <!-- Componente DataTable con datos y opciones -->
      <DataTable :value="props.productData" style="width: 100% !important;" responsiveLayout="scroll">
        <!-- Columnas de la tabla -->
        <Column class="column" field="components" header="Componentes"></Column>
        <Column class="column" field="stateAlert" header="Estado de Alerta">
          <!-- Plantilla personalizada para mostrar el estado de alerta -->
          <template #body="{ data }">
            <span :class="getStateAlertClass(data.stateAlert)"></span>
          </template>
        </Column>
        <Column class="column" field="monitoring" header="Fuente de Monitoreo"></Column>
        <Column class="column" field="alert" header="Estado de alerta"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Propiedades pasadas al componente
const props = defineProps({
  productData: Object,
  classType: {
    type: String,
    require: true
  }
});

// Función para obtener la clase CSS basada en el estado de alerta
const getStateAlertClass = (stateAlert) => {
  const colorMap = {
    'Rojo': 'red-square',
    'Verde Claro': 'light-green-square',
    'Verde': 'green-square',
  };

  return colorMap[stateAlert] || '';
};
</script>

<style scoped>
/* Estilos CSS específicos del componente */
.card {
  margin-left: 10px;
}

/* Estilos para los indicadores de estado de alerta */
.red-square {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: red;
  border-radius: 2px;
}

.light-green-square {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: lightgreen;
  border-radius: 2px;
}

.green-square {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: green;
  border-radius: 2px;
}
</style>
