


function createPlaylist(index, objTrack) {
    let cardElt = document.createElement("div");
    cardElt.setAttribute("class", "playlist-track");

    let infoContainerElt = document.createElement("div");
    infoContainerElt.setAttribute("class", "playlist-track__info");

    let trackNbElt = document.createElement("span");
    trackNbElt.setAttribute("class", "playlist-track__info--number");
    trackNbElt.textContent = index;

    let checkboxElt = document.createElement("input");
    checkboxElt.setAttribute("type", "checkbox");
    checkboxElt.setAttribute("id", `ckbx_${objTrack.id}`);
    checkboxElt.setAttribute("onclick", "storeFavorite(this)");

    let loveBtnElt = document.createElement("label");
    loveBtnElt.setAttribute("for", `ckbx_${objTrack.id}`);
    loveBtnElt.classList.add("playlist-track__info--love");
    loveBtnElt.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M20.4134 4.84977C19.3781 3.72787 17.9575 3.10999 16.413 3.10999C15.2585 3.10999 14.2012 3.47465 13.2704 4.19377C12.8008 4.55676 12.3752 5.00085 12 5.51919C11.6249 5.001 11.1992 4.55676 10.7294 4.19377C9.79877 3.47465 8.74149 3.10999 7.58701 3.10999C6.04251 3.10999 4.62177 3.72787 3.58646 4.84977C2.56351 5.95856 2 7.47333 2 9.11524C2 10.8052 2.63034 12.3521 3.98364 13.9837C5.19427 15.4431 6.93423 16.9246 8.94916 18.6402C9.63718 19.226 10.4171 19.8901 11.2268 20.5975C11.4408 20.7847 11.7153 20.8878 12 20.8878C12.2846 20.8878 12.5592 20.7847 12.7729 20.5978C13.5826 19.8903 14.363 19.2259 15.0513 18.6397C17.0659 16.9245 18.8059 15.4431 20.0165 13.9835C21.3698 12.3521 22 10.8052 22 9.11508C22 7.47333 21.4365 5.95856 20.4134 4.84977Z" fill="white" /></svg >';

    let titleTrackElt = document.createElement("a");
    titleTrackElt.setAttribute("href", `titre.html?id=${objTrack.id}`);
    titleTrackElt.textContent = objTrack.title;

    let durationElt = document.createElement("p");
    durationElt.classList.add("playlist-track__duration");
    durationElt.textContent = formatSeconds(objTrack.duration);

    infoContainerElt.appendChild(trackNbElt);
    infoContainerElt.appendChild(checkboxElt);
    infoContainerElt.appendChild(loveBtnElt);
    infoContainerElt.appendChild(titleTrackElt);
    cardElt.appendChild(infoContainerElt);
    cardElt.appendChild(durationElt);
    return cardElt;

}


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
            console.log(album);
            document.getElementById("tracks-section").appendChild(createAlbumCard(album));
            const albumTracks = album.tracks.data;
            let trackList = [];
            let previewList = [];
            for (let i = 0; i < albumTracks.length; i++) {
                document.getElementById("tracks-section").appendChild(createPlaylist(i + 1, albumTracks[i]));
                previewList.push(albumTracks[i].preview);
                trackList.push(albumTracks[i]);
            }
            function loadMusic(track) {
                song.setAttribute('src', `${track.preview}`);
                document.getElementById("cover-container").innerHTML = `<img src="${album.cover_small}" alt="${track.title}"/>`;
                document.getElementById("info-container__title").innerHTML = `${track.title}`;
                document.getElementById("info-container__artist").innerHTML = `${track.artist.name} - ${album.title}`;
                range.style.display = "block";
                range.setAttribute("value", "0");
            }
            loadMusic(trackList[0]);
            function playPlaylist(index) {
                console.log("play index = " + index);


                if (index < previewList.length) {
                    // Check if the player is selected
                    if (song === null) {
                        console.log("pas de son" + index);
                        throw "Playlist Player does not exists ...";
                    } else {
                        // Start the player
                        //song.src = previewList[i];
                        console.log("loadMusic = " + index);
                        loadMusic(trackList[index]);
                        song.play();
                        // Listen for the music ended event, to play the next audio file
                        song.addEventListener('ended', () => {
                            playPlaylist(index + 1)
                        }, false);
                    }
                } else {
                    console.log("fin");
                    loadMusic(trackList[0]);
                }

            }
            let index = 0;
            prevSongBtn.addEventListener("click", (e) => {
                if (index == 0) {
                    index = previewList.length - 1;
                } else {
                    index--;
                }
                song.pause();
                playPlaylist(index)
            });

            nextSongBtn.addEventListener("click", (e) => {
                if (index == previewList.length) {
                    index = 0;
                } else {
                    index++;
                }
                song.pause();
                playPlaylist(index)
            });
            document.getElementById("readPlaylist").addEventListener("click", () => {
                playPlaylist(index);
                player.innerHTML = '<i class="fa fa-pause"></i>';
            })

        })
        .catch((err) => {
            console.log("KO");
            console.log(err);
        });

}

window.addEventListener("load", () => {
    setTimeout(function () { getCheckboxState(); }, 1000);

});















