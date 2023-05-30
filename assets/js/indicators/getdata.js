// esta función captura la data desde la página web
// esta función captura la data desde la página web

const APIKEY = "24b05e37a01fcdc2b6473aa94098629009e6d6df";
// URI Generica para la obtención de data
// https://api.cmfchile.cl/api-sbifv3/recursos_api/ipc/periodo/2010/01/2023/03?apikey=24b05e37a01fcdc2b6473aa94098629009e6d6df&formato=JSON

export const getData = async (
  indicador,
  mmStart,
  yyyyStart,
  mmEnd,
  yyyyEnd
) => {
  let datos = [];
  if (mmStart < 10) {
    mmStart = "0" + mmStart;
  }
  if (mmEnd < 10) {
    mmEnd = "0" + mmEnd;
  }
  try {
    const respuesta = await axios.get(
      `https://api.cmfchile.cl/api-sbifv3/recursos_api/${indicador}/periodo/${yyyyStart}/${mmStart}/${yyyyEnd}/${mmEnd}?apikey=${APIKEY}&formato=JSON`
    );
    if (respuesta.status === 200) {
      switch (indicador) {
        case "ipc":
          datos = respuesta.data.IPCs;
          break;
        case "dolar":
          datos = respuesta.data.Dolares;
          break;
        case "euro":
          datos = respuesta.data.Euros;
          break;
        case "tip":
          datos = respuesta.data.TIPs;
          break;
        case "tmc":
          datos = respuesta.data.TMCs;
          break;
        case "uf":
          datos = respuesta.data.UFs;
          break;
        case "utm":
          datos = respuesta.data.UTMs;
          break;
      }
      return datos;
    }
  } catch (error) {
    console.log("Algo falló");
  }
};

export const getLatestData = async (indicador, yyyy, mm, dd) => {
  yyyy = "2023";
  mm = "5";
  dd = "26";
  let datos = [];
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (dd < 10) {
    dd = "0" + dd;
  }
  try {
    // const respuesta = await axios.get(`https://api.cmfchile.cl/api-sbifv3/recursos_api/${indicador}/periodo/${yyyyStart}/${mmStart}/${yyyyEnd}/${mmEnd}?apikey=${APIKEY}&formato=JSON`);

    //https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar/2023/05/dias/27?apikey=24b05e37a01fcdc2b6473aa94098629009e6d6df&formato=xml
    const respuesta = await axios.get(
      `https://api.cmfchile.cl/api-sbifv3/recursos_api/${indicador}/${yyyy}/${mm}/dias/${dd}?apikey=${APIKEY}&formato=JSON`
    );
    console.log(respuesta.data);
    if (respuesta.status === 200) {
      switch (indicador) {
        case "ipc":
          datos = respuesta.data.IPCs;
          break;
        case "dolar":
          datos = respuesta.data.Dolares;
          break;
        case "euro":
          datos = respuesta.data.Euros;
          break;
        case "tip":
          datos = respuesta.data.TIPs;
          break;
        case "tmc":
          datos = respuesta.data.TMCs;
          break;
        case "uf":
          datos = respuesta.data.UFs;
          break;
        case "utm":
          datos = respuesta.data.UTMs;
          break;
      }
      console.log(datos);
      return datos;
    }
  } catch (error) {
    console.log("Algo falló");
  }
};
