export const graph = (data, container, month, typeGraph, option) => {
  // 0              , 1             , 2    , 3        
  //[dataFormatWoman, dataFormatMen, color1, color2], employees, month, 2
  if (option === 1) {
    construct1(data, container, month, typeGraph)
  } else if (option === 2) {
    construct2(data, container, month, typeGraph)
  } else if (option === 3) {
    construct3(data, container, month, typeGraph)
  }
}

function construct1(data, container, month, typeGraph){
  const grafico = new Chart(container, {
    type: typeGraph,
    data: {
      labels: month,
      datasets: [
        {
          
          label: data[0].title,
          data: data[0].values,
          borderColor: data[1],
          backgroundColor: data[1],
          borderWidth: 2,
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
  })
}

function construct2(data, container, month, typeGraph){
  const grafico = new Chart(container, {
    type: typeGraph,
    data: {
      labels: month,
      datasets: [
        {
          /*borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)', */
          label: data[0].title,
          data: data[0].values,
          borderColor: data[2],
          backgroundColor: data[2],
          borderWidth: 2,
          yAxisID: 'mujeres-axis',
        },
        {
          label: data[1].title,
          data: data[1].values,
          borderColor: data[3],
          backgroundColor: data[3],
          borderWidth: 2,
          yAxisID: 'hombres-axis',
        }
      ],
    },
    options: {
      scales: {
        y: [
          {
            id: 'mujeres-axis',
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
              drawOnChartArea: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Cantidad de Mujeres',
            },
          },
          {
            id: 'hombres-axis',
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Cantidad de Hombres',
            },
          }
        ],
      },
    },
  })
}

function construct3(data, container, month, typeGraph){
  console.log(data[0])
  console.log(month)
  const grafico = new Chart(container, {
    type: typeGraph,
    data: {
      labels: data[0],
      datasets: [
        {
          
          label: "aa",
          data: data[0],
          borderColor: data[1],
          backgroundColor: data[1],
          borderWidth: 2,
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
  })
}