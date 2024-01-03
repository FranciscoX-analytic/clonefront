import { selectedSensor } from "../../components/Pestañas Monitoreo/MonitoreoSensores.vue";
export const getFormArraytoDropdown = (list) => {
    return list.map((item) => ({ label: item, value: item }));
  };

  export const setChartData = (sensorList, selectedSensor) => {
    const selectedSensorsLabels = selectedSensor.map((item) => item.label);
    let dates = [];
    let sensorData = {};
    selectedSensorsLabels.forEach((sensor) => (sensorData[sensor] = []));
  
    const randomColor = () =>
      `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
  
    sensorList.forEach((item) => {
      dates.push(item.Time);
      selectedSensorsLabels.forEach((sensor) =>
        sensorData[sensor].push(parseFloat(item[sensor]))
      );
    });
  
    const datasets = Object.keys(sensorData).map((sensor) => ({
      label: sensor,
      data: sensorData[sensor],
      fill: false,
      borderColor: randomColor(),
      tension: 0.4,
    }));
  
    return {
      labels: dates,
      datasets: datasets,
    };
  };

  export const CreateSensorString = (selectedSensors) => {
    return selectedSensors.map((item) => `"${item.label}"`).join(", ");
  };
  