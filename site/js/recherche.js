// récupération de l'url
let search_params = new URLSearchParams(new URL(document.location.href).search);
let qParam;
console.log(search_params);
// vérification de la présence du paramètre
if (search_params.has('q')) {
    qParam = search_params.get('q');
    console.log(qParam);
    // appel API
    search(`https://api.deezer.com/search?q=${qParam}`);
}


let searchInput = document.getElementById("search");
let urlOrderPart = "";
let radioElts = document.getElementsByName("order");
for (let i = 0; i < radioElts.length; i++) {
    radioElts[i].addEventListener("change", (e) => {
        console.log("Critère de tri : " + e.target.value);
        urlOrderPart += "&order=" + e.target.value;
        if (searchInput.value) {
            search(`https://api.deezer.com/search?q=${searchInput.value}${urlOrderPart}`);
        }
    });
}
document.getElementById("submit")
    .addEventListener("click", () => {
        if (searchInput.value) {
            search(`https://api.deezer.com/search?q=${searchInput.value}${urlOrderPart}`);
        }
    });

searchInput.addEventListener("change", (e) => {
    if (e.target.value) {
        search(`https://api.deezer.com/search?q=${e.target.value}${urlOrderPart}`);
    }
});