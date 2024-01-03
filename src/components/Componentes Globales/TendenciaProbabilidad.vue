<template>
  <div class="card">
    <div class="text-container">
      <span class="text">{{ props.title}} <i v-tooltip="'Click to proceed'" class="pi pi-info-circle"></i></span>
      
    </div>
    <DataTable :value="chancado" tableStyle="full-width-table" responsiveLayout="scroll">
        <Column class="column " field="featured" header="Featured"></Column>
        <Column class="column " field="incidence" header="Incidencia"></Column>
        <!-- <Column class="column" field="alert" header="Weight" :value="progressBarTemplate"></Column> -->
        <Column class="column" field="alert" header="Weight">
        <template #body="slotProps" >
            <ProgressBar style="height: 12px; font-size: 10px;" :value="slotProps.data.alert"></ProgressBar>
        </template>
    </Column>
    </DataTable>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted, defineProps } from 'vue';
  import { incidenciaFalla } from '../../service/CallApiTableRendimiento';
 
  const props = defineProps({
      title:{
        type: String,
        require: true
      }
  })

  const chancado = ref([])
  
  const progressBarTemplate = (rowData) => {
    return `
      <ProgressBar :value="${rowData.alert}"></ProgressBar>
    `;
  };
  
  onMounted(async () => {
    try {
      const response = await incidenciaFalla();
      chancado.value = response; 
    } catch (error) {
      console.error(error);
    }
  });
 
  </script>
<style scoped>
.text-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text {
  width: 100%;
  text-align: center; 
  height: 23px; 
  font-family: var(--font-family); 
  font-size: 14px; 
  font-weight: bold;
  line-height: 22px; 
  color: var(--text-color); 
}

</style>