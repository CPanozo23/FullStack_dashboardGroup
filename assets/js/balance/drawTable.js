export const drawTable = (datos, contenedor) => {
  const container = document.getElementById('resultados');

  datos.CodigosBalances.forEach((elemento) => {
    contenedor.innerHTML += `
        <div>
        <p>Anho: ${elemento.Anho}</p>
        <p>codigo cuenta: ${elemento.CodigoCuenta}</p>
        <p>CodigoInstitucion: ${elemento.CodigoInstitucion}</p>
        <p>DescripcionCuenta: ${elemento.DescripcionCuenta}</p>
        <p>Mes: ${elemento.Mes}</p>
        <p>MonedaChilenaNoReajustable: ${elemento.MonedaChilenaNoReajustable}</p>
        <p>MonedaExtranjera: ${elemento.MonedaExtranjera}</p>
        <p>MonedaReajustablePorIPC: ${elemento.MonedaReajustablePorIPC}</p>
        <p>MonedaReajustablePorTipoDeCambio: ${elemento.MonedaReajustablePorTipoDeCambio}</p>
        <p>MonedaTotal: ${elemento.MonedaTotal}</p>
        <p>NombreInstitucion: ${elemento.NombreInstitucion}</p>
        </div>
        `;
  });
};
