let formDatos = document.getElementById("formDatos");
let horas;
let carga;
let divResultados = document.getElementById("divResultados");
let parrafoError = document.getElementById("parrafoError");
let reservas = [];

// Botón de la barra lateral ---------------------------------------------------

$(`.btnBar`).click(() =>{
    $(`.containerBar`).toggleClass("active");
})

formDatos.addEventListener("submit", (e) =>{
    e.preventDefault();
    let horas = document.getElementById("horas").value;
    let carga = document.getElementById("carga").value;
    let resultados = [];

    // Ciclo con condicional para la búsqueda -------------------------------------------
    for (let i = 0; i < fletes.length; i++) {
        if (fletes[i].cargaMaxima >= carga){
            resultados.push(fletes[i]);
        }
    }
    
    // Impresión de los resultados de la bùsqueda -----------------------------
    divResultados.innerHTML = ""
    if(divResultados.children.length == 0 && resultados.length != 0){
        divResultados.innerHTML = ""
        resultados.forEach(resultado => {
            divResultados.innerHTML += `
            <div class="card" id="resultado${resultado.id}" style="width: 18rem; margin:8px">
                <img src="./img/img1.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${resultado.modelo}</h5>
                    <p class="card-text">Carga Máxima: ${resultado.cargaMaxima} KG</p>
                    <p class="card-text">Precio por hora: $${resultado.precioHora}</p>
                    <button type="button" class="btn btn-primary btnCard" data-bs-toggle="modal" data-bs-target="#exampleModal${resultado.choferDesignado.id}">
                    Consultar Chofer
                    </button>
                    <button type="button" class="btn btn-success btnCard" id="botonPago"data-bs-toggle="modal" data-bs-target=".Modal${resultado.id}">
                        Reservar Camión
                    </button>
                    <button class="btn btn-danger btnCard" id="botonEliminar${resultado.id}" style=" margin:1px">Eliminar</button>
                    

                    <!-- Modal CHOFER -->
                    <div class="modal fade modalChofer" id="exampleModal${resultado.choferDesignado.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Chofer Designado</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p><strong>Chofer:</strong> ${resultado.choferDesignado.nombre} ${resultado.choferDesignado.apellido} </p>
                                    <p><strong>D.N.I.:</strong> ${resultado.choferDesignado.dni}</p>
                                    <p><strong>Experiencia:</strong> ${resultado.choferDesignado.añosExperiencia} Años</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- Modal DATOS RESERVA-->
                    <div class="modal fade Modal${resultado.id}" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Datos de Reserva</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="nombre" class="form-label">Nombre y Apellido</label>
                                        <input type="text" class="form-control inputReserva${resultado.id}" id="nombre" placeholder="Maximiliano Sarmiento" name="nombre">
                                        <br>
                                        <p><strong>Domicilio:</strong></p>
                                        <label for="calle" class="form-label">Calle</label>
                                        <input type="text" class="form-control inputReserva${resultado.id}" id="calle" placeholder="San Martin" name="calle">
                                        <label for="numero" class="form-label">Altura</label>
                                        <input type="number" class="form-control inputReserva${resultado.id}" id="numero" placeholder="1234" name="numero">
                                        <br>
                                        <strong><p>Total a pagar por horas ingresadas: $${horas*resultado.precioHora}</p></strong>
                                        <label for="tarjeta" class="form-label">Ingrese su número de Tarjeta</label>
                                        <input type="number" class="form-control inputReserva${resultado.id}" id="tarjeta" placeholder="2762 4569 8987 4321" name="tarjeta">
                                        <input type="number" class="form-control inputReserva${resultado.id}" id="cuotas" placeholder="Numero de cuotas" name="cuotas">
                                        <p id="pReserva"></p>
                                    </div>
                                    
                                    <button type="button" class="btn btn-success" id="botonReservar${resultado.id}"data-bs-toggle="modal" data-bs-target=".reserva">
                                        Confirmar Reserva
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- Modal RESERVA EXITOSA -->
                    <div class="modal fade reserva" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Reserva exitosa</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <strong><p>¡Felicidades!</p></strong>
                                    <p>Su reserva se ha realizado con éxito! Gracias por confiar en nuestro servicio.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        })
    }else if (resultados.length == 0){
        divResultados.innerHTML +=`
        <div id="containerAlerta">
            <p id="parrafoAlerta"> El peso de su carga, supera la carga Máxima de todos los camiones registrados. </p>
        </div>`
    }
    
    
    // UTILIZO POST PARA ENVIAR LA RESERVA Y GUARDAR EN LOCAL STORAGE ------------------------------------
    resultados.forEach((resultado) =>{ 
        $(`#botonReservar${resultado.id}`).click(() => {
            reservas.push(resultado);
            $.post('https://jsonplaceholder.typicode.com/posts', JSON.stringify(reservas), function(estado){
            if(estado){
                localStorage.setItem(`reservas`, JSON.stringify(reservas))
            }
            })
        })
    })

    //BOTÓN PARA ELIMINAR LA RESERVA, DEL ALMACENAMIENTO, DEL DOM Y DEL ARRAY DE RESULTADOS. --------------
    resultados.forEach((resultado) => {
        document.getElementById(`botonEliminar${resultado.id}`).addEventListener("click", () => {

            $(`#resultado${resultado.id}`).fadeOut("slow"); // APLICO EFECTO CON JQUERY.----------------------
            
            reservas.splice(resultado, 1);
            localStorage.setItem(`reservas`, JSON.stringify(reservas));

        })
    })
    
    formDatos.reset();
});
    