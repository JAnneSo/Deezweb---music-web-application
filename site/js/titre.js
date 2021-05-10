// récupération de l'url
let search_params = new URLSearchParams(new URL(document.location.href).search);
let id;
// vérification de la présence du paramètre
if (search_params.has('id')) {
    id = search_params.get('id');
    // appel API
    fetch(`https://api.deezer.com/track/${id}`)
        .then(response => response.json())
        .then((track) => {
            if (!track.error) {
                loadTrack(track);
                let coverCtnr = document.createElement("div");
                coverCtnr.classList.add("album__cover");
                let coverElt = document.createElement("img");
                coverElt.setAttribute("id", "cover");
                coverElt.setAttribute("src", track.album.cover_medium);
                coverCtnr.appendChild(coverElt);
                let trackInfoCtnr = document.createElement("div");
                trackInfoCtnr.classList.add("track__info");
                trackInfoCtnr.innerHTML = `
            ${track.explicit_lyrics ? "<p class='explicit-tag'>Explicit</p>" : ""}
                    <h1 class="track__info--title">${track.title}</h1>
                    <h2 class="track__info--album"><a href="album.html?id=${track.album.id}">${track.album.title}</a></h2>
                    <p class="track__info--date"><span>${new Date(track.release_date).getFullYear()}</span><span>${formatSeconds(track.duration)}</span></p>
                    <p class="btn-ctnr">
                        <button id="${track.id}" class="red-btn" onclick="playSong(this)"><i class="fas fa-play"></i>Écouter</button>
                        <a href="${track.link}" target="blank" class="red-btn"><i class="fab fa-deezer"></i>Voir le titre sur Deezer</a>
                    <input type="checkbox" id="ckbx_${track.id}" onclick="storeFavorite(this)" />
                    <label for="ckbx_${track.id}" class="track-card__love"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M20.4134 4.84977C19.3781 3.72787 17.9575 3.10999 16.413 3.10999C15.2585 3.10999 14.2012 3.47465 13.2704 4.19377C12.8008 4.55676 12.3752 5.00085 12 5.51919C11.6249 5.001 11.1992 4.55676 10.7294 4.19377C9.79877 3.47465 8.74149 3.10999 7.58701 3.10999C6.04251 3.10999 4.62177 3.72787 3.58646 4.84977C2.56351 5.95856 2 7.47333 2 9.11524C2 10.8052 2.63034 12.3521 3.98364 13.9837C5.19427 15.4431 6.93423 16.9246 8.94916 18.6402C9.63718 19.226 10.4171 19.8901 11.2268 20.5975C11.4408 20.7847 11.7153 20.8878 12 20.8878C12.2846 20.8878 12.5592 20.7847 12.7729 20.5978C13.5826 19.8903 14.363 19.2259 15.0513 18.6397C17.0659 16.9245 18.8059 15.4431 20.0165 13.9835C21.3698 12.3521 22 10.8052 22 9.11508C22 7.47333 21.4365 5.95856 20.4134 4.84977Z" fill="white" /></svg ></label>

                    </p>
                `;
                document.getElementById("header").appendChild(coverCtnr);
                document.getElementById("header").appendChild(trackInfoCtnr);
                document.getElementById("card-container").innerHTML = `<div class="popular-card">
                                <img class="popular-card__profile" src="${track.artist.picture_medium}" alt="artist">
                                <div class="popular-card__info">
                                    <p class="popular-card__info--title">${track.artist.name}</p>
                                    <p class="popular-card__info--subtitle">Artiste</p>
                                </div>
                                <a href="artiste.html?id=${track.artist.id}" class="popular-card__link"></a>
                                    </div>`;
            } else {
                errorPage("card-container");
            }
        })
        .catch((err) => {
            console.log(err);
        });

}

window.addEventListener("load", () => {
    setTimeout(function () { getCheckboxState(); }, 1000);

});