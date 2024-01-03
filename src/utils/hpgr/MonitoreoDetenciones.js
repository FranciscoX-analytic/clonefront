  export const setChartDataTotalMantencion = (detenciones) => {
    let contadorMantencionProgramada = 0;
    let contadorMantencionNoProgramada = 0;
    const totalRegistros = detenciones.length;
  
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
          detencion["Especialidad"] === "Falla Mecánica")
      ) {
        contadorMantencionNoProgramada++;
      }
    }
  
    const totalMantenciones = contadorMantencionProgramada + contadorMantencionNoProgramada;
    const detencionesRestantes = totalRegistros - totalMantenciones;
    const porcentajeMantenciones = totalMantenciones === 0 ? 0 : ((totalMantenciones / totalRegistros) * 100).toFixed(2);
    const porcentajeDetencionesRestantes = detencionesRestantes === 0 ? 0 : ((detencionesRestantes / totalRegistros) * 100).toFixed(2);
  
    const documentStyle = getComputedStyle(document.body);
  
    return {
      labels: [
        `Mantenciones: ${porcentajeMantenciones}%`,
        `Otras Detenciones: ${porcentajeDetencionesRestantes}%`,
        `Total de Detenciones: ${totalRegistros}`,
      ],
      datasets: [
        {
          data: [totalMantenciones, detencionesRestantes, 0],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--green-500'), 'transparent'],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--green-400'), 'transparent'],
        },
      ],
    };
  };
  //funcion para calcular la cantidad de mantenciones (mantenciones programadas, no programadas, otras )
  export  const setMantencionesData = (detenciones) => {
    let contadorMantencionProgramada = 0;
    let contadorMantencionNoProgramada = 0;
   
  
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
          detencion["Especialidad"] === "Falla Mecánica")
      ) {
        contadorMantencionNoProgramada++;
      }
    }
  
    const documentStyle = getComputedStyle(document.body);
  
    return {
      labels: [
        `Mantenciones Programadas: ${contadorMantencionProgramada}`,
        `Mantenciones No Programadas: ${contadorMantencionNoProgramada}`,
      ],
      datasets: [
        {
          data: [contadorMantencionProgramada, contadorMantencionNoProgramada],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };
  };
  //funcion para calcular la cantidad de horas detenida al dia 
  export  const setHorasDetenidoData = (detenciones) => {
    let totalDuracion = 0;
  
    // Sumar la duración de todas las detenciones en minutos
    for (const detencion of detenciones) {
      if (detencion.Duración && typeof detencion.Duración === 'string') {
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
  
    const horasRestantes = 24 * 60 - totalDuracion; // Total de minutos en 24 horas
  
    const documentStyle = getComputedStyle(document.body);
  
    return {
      labels: [
        `Horas Detenido: ${(totalDuracion / 60).toFixed(1)} horas`,
        `Horas Restantes: ${(horasRestantes / 60).toFixed(1)} horas`,
      ],
      datasets: [
        {
          data: [totalDuracion, horasRestantes],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };
  };
  //funcion para calcular la disponibilidad diaria
  export const setDisponibilidadDiaria = (detenciones) => {
    let totalDuracion = 0;
  
    for (const detencion of detenciones) {
      if (detencion.Duración && typeof detencion.Duración === 'string') {
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
  
    const disponibilidad = 100 - ((totalDuracion / (24 * 60)) * 100); 
  
    const documentStyle = getComputedStyle(document.body);
  
    return {
      labels: [
        `Disponibilidad: ${disponibilidad.toFixed(1)}%`,
        `Horas Detenido: ${(totalDuracion / 60).toFixed(1)} horas`,
      ],
      datasets: [
        {
          data: [disponibilidad.toFixed(1), (totalDuracion / 60).toFixed(1)],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };
  };
  //se formatea la entrada de la data de los equipos para mostrarlo en el dropown de seleccionar equipo
  export const formatDetencionesData = (detenciones) => {
    return detenciones.map((equipo) => {
      return { name: `${equipo['Equipo nombre']}`, code: `${equipo['Equipo nombre']}` };
    });
  };
  //funcion para mostrar la data en el grafico de
  export const setChartBarraEquipos = (allDetentions, equipos) => {
      const documentStyle = getComputedStyle(document.documentElement);
  
      const data = [];
  
      equipos.forEach(equipo => {
          const detencionesEquipo = allDetentions.filter(detencion => detencion['Equipo nombre'] === equipo.name);
  
          let mantencionProgramadaCount = 0;
          let mantencionNoProgramadaCount = 0;
          let otrasDetencionesCount = 0;
  
          detencionesEquipo.forEach(detencion => {
              if (detencion["Motivo nivel 1"] === "Mantención Programada") {
                  mantencionProgramadaCount++;
              } else if (detencion["Motivo nivel 1"] === "Mantención No Programada") {
                  mantencionNoProgramadaCount++;
              } else {
                  otrasDetencionesCount++;
              }
          });
  
          const totalMantenciones = mantencionProgramadaCount + mantencionNoProgramadaCount + otrasDetencionesCount;
  
          data.push({
              equipo: equipo.name,
              mantencionProgramada: mantencionProgramadaCount,
              mantencionNoProgramada: mantencionNoProgramadaCount,
              otrasDetenciones: otrasDetencionesCount,
              totalMantenciones: totalMantenciones, // Agregar la suma total aquí
          });
      });
  
      // Ordenar los equipos por la suma total de mantenciones de mayor a menor
      data.sort((a, b) => b.totalMantenciones - a.totalMantenciones);
  
      console.log("probando datasets", data);
  
      return {
          labels: data.map(entry => entry.equipo),
          datasets: [
              {
                  type: 'bar',
                  label: 'Mantenciones Programadas',
                  backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                  data: data.map(entry => entry.mantencionProgramada),
              },
              {
                  type: 'bar',
                  label: 'Mantenciones No Programadas',
                  backgroundColor: documentStyle.getPropertyValue('--green-500'),
                  data: data.map(entry => entry.mantencionNoProgramada),
              },
              {
                  type: 'bar',
                  label: 'Otras Detenciones',
                  backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                  data: data.map(entry => entry.otrasDetenciones),
              },
        
          ],
      };
  };