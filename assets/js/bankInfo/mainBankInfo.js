import { makeRequestBI } from './makeRequest.js'
import { formatDataBI } from "./formatData.js";
import { graph } from './graph.js'
  
export const mainBankInfo = async (type) => {
  document.getElementById('graphEmployees').hidden = true
  document.getElementById('graphEmployees2').hidden = true
  await handleRequest(type)
}

const handleRequest = async (type) => {
  //3 VARIABLES
  let id = document.getElementById("banks").value
  let year = document.getElementById('selectYear').value
  let typeGraph = document.getElementById('tipoGraficoBank').value

  let search = true
  //IF EXIST BANK INFO IN YEAR
  const readBanks = JSON.parse(localStorage.getItem('banks'))
  readBanks.forEach((element) => {
    if (element.CodigoInstitucion === id && element.Anio > year) {
      search = false
      document.getElementById('showInfoPersonal').hidden=true
      
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `No existen datos para ese año, intente desde ${element.Anio} en adelante`,
        showConfirmButton: true
      })

    }
  })

  if (search) {
    try {
      document.getElementById('graphEmployees').hidden = false
      document.getElementById('graphEmployees2').hidden = false
      const data = await makeRequestBI(year, id, type)
      document.getElementById('showInfoPersonal').hidden=false
      const month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
      console.log(data)
      //Graphic with 2 datas
      const dataFormatWoman = formatDataBI(data, 1)
      const dataFormatMen = formatDataBI(data, 2)

      const employees = document.getElementById('graphEmployees')
      const color1 = 'rgba(255, 99, 132, 1)'
      const color2 = 'rgba(54, 162, 235, 1)'

      // Destroy existing chart (if any)
      let existingChart = Chart.getChart(employees);
      if (existingChart) {
        existingChart.destroy();
      }

      //Create new chart
      graph([dataFormatWoman, dataFormatMen, color1, color2], employees, month, typeGraph, 2)

      //Graphic with 1 data
      const dataFormatAll = formatDataBI(data, 3)
      const employeesTotal = document.getElementById('graphEmployees2')
      const color3 = 'purple'

      // Destroy existing chart
      existingChart = Chart.getChart(employeesTotal);
      if (existingChart) {
        existingChart.destroy();
      }

      //Create new chart
      graph([dataFormatAll, color3], employeesTotal, month,typeGraph, 1)

    }catch(error){
      //console.log(error.message)
      let texto
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
  }

}//fin handle request

