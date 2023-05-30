export const graph = (datos, contenedor, typeGraph, color) => {
  //   console.log(datos);
  console.log(contenedor);
  new Chart(contenedor, {
    type: typeGraph,
    data: {
      labels: datos.labels,
      datasets: [
        {
          label: "Total",
          data: datos.data,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
