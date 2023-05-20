export const makeRequest = async (inputYear, id) =>{
    try {
        let month
        const answers = []
        
        //ad 0 to number<10 for month
        //12 search in api
        for (let i = 0; i < 12; i++) {
            i+1<10 ? month="0"+(i+1) : month=i+1

            let answer = await axios.get(`https://api.sbif.cl/api-sbifv3/recursos_api/perfil/instituciones/${id}/${inputYear}/${month}?apikey=5598691df818f21be6278618948092222c0ff50f&formato=json`)
            //console.log(answer)
            answers.push(answer)    
        }

        //console.log(answers)
        document.getElementById("titlePage").innerHTML=`${answers[0].data.Perfiles[0].Perfil.nombre} - ${inputYear}`
        
        return answers
    } catch (error) {
        
    }
}