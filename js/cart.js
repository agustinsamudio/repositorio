function mostrarCarrito(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let articulos = array[i];

        htmlContentToAppend +=`
        <div class= "itemCarrito"> 
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + articulos.src + `" alt="` + `" class="imagenes">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">

                    <div class="nameDiv"><h5>`+ articulos.name +`</h5> </div>
                    <h5>Precio por unidad: ` + articulos.unitCost + articulos.currency + ` </h5> </div>
                    <input type= "number" value=`+articulos.count+` min="1" max="99" style="width: 10%" onclick="totalArticulo(`+ articulos.unitCost +`)">
                    <div class="subtotal"><strong> Subtotal: <div id="resultado"></div></strong></div>


                    </div>

                </div>
            </div>
        </div>
        </div>
        `

        document.getElementById("carrito").innerHTML = htmlContentToAppend;

};
}
function totalArticulo(variable){
    const input = document.querySelector("input");
    const id = document.getElementById("resultado");
   
    input.addEventListener("change", (e) => {
    id.innerHTML = (e.target.value)*(variable);

    })
};

function validatePayForm(){
	if	(document.getElementById("credit-card").checked) {
		document.getElementById("bank-transfer-count").disabled = true
		document.getElementById("numTarjeta").disabled = false
		document.getElementById("expiring-date").disabled = false
		document.getElementById("security-number").disabled = false
	} else if (document.getElementById("bank-transfer").checked) { 
		document.getElementById("numTarjeta").disabled = true
		document.getElementById("expiring-date").disabled = true
		document.getElementById("security-number").disabled = true
		document.getElementById("bank-transfer-count").disabled = false
}
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            producto = resultObj.data;

            mostrarCarrito(producto.articles);
            totalArticulo(producto.articles.unitCost);

        }
    });
});
