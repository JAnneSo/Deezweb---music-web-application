// récupération de l'url
let search_params = new URLSearchParams(new URL(document.location.href).search);
let id;
// vérification de la présence du paramètre
if (search_params.has('id')) {
    id = search_params.get('id');
    console.log(id);
    // appel API
    fetch(`https://api.deezer.com/track/${id}`)
        .then(response => response.json())
        .then((track) => {
            loadTrack(track);
            document.getElementById("test").appendChild(createTrackCard(track));
            console.log(track);
        })
        .catch((err) => {
            console.log("KO");
            console.log(err);
        });

}