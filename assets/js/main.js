import { onload } from "./onload.js"
//import { mainBalance } from "./balance/mainBalance.js"
import { mainBankInfo } from "./bankInfo/mainBankInfo.js"
//import { mainIndicator } from "./indicators/mainIndicator.js"

/****************** [1] GENERAL ******************/
const readData = async () => {
    try {
        const bankList = await onload()
        //const button = document.getElementById('btnGeneralYear');
        //button.addEventListener('click', handleRequest)
    } catch (error) {
        // Manejar el error
    }
}
/****************** [2] BALANCE ******************/

/****************** [3] BANK INFO ******************/


/****************** [4] BALANCE ******************/


/*************************************************/
document.addEventListener('DOMContentLoaded', readData);