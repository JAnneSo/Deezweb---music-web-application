
/**
 * @function createGenreCard
 * @param {object} obj
 */
function createGenreCard(obj) {
    let cardElt = document.createElement("div");
    let linkElt = document.createElement("a");
    let imgElt = document.createElement("img");
    // ajout des classes
    cardElt.classList.add("genre-card");
    linkElt.classList.add("genre-card__link");
    imgElt.classList.add("genre-card__cover");
    // saisie des attributs et text content
    linkElt.setAttribute("href", `explorer.html?id=${obj.id}`);
    linkElt.textContent = obj.name;
    imgElt.setAttribute("src", obj.picture_big);
    // mise en place de l'arborescence
    cardElt.appendChild(imgElt);
    cardElt.appendChild(linkElt);
    return cardElt;
}

// récupération de l'url
let search_params = new URLSearchParams(new URL(document.location.href).search);
let id;
console.log(typeof document.location.href);
console.log(search_params);
let requete = "";
// vérification de la présence du paramètre
if (search_params.has('id')) {
    id = search_params.get('id');
    console.log(id);
    requete = `https://api.deezer.com/genre/${id}/artists`;
} else {
    requete = "https://api.deezer.com/genre";
}
fetch(requete)
    .then(response => response.json())
    .then((result) => {
        if (!result.error) {
            const list = result.data;
            if (id) {
                for (let i = 0; i < list.length; i++) {
                    //document.getElementById("h1").innerHTML= `Explorer : ${genre}`;
                    document.getElementById("explore-section").appendChild(createArtistCard(list[i]));
                }
            } else {
                for (let i = 0; i < list.length; i++) {
                    document.getElementById("explore-section").appendChild(createGenreCard(list[i]));
                }
            }
        } else {
            errorPage("explore-section");
        }
    })
    .catch((err) => {
        console.log("KO");
        console.log(err);
    });

// récupérer l'url, si aucun paramètre, on charge les genres,
// si on a l'id du genre, on charge tous les artistes liés à ce genre avec https://api.deezer.com/genre/0/artists





