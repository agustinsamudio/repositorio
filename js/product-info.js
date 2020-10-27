var product = {};

function showImagesGalleryy(array){

    let htmlContentToAppend = "";

        let imageSrc = array[1];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("imagenChevrolet").innerHTML = htmlContentToAppend;
    }

    function getQueryVariable (variable) {
        var query = window.location.search.substring(1);
    
        var vars= query.split("&");
    
        for (var i=0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
    }
    let nombre = getQueryVariable('product');
    let name = decodeURIComponent(nombre);

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
        
            productNameHTML.innerHTML = name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost +` `+ product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGalleryy(product.images);
        }
    });
});
//Funcion que sirve para mostrar todas las estrellas y que se vean las estrellas en negro
//Las estrellas negras siempre se pintan primero si o si, siempre y cuando sean hasta 5 estrellas
function obtenerEstrellasVacia(puntaje) {
	let estrellasVacias = "";
	for(let i = puntaje; i < 5; i++){
		estrellasVacias += `<span class="fa fa-star"></span>`
	}
	return estrellasVacias;
}
//Funcion que muestra las estrellas amarillas en base a la puntuacion precargada
function obtenerEstrellas(puntaje){
	let estrellas = "";
	for(let i = 0; i < puntaje; i++){
	estrellas += `<span class="fa fa-star checked"></span>`
}
return estrellas;
}
var commentsArray = [];

//Funcion que muestra los comentarios
    function showCommentsList(array) {
        let htmlComments = "";
        for (let i = 0; i < array.length; i++) {
            let comment = array[i];
    
            htmlComments +=`
                <div class="comentarios">
                    <div class="list-group-item list-group-item-action">
    
                        <div class="text-left p-2">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">` + comment.user + ` </h4
                                <small class="text muted">` + comment.dateTime + `</small>
                            </div>
                            <p class="mb-1">` + comment.description + ` </p>
                                <p id="commentScore"> ` + comment.score + " " + obtenerEstrellas(comment.score)+ obtenerEstrellasVacia(comment.score)+`
                                </p>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                </div>`
    }
    document.getElementById("comments").innerHTML = htmlComments;
}


document.addEventListener("DOMContentLoaded", function(e){
    showSpinner();
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){

        if (resultObj.status === "ok")
        {
            commentsArray = resultObj.data;
            //Muestro los comentarios 
            showCommentsList(commentsArray);
            hideSpinner();
        }
    });
});
var productsArray = [];

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 2; i < array.length; i++){
        let productos = array[1];
        array[1] = array[3];
        htmlContentToAppend += `
        <a href="product-info.html?product=`+productos.name+`" <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-2">
                <img src="` + productos.imgSrc + `" alt="` + productos.description + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ productos.name +`</h4>
                    <small class="text-muted">` + productos.description + productos.cost +` `+ productos.currency +`, `+
                    productos.soldCount + ` artículos</small>
                </div>

            </div>
        </div>
    </div>
    `
    

        document.getElementById("relacionados").innerHTML = htmlContentToAppend;
    }
}
    getJSONData(PRODUCTS_URL).then(function(resultObj){

        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProductsList(productsArray);
            hideSpinner();
        }
    });
