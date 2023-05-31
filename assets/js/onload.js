import { graph } from './bankInfo/graph.js'
import { formatData } from './bankInfo/formatData.js'
import { makeRequest } from './bankInfo/makeRequest.js'
import { cambio, obtieneFecha } from './indicators/mainIndicators.js';

export const onload = async () => {
  //[1] GENERAL ------------------------------
  readOptionGraphs()
  
  try {
    //[2] INDICATORS ------------------------------
    const indicesList = createIndicesList()
    
   
    document.getElementById('inputFechaInicial').value = obtieneFecha(24);
    document.getElementById("inputFechaFinal").value = new Date().toJSON().split("T")[0];
    console.log(indicesList)
    readIndicesList(indicesList)


    const periodoList = [24, 12, 6, 3, 0]
    const selectorPeriodo = document.getElementById('selectorPeriodo')
    periodoList.forEach((el) => {
      if(el===0){
        selectorPeriodo.innerHTML+=`<option value="${el}">Selecciona rango</option>`
      }else{
        selectorPeriodo.innerHTML+=`<option value="${el}">Últimos ${el} meses</option>`
      }
    })

    cambio()

    
    //[3] BANK INFO ------------------------------
    //button div banks
    const bankList = createBankList();
    readBankList(bankList);

    //available information in the SBIF API since 2008
    const selectYear = document.getElementById("selectYear");
    //selectYear.innerHTML = `<option value='2022' selected>2022</option>`

    for (let i = 2022; i >= 2008; i--) {
      selectYear.innerHTML += `<option value="${i}">${i}</option>`;
    }


    let lastYear = parseInt(new Date().getFullYear()-1)
    //Create new chart
    const data = await makeRequest(lastYear, '001', 'onload')
    //Graphic with 1 data
    const dataFormatAll = formatData(data, 3)
    const employeesTotal = document.getElementById('graphEmployeesActual')
    const color = 'purple'

    
    const month = ['Enero', 'Marzo', 'Mayo', 'Julio', 'Septiembre', 'Noviembre']

    //Create new chart
    graph([dataFormatAll, color], employeesTotal, month,'line', 1)

  } catch (error) {
    if (error.message.includes('internal')) {
      texto = 'Intente más tarde'
    } else {
      texto = 'Algo salió mal'
    }

    Swal.fire({
      position: 'center',
      icon: 'error',
      title: texto,
      showConfirmButton: false,
      timer: 2500
    })
  }
};



//[1] GENERAL
function readOptionGraphs(){
    const optionGraficos=`
      <option selected default value="line">📈 Lineas</option>
      <option value="bar">📊 Barras</option>`
    
    const tipoGraficoUno = document.getElementById('tipoGraficoUno')
    const tipoGraficoDos = document.getElementById('tipoGraficoDos')
    const tipoGraficoBank = document.getElementById('tipoGraficoBank')

    tipoGraficoUno.innerHTML=optionGraficos
    tipoGraficoDos.innerHTML=optionGraficos
    tipoGraficoBank.innerHTML=optionGraficos
  }

//[2] INDICES LIST
function createIndicesList() {
  const indicesList = [
      { id: 'dolar', indice: 'Dólar'},
      { id: 'euro', indice: 'Euro'},
      { id: 'ipc', indice: 'IPC'},
      { id: 'tip', indice: 'Tasa Int. Promedio'},
      { id: 'tmc', indice: 'Tasa Int. Máx. Convencional'},
      { id: 'uf', indice: 'UF'},
      { id: 'utm', indice: 'UTM'} 
  ]
  
  //saveDataLS(indicesList)
  return indicesList
}

function readIndicesList(indicesList) {
  const selectIndice1 = document.getElementById('selectIndex1')
  const selectIndice2 = document.getElementById('selectIndex2')
  selectIndice2.innerHTML= `<option selected default disabled>Seleccione</option>`
  
  indicesList.forEach((el) => {
    let option=`<option value="${el.id}">${el.indice}</option>`
    selectIndice1.innerHTML += option
    selectIndice2.innerHTML += option
  })
  
}


//[3] BANK LIST
function createBankList() {
  const banksList = [
    {
      CodigoInstitucion: "001",
      NombreInstitucion: "BANCO DE CHILE",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "009",
      NombreInstitucion: "BANCO INTERNACIONAL",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "012",
      NombreInstitucion: "BANCO DEL ESTADO DE CHILE",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "014",
      NombreInstitucion: "SCOTIABANK CHILE",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "016",
      NombreInstitucion: "BANCO DE CRÉDITO E INVERSIONES",
      Anio: 2008,
    },
    { CodigoInstitucion: "028", NombreInstitucion: "BANCO BICE", Anio: 2008 },
    {
      CodigoInstitucion: "031",
      NombreInstitucion: "HSBC BANK CHILE",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "037",
      NombreInstitucion: "BANCO SANTANDER-CHILE",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "039",
      NombreInstitucion: "ITAÚ CORPBANCA",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "041",
      NombreInstitucion: "JP MORGAN CHASE BANK",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "049",
      NombreInstitucion: "BANCO SECURITY",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "051",
      NombreInstitucion: "BANCO FALABELLA",
      Anio: 2008,
    },
    { CodigoInstitucion: "053", NombreInstitucion: "BANCO RIPLEY", Anio: 2008 },
    {
      CodigoInstitucion: "055",
      NombreInstitucion: "BANCO CONSORCIO",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "059",
      NombreInstitucion: "BANCO BTG PACTUAL CHILE",
      Anio: 2015,
    },
    {
      CodigoInstitucion: "060",
      NombreInstitucion: "CHINA CONSTRUCTION BANK",
      Anio: 2017,
    },
    {
      CodigoInstitucion: "061",
      NombreInstitucion: "BANK OF CHINA, AGENCIA EN CHILE",
      Anio: 2019,
    },
  ];

  saveDataLS(banksList);
  console.log("antes");
  return banksList;
}

function readBankList(bankList) {
  const banks = document.getElementById("banks");
  banks.innerHTML +=`<option value="0">Seleccione Banco</option>`
  bankList.forEach((elemento) => {
    
    banks.innerHTML += `<option value="${elemento.CodigoInstitucion}">${elemento.NombreInstitucion}</option>`
  });
}

function saveDataLS(banksList) {
  localStorage.setItem("banks", JSON.stringify(banksList));
}