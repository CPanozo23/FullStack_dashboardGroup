import { onload } from "./onload.js"
//import { mainBalance } from "./balance/mainBalance.js"
import { mainBankInfo } from "./bankInfo/mainBankInfo.js"
//import { mainIndicator } from "./indicators/mainIndicator.js"

/****************** [1] GENERAL ******************/
const bankList = []

const readData = async () => {
    try {
        bankList = await onload()
    } catch (error) {
        // Manejar el error
    }
}
/****************** [2] BALANCE ******************/

/****************** [3] BANK INFO ******************/
//[3.1] Use when clicked the bank of the list
const divClick = document.getElementById('banks');

const selectedBank = async (event) => {
    await mainBankInfo('bankClick', divClick, event)
}
divClick.addEventListener('click', selectedBank);

//[3.2] Use when clicked the button year
const btnYear = document.getElementById('btnGeneralYear');

const handleRequestBtn = async () => {
    await mainBankInfo('yearClick')
}

btnYear.addEventListener('click', handleRequestBtn)

/****************** [4] BALANCE ******************/


/*************************************************/
document.addEventListener('DOMContentLoaded', readData);