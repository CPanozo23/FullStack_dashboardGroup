//import { makeRequest } from "./makeRequest.js"
export const mainBankInfo = async (option, divClick, event) => {
    switch (option) {
        case 'bankClick':
            clickedBank(divClick, event)
            break;
    }
}

function clickedBank(divClick, event) {
    // Compare the id of the selected div with the id of the bank listing
    const links = divClick.querySelectorAll('div');
    links.forEach(link => {
        if (event.target.id === link.id) {
            document.getElementById("idBank").value = event.target.id
            handleRequest(event.target.id)
            //buscar la info del banco específico con request
        }
    });
}

const handleRequest = async () => {
    let id=document.getElementById("idBank").value
    if(id===""){
      document.getElementById("titlePage").innerHTML="Primero seleccione un banco"
    }else{
        document.getElementById("titlePage").innerHTML="Aquí va el nombre del Banco"  
    }
  }