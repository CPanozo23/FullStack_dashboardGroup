export const graph = (datos, contenedor, typeGraph, color) => {
  //alert("holi");
  console.log(datos);
  let labels;
  /*if (meses.length > 0) {
    //alert("ZIIII");
    labels = meses;
  } else {
    labels = datos.labels;
  }*/
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
