// Variable declaration
let sideSearchInput = document.getElementById("side-search");
let urlParam = "";
var player = document.getElementById("play-song");
let song = document.getElementById("audio-song");
let range = document.getElementById("song-timeline");
let label = document.getElementById("label-range");
let labelDuration = document.getElementById("duration");
let prevSongBtn = document.getElementById("prev-song");
let nextSongBtn = document.getElementById("next-song");

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
 * @returns {string}
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
 * @description create the html element corresponding to a album card
 * @param {object} objAlbum 
 * @returns {HTMLElement} cardElt
 */
function createAlbumCard(objAlbum) {
    let cardElt = document.createElement("figure");
    cardElt.classList.add("album-card");

    let imgContainerElt = document.createElement("div");
    imgContainerElt.classList.add("album-card__img-ctnr", "square");

    let linkElt = document.createElement("a");
    linkElt.classList.add("album-card__link");
    linkElt.setAttribute("href", `album.html?id=${objAlbum.id}`);

    let imgElt = document.createElement("img");
    imgElt.classList.add("album-card__cover");
    imgElt.setAttribute("src", objAlbum.cover_medium);

    let captionElt = document.createElement("figcaption");
    captionElt.classList.add("album-card__info");

    let titleElt = document.createElement("a");
    titleElt.classList.add("album-card__info--title");
    titleElt.setAttribute("href", `album.html?id=${objAlbum.id}`);
    titleElt.textContent = objAlbum.title;

    captionElt.appendChild(titleElt);
    if (objAlbum.artist) {
        let artisteElt = document.createElement("a");
        artisteElt.classList.add("album-card__info--artiste");
        artisteElt.setAttribute("href", `artiste.html?id=${objAlbum.artist.id}`);
        artisteElt.textContent = objAlbum.artist.name;
        captionElt.appendChild(artisteElt);
    }
    imgContainerElt.appendChild(imgElt);
    imgContainerElt.appendChild(linkElt);
    cardElt.appendChild(imgContainerElt);
    cardElt.appendChild(captionElt);
    return cardElt;
}

/**
 * @function createTrackCard
 * @description create the html element corresponding to a track card
 * @param {object} objTrack 
 * @returns {HTMLElement} cardElt
 */
function createTrackCard(objTrack) {
    let cardElt = document.createElement("figure");
    cardElt.classList.add("track-card");

    let imgContainerElt = document.createElement("div");
    imgContainerElt.classList.add("track-card__img-cntr", "square");

    let imgElt = document.createElement("img");
    imgElt.classList.add("track-card__cover");
    imgElt.setAttribute("src", objTrack.album.cover_medium);

    let trackLinkElt = document.createElement("a");
    trackLinkElt.setAttribute("href", `titre.html?id=${objTrack.id}`);

    let playBtnElt = document.createElement("button");
    playBtnElt.classList.add("track-card__play");
    playBtnElt.setAttribute("id", `${objTrack.id}`);
    playBtnElt.setAttribute("onclick", "playSong(this)");
    playBtnElt.innerHTML = "<i class='fas fa-play'></i>";

    let checkboxElt = document.createElement("input");
    checkboxElt.setAttribute("type", "checkbox");
    checkboxElt.setAttribute("id", `ckbx_${objTrack.id}`);
    checkboxElt.setAttribute("onclick", "storeFavorite(this)");

    let loveBtnElt = document.createElement("label");
    loveBtnElt.classList.add("track-card__love");
    loveBtnElt.setAttribute("for", `ckbx_${objTrack.id}`);
    loveBtnElt.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M20.4134 4.84977C19.3781 3.72787 17.9575 3.10999 16.413 3.10999C15.2585 3.10999 14.2012 3.47465 13.2704 4.19377C12.8008 4.55676 12.3752 5.00085 12 5.51919C11.6249 5.001 11.1992 4.55676 10.7294 4.19377C9.79877 3.47465 8.74149 3.10999 7.58701 3.10999C6.04251 3.10999 4.62177 3.72787 3.58646 4.84977C2.56351 5.95856 2 7.47333 2 9.11524C2 10.8052 2.63034 12.3521 3.98364 13.9837C5.19427 15.4431 6.93423 16.9246 8.94916 18.6402C9.63718 19.226 10.4171 19.8901 11.2268 20.5975C11.4408 20.7847 11.7153 20.8878 12 20.8878C12.2846 20.8878 12.5592 20.7847 12.7729 20.5978C13.5826 19.8903 14.363 19.2259 15.0513 18.6397C17.0659 16.9245 18.8059 15.4431 20.0165 13.9835C21.3698 12.3521 22 10.8052 22 9.11508C22 7.47333 21.4365 5.95856 20.4134 4.84977Z" fill="white" /></svg >';

    let captionElt = document.createElement("figcaption");
    captionElt.classList.add("track-card__info");

    let titleTrackElt = document.createElement("a");
    titleTrackElt.classList.add("track-card__info--title-track");
    titleTrackElt.setAttribute("href", `titre.html?id=${objTrack.id}`);
    titleTrackElt.textContent = objTrack.title;

    let pElt = document.createElement("p");
    let artisteElt = document.createElement("a");
    artisteElt.classList.add("track-card__info--artiste");
    artisteElt.textContent = objTrack.artist.name;
    artisteElt.setAttribute("href", `artiste.html?id=${objTrack.artist.id}`);

    let titleAlbumElt = document.createElement("a");
    titleAlbumElt.classList.add("track-card__info--title-album");
    titleAlbumElt.setAttribute("href", `album.html?id=${objTrack.album.id}`);
    titleAlbumElt.textContent = objTrack.album.title;

    let durationElt = document.createElement("p");
    durationElt.classList.add("track-card__info--duration");
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
 * @description create the html element corresponding to an artist card
 * @param {object} objArtist
 * @returns {HTMLElement} cardElt
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
 * @function createListCard
 * @description create the html element corresponding to a track card displayed in playlist
 * @param {number} index 
 * @param {object} objTrack 
 * @returns {HTMLElement} cardElt
 */
function createListCard(index, objTrack) {
    let cardElt = document.createElement("div");
    cardElt.setAttribute("class", "list-track");

    let trackNbElt = document.createElement("p");
    trackNbElt.setAttribute("class", "list-track__number");

    let spanNbElt = document.createElement("span");
    spanNbElt.textContent = index;

    let playBtnElt = document.createElement("button");
    playBtnElt.classList.add("track-card__play");
    playBtnElt.setAttribute("id", `${objTrack.id}`);
    playBtnElt.setAttribute("onclick", "playSong(this)");
    playBtnElt.innerHTML = "<i class='fas fa-play'></i>";

    trackNbElt.appendChild(spanNbElt);
    trackNbElt.appendChild(playBtnElt);
    cardElt.appendChild(trackNbElt);

    if (objTrack.album) {
        let imgElt = document.createElement("img");
        imgElt.classList.add("list-track__cover");
        imgElt.setAttribute("src", objTrack.album.cover_medium);
        cardElt.appendChild(imgElt);
    }

    let titleContainerElt = document.createElement("div");
    titleContainerElt.setAttribute("class", "list-track__info");

    let titleTrackElt = document.createElement("a");
    titleTrackElt.classList.add("list-track__info--title");
    titleTrackElt.setAttribute("href", `titre.html?id=${objTrack.id}`);
    titleTrackElt.textContent = objTrack.title;

    let artisteElt = document.createElement("a");
    artisteElt.classList.add("list-track__info--artiste");
    artisteElt.textContent = objTrack.artist.name;
    artisteElt.setAttribute("href", `artiste.html?id=${objTrack.artist.id}`);

    titleContainerElt.appendChild(titleTrackElt);
    titleContainerElt.appendChild(artisteElt);
    cardElt.appendChild(titleContainerElt);

    if (objTrack.album) {
        let titleAlbumElt = document.createElement("a");
        titleAlbumElt.classList.add("list-track__album");
        titleAlbumElt.setAttribute("href", `album.html?id=${objTrack.album.id}`);
        titleAlbumElt.textContent = objTrack.album.title;
        cardElt.appendChild(titleAlbumElt);
    }

    if (objTrack.explicit_lyrics) {
        let explicitTagElt = document.createElement("span");
        explicitTagElt.classList.add("explicit-tag");
        explicitTagElt.textContent = "Explicit";
        cardElt.appendChild(explicitTagElt);
        let explicitTagMobileElt = document.createElement("span");
        explicitTagMobileElt.classList.add("explicit-tag-mobile");
        explicitTagMobileElt.textContent = "E";
        cardElt.appendChild(explicitTagMobileElt);
    }

    let durationElt = document.createElement("p");
    durationElt.classList.add("list-track__duration");
    durationElt.textContent = formatSeconds(objTrack.duration);
    cardElt.appendChild(durationElt);

    let ckbxCtnr = document.createElement("p");
    ckbxCtnr.classList.add("list-track__love-ctnr");

    let checkboxElt = document.createElement("input");
    checkboxElt.setAttribute("type", "checkbox");
    checkboxElt.setAttribute("id", `ckbx_${objTrack.id}`);
    checkboxElt.setAttribute("onclick", "storeFavorite(this)");

    let loveBtnElt = document.createElement("label");
    loveBtnElt.setAttribute("for", `ckbx_${objTrack.id}`);
    loveBtnElt.classList.add("track-card__love");
    loveBtnElt.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M20.4134 4.84977C19.3781 3.72787 17.9575 3.10999 16.413 3.10999C15.2585 3.10999 14.2012 3.47465 13.2704 4.19377C12.8008 4.55676 12.3752 5.00085 12 5.51919C11.6249 5.001 11.1992 4.55676 10.7294 4.19377C9.79877 3.47465 8.74149 3.10999 7.58701 3.10999C6.04251 3.10999 4.62177 3.72787 3.58646 4.84977C2.56351 5.95856 2 7.47333 2 9.11524C2 10.8052 2.63034 12.3521 3.98364 13.9837C5.19427 15.4431 6.93423 16.9246 8.94916 18.6402C9.63718 19.226 10.4171 19.8901 11.2268 20.5975C11.4408 20.7847 11.7153 20.8878 12 20.8878C12.2846 20.8878 12.5592 20.7847 12.7729 20.5978C13.5826 19.8903 14.363 19.2259 15.0513 18.6397C17.0659 16.9245 18.8059 15.4431 20.0165 13.9835C21.3698 12.3521 22 10.8052 22 9.11508C22 7.47333 21.4365 5.95856 20.4134 4.84977Z" fill="white" /></svg >';
    ckbxCtnr.appendChild(checkboxElt);
    ckbxCtnr.appendChild(loveBtnElt);
    cardElt.appendChild(ckbxCtnr);

    return cardElt;
}

/**
 * @function loadTrack
 * @description fill the player with the new track to play
 * @param {*} track 
 */
function loadTrack(track) {
    song.setAttribute('src', `${track.preview}`);
    document.getElementById("cover-container").innerHTML = `<img src="${track.album.cover_small}" alt="${track.title}"/>`;
    document.getElementById("info-container__title").innerHTML = `${track.title}`;
    document.getElementById("info-container__artist").innerHTML = `${track.artist.name} - ${track.album.title}`;
    range.style.display = "block";
    range.setAttribute("value", "0");
}

/**
 * @function playSong
 * @description plays the track
 * @param {HTMLElement} e 
 */
function playSong(e) {
    fetch(`https://api.deezer.com/track/${e.id}`)
        .then(response => response.json())
        .then(track => {
            loadTrack(track);
            song.play();
            player.innerHTML = '<i class="fa fa-pause"></i>';
        })
        .catch((err) => {
            console.log(err);
            alert("Une erreur est survenue");
        });

}

/**
 * @function storeFavorite
 * @description store id of a track in localStorage
 * @param {HTMLElement} e
 */
function storeFavorite(e) {
    let checkboxId = e.id;
    let trackId = checkboxId.split("_")[1];
    const storedList = localStorage.getItem("deezweb_track_id");
    let storageArray = [];
    if (storedList) {
        storageArray = JSON.parse(storedList);
    }
    const index = storageArray.indexOf(trackId);
    if (e.checked) {
        localStorage.setItem(checkboxId, 1);
        if (index == -1) {
            storageArray.push(trackId);
        }
        localStorage.setItem("deezweb_track_id", JSON.stringify(storageArray));
    } else {
        localStorage.removeItem(checkboxId);
        if (index > -1) {
            storageArray.splice(index, 1);
        }
        localStorage.setItem("deezweb_track_id", JSON.stringify(storageArray));
    }
}

/**
 * @function getCheckboxState
 * @description checks if a song is liked and displays it as such
 */
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

/**
 * @function errorPage
 * @description displays a error message
 * @param {string} containerId 
 */
function errorPage(containerId) {
    document.getElementById(containerId).innerHTML = "<h1 class='error-title'>Désolé, nous ne trouvons pas la page que vous recherchez</h1>";
}


/**
 * @event keydown
 * @description launches the search from the search input in the sidebar if enter is pressed
 */
sideSearchInput.addEventListener("keydown", (e) => {
    if (e.key.charCodeAt(0) == 69) {
        if (sideSearchInput.value) {
            urlParam += `?q=${sideSearchInput.value}`;
            location.href = `recherche.html${urlParam}`;
        }
    }
});

/**
 * @event click
 * @description launches the search from the search input in the sidebar if the button is pressed
 */
document.getElementById("side-submit")
    .addEventListener("click", () => {
        if (sideSearchInput.value) {
            urlParam += `?q=${sideSearchInput.value}`;
            location.href = `recherche.html${urlParam}`;
        }
    });

/**
* @event timeupdate
* @description updates progress bar and time during song playback
*/
song.addEventListener('timeupdate', (e) => {
    labelDuration.innerHTML = formatSeconds(song.duration);
    range.setAttribute("max", `${Math.floor(song.duration)}`);
    range.value = e.target.currentTime;
    let time = formatSeconds(e.target.currentTime);
    if (time != label.textContent) {
        label.innerHTML = time;
    }

});

/**
* @event play
* @description replace play icon into pause icon
*/
song.addEventListener('play', () => {
    player.innerHTML = '<i class="fa fa-pause"></i>';
});

/**
* @event change
* @description updates the current time of the song when the user changes it
*/
range.addEventListener("change", (e) => {
    song.currentTime = e.target.value;
});

/**
 * @event click
 * @description put the song in play or pause
 */
player.addEventListener("click", () => {
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

/**
 * @event ended
 * @description reset the icon play when the song is finished
 */
song.addEventListener('ended', () => {
    player.innerHTML = '<i class="fa fa-play">';
});


