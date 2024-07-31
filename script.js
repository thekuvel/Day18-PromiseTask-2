// let api = "https://ll.thespacedevs.com/2.2.0/agencies/";
let api = "https://lldev.thespacedevs.com/2.2.0/agencies/";
let agency_Name = "India"

async function getAllAgencies(api){
    try {

        let res = await fetch(api,{
            method : "GET",
        });

    let data = await res.json();
    console.log(data)
    mapAllAgencies(data.results)

    } catch (error) {
        console.log(error)
    }  
}

getAllAgencies(api);

// Search Agencies by name
async function getAgency(api,agency_Name){
    try {
        res = await fetch(`${api}?name__contains=${agency_Name}`,
            {
                method : "GET"
            });

        data = await res.json();
        console.log("getAgency",data.results);
        mapAllAgencies(data.results)

    } catch (error) {
        console.log(error);
    }
}

// getAgency(api, agency_Name)

// Creating card for agency
let agenciesDiv = document.querySelector("#agencies");

function createCard(agency){

let card = document.createElement("div");
card.className = "card";
card.innerHTML += `
    <h2><span class="nameHeader">Name</span>: ${agency.name}</h2>
    <div class="imageDiv">
        <img src="${agency.logo_url}" alt="Logo Not Available">
    </div>
    <p><span class="abbrHeader">Abbreviation</span>: ${agency.abbrev}</p>
    <p><span class="descHeader">Description</span>: ${agency.description}</p>
`
agenciesDiv.append(card);

}

// Map all agencies

async function mapAllAgencies(agencies){
    try {
        agenciesDiv.innerHTML = "";
        agencies.map((value)=>{
            console.log(value)
            createCard(value)
        })
    } catch (error) {
        console.log(error)
    }
}


//Creating Search form
let form_Container = document.querySelector("#searchBox");
let search_Form = document.createElement("div")
search_Form.innerHTML += `
<form class="searchForm">
    <lable> Search with name </lable>
    <input type="text"
    class = "searchInput"
    placeholder="Names are Case Sensitive"
    value=""
    >
    <button type="submit" class="btn">
        submit
    </button>
    <button type="submit" class="all-btn">
        First 10
    </button>
</form>
`
form_Container.append(search_Form);

// Search Agency
searchForm = document.querySelector(".searchForm");
function getAgencyName(){
let agency_Name = document.querySelector(".searchInput").value;
return(agency_Name);
}

searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let agency_Name = getAgencyName();
    // console.log(agency_Name);
    agenciesDiv.innerHTML = "Loading";
    getAgency(api,agency_Name);
    document.querySelector(".searchInput").value = "";
})

// Load all
let allButton = document.querySelector(".all-btn");
allButton.addEventListener("click", (e)=>{
    e.preventDefault();
    agenciesDiv.innerHTML = "Loading";
    getAllAgencies(api)
})
