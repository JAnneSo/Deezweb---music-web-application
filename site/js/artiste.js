// get the url
let search_params = new URLSearchParams(new URL(document.location.href).search);
let id;
// check if the id param exists
if (search_params.has('id')) {
    id = search_params.get('id');
    // API call
    fetch(`https://api.deezer.com/artist/${id}`)
        .then(response => response.json())
        .then((artist) => {
            if (!artist.error) {
                // creation of Html elements and display
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

                // API call to get the artist's last album
                fetch(`https://api.deezer.com/artist/${id}/albums`)
                    .then(response => response.json())
                    .then((albums) => {

                        let lastAlbumTitleElt = document.createElement("h2");
                        lastAlbumTitleElt.textContent = "Dernier album";
                        document.getElementById("popular-album").appendChild(lastAlbumTitleElt);
                        document.getElementById("popular-album").appendChild(createAlbumCard(albums.data[0]));
                        // API call to get the artist's top tracks
                        fetch(`https://api.deezer.com/artist/${id}/top`)
                            .then(response => response.json())
                            .then((topTracks) => {
                                let popularTracksTitleElt = document.createElement("h2");
                                popularTracksTitleElt.textContent = "Titres populaires";
                                document.getElementById("popular-tracks").appendChild(popularTracksTitleElt);
                                for (let i = 0; i < topTracks.data.length; i++) {
                                    document.getElementById("popular-tracks").appendChild(createListCard(i + 1, topTracks.data[i]));
                                }
                            })
                            .catch((err) => {
                                console.log("KO");
                                console.log(err);
                            });

                        // API call to get artists related
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

                        // create swiper with all albums
                        document.getElementById("h2-albums").textContent = "Albums";
                        console.log(albums.data);
                        for (let i = 1; i < albums.data.length; i++) {
                            let swiperSlide = document.createElement("div");
                            swiperSlide.classList.add("swiper-slide");
                            swiperSlide.appendChild(createAlbumCard(albums.data[i]));
                            document.getElementById("albums-section").appendChild(swiperSlide);
                        }
                        let swiper = new Swiper('.swiper-container', {
                            slidesPerView: "auto",
                            spaceBetween: 20,
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                        });
                    })
                    .catch((err) => {
                        console.log("KO");
                        console.log(err);
                    });
            } else {
                errorPage("artist-section");
            }
        })
        .catch((err) => {
            console.log("KO");
            console.log(err);
        });

}

window.addEventListener("load", () => {
    setTimeout(function () { getCheckboxState(); }, 1000);

});

