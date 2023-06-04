# PROYECTO 3: Tablero de datos (Dashboard)
## Temas
* [1. Introducción](#1-Introducción)
* [2. Características](#2-Características)
* [3. WebSite](#3-WebSite)
* [4. Equipo](#4-Equipo)

## 1. Introducción

Este es el tercer proyecto creado para Bootcamp Full Stack con JavaScript, el cual se ha desarrollado grupalmente

## 2. Características

El proyecto consiste en crear un panel de control prototipo que se conecta a una API y muestra los resultados en gráficos utilizando Chart.js. 

Los mensajes de alerta se muestran utilizando SweetAlert, la conexión se realiza utilizando Axios y el diseño se implementa con Bootstrap.

La conexión se realizó al sitio web de la Comisión para el Mercado Financiero de Chile, utilizando la API CMF Banks v3.

Como esta fue una actividad de grupo, cada miembro del equipo estableció una conexión diferente y los resultados se mostraron en la página index.html.

## 3. WebSite

- **a. Resumen**
    
    Se muestran los resultados de los índices actuales, así como los datos correspondientes al año anterior del primer banco a analizar, (Banco de Chile), junto con su balance financiero.
    
    Esta sección se carga al momento de ingresar a la página principal.
    
 - **b. Indicadores Financieros**
    
    Es posible seleccionar un indicador específico y elegir un período de tiempo predefinido o fechas exactas para visualizar los datos. Además, también se puede seleccionar el tipo de gráfico que se desea mostrar.

    Para realizar un análisis más completo, se puede comparar diferentes indicadores para observar su evolución a lo largo del tiempo. Esto proporciona una visión más detallada de cómo han variado y se han relacionado entre sí a lo largo del período seleccionado.
    
- **c. Información bancaria**

    Para conocer el perfil del banco seleccionado, se puede visualizar gráficamente la cantidad de empleados. En primer lugar, se ve un gráfico que representa la cantidad de hombres y mujeres empleados y a continuación, se presenta un gráfico resumen que muestra el total de empleados en ese período.

    Además, para analizar los movimientos del banco, se ve dos cuentas principales de su balance: el efectivo y los activos. Estos datos se presentan en gráficos que permiten visualizar su evolución y comprender mejor la situación financiera del banco en el período analizado.

 - **d. Alertas**

    En el caso de los gráficos de empleados, debido a que se realiza una consulta por cada mes del año seleccionado, existe un tiempo de carga antes de que el gráfico se muestre. Para informar al usuario sobre esto, se agrega mensajes que indican que los datos se están cargando.

    Además, es importante tener en cuenta que no todos los bancos tienen datos disponibles para todos los años seleccionados, por lo que se informa al usuario de esta situación para evitar confusiones.

    Considerando la experiencia del usuario, se indica visualmente cuando faltan datos para generar los gráficos. Esto ayuda a evitar malentendidos y a mejorar la claridad de la interfaz.

## 4. Equipo

Nuestro equipo está compuesto por:
    
[Jonathan Hernández: https://github.com/Jhernandez84](https://github.com/Jhernandez84)
    
[Fabiola Núñez: https://github.com/fabiolanunez](https://github.com/fabiolanunez)
    
[Cecilia Panozo: https://github.com/CPanozo23](https://github.com/CPanozo23)

