// acá tengo el gráfico
// acá tengo el gráfico
export let grafico = [];

export const drawChart = (datos, contenedor, titulo) => {
  grafico = new Chart(contenedor, {
    type: document.getElementById("tipoGraficoUno").value,
    data: {
      labels: datos.labels,
      datasets: [
        {
          label: "Evolución " + titulo,
          data: datos.data,
          borderWidth: 0,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
  // return grafico.destroy();
  // console.log(grafico)
  return grafico;
};

export const drawChartDos = (contenedor, datos1, titulo1, datos2, titulo2) => {
  grafico = new Chart(contenedor, {
    // type: document.getElementById("tipoGraficoUno").value,
    data: {
      datasets: [
        {
          type: document.getElementById("tipoGraficoUno").value,
          label: "Evolución " + titulo1,
          data: datos1.data,
          borderWidth: 0,
        },
        {
          type: document.getElementById("tipoGraficoDos").value,
          label: "Evolución " + titulo2,
          data: datos2.data,
          borderWidth: 0,
        },
      ],
      labels: datos1.labels,
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
  return grafico;
};
