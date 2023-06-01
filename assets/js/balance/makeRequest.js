export const makeRequestB = async (codigoBanco, codigoCuentas, year) => {
  //alert("en MR");
  console.log(codigoCuentas);
  console.log(codigoBanco);
  // alert("en make: " + year);

  try {
    console.log(codigoCuentas);
    let respuesta = await axios.get(
      `https://api.cmfchile.cl/api-sbifv3/recursos_api/balances/${year}/cuentas/${codigoCuentas}/instituciones/${codigoBanco}?apikey=5598691df818f21be6278618948092222c0ff50f&formato=json`
    );

    console.log(respuesta);

    if (respuesta.status === 200) {
      const datos = respuesta.data;
      return datos;
    }
  } catch (error) {
    //throw new Error();
    console.log(error);
  }
};
