// Calcular las columnas disponibles
export const availableColumns = (aceites) => {
    if (aceites && aceites.length > 0) {
      
      return Object.keys(aceites[0]);
    }
    return [];
  };

// Filtrar opciones disponibles
export const filteredOptions = (aceites, selected) => {
    const startIndex = 15;
    const endIndex = 55;
    const disponibles = availableColumns(aceites)
      .slice(startIndex, endIndex + 1)
      .filter(column => !selected.includes(column))
      .map(column => ({ label: column, value: column }));

  
    return disponibles
  };

  


  