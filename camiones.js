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
