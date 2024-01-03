// Función para obtener el color del porcentaje
export const getPercentageColorStyle = (value) => {
    let colorStyle = "red";
    if (value >= 70 && value < 80) {
      colorStyle = "yellow";
    }
    if (value > 80) {
      colorStyle = "green";
    }
  
    return colorStyle;
  };


  // Función para establecer el color de las tarjetas según el valor
  export const setColor = (value) => {
    let color = 1;
    if (value >= 50 && value < 80) color = 2;
    if (value > 80) color = 3;
  
    return color;
  };
// Función para contar por motivo y especialidad
export const getCountByMotivoEspecialidad = (detenciones) => {
    let contadorMantencionProgramada = 0;
    let contadorMantencionNoProgramada = 0;
    let totalRegistros = detenciones.length;
  
    for (const detencion of detenciones) {
      if (
        detencion["Motivo nivel 1"] === "Mantención Programada" &&
        (detencion["Especialidad"] === "Mantención Línea" ||
          detencion["Especialidad"] === "Mantencion Programada")
      ) {
        contadorMantencionProgramada++;
      } else if (
        detencion["Motivo nivel 1"] === "Mantención No Programada" &&
        (detencion["Especialidad"] === "Falla Eléctrica" ||
          detencion["Especialidad"] === "Falla Mécanica")
      ) {
        contadorMantencionNoProgramada++;
      }
    }
  
    const value = `${contadorMantencionProgramada + contadorMantencionNoProgramada}/${totalRegistros}`;
    const percentage = ((contadorMantencionProgramada + contadorMantencionNoProgramada) / totalRegistros) * 100;
    const causaExterna = `${totalRegistros - (contadorMantencionProgramada + contadorMantencionNoProgramada)}/${totalRegistros}`;
  
    if (totalRegistros == 0) {
      return {
        title: "KPI Mantenimientos/Detenciones",
        value: "0/0 (0)",
        subTitulo: "0/0 (0)",
        color: setColor(81),
      };
    }
  
    return {
      title: "KPI Mantenimientos/Detenciones",
      value: `${value} (${percentage.toFixed(1)}%)`,
      subTitulo: `${causaExterna} (${(100 - percentage.toFixed(1))}%)`,
      color: setColor(81),
    };
  };

  // Función para calcular la disponibilidad
export const getDisponibilidad = (listadoDetenciones) => {
    let totalDuracion = 0;
  
    // Sumar la duración de todas las detenciones
    for (const detencion of listadoDetenciones) {
      if (detencion.Duración && typeof detencion.Duración === "string") {
        const tiempoArray = detencion.Duración.split(":");
        if (tiempoArray.length === 3) {
          const horasEnMinutos = parseInt(tiempoArray[0]) * 60;
          const minutos = parseInt(tiempoArray[1]);
          const segundosEnMinutos = parseInt(tiempoArray[2]) / 60;
  
          const duracionEnMinutos = horasEnMinutos + minutos + segundosEnMinutos;
          totalDuracion += duracionEnMinutos;
        }
      }
    }
  
    const percentage = (100 - (totalDuracion / (24 * 60)) * 100);
    const colorText = getPercentageColorStyle(percentage);
  
    return {
      title: "KPI Disponibilidad diaria",
      value: `${percentage.toFixed(1)}%`,
      subTitulo: `${(totalDuracion / 60).toFixed(1)} Horas detenidas`,
      span: "",
      color: setColor(percentage),
      colorText,
    };
  };
  