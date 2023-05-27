export const formatData = (datos, indicador) =>{
    const labels = datos.map((elemento) => {
        const [yyyy,mm,dd] = elemento.Fecha.split('-');
        return `${dd}-${mm}-${yyyy}`
        //elemento.Fecha
    });
    let data =""
    switch (indicador) {
        case 'ipc':
            data = datos.map((elemento) => parseFloat(elemento.Valor.replace(",",".")));
            break;
        case 'dolar':
            data = datos.map((elemento) => parseFloat(elemento.Valor.replace(",",".")));
            break;
        case 'euro':
            data = datos.map((elemento) => parseFloat(elemento.Valor.replace(",",".")));
            break;
        case 'tip':   
            data = datos.map((elemento) => parseFloat(elemento.Valor.replace(",",".")));
            break;
        case 'tmc':
            data = datos.map((elemento) => parseFloat(elemento.Valor.replace(",",".")));
            break;
        case 'uf':
            data = datos.map((elemento) => parseFloat(elemento.Valor.replace(".","")));
            break;
        case 'utm':
            data = datos.map((elemento) => parseFloat(elemento.Valor.replace(".","")));
            break;
        }
   // console.log(labels, data)
    return {labels, data}    
}
    // const labels = datos.serie.map((elemento) => elemento.fecha.split('T')[0])
    // const data = datos.serie.map((elemento) => elemento.valor)
    // labels.reverse()
    // data.reverse()
