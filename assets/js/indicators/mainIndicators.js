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
// let GraficoUno = "line";
// let GraficoDos = "line";

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
    // console.log(mmStart,mmEnd,yyyyStart,yyyyEnd)
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
  document.getElementById('encabezadoGrafico').innerHTML=`
    <h2> Resultados obtenidos:</h2> `
    // <h2> Mostrando resultados obtenidos entre el  
    // ${document.getElementById('inputFechaInicial').value} y el ${document.getElementById('inputFechaFinal').value}
    // </h2> `
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
        document.getElementById("inputFechaInicial").setAttribute("disabled","disabled");
        document.getElementById("inputFechaFinal").value = new Date().toJSON().split("T")[0];
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
    
    // aquí definí la variable
    const muestraValoresIndices = async (indice,indiceId) => {
      const ultFecha = new Date().toJSON().split("T")[0];
      const fecha = new Date(ultFecha);
      const day = new Date().getDate();
      let ultMM = fecha.getUTCMonth();
      const ultYYYY = fecha.getUTCFullYear();
        if (indice == "ipc" & day <=8 ){
          ultMM = fecha.getUTCMonth()-1;
        }else{
          ultMM = fecha.getUTCMonth();
        }
            const cosa = await getData(indice,ultMM-1,ultYYYY,ultMM,ultYYYY);
            const datosFormateados = formatData(cosa,indice)
            // console.log(datosFormateados.labels.slice(-1))
            document.getElementById("detalleIndices").innerHTML +=`
                <p class="text-left">Valor ${indiceId.toUpperCase()}: ${datosFormateados.data.slice(-1)}</p>`
    }
  
    export const obtieneIndices = () => {
      const Indices = [
        { Ind: "dolar", identificador:"Dólar"},
        { Ind: "ipc", identificador:"IPC"},
        { Ind: "euro", identificador:"euro"},
        { Ind: "tip", identificador:"TIP"},
        { Ind: "utm", identificador:"UTM"},
        { Ind: "uf", identificador:"UF"},
  ]
  Indices.map((el) => {
    // console.log(el.identificador);
    muestraValoresIndices(el.Ind, el.identificador)})
}    