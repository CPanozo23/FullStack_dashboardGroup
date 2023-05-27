import { getData } from "./getData.js";
import { grafico, drawChart, drawChartDos } from "./charts.js";
import { formatData } from "./formatData.js";

let comparar = "No";

const cnvChartUno = document.getElementById("grafico1");

const startDate_Input = document.getElementById("inputFechaInicial");
const endDate_Input = document.getElementById("inputFechaFinal");

const dataTable = document.getElementById("secc_resultados");

const tipoGraficoUno = document.getElementById("tipoGraficoUno");
const tipoGraficoDos = document.getElementById("tipoGraficoDos");

// acá le estoy pasando las fechas y variables de fecha
// acá le estoy pasando las fechas y variables de fecha

export function obtieneFecha(mes) {
    var ahoraMenosAlgo = new Date();
    ahoraMenosAlgo.setMonth(ahoraMenosAlgo.getMonth()-mes);
    var year = ahoraMenosAlgo.getFullYear();
    var month = ahoraMenosAlgo.getMonth() +1;
    
    var day = ahoraMenosAlgo.getDay();
    if (day === 0){
        day = day +1
    }
    var formattedDate = year + '-' + addLeadingZero(month) + '-' + addLeadingZero(day);
    return formattedDate;
}

export function addLeadingZero(number) {
  return number < 10 ? "0" + number : number;
}

// Variables Globales de fechas
let mmStart = "";
let yyyyStart = "";
let mmEnd = "";
let yyyyEnd = "";
let GraficoUno = "line";
let GraficoDos = "line";

export function getDates() {
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

export const fetchData = async () => {
    // Destroy existing chart (if any)
  const indicador = document.getElementById("selectIndex1").value;
  const indicadorComparable = document.getElementById("selectIndex2").value;
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
      const datosFormateados = formatData(datos, indicador); // acá esto leyendo los datos correctos para el gráfico
      drawChart(datosFormateados, cnvChartUno, indicador);
    } else {
      const datos = await getData(
        indicador,
        mmStart,
        yyyyStart,
        mmEnd,
        yyyyEnd
      ); // acá estoy ejecutando el API Request
      // drawTable(datos,dataTable) //acá estoy generando los valores de la tabla
      const datosFormateados = formatData(datos,indicador); // acá esto leyendo los datos correctos para el gráfico
      const datos2 = await getData(
        indicadorComparable,
        mmStart,
        yyyyStart,
        mmEnd,
        yyyyEnd
      ); // acá estoy ejecutando el API Request
      // drawTable(datos2,dataTable) //acá estoy generando los valores de la tabla
      const datosFormateados2 = formatData(datos2,indicadorComparable); // acá esto leyendo los datos correctos para el gráfico
      drawChartDos(
        cnvChartUno,
        datosFormateados,
        indicador,
        datosFormateados2,
        indicadorComparable
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export function cambio() {
  //console.log('cambio a ' +selector.value)
  getDates();
  fetchData();

  let existingChart = Chart.getChart(document.getElementById('grafico1'));
  if (existingChart) {
      existingChart.destroy();
  }
    // const Destroyexisting chart (if any)
//   if (grafico != null) {
//     grafico.destroy();
//   }
  // dataTable.replaceChildren()
}

export function selectorDePeriodo() {
    switch (document.getElementById("selectorPeriodo").value) {
      case "0":
        document.getElementById("inputFechaInicial").removeAttribute("disabled");
        document.getElementById("inputFechaFinal").removeAttribute("disabled");
        break;
      default:
        document.getElementById("inputFechaInicial").value = obtieneFecha(document.getElementById("selectorPeriodo").value);
        document.getElementById("inputFechaFinal").value = new Date().toJSON().split("T")[0];
        document.getElementById("inputFechaInicial").value = obtieneFecha(document.getElementById("selectorPeriodo").value);
        document.getElementById("inputFechaInicial").setAttribute("disabled","disabled");
        document.getElementById("inputFechaFinal").setAttribute("disabled","disabled")
        cambio();
        break;
    }
}

export function validaComparable(){
    if (comparar === "No") {
        // la propiedad del botón viene por defecto en NO
        comparar = "Si";
        document.getElementById("selectIndex2").removeAttribute("disabled");
        document.getElementById("tipoGraficoDos").removeAttribute("disabled");
      } else {
        comparar = "No";
        document.getElementById("selectIndex2").setAttribute("disabled","disabled");
        document.getElementById("tipoGraficoDos").setAttribute("disabled","disabled");
        document.getElementById("selectIndex2").value = "Seleccione";
        cambio();
      }
}
//Falta agregar la última fecha de obtención de los valores:
// EJEMPLO: Valores al cierre del XX-XX-XXXX
export function ObtieneIndices() {
    const Indices = [
        { Ind: "IPC", Valor:"100", Fecha: "27-04-2023"},
        { Ind: "UF", Valor:"200", Fecha: "27-04-2023"},
        { Ind: "Dolar", Valor:"300", Fecha: "27-04-2023"},
        { Ind: "IPC", Valor:"100", Fecha: "27-04-2023"},
        { Ind: "UF", Valor:"200", Fecha: "27-04-2023"},
        { Ind: "Dolar", Valor:"300", Fecha: "27-04-2023"}
    ]
    Indices.forEach((el) => {
        document.getElementById("detalleIndices").innerHTML +=`
            <p> ${el.Ind} al cierre de ${el.Fecha}: ${el.Valor} </p>`
    });
}