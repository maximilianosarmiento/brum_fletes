//  CLASS PARA CONSTRUIR OBJETOS CAMION Y CHOFER -----------------------------------------------------
class camion{
    constructor(id, modelo, cargaMaxima, precioHora, choferDesignado){
        this.id=id;
        this.modelo = modelo;
        this.cargaMaxima = cargaMaxima;
        this.precioHora = precioHora;
        this.choferDesignado = choferDesignado;
    }

}

class chofer{
    constructor(id, nombre, apellido, dni, añosExperiencia){
        this.id=id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.añosExperiencia = añosExperiencia;
    }
}
 // ENVIADO A JSON PARA USAR AJAX ---------------------------------------

 /*// OBJETOS CONSTRUIDOS ----------------------------------------------------------------------------------------
 const choferDesignado1 = new chofer (1, "Maximiliano", "Sarrmiento", 12345678, 2);
 const choferDesignado2 = new chofer (2, "Gonzalo", "Rodriguez", 87654321, 5);
 const choferDesignado3 = new chofer (3, "Francisco",  "Pugh", 12365478, 7);
 const choferDesignado4 = new chofer (4, "Chano", "Charpentier", 09889012, undefined)
 // ENVIADO A JSON, PARA OCUPAR AJAX
 const flete1 = new camion (1,"Pick Up 100", 1000, 2000, choferDesignado1);
 const flete2 = new camion (2, "Pick Up 150", 1500, 2300, choferDesignado2);
 const flete3 = new camion (3, "Camión 2 ambientes", 3500, 2800, choferDesignado3);
 const flete4 = new camion (4, "Camión 4 ambientes", 4500, 3200, choferDesignado4);*/

// ARRAY DE OBJETOS, fletes------------------------------------------------------------------------------------


let arrayFletes =[]; 


// TRAIGO ARRAY DE OBJETOS DESDE JSON, CON AJAX---------------------------------------------------------------
$(()=>{
    $.getJSON("camiones.json", function(data){
        data.forEach(element => {
            arrayFletes.push(element)
        })

        localStorage.setItem("arrayFletes", JSON.stringify(arrayFletes));
        if (localStorage.arrayFletes){
            fletes = JSON.parse(localStorage.getItem("arrayFletes"));
        }
    })
    
})
