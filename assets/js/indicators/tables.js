// esta función carga los valores en la página web de consulta.
// esta función carga los valores en la página web de consulta.

export const drawTable = (datos, contenedor) =>{
    datos.forEach((elemento) => {
        contenedor.innerHTML +=`
        <div class="dataTable">
            <p> Fecha: ${elemento.Fecha}</P>
            <p> Valor: ${elemento.Valor}</P>
        <div>`
    });
}