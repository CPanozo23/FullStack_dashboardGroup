import { makeRequest } from "./makeRequest.js";
import { graph } from "./graph.js";
import { formatData } from "./formatData.js";
import { formatData2 } from "./formatData2.js";

export const mainBalance = async (year, bancoId, typeGraph) => {
  //document.getElementById("showBalance").hidden = true;
  let search = true;
  if (year == 2022) {
    errores(3);
    search = false;
  } else {
    const readBanks = JSON.parse(localStorage.getItem("banks"));

    readBanks.forEach((element) => {
      if (element.CodigoInstitucion === bancoId && element.AnioBalance > year) {
        search = false;
        //primero
        errores(1, element.AnioBalance);
      }
    });

    if (search === true) {
      handleRequestGeneral(year, bancoId, typeGraph);
      document.getElementById("showBalance").hidden = false;
    }
  }
  //segundo con retorno
  /*
  
  //verificar si el banco existe para ese año
  
   */
};

const handleRequestGeneral = async (year, bancoId, typeGraph) => {
  //alert("aaa");
  let id = document.getElementById("idBank").value;

  handleRequest1(year, bancoId, typeGraph);
  handleRequest2(year, bancoId, typeGraph);
};

const handleRequest1 = async (year, idBanco, tipoGrafico) => {
  // console.log("estoy en el main bl", year, idBanco);
  try {
    let cuenta = "1100000";
    console.log("aqui probando");

    //alert("año en hr1: " + year);
    const datos = await makeRequest(idBanco, cuenta, year, tipoGrafico);
    console.log(datos);

    //grafico 1
    const canva = document.getElementById("graficoBalance1");
    const datosFormateados = formatData(datos);
    console.log("datos formateados: " + datosFormateados);
    const color1 = "rgb(54, 162, 235)";
    // console.log(datosFormateados);

    let existingChart = Chart.getChart(canva);

    if (existingChart) {
      existingChart.destroy();
    }

    graph(datosFormateados, canva, tipoGrafico, color1);
  } catch (error) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "error",
      title: "No se encuentran datos para activos y efectivo en este año",
    });
  }
};

const handleRequest2 = async (year, idBanco, tipoGrafico) => {
  console.log("holaa");
  //const indicador = input.value;
  try {
    let cuenta = "1000000";

    const datos = await makeRequest(idBanco, cuenta, year, tipoGrafico);
    console.log(datos);
    // console.log("datos2222222");

    //grafico 2
    const canva = document.getElementById("graficoBalance2");
    const datosFormateados = formatData2(datos);
    // console.log(datosFormateados);
    const color2 = "rgb(255, 99, 132)";
    let existingChart = Chart.getChart(canva);

    if (existingChart) {
      existingChart.destroy();
    }
    graph(datosFormateados, canva, tipoGrafico, color2);
  } catch (error) {
    errores(3);
  }
};

function clickedBank(divClick, event) {
  const links = divClick.querySelectorAll("div");
  //console.log(links);
  //search id from list of bank
  links.forEach((link) => {
    if (event.target.id === link.id) {
      //console.log('banco encontrado');
      document.getElementById("idBank").value = event.target.id;
      //console.log('siiiii');
      handleRequestGeneral();
    }
  });
}

export const errores = async (numero, anio) => {
  document.getElementById("showBalance").hidden = true;
  if (numero === 3) {
    //mostrar error balance
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "error",
      title: "No se encuentran datos para activos y efectivos en este año",
    });
  } else if (numero === 1) {
    //mutuo
    document.getElementById("showInfoPersonal").hidden = true;
    //primero
    Swal.fire({
      position: "center",
      icon: "error",
      title: `No existen datos para ese año, intente desde ${anio} en adelante`,
      showConfirmButton: true,
    });
  }
};
