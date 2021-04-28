// récupération de l'url
let search_params = new URLSearchParams(new URL(document.location.href).search);
let id;
console.log(typeof document.location.href);
console.log(search_params);
// vérification de la présence du paramètre
if (search_params.has('id')) {
    id = search_params.get('id');
    console.log(id);
    // appel API
    fetch(`https://api.deezer.com/album/${id}`)
        .then(response => response.json())
        .then((album) => {
            document.getElementById("test").appendChild(createAlbumCard(album));
            console.log(album);
        })
        .catch((err) => {
            console.log("KO");
            console.log(err);
        });

}