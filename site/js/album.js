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
            let coverCtnr = document.createElement("div");
            coverCtnr.classList.add("album__cover");
            let coverElt = document.createElement("img");
            coverElt.setAttribute("id", "cover");
            coverElt.setAttribute("src", album.cover_medium);
            coverCtnr.appendChild(coverElt);
            let albumInfoCtnr = document.createElement("div");
            albumInfoCtnr.classList.add("album__info");
            albumInfoCtnr.innerHTML = `
                    <h1 class="album__info--title">${album.title}</h1>
                    <h2 class="album__info--artist"><a href="artiste.html?id=${album.artist.id}">${album.artist.name}</a></h2>
                    <p class="album__info--genre"><a href="explorer.html?id=${album.genres.data[0].id}">${album.genres.data[0].name}</a>${album.release_date}</p>
                    <p class="btn-ctnr">
                        <button id="readPlaylist" class="album-btn"><i class="fas fa-play"></i>Écouter</button>
                        <a href="${album.link}" target="blank" class="album-btn"><i class="fab fa-deezer"></i>Voir l'album sur Deezer</a>
                    </p>
                `;
            document.getElementById("album-ctnr").appendChild(coverCtnr);
            document.getElementById("album-ctnr").appendChild(albumInfoCtnr);

            document.getElementById("cover").addEventListener('mousemove', function (e) {
                let elem = e.target;
                mX = e.pageX;
                mY = e.pageY;
                distanceY = (calculateDistanceY(elem, mY) / 100) * -4;
                distanceX = (calculateDistanceX(elem, mX) / 100) * 4;
                elem.style.transform = `rotateY(${distanceX}deg) rotateX(${distanceY}deg)`;
                elem.style.transition = "all 0s";
                elem.style.boxShadow = `${distanceX * 3 * -1}px ${distanceY * 3}px 10px 0px rgba(0,0,0,0.3)`;

            });
            const albumTracks = album.tracks.data;
            let trackList = [];
            let previewList = [];
            for (let i = 0; i < albumTracks.length; i++) {
                document.getElementById("tracks-section").appendChild(createListCard(i + 1, albumTracks[i]));
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



function calculateDistanceX(elem, mouseX) {
    return Math.pow(mouseX - (window.scrollX + elem.getBoundingClientRect().left + (elem.style.width / 2)), 1);
}

function calculateDistanceY(elem, mouseY) {
    return Math.pow(mouseY - (window.scrollY + elem.getBoundingClientRect().top + (elem.style.height / 2)), 1);
}








