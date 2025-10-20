const dataSection = document.querySelector(".cards");
const apiURL = "https://osu.direct/api/v2/search"

async function getData() {
    const res = await fetch(apiURL);
    const Data = await res.json();
    return Data;
}

async function renderData() {
    dataSection.innerHTML = ""
    const FullData = await getData();
    console.log(FullData)
    let template = "";
        FullData.forEach((Data) => {
        template += `
        <div class="card">
        <h3>${Data.title}</h3>
        <img src="${Data.covers.card}"></img>
        <p>${Data.favorite_count}</p>
        <p>${Data.play_count}</p>
        <p>${Data.status}</p>
        <p>${Data.last_updated}</p>
        </div>
        `;
    });
    dataSection.innerHTML = template;
    }


async function searchDataByName(name){
    dataSection.innerHTML = "";
    const FullData = await getData()
    let template = "";
        FullData.forEach((Data) => {
            if ($Data.title.toLowerCase().includes(name.toLowerCase() )){
                template += `
                <div class="card">
                <h3>${Data.title}</h3>
                <img src="${data.covers.card}"></img>
                <p>${Data.favorite_count}</p>            
                <p>${Data.play_count}</p>
                <p>${Data.status}</p>
                <p>${Data.last_updated}</p>
                </div>
                `
            }
        });
        dataSection.innerHTML = template;
}



// async function renderData() {
//     dataSection.innerHTML = ""
//     const FullData = await getData();
//     console.log(FullData)
//     let template = "";
//     FullData.forEach((Data) => {
//         <div class="row">
//             <div class="col-sm-6">
//                 <div class="card">
//                     <div class="card-body">
//                         <h5 class="card-title">Special title treatment</h5>
//                         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//                         <a href="#" class="btn btn-primary">Go somewhere</a>
//                     </div>
//                 </div>
//             </div>
//             <div class="col-sm-6">
//                 <div class="card">
//                     <div class="card-body">
//                         <h5 class="card-title">Special title treatment</h5>
//                         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//                         <a href="#" class="btn btn-primary">Go somewhere</a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     });
//     dataSection.innerHTML = template;
// }


function search(event){
    event.preventDefault()
    searching = document.getElementById("search")
    searching = search.value
    console.log(searching)
    if(searching.trim() == ""){
        renderdata()
    }
    else{
        searchDataByName(searching);
    } 
}
searcher = document.getElementById("search")
searcher.addEventListener("onsubmit", search())
renderData()
