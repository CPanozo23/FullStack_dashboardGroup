// acá tengo el gráfico
// acá tengo el gráfico
export let grafico =[]
    
export const drawChart = (datos, contenedor, titulo, tipoGrafico1) => {
    grafico = new Chart(contenedor, {
        type: tipoGrafico1,
        data: {
            labels: datos.labels,
            datasets: [{
            label: 'Evolución ' + titulo,
            data: datos.data,
            borderWidth: 0
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: false
            }
            }
        }
        
})   
    // return grafico.destroy();
    // console.log(grafico)
    return grafico
}

export const drawChartDos = (contenedor, datos1, titulo1, datos2, titulo2, tipoGrafico1, tipoGrafico2) => {
    grafico = new Chart(contenedor, {
        type: tipoGrafico1,        
        data: {
            datasets: [{
            type: tipoGrafico1,
            label: 'Evolución ' + titulo1,
            data: datos1.data,
            borderWidth: 0
            },{
            type: tipoGrafico2,
            label: 'Evolución ' + titulo2,
            data: datos2.data,
            borderWidth: 0
            }],
            labels: datos1.labels
        },
        options: {
            scales: {
            y: {
                beginAtZero: false
            }
            }
        }
})
    return grafico
}

  