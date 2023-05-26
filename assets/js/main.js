import { onload } from "./onload.js";
//import { onload2 } from "./balance/onload2.js";
import { mainBalance } from "./balance/mainBalance.js";
import { mainBankInfo } from "./bankInfo/mainBankInfo.js";
//import { mainIndicator } from "./indicators/mainIndicator.js"

/****************** [1] GENERAL ******************/
const bankList = [];
const bankList2 = [];
const readData = async () => {
  try {
    console.log("aaaa");
    bankList = await onload();
    console.log("jojo");
    alert("onload");
    //bankList2 = await onload2();
  } catch (error) {
    // Manejar el error
    console.log(error);
  }
};
/****************** [2] INDICADORES ******************/

// Importamos todas las funciones de los modulos
import { getData } from "./indicators/getData.js";
import { drawTable } from "./indicators/tables.js";
import { grafico, drawChart, drawChartDos } from "./indicators/charts.js";
import { formatData } from "./indicators/formatData.js";

let comparar = "No";
const inputIndiceComp = document.getElementById("btncheck1");
const cnvChartUno = document.getElementById("grafico1");
const cnvChartDos = document.getElementById("grafico2");
const cnvChartTres = document.getElementById("grafico3");

const selectorPeriodo = document.getElementById("selectorPeriodo");
const startDate_Input = document.getElementById("inputFechaInicial");
const endDate_Input = document.getElementById("inputFechaFinal");

// le paso las fechas iniciales y finales de la consulta.
// let fechaAhora = new Date().toJSON().split('T')[0];
// let fechaMenosAlgo = obtieneFecha(12);

function obtieneFecha(mes) {
    var ahoraMenosAlgo = new Date();
    ahoraMenosAlgo.setMonth(ahoraMenosAlgo.getMonth()-mes);
    var year = ahoraMenosAlgo.getFullYear();
    var month = ahoraMenosAlgo.getMonth() +1;
    
    var day = ahoraMenosAlgo.getDay();
    if (day === 0){
        day = day +1
    }
    console.log(day, month, year)
    var formattedDate = year + '-' + addLeadingZero(month) + '-' + addLeadingZero(day);
    return formattedDate;

}

function addLeadingZero(number) {
  return number < 10 ? "0" + number : number;
}

startDate_Input.value = obtieneFecha(selectorPeriodo.value);
endDate_Input.value = new Date().toJSON().split("T")[0];

// const startDateInput = document.getElementById('inputFechaInicial');
const dataTable = document.getElementById("secc_resultados");
const selector = document.getElementById("selector");
const selectorDos = document.getElementById("selectorDos");
const tipoGraficoUno = document.getElementById("tipoGraficoUno");
const tipoGraficoDos = document.getElementById("tipoGraficoDos");

// Variables Globales de fechas
let mmStart = "";
let yyyyStart = "";
let mmEnd = "";
let yyyyEnd = "";
let GraficoUno = "line";
let GraficoDos = "line";

function getDates() {
  const startDateValue = new Date(
    document.getElementById("inputFechaInicial").value
  );
  const endDateValue = new Date(
    document.getElementById("inputFechaFinal").value
  );
  mmStart = startDateValue.getUTCMonth() + 1;
  mmEnd = endDateValue.getUTCMonth() + 1;
  yyyyStart = startDateValue.getUTCFullYear();
  yyyyEnd = endDateValue.getUTCFullYear();
}

const fetchData = async () => {
  const indicador = selector.value;
  const indicadorComparable = selectorDos.value;
  // console.log(indicadorAPI(indicador))
  // necesito generar una función que me muestre el buscador dependiendo del indicador
  try {
    if (comparar === "No") {
      const datos = await getData(
        indicador,
        mmStart,
        yyyyStart,
        mmEnd,
        yyyyEnd
      ); // acá estoy ejecutando el API Request
      // drawTable(datos,dataTable) //acá estoy generando los valores de la tabla
      const datosFormateados = formatData(datos); // acá esto leyendo los datos correctos para el gráfico
      drawChart(datosFormateados, cnvChartUno, indicador, GraficoUno);
    } else {
      const datos = await getData(
        indicador,
        mmStart,
        yyyyStart,
        mmEnd,
        yyyyEnd
      ); // acá estoy ejecutando el API Request
      // drawTable(datos,dataTable) //acá estoy generando los valores de la tabla
      const datosFormateados = formatData(datos); // acá esto leyendo los datos correctos para el gráfico
      const datos2 = await getData(
        indicadorComparable,
        mmStart,
        yyyyStart,
        mmEnd,
        yyyyEnd
      ); // acá estoy ejecutando el API Request
      // drawTable(datos2,dataTable) //acá estoy generando los valores de la tabla
      const datosFormateados2 = formatData(datos2); // acá esto leyendo los datos correctos para el gráfico
      drawChartDos(
        cnvChartUno,
        datosFormateados,
        indicador,
        datosFormateados2,
        indicadorComparable,
        GraficoUno,
        GraficoDos
      );
    }
  } catch (error) {
    console.log(error);
  }
};

function cambio() {
  //console.log('cambio a ' +selector.value)
  getDates();
  fetchData();
  if (grafico != null) {
    grafico.destroy();
  }
  // dataTable.replaceChildren()
}

selector.addEventListener("change", cambio, false);
selectorDos.addEventListener("change", cambio, false);

selectorPeriodo.addEventListener("change", () => {
  console.log(selectorPeriodo.value);
  switch (selectorPeriodo.value) {
    case "0":
      startDate_Input.disabled = false;
      endDate_Input.disabled = false;
      break;
    default:
      startDate_Input.value = obtieneFecha(selectorPeriodo.value);
      startDate_Input.disabled = true;
      endDate_Input.disabled = true;
      cambio();
      break;
  }
});
startDate_Input.addEventListener("change", cambio);
endDate_Input.addEventListener("change", cambio);

inputIndiceComp.addEventListener("click", () => {
  if (comparar === "No") {
    // la propiedad del botón viene por defecto en NO
    comparar = "Si";
    selectorDos.disabled = false;
    tipoGraficoDos.disabled = false;
  } else {
    comparar = "No";
    selectorDos.disabled = true;
    tipoGraficoDos.disabled = true;
    selectorDos.value = "Seleccione";
    cambio();
  }
});
tipoGraficoUno.addEventListener("change", () => {
  GraficoUno = tipoGraficoUno.value;
  cambio();
});
tipoGraficoDos.addEventListener("change", () => {
  GraficoDos = tipoGraficoDos.value;
  cambio();
});

/****************** [3] BANK INFO ******************/
//[3.1] Use when clicked the bank of the list
const divClick = document.getElementById("banks");

const selectedBank = async (event) => {
  await mainBankInfo("bankClick", divClick, event);
};
divClick.addEventListener("click", selectedBank);

//[3.2] Use when clicked the button year
const btnYear = document.getElementById("btnGeneralYear");

const handleRequestBtn = async () => {
  await mainBankInfo("yearClick");
};

btnYear.addEventListener("click", handleRequestBtn);

/****************** [4] BALANCE ******************/
//[4.1] Use when clicked the bank of the list
const divClick2 = document.getElementById("banks2");

/*const selectedBank2 = async (event) => {
  await mainBalance("bankClick", divClick2, event);
};*/
//divClick2.addEventListener("click", selectedBank2);

//[4.2] Use when clicked the button year
const btnYear2 = document.getElementById("consultar");

const handleRequestBtn2 = async () => {
  await mainBalance("yearClick");
};

btnYear2.addEventListener("click", handleRequestBtn2);
/*************************************************/
document.addEventListener("DOMContentLoaded", readData);
