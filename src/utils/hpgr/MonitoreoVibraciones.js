// Configurar las opciones de vibraciones
export const setVibrationOptions =  (vibraciones) => {
    let listadoOpciones = [];
    try {
      // const vibraciones = await getComponentesByTag(selectedModel.value.name);
      if (vibraciones.length > 0) {
        listadoOpciones = vibraciones.map(componente => {
          return { label: componente, value: componente };
        });
      } else {
        listadoOpciones = []; 
      }
        } catch (error) {
          console.error(error);
        }
      return listadoOpciones
  };

  export function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

// Configurar los datos para el gráfico
export const setChartData = (List, component) => {
    const documentStyle = getComputedStyle(document.documentElement);
    const selected = component.map(item => item.label);
    let dates = [];
    const datasets = [];
  
    selected.forEach(componente => {
      const componentData = List.filter(item => item.Componente === componente);
      const arregloValores = componentData.map(item => parseFloat(item.Valor));
      datasets.push({
        label: componente,
        data: arregloValores,
        fill: false,
        borderColor: getRandomColor(), // Puedes generar colores aleatorios aquí
        tension: 0.4
      });
      if (dates.length === 0) {
        // Solo agregar las fechas una vez
        dates = componentData.map(item => item.Fecha);
      }
    });
  
    return {
      labels: dates,
      datasets: datasets
    };
  };

  