//import { onload2 } from "./onload2.js";
import { makeRequest } from "./makeRequest.js";
// import { makeRequest2 } from './makeRequest2.js';
//import { drawTable } from './drawTable.js';
import { graph } from "./graph.js";
import { formatData } from "./formatData.js";
import { formatData2 } from "./formatData2.js";

/*
const readData = async () => {
  try {
    const bankList = await onload();

    //const button = document.getElementById('btnGeneralYear');
    //button.addEventListener('click', handleRequest)
  } catch (error) {
    // Manejar el error
  }
};*/
//document.addEventListener("DOMContentLoaded", readData);
// import { graphPie } from './graphPie.js';
//const input = document.getElementById('indicador'); divClick
const bank = document.getElementById("divClick");
const button = document.getElementById("consultar");
//const select = document.getElementById("year");
export const mainBalance = async (option, divClick, event) => {
  //alert("en main balance");
  if (option === "bankClick") {
    //clickedBank(divClick, event);
  } else if (option === "yearClick") {
    //handleRequestGeneral();
  }
};

const handleRequestGeneral = async () => {
  let id = document.getElementById("idBank").value;
  let year = document.getElementById("selectYear").value;
  //alert("año en el general: " + year);
  let search = true;
  if (id === "") {
    document.getElementById("titlePage").innerHTML =
      "Primero seleccione un banco";
    search = false;
  } else {
    const readBanks = JSON.parse(localStorage.getItem("banks"));
    readBanks.forEach((element) => {
      if (element.CodigoInstitucion === id && element.Anio > year) {
        document.getElementById("titlePage").innerHTML =
          "No existen datos para ese año";
        search = false;
      }
    });
  }
  if (search) {
    //alert("en el search");
    handleRequest1(year);
    handleRequest2(year);
  }
};

const handleRequest1 = async (year) => {
  //console.log('hola');
  //console.log(year.value);
  //const indicador = input.value;
  try {
    // const respuesta = await axios.get(
    //   'https://api.cmfchile.cl/api-sbifv3/recursos_api/balances/2009/cuentas/1100000/instituciones/001?apikey=5598691df818f21be6278618948092222c0ff50f&formato=json'
    // );
    // const datos = respuesta.data;
    let cuenta = "1100000";
    let idBanco = document.getElementById("idBank").value;

    //let year = document.getElementById("selectYear").value;

    //alert("año en hr1: " + year);
    const datos = await makeRequest(idBanco, cuenta, year);
    console.log(datos);

    //!esto es para ejecutar la funcion drawTable en el contenedor
    // const container = document.getElementById('resultados');
    // drawTable(datos.CodigosBalances, container);
    //!fin
    const canva = document.getElementById("graficoBalance1");
    const datosFormateados = formatData(datos);
    // console.log(datosFormateados);
    // Destroy existing chart

    let existingChart = Chart.getChart(canva);

    if (existingChart) {
      existingChart.destroy();
    }
    graph(datosFormateados, canva, "bar");
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
      title: "Ha ocurrido un problema",
    });
  }
};

const handleRequest2 = async (year) => {
  console.log("holaa");
  //const indicador = input.value;
  try {
    let cuenta = "1000000";
    let idBanco = document.getElementById("idBank").value;
    //console.log(cuenta);
    //alert(idBanco);
    //idBanco=document.getElementById("idBank")

    const datos = await makeRequest(idBanco, cuenta, year);
    console.log(datos);
    console.log("datos2222222");
    const canva = document.getElementById("graficoBalance2");
    const datosFormateados = formatData2(datos);
    // console.log(datosFormateados);
    let existingChart = Chart.getChart(canva);

    if (existingChart) {
      existingChart.destroy();
    }
    graph(datosFormateados, canva, "line");
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
      title: "Ha ocurrido un problema",
    });
  }
};

button.addEventListener("click", handleRequestGeneral);

function clickedBank(divClick, event) {
  // Compare the id of the selected div with the id of the bank listing
  //console.log('obtener todos los divd');
  const links = divClick.querySelectorAll("div");
  //console.log(links);

  //search id from list of bank
  links.forEach((link) => {
    //console.log(link.id);
    //console.log('evento del id:');
    //console.log(event.target.id);
    if (event.target.id === link.id) {
      //console.log('banco encontrado');
      document.getElementById("idBank").value = event.target.id;
      //console.log('siiiii');
      handleRequestGeneral();
    }
  });
}
//[3.1] Use when clicked the bank of the list
const divClick = document.getElementById("banks");

const selectedBank = async (event) => {
  //console.log('en selectedBank');
  await clickedBank(divClick, event);
};
divClick.addEventListener("click", selectedBank);
