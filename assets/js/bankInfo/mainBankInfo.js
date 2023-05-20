import { makeRequest } from "./makeRequest.js"
import { formatData } from './formatData.js'
import { graph } from "./graph.js"
const bankList = []

export const mainBankInfo = async (option, divClick, event) => {
  document.getElementById('graphEmployees').hidden=true
  document.getElementById('graphEmployees2').hidden=true
    switch (option) {
        case 'bankClick':
            clickedBank(divClick, event)
            break;
        case 'yearClick':
          //alert("holi")
          handleRequest()
          break;
    }
}

function clickedBank(divClick, event) {
    // Compare the id of the selected div with the id of the bank listing
    const links = divClick.querySelectorAll('div');

    //search id from list of bank
    links.forEach(link => {
        if (event.target.id === link.id) {
            document.getElementById("idBank").value = event.target.id
            handleRequest()
        }
    })
}

const handleRequest = async () => {
    let id=document.getElementById("idBank").value
    let year=document.getElementById("selectYear").value
    let search = true
    if(id===""){
      document.getElementById("titlePage").innerHTML="Primero seleccione un banco"
      search=false
    }else{
    const readBanks = JSON.parse(localStorage.getItem('banks'))
    readBanks.forEach((element) => {
      if(element.CodigoInstitucion===id && element.Anio>year)
      {
        document.getElementById("titlePage").innerHTML="No existen datos para ese año"
        search=false
      }
    })

if(search){
  try {
    document.getElementById('graphEmployees').hidden=false
  document.getElementById('graphEmployees2').hidden=false
      const data = await makeRequest(year, id)            
      
      const month= ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
      
      //Graphic with 2 datas
      const dataFormatWoman = formatData(data, 1)
      const dataFormatMen = formatData(data, 2)
      const employees = document.getElementById('graphEmployees')
      const color1 ='rgba(255, 99, 132, 1)'
      const color2 ='rgba(54, 162, 235, 1)'

      // Destroy existing chart (if any)
      let existingChart = Chart.getChart(employees);
      if (existingChart) {
        existingChart.destroy();
      }

      //Create new chart
      graph([dataFormatWoman, dataFormatMen, color1, color2], employees, month, 2)

      //Graphic with 1 data
      const dataFormatAll = formatData(data, 3)
      const employeesTotal = document.getElementById('graphEmployees2')
      const color3='purple'

      // Destroy existing chart
      existingChart = Chart.getChart(employeesTotal);
      if (existingChart) {
        existingChart.destroy();
      }

      //Create new chart
      graph([dataFormatAll, color3], employeesTotal, month, 1)

    } catch (error) {
  
      console.log(error.message)
      let texto
      if(error.message.includes('internal')){
        texto = 'Intente más tarde'
      }else{
        texto= 'Algo salió mal'
      }
  
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
      })
  
      Toast.fire({
        icon: 'error',
        title: texto,
      })
    }
}
          
    }
  }
