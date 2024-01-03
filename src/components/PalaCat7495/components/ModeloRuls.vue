<template>
    <div class="card">
        <div class="flex justify-content-between items-center ">
                <p class="text">{{ props.title }} </p>
                <!-- <Dropdown v-model="selectedCity" editable :options="cities" optionLabel="name" placeholder="Ultimos 7 días" class="w-full md:w-14rem dropdown" /> -->
            </div>
        <Chart type="line" :data="props.modeloR" :options="chartOptions" class="h-18rem" />
    </div>
</template>

<script setup>
import { ref,defineProps} from 'vue'
import {configuracionGeneral} from '../../../data/config'

const selectedCity = ref(null);
const cities = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
];


const props = defineProps({
    modeloR: {
        type: Object,
        required: true
   },
   title:{
    type: String,
    require: true
   }
 })

 const textColor = configuracionGeneral.colorText;
    const textColorSecondary = configuracionGeneral.colorText;
    const surfaceBorder = configuracionGeneral.colorPrimario;
    const chartOptions = 
        {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    drawOnChartArea: false,
                    color: surfaceBorder
                }
            }
        }
    };
</script>

<style scoped>

.card{
    margin-top: 10px;
    width: 100%;
}
/* Dropdown button 60 */
.dropdown {
  position: relative; 
  opacity: 1; 
  width: 189px; 
  height: 25px;  
  font-family: Inter; 
  font-size: 12px; 
  background: var(--text-color); 
  border-radius: 6px; 
  border-width: 0px; 
  outline: none; 
}
.text{
    color: var(--text-color);
}
</style>