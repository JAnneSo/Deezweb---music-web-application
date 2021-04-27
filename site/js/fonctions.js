
/**
 * @function add0
 * @description format a number with 2 digit
 * @param {number} number
 */
function add0(number) {
    return number < 10 ? '0' + number : number;
}
/**
 * @function formatSeconds
 * @description format a seconds duration in minutes
 * @param {number} seconds
 */
function formatSeconds(seconds) {
    const hh = add0(Math.floor(seconds / 3600));
    const mm = add0(Math.floor(seconds % 3600 / 60));
    const ss = add0(seconds % 60);
    return `${hh}h ${mm}min ${ss}s`; //'01h 23min 09s'
}

function compare(a, b, attribute) {
    if (a[attribute] < b[attribute])
        return -1;
    if (a[attribute] > b[attribute])
        return 1;
    return 0;
}

/**
 * @function createAlbumCard
 * @param {object} objAlbum 
 */
function createAlbumCard(objAlbum) {
    let cardElt = document.createElement("figure");
    let imgContainerElt = document.createElement("div");
    let linkElt = document.createElement("a");
    let imgElt = document.createElement("img");
    let captionElt = document.createElement("figcaption");
    let titleElt = document.createElement("a");
    let artisteElt = document.createElement("a");
    // ajout des classes
    // cardElt.classList.add("album-card");
    // imgElt.classList.add("album-card__cover");
    // captionElt.classList.add("album-card__info");
    // titleElt.classList.add("album-card__info--title");
    // artisteElt.classList.add("album-card__info--artiste");
    // saisie des attributs et text content
    linkElt.setAttribute("href", `pages/album.html?id=${objAlbum.id}`);
    imgElt.setAttribute("src", objAlbum.cover);
    titleElt.setAttribute("href", `pages/album.html?id=${objAlbum.id}`);
    titleElt.textContent = objAlbum.title;
    artisteElt.setAttribute("href", `pages/artiste.html?id=${objAlbum.artist.id}`);
    artisteElt.textContent = objAlbum.artist.name;
    // mise en place de l'arborescence
    captionElt.appendChild(titleElt);
    captionElt.appendChild(artisteElt);
    linkElt.appendChild(imgElt);
    imgContainerElt.appendChild(linkElt);
    cardElt.appendChild(imgContainerElt);
    cardElt.appendChild(captionElt);
    return cardElt;
}

/**
 * @function createTrackCard
 * @param {object} objTrack 
 */
function createTrackCard(objTrack) {
    let cardElt = document.createElement("figure");
    let imgContainerElt = document.createElement("div");
    let trackLinkElt = document.createElement("a");
    let imgHoverElt = document.createElement("div");
    let imgElt = document.createElement("img");
    let captionElt = document.createElement("figcaption");
    let titleTrackElt = document.createElement("a");
    let artisteElt = document.createElement("a");
    let titleAlbumElt = document.createElement("a");
    let durationElt = document.createElement("p");
    // ajout des classes
    // saisie des attributs et text content
    trackLinkElt.setAttribute("href", `pages/titre.html?id=${objTrack.id}`);
    imgElt.setAttribute("src", objTrack.album.cover);
    titleTrackElt.setAttribute("href", `pages/titre.html?id=${objTrack.id}`);
    titleTrackElt.textContent = objTrack.title;
    artisteElt.setAttribute("href", `pages/artiste.html?id=${objTrack.artist.id}`);
    artisteElt.textContent = objTrack.artist.name;
    titleAlbumElt.setAttribute("href", `pages/album.html?id=${objTrack.album.id}`);
    titleAlbumElt.textContent = objTrack.album.title;
    durationElt.textContent = formatSeconds(objTrack.duration);
    // mise en place de l'arborescence
    captionElt.appendChild(titleTrackElt);
    captionElt.appendChild(artisteElt);
    captionElt.appendChild(titleAlbumElt);
    captionElt.appendChild(durationElt);
    imgContainerElt.appendChild(trackLinkElt);
    imgContainerElt.appendChild(imgElt);
    imgContainerElt.appendChild(imgHoverElt);
    cardElt.appendChild(imgContainerElt);
    cardElt.appendChild(captionElt);
    return cardElt;
}

function search(requete) {
    fetch(requete)
        .then(response => response.json())
        .then(resFinal => {
            console.log(resFinal);
            let tracks = resFinal.data;

            if (tracks.length >= 0) {
                tracks.sort(function compare(a, b) {
                    if (a.title < b.title)
                        return -1;
                    if (a.title > b.title)
                        return 1;
                    return 0;
                });
                document.getElementById("research").innerHTML = "";
                //document.getElementById("nb-find").textContent = resFinal.total;
                document.getElementById("nb-find").textContent = tracks.length;
                for (let i = 0; i < tracks.length; i++) {
                    document.getElementById("research").appendChild(createTrackCard(tracks[i]));
                }
                //gestion des boutons précédent et suivant
                // if (resFinal.next) {
                //     document.getElementById("next-btn").removeAttribute("disabled");
                //     document.getElementById("next-btn").addEventListener("click", () => {
                //         window.scrollTo(0, 0);
                //         search(resFinal.next);
                //     });
                // } else {
                //     document.getElementById("next-btn").setAttribute("disabled", "true");
                // }
                // if (resFinal.prev) {
                //     document.getElementById("prev-btn").removeAttribute("disabled");
                //     document.getElementById("prev-btn").addEventListener("click", () => {
                //         window.scrollTo(0, 0);
                //         search(resFinal.prev);
                //     });
                // } else {
                //     document.getElementById("prev-btn").setAttribute("disabled", "true");
                // }



            } else {
                document.getElementById("nb-find").textContent = "0";
            }
        })
        .catch(() => {
            console.log("KO");
            //alert("Une erreur est survenu");
        });
}