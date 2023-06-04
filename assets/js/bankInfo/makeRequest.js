export const makeRequestBI = async (inputYear, id, type) =>{
    let month
    const answers = []
    const loadingAlert = Swal.fire({
      title: 'Cargando los datos',
      text: 'Espere un momento...',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false
    })
    try {
        //add 0 to number<10 for month
        //12 search in api
    if(type==='onload'){
      

        for (let i = 0; i < 12; i+=2) {
            i+1<10 ? month="0"+(i+1) : month=i+1
            let answer = await axios.get(`https://api.sbif.cl/api-sbifv3/recursos_api/perfil/instituciones/${id}/${inputYear}/${month}?apikey=5598691df818f21be6278618948092222c0ff50f&formato=json`)

            answers.push(answer)  
        }
        loadingAlert.close();

    }else{

        

        for (let i = 0; i < 12; i++) {
            i+1<10 ? month="0"+(i+1) : month=i+1
            let answer = await axios.get(`https://api.sbif.cl/api-sbifv3/recursos_api/perfil/instituciones/${id}/${inputYear}/${month}?apikey=5598691df818f21be6278618948092222c0ff50f&formato=json`)
            answers.push(answer)    
        }
        loadingAlert.close();
    }
        
        
        if(type==="change"){
            document.getElementById('titlePage').hidden=false
          }else{
            document.getElementById('titlePage').hidden=true
          }
        document.getElementById("titlePage").innerHTML=`${answers[0].data.Perfiles[0].Perfil.nombre} - ${inputYear}`
        
        return answers
    } catch (error) {
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