//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function manejadorDeSubmit(evento){
    evento.preventDefault();
    sessionStorage.setItem('logueado',true);
    window.location.href = 'index.html';
    return true;
     }
     document.addEventListener("DOMContentLoaded", function(e){
        document.getElementById('formulario-login').addEventListener('submit', manejadorDeSubmit);
        });