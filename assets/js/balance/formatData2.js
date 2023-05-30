export const formatData2 = (datos) => {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const fechas = datos.CodigosBalances.map(
    (elemento) => meses[elemento.Mes - 1]
  );

  const values = datos.CodigosBalances.map((elemento) =>
    parseInt(elemento.MonedaTotal)
  );

  console.log(values);

  // const descripcion = datos2.CodigosBalances.map(
  //   (elemento) => elemento.DescripicionCuenta
  // );

  // console.log(descripcion);

  //   console.log(fechas);
  //   console.log(values);
  return {
    labels: fechas,
    data: values,
  };
};
