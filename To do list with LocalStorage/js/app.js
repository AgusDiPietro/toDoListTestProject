// Variables
const formulario = document.querySelector('#formulario');
const listaTwetts = document.querySelector('#lista-tweets');
let tweets = [];  //arreglo que almacena todos los twetts.

// EventListeners
eventListeners();

function eventListeners() {
    // cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

   // Borrar Tweets
   listaTwetts.addEventListener('click', borrarTweet);

    // cuando el documento esta listo(cargado en su totalidad).
   document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];
        
        console.log(tweets);
        crearHtml();
    });
}

// Funciones
function agregarTweet(e){
    e.preventDefault();

    // TextArea donde el usuario escribe su tweet.
    const tweet = document.querySelector('#tweet').value;

   // Validacion
   if (tweet ===''){
       mostrarError('No puede estar vacio')
       return; // previene/evita que se ejecuten mas lineas de codigo. (funciona en un if siempre y cuando este en una funcion).
   }

   const tweetObj = {
       id: Date.now(), //le agregamos este id, para que cada tweet sea diferente por mas que digan lo mismo.
       tweet// es igual a tweet : tweet... cuando usamos la misma palabra, se puede solo poner una.
   }

  // Añadir los tweets y que se muestren
  tweets = [...tweets, tweetObj];
  
  // una vez que agregamos el tweet creamos el HTML.
  crearHtml();

   // reiniciar el formulario despues de mandar un tweet.
   formulario.reset();
}


// Mostrar que hay un error.
function mostrarError(error) {
    const mensajeDeError = document.createElement('p');
    mensajeDeError.textContent = error;
    mensajeDeError.classList.add('error');

    // Insertar el error en el contenido.
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeDeError);

    // Hacemos que pasado un tiempo se quite el mensaje de error.
    setTimeout(() => {
        mensajeDeError.remove();
    }, 3000);
}
// Muestra Listado de los tweets.
function crearHtml() { 

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach(tweet => {

            // Agregar un boton para eliminar tweets
            const btnEliminar = document.createElement ('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // añadir funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            } 

            // Crear el HTML
            const li = document.createElement('li');

            // añadir el texto.
            li.innerText = tweet.tweet;

            //Asignar el boton al tweet
            li.appendChild(btnEliminar);

            // añade atributo unico
            li.dataset.tweetId = tweet.id;

            // insertar en el HTML
            listaTwetts.appendChild(li);

        } );
    }
    sincronizarStorage();
}

//Eliminar tweet
function borrarTweet (id) {
    tweets = tweets.filter (tweet => tweet.id !== id ); // con filter hacemos que nos traiga todos tweets excepto aquel que borramos.
    crearHtml();
}

// Agrega los tweets al LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// limpiar Html para que no se repitan los tweets cuando se agregan nuevos.
function limpiarHTML() { 
    while (listaTwetts.firstChild) {
        listaTwetts.removeChild(listaTwetts.firstChild);
    }
}