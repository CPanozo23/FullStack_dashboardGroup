export const formatData = (datos) =>{
    const labels = datos.map((elemento) => elemento.Fecha)
    const data = datos.map((elemento) => parseFloat(elemento.Valor.replace(",",".")))
    // console.log(labels, data)
    return {labels, data}    
}
    // const labels = datos.serie.map((elemento) => elemento.fecha.split('T')[0])
    // const data = datos.serie.map((elemento) => elemento.valor)
    // labels.reverse()
    // data.reverse()
