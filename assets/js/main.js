import { onload } from "./onload.js";
//import { onload2 } from "./balance/onload2.js";
import { mainBalance } from "./balance/mainBalance.js";
import { mainBankInfo } from "./bankInfo/mainBankInfo.js";
import * as mainIndicators from "./indicators/mainIndicators.js";

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

// Defino todas las variables que utilizaré para manejo del DOM

mainIndicators.ObtieneIndices()

document.getElementById("inputFechaInicial").value = mainIndicators.obtieneFecha(document.getElementById("selectorPeriodo").value);
document.getElementById("inputFechaFinal").value = new Date().toJSON().split("T")[0];

document.getElementById("selectorPeriodo").addEventListener("change", mainIndicators.selectorDePeriodo);
document.getElementById("selectIndex1").addEventListener("change", mainIndicators.cambio, false);
document.getElementById("selectIndex2").addEventListener("change", mainIndicators.cambio, false);
document.getElementById("btncheck1").addEventListener("click", mainIndicators.validaComparable);

document.getElementById("tipoGraficoUno").addEventListener("change", mainIndicators.cambio)
document.getElementById("tipoGraficoDos").addEventListener("change", mainIndicators.cambio)
document.getElementById("inputFechaInicial").addEventListener("change", mainIndicators.cambio)
document.getElementById("inputFechaFinal").addEventListener("change", mainIndicators.cambio)

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
