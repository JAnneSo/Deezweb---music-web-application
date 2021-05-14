
/**
 * @function createGenreCard
 * @description create the html element corresponding to a genre card
 * @param {object} obj
 * @returns {HTMLElement} cardElt
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
    linkElt.setAttribute("href", `explorer.html?id=${obj.id}&genre=${obj.name}`);
    linkElt.textContent = obj.name;
    imgElt.setAttribute("src", obj.picture_big);
    // mise en place de l'arborescence
    cardElt.appendChild(imgElt);
    cardElt.appendChild(linkElt);
    return cardElt;
}

// get the url
let search_params = new URLSearchParams(new URL(document.location.href).search);
let id; let genre;
let requete = "https://api.deezer.com/genre";
// check if the id param exists
if (search_params.has('id')) {
    id = search_params.get('id');
    requete += `/${id}/artists`;
}
// check if the genre param exists
if (search_params.has('genre')) {
    genre = search_params.get('genre');
}
fetch(requete)
    .then(response => response.json())
    .then((result) => {
        if (!result.error) {
            const list = result.data;
            document.getElementById("h1").innerHTML = genre ? genre : "Explorer";
            if (id) {
                for (let i = 0; i < list.length; i++) {
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
