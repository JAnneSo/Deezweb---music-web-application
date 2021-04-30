// récupération de l'url
let search_params = new URLSearchParams(new URL(document.location.href).search);
let id;
// vérification de la présence du paramètre
if (search_params.has('id')) {
    id = search_params.get('id');
    console.log(id);
    // appel API
    fetch(`https://api.deezer.com/artist/${id}`)
        .then(response => response.json())
        .then((artist) => {
            document.getElementById("test").appendChild(createArtistCard(artist));
            console.log(artist);
        })
        .catch((err) => {
            console.log("KO");
            console.log(err);
        });

}

window.addEventListener("load", () => {
    setTimeout(function () { getCheckboxState(); }, 1000);

});