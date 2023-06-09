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
            data = datos.map((elemento) => elemento.Valor.replace(".",""));
            data = data.map((elemento) => elemento.replace(",","."));
            break;
        case 'utm':
            data = datos.map((elemento) => elemento.Valor.replace(".",""));
            data = data.map((elemento) => elemento.replace(",","."));
            break;
        }
    // console.log(labels, data)
    return {labels, data}    
}
