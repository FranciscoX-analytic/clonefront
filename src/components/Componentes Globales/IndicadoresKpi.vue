<template>
  <!-- Contenedor principal con clase dinámica -->
  <div :class="props.classType">
    <!-- Tarjeta con clase baseCard y una clase dinámica para el color -->
    <div :class="'baseCard card' + props.data.color">
      <!-- Encabezado de la tarjeta -->
      <div class="flex justify-content-between mb-3">
        <div>
          <!-- Título y valor -->
          <span class="text">{{ props.data.title }}</span>
          <div class="value" :style="'color:' + props.data.colorText">{{ props.data.value }}</div>
        </div>
      </div>
      <!-- Subtítulo con icono y texto adicional -->
      <span class="font-medium">
        <i class="pi pi-angle-up"></i> {{ props.data.subTitulo }}
        <span class="grey">{{ props.data.span }}</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// Propiedades pasadas al componente
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      title: "",
      value: "",
      subTitulo: 0,
      span: "",
      color: 1,
      colorText: "black",
    }),
  },
  classType: {
    type: String,
    required: true,
  },
});

</script>

<style scoped>
/* Estilos CSS específicos del componente */

.text {
  font-family: var(--font-family);
  font-size: 16px;
  line-height: 26px;
  color: #323842ff;
}

.value {
  font-family: var(--font-family);
  font-weight: bold;
  font-size: 32px;
  line-height: 48px;
  color: #323842ff;
}

.grey {
  font-size: 12px;
  color: rgb(144, 134, 134);
}

/* Estilos para las tarjetas con diferentes colores */
.card1 {
  background: #f5f2fdff;
}

.card2 {
  /* Container 5295 */
  background: #f1f4fdff;
}

.card3 {
  /* Container 5296 */
  background: #fef6f1ff;
}

/* Estilos para las tarjetas base */
.baseCard {
  border-radius: 6px;
  margin: 5px;
  padding: 10px;
}
</style>
