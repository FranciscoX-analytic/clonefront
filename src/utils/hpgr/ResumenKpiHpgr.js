import Chart from "chart.js/auto";

export function createScatterChart(scatterChart, scatterData, tooltips) {
  if (scatterChart) {
    const chartContainer = scatterChart.parentNode;
    const containerWidth = chartContainer.clientWidth;
    const containerHeight = chartContainer.clientHeight;

    const chart = new Chart(scatterChart, {
      type: "scatter",
      data: scatterData,
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: true,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: 5,
            color: "white",
            formatter: (value, context) => {
              return context.dataset.label;
            },
          },
        },
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            min: 0,
            max: 10,
          },
          y: {
            type: "linear",
            min: 0,
            max: 10,
          },
        },
      },
    });

    tooltips.value = [];

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      dataset.data.forEach((point, pointIndex) => {
        const offsetX = 2.5; // % de desplazamiento hacia la derecha
        const offsetY = -3.5;
        const x = (((point.x / 10) * 100) + offsetX) + "%";
        const y = (100 - (point.y / 10) * 100 + offsetY) + "%";

        const tooltip = {
          x: x,
          y: y,
          label: dataset.label,
        };

        tooltips.value.push(tooltip);
      });
    });
  }
}
export const scatterData = {
    datasets: [
      {
        label: 'Línea Vertical',
        data: [
          { x: 5, y: 0 },
          { x: 5, y: 10 }
        ],
        borderColor: 'red',
        borderWidth: 2,
        fill: false,
        type: 'line'
      },
      {
        label: 'Línea Horizontal',
        data: [
          { x: 0, y: 5 },
          { x: 10, y: 5 }
        ],
        borderColor: 'green',
        borderWidth: 2,
        fill: false,
        type: 'line'
      },
      {
        label: 'Fallas mecanicas en valvulas',
        data: [{ x: 2.5, y: 2.5 }],
        pointBackgroundColor: 'green', 
        borderColor: 'green',
        pointRadius: 7,
      },
      {
        label: 'Fallas mecanicas en motor Hidraulico',
        data: [{ x: 7.5, y: 2 }],
        pointBackgroundColor: 'blue', 
        borderColor: 'blue',
        pointRadius: 7,
      },
      {
        label: 'Falla en sensor posición puerta',
        data: [{ x: 7.5, y: 6.5 }],
        pointBackgroundColor: 'orange', 
        borderColor: 'orange',
        pointRadius: 7,
      },
      {
        label: 'Fallas electricas en panel control local',
        data: [{ x: 7.5, y: 8.5 }],
        pointBackgroundColor: 'orange',
        pointRadius: 7,
      },
      {
        label: 'Falla mecanica en cilindro sello',
        data: [{ x: 7.5, y: 7.5 }],
        pointBackgroundColor: 'orange', 
        pointRadius: 7,
      },
      {
        label: 'Falla electrica en variador arranque',
        data: [{ x: 2.5, y: 5.5 }],
        pointBackgroundColor: 'orange', 
        pointRadius: 7,
      },
      {
        label: 'Desgaste-rotura MEC en rodillos',
        data: [{ x: 1.5, y: 3.5 }],
        pointBackgroundColor: 'orange', 
        pointRadius: 7,
      },
 
    ],
};
  
export const scatterOptions = {
     maintainAspectRatio: false,
     plugins: {
         legend: {
             display: false,
         },
         datalabels: {
             display: true,
             backgroundColor: 'rgba(0, 0, 0, 0.7)',
             borderRadius: 5,
             color: 'white',
             formatter: (value, context) => {
                 return context.dataset.label;
             },
         },
     },
     scales: {
         x: {
             type: 'linear',
             position: 'bottom',
             min: 0,
             max: 10,
         },
         y: {
             type: 'linear',
             min: 0,
             max: 10,
         },
     },
};