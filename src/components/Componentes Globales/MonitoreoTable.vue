<template>
  <!-- Contenedor principal -->
  <div :class="props.classType">
    <div class="card">
      <!-- Tabla de datos -->
      <DataTable :value="props.tableData" tableStyle="full-width-table" responsiveLayout="scroll">
        <!-- Columna de sistemas -->
        <Column class="column" field="sistems">
          <template #header>
            <!-- Encabezado de la columna -->
            <div class="header-container">
              <span class="header-text">{{ props.sistemas }}</span>
            </div>
          </template>
        </Column>
        <!-- Columna de estado de alerta -->
        <Column class="column" field="stateAlert">
          <template #header>
            <!-- Encabezado de la columna con tooltip -->
            <div class="header-container">
              <span class="header-text">{{ props.alerta }}</span>
              <i v-tooltip="'Haz clic para continuar'" class="pi pi-info-circle"></i>
            </div>
          </template>
          <template #body="{ data }">
            <!-- Cuerpo de la columna con icono de alerta -->
            <span :class="getAlertColorClass(data.stateAlert)">
              <i :class="getIconClass(data.stateAlert) + ' info-icon'"></i>
              {{ data.stateAlert }}
            </span>
          </template>
        </Column>
        <!-- Columna de nivel -->
        <Column class="column" field="alert">
          <template #header>
            <!-- Encabezado de la columna con tooltip -->
            <div class="header-container">
              <span class="header-text">{{ props.nivel }}</span>
              <i v-tooltip="'Haz clic para continuar'" class="pi pi-info-circle"></i>
            </div>
          </template>
        </Column>
        <!-- Columna de botones -->
        <Column>
          <template #body="{ data }">
            <!-- Botón de acción -->
            <button @click="handleButtonClick(data)" class="button-machine p-button p-component p-button-outlined p-button-info action-button">Ver detalle</button>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'; 

const props = defineProps({
  tableData: Object,
  classType: {
    type: String,
    required: true
  },
  sistemas: {
    type: String,
    required: true
  },
  alerta: {
    type: String,
    required: true
  },
  nivel: {
    type: String,
    required: true
  }
});
//funcion para definir el color de cada nivel de alerta
const getAlertColorClass = (stateAlert) => {
  switch (stateAlert) {
    case 'Anomalía':
      return 'red-alert';

    case 'Precaución':
      return 'light-green-alert';

    case 'Normal':
      return 'green-alert';

    default:
      return '';
  }
};
//funcion para traer el el icono de alertas
const getIconClass = (stateAlert) => {
  switch (stateAlert) {
    case 'Anomalía':
      return 'pi pi-info-circle';

    case 'Precaución':
      return 'pi pi-info-circle';

    case 'Normal':
      return 'pi pi-info-circle';

    default:
      return '';
  }
};

const handleButtonClick = (data) => {
  // Lógica para la acción del botón
  console.log('Botón presionado para el elemento:', data);
};
</script>

<style scoped>
/* Estilos para la tarjeta */
.card {
  margin-left: 10px;
}

/* Estilos para el icono de información */
.info-icon {
  margin-right: 5px;
}

/* Estilos para la clase de alerta roja */
.red-alert {
  color: red;
}

/* Estilos para la clase de alerta verde claro */
.light-green-alert {
  color: lightgreen;
}

/* Estilos para la clase de alerta verde */
.green-alert {
  color: green;
}

/* Estilos para el botón de acción */
.action-button {
  background-color: #007bff;
  color: white;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Estilos para el contenedor del encabezado */
.header-container {
  display: flex;
  align-items: center;
}

/* Estilos para el icono en el encabezado */
.header-container i {
  margin-left: 0.5rem;
}

/* Estilos para el texto en el encabezado */
.header-text {
  margin-right: 0.5rem;
}
</style>
