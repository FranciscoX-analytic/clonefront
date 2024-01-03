
export const setChart = (listValues, modelo) => {
    let labels = [];
    let data = [];
    listValues.forEach((element) => {
      if (modelo == element.Nombremodelo) {
        labels.push(element["Fecha"]);
        data.push(element["Prediccion"] * 100);
      }
    });
  
    return {
      labels: labels,
      datasets: [
        {
          label: "Probabilidad",
          fill: false,
          borderColor: "rgba(0,0,225,1)",
          yAxisID: "y",
          tension: 0.4,
          data: data,
        },
      ],
    };
  };
  
  export const getRestaPredicciones = (list) => {
    let tendencia = {};
    if (list.length > 1) {
      tendencia.diferencia =
        list[list.length - 1].Prediccion - list[0].Prediccion;
      tendencia.diferencia = (tendencia.diferencia * 100).toFixed(2);
    }
    tendencia.incrementa = tendencia.diferencia > 0;
    tendencia.color = { color: tendencia.incrementa ? "red" : "green" };
    return tendencia;
  };
  

  export const getPercentageColorStyle = (value) => {
    let color = { color: "green" };
    if (value >= 50 && value < 80) {
      color = { color: "yellow" };
    }
    if (value >= 80) {
      color = { color: "red" };
    }
    return color;
  };
  
  export const getCircleStyle = (value) => {
    let color = { background: "green" };
    if (value >= 50 && value < 80) {
      color = { background: "yellow" };
    }
    if (value >= 80) {
      color = { background: "red" };
    }
    return color;
  };
  
  export const getProbabilityText = (value) => {
    let text = "Baja probabilidad de falla < a 50%";
    value = value * 100;
    if (value >= 50 && value < 80) {
      text = "Advertencia probabilidad de falla > a 50% < a 80%";
    } else if (value >= 80) {
      text = "Alta probabilidad de falla > a 80%";
    }
    return text;
  };
  