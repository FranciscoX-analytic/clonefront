<template>
  <div class="monitoreo">
    <router-link to="/pala-cat-7495" class="mr-8">Monitoreo de activos</router-link>
    <router-link to="/prediccion-falla-pala" class="mr-8"><i class="pi pi-angle-down"></i>Predicción de falla</router-link>
    <p class="mr-8"><i class="pi pi-angle-down"></i>Análisis de confiabilidad</p>
    <div class="search-container">
      <span class="search-icon">
        <i class="pi pi-search" />
      </span>
      <input v-model="value1" class="search-input" placeholder="Buscar" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '',
    };
  },
};
</script>

<style>
.monitoreo {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
}

.container p {
  margin-right: 8px;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: -8px;
}

.search-icon {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
}

.search-input {
  color: #bcc1caff;
  width: 100%;
  max-width: 200px;
  font-size: 14px;
  background: #f3f4f6ff;
  border-radius: 4px;
  border-width: 0px;
  outline: none;
  width: 219px;
  height: 28px;
  padding-left: 34px;
  padding-right: 12px;
}
</style>
