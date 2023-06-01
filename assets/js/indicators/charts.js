// acá tengo el gráfico
export let grafico =[]
    
export const drawChart = (datos, contenedor, titulo) => {
    grafico = new Chart(contenedor, {
        type: document.getElementById("tipoGraficoUno").value,
        data: {
            labels: datos.labels,
            datasets: [{
            label: 'Evolución ' + titulo,
            data: datos.data,
            backgroundColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 0
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: false
            }
            }
        }
        
})   

    return grafico
}

export const drawChartDos = (contenedor, datos1, titulo1, datos2, titulo2) => {
  let background1
  let background2
  if(document.getElementById("tipoGraficoUno").value=="bar"){
    let background1='rgba(255, 99, 132, 1)'
    let background2='rgba(54, 162, 235, 1)'
  }else{
    let background1='rgba(54, 162, 235, 1)'

    let background2='rgba(255, 99, 132, 1)'

  }
  grafico = new Chart(contenedor, {
    // type: document.getElementById("tipoGraficoUno").value,
    data: {
      datasets: [
        {
          type: document.getElementById("tipoGraficoUno").value,
          label: "Evolución " + titulo1,
          data: datos1.data,
          backgroundColor:background1,

          borderWidth: 0,
        },
        {
          type: document.getElementById("tipoGraficoDos").value,
          label: "Evolución " + titulo2,
          data: datos2.data,
          backgroundColor: background2,

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
