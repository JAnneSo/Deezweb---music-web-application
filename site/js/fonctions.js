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
    const ss = add0(Math.round(seconds % 60));
    if (hh == 0) {
        return `${mm}:${ss}`;
    }
    return `${hh}:${mm}:${ss}`; //'01h 23min 09s'
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
    cardElt.classList.add("album-card");
    imgContainerElt.classList.add("album-card__img-ctnr", "square");
    linkElt.classList.add("album-card__link");
    imgElt.classList.add("album-card__cover");
    captionElt.classList.add("album-card__info");
    titleElt.classList.add("album-card__info--title");
    artisteElt.classList.add("album-card__info--artiste");
    // saisie des attributs et text content
    linkElt.setAttribute("href", `album.html?id=${objAlbum.id}`);
    imgElt.setAttribute("src", objAlbum.cover_medium);
    titleElt.setAttribute("href", `album.html?id=${objAlbum.id}`);
    titleElt.textContent = objAlbum.title;
    artisteElt.setAttribute("href", `artiste.html?id=${objAlbum.artist.id}`);
    artisteElt.textContent = objAlbum.artist.name;
    // mise en place de l'arborescence
    captionElt.appendChild(titleElt);
    captionElt.appendChild(artisteElt);
    imgContainerElt.appendChild(imgElt);
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
    let playBtnElt = document.createElement("button");
    let checkboxElt = document.createElement("input");
    let loveBtnElt = document.createElement("label");
    let imgElt = document.createElement("img");
    let captionElt = document.createElement("figcaption");
    let titleTrackElt = document.createElement("a");
    let pElt = document.createElement("p");
    let artisteElt = document.createElement("a");
    let titleAlbumElt = document.createElement("a");
    let durationElt = document.createElement("p");
    // ajout des classes
    cardElt.classList.add("track-card");
    imgContainerElt.classList.add("track-card__img-cntr", "square");
    imgElt.classList.add("track-card__cover");
    playBtnElt.classList.add("track-card__play");
    loveBtnElt.classList.add("track-card__love");
    captionElt.classList.add("track-card__info");
    titleTrackElt.classList.add("track-card__info--title-track");
    titleAlbumElt.classList.add("track-card__info--title-album");
    artisteElt.classList.add("track-card__info--artiste");
    durationElt.classList.add("track-card__info--duration");
    // saisie des attributs et text content
    trackLinkElt.setAttribute("href", `titre.html?id=${objTrack.id}`);
    imgElt.setAttribute("src", objTrack.album.cover_medium);
    playBtnElt.setAttribute("id", `${objTrack.id}`);
    playBtnElt.setAttribute("onclick", "playSong(this)");
    playBtnElt.innerHTML = "<i class='fas fa-play'></i>";
    checkboxElt.setAttribute("type", "checkbox");
    checkboxElt.setAttribute("id", `ckbx_${objTrack.id}`);
    checkboxElt.setAttribute("onclick", "storeFavorite(this)");
    loveBtnElt.setAttribute("for", `ckbx_${objTrack.id}`);
    loveBtnElt.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M20.4134 4.84977C19.3781 3.72787 17.9575 3.10999 16.413 3.10999C15.2585 3.10999 14.2012 3.47465 13.2704 4.19377C12.8008 4.55676 12.3752 5.00085 12 5.51919C11.6249 5.001 11.1992 4.55676 10.7294 4.19377C9.79877 3.47465 8.74149 3.10999 7.58701 3.10999C6.04251 3.10999 4.62177 3.72787 3.58646 4.84977C2.56351 5.95856 2 7.47333 2 9.11524C2 10.8052 2.63034 12.3521 3.98364 13.9837C5.19427 15.4431 6.93423 16.9246 8.94916 18.6402C9.63718 19.226 10.4171 19.8901 11.2268 20.5975C11.4408 20.7847 11.7153 20.8878 12 20.8878C12.2846 20.8878 12.5592 20.7847 12.7729 20.5978C13.5826 19.8903 14.363 19.2259 15.0513 18.6397C17.0659 16.9245 18.8059 15.4431 20.0165 13.9835C21.3698 12.3521 22 10.8052 22 9.11508C22 7.47333 21.4365 5.95856 20.4134 4.84977Z" fill="white" /></svg >';
    titleTrackElt.setAttribute("href", `titre.html?id=${objTrack.id}`);
    titleTrackElt.textContent = objTrack.title;
    artisteElt.setAttribute("href", `artiste.html?id=${objTrack.artist.id}`);
    artisteElt.textContent = objTrack.artist.name;
    titleAlbumElt.setAttribute("href", `album.html?id=${objTrack.album.id}`);
    titleAlbumElt.textContent = objTrack.album.title;
    durationElt.textContent = formatSeconds(objTrack.duration);
    // mise en place de l'arborescence
    captionElt.appendChild(titleTrackElt);
    pElt.appendChild(artisteElt);
    pElt.appendChild(titleAlbumElt);
    captionElt.appendChild(pElt);
    captionElt.appendChild(durationElt);
    imgContainerElt.appendChild(imgElt);
    imgContainerElt.appendChild(trackLinkElt);
    imgContainerElt.appendChild(playBtnElt);
    imgContainerElt.appendChild(checkboxElt);
    imgContainerElt.appendChild(loveBtnElt);
    cardElt.appendChild(imgContainerElt);
    cardElt.appendChild(captionElt);
    return cardElt;
}

/**
 * @function createArtistCard
 * @param {object} objArtist
 */
function createArtistCard(objArtist) {
    let cardElt = document.createElement("figure");
    let imgContainerElt = document.createElement("div");
    let linkElt = document.createElement("a");
    let imgElt = document.createElement("img");
    let captionElt = document.createElement("figcaption");
    let artisteElt = document.createElement("a");
    // ajout des classes
    cardElt.classList.add("artist-card");
    imgContainerElt.classList.add("artist-card__img-ctnr", "square");
    linkElt.classList.add("artist-card__link");
    imgElt.classList.add("artist-card__cover");
    captionElt.classList.add("artist-card__info");
    artisteElt.classList.add("artist-card__info--artiste");
    // saisie des attributs et text content
    linkElt.setAttribute("href", `artiste.html?id=${objArtist.id}`);
    imgElt.setAttribute("src", objArtist.picture_medium);
    artisteElt.setAttribute("href", `artiste.html?id=${objArtist.id}`);
    artisteElt.textContent = objArtist.name;
    // mise en place de l'arborescence
    captionElt.appendChild(artisteElt);
    imgContainerElt.appendChild(imgElt);
    imgContainerElt.appendChild(linkElt);
    cardElt.appendChild(imgContainerElt);
    cardElt.appendChild(captionElt);
    return cardElt;
}

/**
 * @function createSwiperCardContainer
 * @param {}  
 * @returns HTMLDivElement
 */
function createSwiperCardContainer() {
    let swiperSlide = document.createElement("div");
    swiperSlide.classList.add("swiper-slide");
    return swiperSlide;
}

document.getElementById("side-submit")
    .addEventListener("click", () => {
        if (searchInput.value) {
            urlParam += `?q=${searchInput.value}`;
            location.href = `recherche.html${urlParam}`;
        }
    });

function search(requete) {
    fetch(requete)
        .then(response => response.json())
        .then(resFinal => {
            console.log(resFinal);
            let tracks = resFinal.data;

            if (tracks.length > 0) {
                document.getElementById("research").innerHTML = "";
                document.getElementById("nb-find").textContent = tracks.length == 1 ? `${tracks.length} résultat trouvé` : `${tracks.length} résultats trouvés`;
                for (let i = 0; i < tracks.length; i++) {
                    document.getElementById("research").appendChild(createTrackCard(tracks[i]));
                }
            } else {
                document.getElementById("nb-find").textContent = "Il n'y a pas de résultats";
            }
        })
        .catch(() => {
            console.log("KO");
        });
}

var player = document.getElementById("play-song");
let song = document.getElementById("audio-song");
let range = document.getElementById("song-timeline");
let label = document.getElementById("label-range");
let labelDuration = document.getElementById("duration");
let prevSongBtn = document.getElementById("prev-song");
let nextSongBtn = document.getElementById("next-song");

function loadTrack(track) {
    song.setAttribute('src', `${track.preview}`);
    document.getElementById("cover-container").innerHTML = `<img src="${track.album.cover_small}" alt="${track.title}"/>`;
    document.getElementById("info-container__title").innerHTML = `${track.title}`;
    document.getElementById("info-container__artist").innerHTML = `${track.artist.name} - ${track.album.title}`;
    range.style.display = "block";
    range.setAttribute("value", "0");
}

function playSong(e) {
    fetch(`https://api.deezer.com/track/${e.id}`)
        .then(response => response.json())
        .then(track => {
            console.log(track);
            loadTrack(track);
            song.play();
            player.innerHTML = '<i class="fa fa-pause"></i>';
        })
        .catch((err) => {
            console.log(err);
            alert("Une erreur est survenue");
        });

}

song.addEventListener('timeupdate', (e) => {
    //console.log('The currentTime ' + e.target.currentTime);
    labelDuration.innerHTML = formatSeconds(song.duration);
    range.setAttribute("max", `${Math.floor(song.duration)}`);
    range.value = e.target.currentTime;
    let time = formatSeconds(e.target.currentTime);
    if (time != label.textContent) {
        label.innerHTML = time;
    }

});

song.addEventListener('play', (e) => {
    player.innerHTML = '<i class="fa fa-pause"></i>';

});


range.addEventListener("change", (e) => {
    song.currentTime = e.target.value;
})

player.addEventListener("click", () => {
    // gérer le cas où il n'y a rien à lire
    if (song.getAttribute("src")) {
        if (song.paused) {
            song.play();
            player.innerHTML = '<i class="fa fa-pause"></i>';
        } else {
            song.pause();
            player.innerHTML = '<i class="fa fa-play">';
        }
    }

});

song.addEventListener('ended', () => {
    player.innerHTML = '<i class="fa fa-play">';
})


function storeFavorite(e) {
    //récupération de l'id de la checkbox
    let checkboxId = e.id;
    let trackId = checkboxId.split("_")[1];
    const storedList = localStorage.getItem("deezweb_track_id");
    let storageArray = [];
    if (storedList) {
        storageArray = JSON.parse(storedList);
    }

    if (e.checked) {
        localStorage.setItem(checkboxId, 1);
        if (storageArray.indexOf(trackId) == -1) {
            storageArray.push(trackId);
        }
        localStorage.setItem("deezweb_track_id", JSON.stringify(storageArray));
    } else {
        localStorage.removeItem(checkboxId);
        var index = storageArray.indexOf(trackId);
        if (index > -1) {
            storageArray.splice(index, 1);
        }
        localStorage.setItem("deezweb_track_id", JSON.stringify(storageArray));
    }
}


function getCheckboxState() {
    for (var i = 0, len = localStorage.length; i < len; i++) {
        var key = localStorage.key(i);
        if (key.startsWith("ckbx")) {
            if (document.getElementById(`${key}`)) {
                document.getElementById(`${key}`).setAttribute("checked", "checked");
            }
        }
    }
}




