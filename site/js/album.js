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
        .then((response) => {
            response.json();
            console.log(response);
        })
        .then((album) => {

            console.log(album);
            console.log("test");
            let cardElt = document.createElement("figure");
            let imgElt = document.createElement("img");
            imgElt.setAttribute("src", album.cover);

            // imgElt.setAttribute("alt", "cover");
            let captionElt = document.createElement("figcaption");
            let titleElt = document.createElement("p");
            titleElt.textContent = album.title;

            let artisteElt = document.createElement("p");

            console.log(album.artist);
            // artisteElt.textContent = album.artist.name;

            artisteElt.textContent = "name";
            captionElt.appendChild(titleElt);
            captionElt.appendChild(artisteElt);
            cardElt.appendChild(imgElt);
            cardElt.appendChild(captionElt);
            document.getElementById("album").appendChild(cardElt);
            console.log("OK");
        })
        .catch((err) => {
            console.log("KO");
            console.log(err);
        });

}