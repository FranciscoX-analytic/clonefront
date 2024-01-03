<template>
  <div :class="props.classType">
    <div class="card">
      <DataTable
        :value="props.tableData"
        tableStyle="full-width-table"
        responsiveLayout="scroll"
      >
        <Column class="column" field="sistems" header="Sistemas"></Column>
        <Column class="column" field="stateAlert">
          <template #header>
            <div class="header-container">
              <span class="header-text">Estado</span>
              <i v-tooltip="'Click to proceed'" class="pi pi-info-circle"></i>
            </div>
          </template>
          <template #body="{ data }">
            <span :class="getAlertColorClass(data.stateAlert)">
              <i :class="getIconClass(data.stateAlert) + ' info-icon'"></i>
              {{ data.stateAlert }}
            </span>
          </template>
        </Column>
        <Column class="column" field="alert">
          <template #header>
            <div>
              <div class="header-container">
                <span class="header-text">Nivel de anomalía</span>
                <i v-tooltip="'Click to proceed'" class="pi pi-info-circle"></i>
              </div>
            </div> </template
        ></Column>
        <Column>
          <template #body="{ data }">
            <button @click="handleButtonClick(data)" class="action-button">
              Ver detalle
            </button>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  tableData: Object,
  classType: {
    type: String,
    require: true,
  },
});
console.log(props.tableData);

const getAlertColorClass = (stateAlert) => {
  switch (stateAlert) {
    case "Anomalia":
      return "red-alert";

    case "Precaución":
      return "light-green-alert";

    case "Normal":
      return "green-alert";

    default:
      return "";
  }
};

const getIconClass = (stateAlert) => {
  switch (stateAlert) {
    case "Anomalia":
      return "pi pi-info-circle";

    case "Precaución":
      return "pi pi-info-circle";

    case "Normal":
      return "pi pi-info-circle";

    default:
      return "";
  }
};

const handleButtonClick = (data) => {
  // Lógica para la acción del botón
  console.log("Botón presionado para el elemento:", data);
};
</script>

<style scoped>
.card {
  margin-left: 10px;
}

.info-icon {
  margin-right: 5px;
}

.red-alert {
  color: red;
}

.light-green-alert {
  color: lightgreen;
}

.green-alert {
  color: green;
}

.action-button {
  background-color: #007bff;
  color: white;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.header-container {
  display: flex;
  align-items: center;
}

.header-container i {
  margin-left: 0.5rem;
}

.header-text {
  margin-right: 0.5rem;
}
</style>
