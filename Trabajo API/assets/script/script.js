const dataSection = document.querySelector(".cards");
const apiURL = "https://osu.direct/api/v2/search"


// Obtener los datos de la URL, separadas ambas situaciones en la que se ingresa un valor de busqueda y otro en el que no


async function getData() {
    const res = await fetch(apiURL);
    const Data = await res.json();
    return Data;
}

async function getdata_byname(name) {
    res = await fetch(apiURL + "?query=" + name)
    Data = await res.json()
    return Data
}

// Mapas mostrados al abrir la pagina o cuando se ingresa "" dentro del buscador

async function renderData() {
    dataSection.innerHTML = ""
    FullData = await getData();
    console.log(FullData)
    let template = "";
    i=1  // Inicializa en valor de 1 para que en la primera pasada pueda ocurrir la primera "row" de tarjetas al instante en vez de en la segunda tarjeta
    
    FullData.forEach((Data) => {
    i+=1
    if (i==2){
        template += `<div class = "row ms-5">`
        i = 0
    }
    template += `
        <div class="col-sm-5 ms-5 me-5 mt-3 ">
            <div class="card">
                <div class="row">
                    <div class="col">
                        <img src=${Data.covers.card} width="200px">
                    </div>
                    <div class="col">
                        <div class="card-body">
                            <h5 class="card-title">${Data.title}</h5>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <p class="card-text"> <i class="bi bi-heart-fill"></i> ${Data.favorite_count}  |  <i class="bi bi-play"></i>  ${Data.play_count}   |  ${Data.status}</p>
                </div>
            </div>
        </div>
    `
    if (i==1){
        template+=`</div>`
    }
    })
    dataSection.innerHTML = template;
}


// Realizar busqueda por nombre en base al valor indicado en el buscador

async function searchDataByName(name){
    dataSection.innerHTML = "";
    FullData =  await getdata_byname(name)
    console.log(FullData)
    let template = ""
    i=1  // Inicializa en valor de 1 para que en la primera pasada pueda ocurrir la primera "row" de tarjetas al instante en vez de en la segunda tarjeta
    FullData.forEach((Data) => {
    i+=1
    if (i==2){
        i = 0
        template += `<div class = "row ms-5">`
    }
    template += `
        <div class="col-sm-5 ms-5 me-5 mt-3 ">
            <div class="card">
                <div class="row">
                    <div class="col">
                        <img src=${Data.covers.card} width="200px">
                    </div>
                    <div class="col">
                        <div class="card-body">
                            <h5 class="card-title">${Data.title}</h5>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <p class="card-text"> <i class="bi bi-heart-fill"></i> ${Data.favorite_count}  |  <i class="bi bi-play"></i>  ${Data.play_count}   |  ${Data.status}</p>
                </div>
            </div>
        </div>
    `
    if (i == 1){
        template+=`</div>`
    }
    })
    dataSection.innerHTML = template
}




// Eleccion de tipo de buscador, el cual se ejecuta cuando se ingresa algun valor en el buscador

form = document.getElementById("search")
searcher = document.getElementById("search-input")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    searching = searcher.value
    console.log(searching)
    if(searching.trim() == ""){
        renderData()
    }
    else{
        searchDataByName(searching)
    }
})


// Se llama la funcion al momento de abrir la pagina para que no este vacio el listado

renderData()
