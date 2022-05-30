
//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedro para el resultado
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear()-2;
const min = max -10;

// Generamos un objeto cuando se hace la busqueda con filtros.
const datosBusqueda ={
    marca: '',
    year:'',
    minimo:'',
    maximo:'',
    puertas:'',
    transmision:'',
    color:'',
}

// Eventos
document.addEventListener('DOMContentLoaded',() => {
    mostrarAutos(autos); //Muestra los autos al cargar la pag.

    // Llena las opciones de años
    llenarSelect();
})
// Event listener para los select de busqueda.
marca.addEventListener('change',(e) => {
    datosBusqueda.marca = e.target.value;
    filtrarAutos();
})
year.addEventListener('change',(e) => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAutos();
})
minimo.addEventListener('change',(e) => {
    datosBusqueda.minimo = parseInt(e.target.value);
    filtrarAutos();
})
maximo.addEventListener('change',(e) => {
    datosBusqueda.maximo = parseInt(e.target.value);
    filtrarAutos();
})
puertas.addEventListener('change',(e) => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAutos();
})
transmision.addEventListener('change',(e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarAutos();
})
color.addEventListener('change',(e) => {
    datosBusqueda.color = e.target.value;
    filtrarAutos();
})

// Funciones
function mostrarAutos(autos) {
    
    limpiarHTML(); // Elimina el HTML de los autos que no estan filtrados.

    autos.forEach(auto => {

        const {marca, modelo, year, precio, puertas, color, transmision} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca} - ${modelo} - ${year} - ${puertas} Puertas - Color: ${color} - Transmision: ${transmision} - Precio: ${precio} 
        `;
       // Insertar en el HTML
       resultado.appendChild(autoHTML);
    });
}

//limpiar el Html
function limpiarHTML(){
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

  // Genera los años del select
  function llenarSelect(){
      for (let i = max; i >= min; i-- ) {
          const opcion = document.createElement('option');
          opcion.value = i;
          opcion.textContent = i;
          year.appendChild(opcion); // Agrega las opciones de los años al select.

        }
    }
// Funcion para filtrar en base a lo que se solicite.
function filtrarAutos(){
    const resultado = autos.filter (filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)

   // console.log(resultado)
 
    // si no se filtro nada dar mensaje, sino mostrar lo que se busco.
   if (resultado.length){
       mostrarAutos(resultado);
    } else{
        noResultado();
    }
}    

function noResultado(){

    //limpiamos el HTML y dsp generamos el div con el msj de error.
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add("alerta", "error");
    noResultado.textContent = "No hay Resultados, Prueba de nuevo";
    resultado.appendChild(noResultado);

}


function filtrarMarca(auto) {
  const {marca} = datosBusqueda;
    if (marca){
       return auto.marca === marca;
   }
   return auto;
}
function filtrarYear(auto) {
    const {year} = datosBusqueda;
      if (year){
         return auto.year === year; //pasamos a num entero la streinght.
     }
     return auto;
  }
  function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
      if (minimo){
         return auto.precio >= minimo;
     }
     return auto;
  }
  function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
      if (maximo){
         return auto.precio <= maximo;
     }
     return auto;
  }
  function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
      if (puertas){
         return auto.puertas === puertas;
     }
     return auto;
  }
  function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
      if (transmision){
         return auto.transmision === transmision;
     }
     return auto;
  }
  function filtrarColor(auto) {
    const {color} = datosBusqueda;
      if (color){
         return auto.color === color;
     }
     return auto;
  }