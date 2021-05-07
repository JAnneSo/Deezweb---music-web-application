// récupération de l'url
let search_params = new URLSearchParams(new URL(document.location.href).search);
let id;
// vérification de la présence du paramètre
if (search_params.has('id')) {
    id = search_params.get('id');
    console.log(id);
    // appel API
    fetch(`https://api.deezer.com/artist/${id}`)
        .then(response => response.json())
        .then((artist) => {
            console.log(artist);
            let imgElt = document.createElement("img");
            imgElt.setAttribute("src", artist.picture_medium);
            let nameElt = document.createElement("h1");
            nameElt.classList.add("artist__name");
            nameElt.textContent = artist.name;
            let infoContainer = document.createElement("div");
            infoContainer.classList.add("artist__info");
            let nbAlbumsElt = document.createElement("p");
            nbAlbumsElt.classList.add("artist__info--albums");
            nbAlbumsElt.textContent = artist.nb_album > 1 ? `${artist.nb_album} albums` : `${artist.nb_album} album`;
            let nbFansElt = document.createElement("p");
            nbFansElt.classList.add("artist__info--fans");
            nbFansElt.textContent = `${artist.nb_fan} fans`;
            let deezerLinkElt = document.createElement("a");
            deezerLinkElt.classList.add("artist__info--deezer-link");
            deezerLinkElt.setAttribute("href", artist.link);
            deezerLinkElt.setAttribute("target", "blank");
            deezerLinkElt.textContent = "Voir l'artiste sur Deezer";
            infoContainer.appendChild(nbAlbumsElt);
            infoContainer.appendChild(nbFansElt);
            infoContainer.appendChild(deezerLinkElt);
            document.getElementById("artist-section").appendChild(imgElt);
            document.getElementById("artist-section").appendChild(nameElt);
            document.getElementById("artist-section").appendChild(infoContainer);

            document.getElementById("artist-section").style.background = `center / cover no-repeat url(${artist.picture_big})`;

            fetch(`https://api.deezer.com/artist/${id}/albums`)
                .then(response => response.json())
                .then((albums) => {
                    console.log(albums);
                    let lastAlbumTitleElt = document.createElement("h2");
                    lastAlbumTitleElt.textContent = "Dernier album";
                    document.getElementById("popular-album").appendChild(lastAlbumTitleElt);
                    console.log(albums.data[0]);
                    document.getElementById("popular-album").appendChild(createAlbumCard(albums.data[0]));



                    fetch(`https://api.deezer.com/artist/${id}/top`)
                        .then(response => response.json())
                        .then((topTracks) => {
                            console.log(topTracks);
                            let popularTracksTitleElt = document.createElement("h2");
                            popularTracksTitleElt.textContent = "Titres populaires";
                            document.getElementById("popular-tracks").appendChild(popularTracksTitleElt);
                            for (let i = 0; i < topTracks.data.length; i++) {
                                document.getElementById("popular-tracks").appendChild(createListCard(i + 1, topTracks.data[i]));
                                // previewList.push(topTracks.data[i].preview);
                                // trackList.push(topTracks.data[i]);
                            }
                        })
                        .catch((err) => {
                            console.log("KO");
                            console.log(err);
                        });

                    fetch(`https://api.deezer.com/artist/${id}/related&limit=4`)
                        .then(response => response.json())
                        .then((artistsRelated) => {
                            console.log(artistsRelated);
                            let titleElt = document.createElement("h2");
                            titleElt.textContent = "Artistes liés";
                            document.getElementById("artists-related").appendChild(titleElt);
                            let container = document.createElement("div");
                            container.classList.add("artists-related__grid");
                            for (let i = 0; i < artistsRelated.data.length; i++) {
                                container.appendChild(createArtistCard(artistsRelated.data[i]));
                            }
                            document.getElementById("artists-related").appendChild(container);
                        })
                        .catch((err) => {
                            console.log("KO");
                            console.log(err);
                        });

                })
                .catch((err) => {
                    console.log("KO");
                    console.log(err);
                });

        })
        .catch((err) => {
            console.log("KO");
            console.log(err);
        });

}

window.addEventListener("load", () => {
    setTimeout(function () { getCheckboxState(); }, 1000);

});