import { onload } from "./onload.js";
import { mainBalance } from "./balance/mainBalance.js";
import { mainBankInfo } from "./bankInfo/mainBankInfo.js";
import * as mainIndicators from "./indicators/mainIndicators.js";

/****************** [1] GENERAL ******************/
const readData = async () => {
  await onload();
};
/****************** [2] INDICADORES ******************/

// Defino todas las variables que utilizaré para manejo del DOM

mainIndicators.obtieneIndices();

document.getElementById("inputFechaInicial").value =
  mainIndicators.obtieneFecha(document.getElementById("selectorPeriodo").value);
document.getElementById("inputFechaFinal").value = new Date()
  .toJSON()
  .split("T")[0];

document
  .getElementById("selectorPeriodo")
  .addEventListener("change", mainIndicators.selectorDePeriodo);
document
  .getElementById("selectIndex1")
  .addEventListener("change", mainIndicators.cambio, false);
document
  .getElementById("selectIndex2")
  .addEventListener("change", mainIndicators.cambio, false);
document
  .getElementById("btncheck1")
  .addEventListener("click", mainIndicators.validaComparable);

document
  .getElementById("tipoGraficoUno")
  .addEventListener("change", mainIndicators.cambio);
document
  .getElementById("tipoGraficoDos")
  .addEventListener("change", mainIndicators.cambio);
document
  .getElementById("inputFechaInicial")
  .addEventListener("change", mainIndicators.cambio);
document
  .getElementById("inputFechaFinal")
  .addEventListener("change", mainIndicators.cambio);

/****************** [3] BANK INFO ******************/
const bankClick = document.getElementById("banks");
const year = document.getElementById("selectYear");
const typeGraph = document.getElementById("tipoGraficoBank");

const selectedBankInfo = async (event) => {
  console.log(event.type);
  document.getElementById("titlePage").innerHTML = "";
  document.getElementById("showInfoPersonal").hidden = true;
  if (bankClick.value === "0") {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Primero seleccione un banco",
      showConfirmButton: false,
      timer: 2500,
    });
  } else {
    //alert("si")
    await mainBankInfo(event.type);
    await mainBalance(year.value, bankClick.value, typeGraph.value);
  }
};

bankClick.addEventListener("change", selectedBankInfo);
year.addEventListener("change", selectedBankInfo);
typeGraph.addEventListener("change", selectedBankInfo);

/****************** [4] BALANCE ******************/

const handleRequestBtn2 = async () => {
  await mainBalance("yearClick");
};
console.log(year.value);
console.log(typeGraph.value);

/*************************************************/
document.addEventListener("DOMContentLoaded", readData);
