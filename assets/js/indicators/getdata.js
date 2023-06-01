// esta función captura la data desde la página web
// esta función captura la data desde la página web
const APIKEY= '24b05e37a01fcdc2b6473aa94098629009e6d6df'
// URI Generica para la obtención de data
// https://api.cmfchile.cl/api-sbifv3/recursos_api/ipc/periodo/2010/01/2023/03?apikey=24b05e37a01fcdc2b6473aa94098629009e6d6df&formato=JSON

export const getData = async (indicador,mmStart,yyyyStart,mmEnd,yyyyEnd) => {
    // console.log(indicador,mmStart,yyyyStart,mmEnd,yyyyEnd)
    let datos = []
    if (mmStart < 10){
        mmStart = '0'+mmStart
    }
    if (mmEnd < 10){
        mmEnd = '0'+mmEnd
    }
    try {
    const respuesta = await axios.get(`https://api.cmfchile.cl/api-sbifv3/recursos_api/${indicador}/periodo/${yyyyStart}/${mmStart}/${yyyyEnd}/${mmEnd}?apikey=${APIKEY}&formato=JSON`);
    if (respuesta.status === 200) {
        switch (indicador) {
            case 'ipc':
                //datos = respuesta.data.IPCs;
                datos = respuesta.data.Dolares;
                break;
            case 'dolar':
                datos = respuesta.data.Dolares;
                break;
            case 'euro':
                datos = respuesta.data.Euros;
                break;
            case 'tip':   
                datos = respuesta.data.TIPs;
                break;
            case 'tmc':
                datos = respuesta.data.TMCs;
                break;
            case 'uf':
                datos = respuesta.data.UFs;
                break;
            case 'utm':
                datos = respuesta.data.UTMs;
                break;
            }
        return datos
    }
    }catch (error) {
        console.log('Algo falló')
   }
  }