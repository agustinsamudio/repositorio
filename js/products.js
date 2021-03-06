const ORDENAR_MAYOR = "MAYOR";
const ORDENAR_MENOR = "MENOR";
const ORDENAR_VENDIDOS = "VENDIDOS";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;


//Ordena los productos del mayor precio al menor precio
function sortCategoriess(criteria, array){
    let result = [];
    if (criteria === ORDENAR_MAYOR)
    {
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });

        //Los ordena del menor precio al mayor
    }else if (criteria === ORDENAR_MENOR){
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });

        //Ordena los productos mostrando los mas vendidos primero
    }else if (criteria === ORDENAR_VENDIDOS){
        result = array.sort(function(a, b) {
            let aVendidos = parseInt(a.soldCount);
            let bVendidos = parseInt(b.soldCount);

            if ( aVendidos > bVendidos ){ return -1; }
            if ( aVendidos < bVendidos ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];
// si ambos son undefined muestro todos los productos
// O 
// si ambos tienen un min y max costo distinto a undefined y son valores int muestro los seleccionados
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){

            htmlContentToAppend += `
            <a href="product-info.html?product=`+product.name+`" <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.description + product.cost +` `+ product.currency +`, `+
                         product.soldCount + ` artículos</small>
                    </div>

                </div>
            </div>
        </div>
        `
        }

        document.getElementById("lista-productos").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }
//Muestra los productos ordenados
    currentProductsArray = sortCategoriess(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDENAR_MENOR, resultObj.data);
        }
    });

    document.getElementById("Mayor").addEventListener("click", function(){
        sortAndShowProducts(ORDENAR_MAYOR);
    });

    document.getElementById("Menor").addEventListener("click", function(){
        sortAndShowProducts(ORDENAR_MENOR);
    });

    document.getElementById("Vendidos").addEventListener("click", function(){
        sortAndShowProducts(ORDENAR_VENDIDOS);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por valor del producto
        minCost = document.getElementById("rangeFilterCountMin").value;
        maxCost = document.getElementById("rangeFilterCountMax").value;
// Tiene que cumplir con: Un valor que no sea undefined Y un campo no vacio Y un valor int mayor o igual a 0
        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }
// Tiene que cumplir con: Un valor que no sea undefined Y un campo no vacio Y un valor int mayor o igual a 0
        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductList();
    });
});