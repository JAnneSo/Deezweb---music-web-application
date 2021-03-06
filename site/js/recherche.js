let searchInput = document.getElementById("search");
let radioElts = document.getElementsByName("order");

/**
 * @function displaySection
 * @description displays elements in a section
 * @param {object} list
 * @param {string} sectionIdWord1
 * @param {string} sectionTitle
 * @param {function} createCardFunction
 */
function displaySection(
  list,
  sectionIdWord1,
  sectionTitle,
  createCardFunction
) {
  document.getElementById(
    `${sectionIdWord1}-section`
  ).innerHTML = `<h2>${sectionTitle}</h2>`;
  let divElt = document.createElement("div");
  divElt.classList.add(`${sectionIdWord1}-container`);
  for (let i = 0; i < list.length; i++) {
    divElt.appendChild(createCardFunction(list[i]));
  }
  document.getElementById(`${sectionIdWord1}-section`).appendChild(divElt);
}

/**
 * @function deleteContent
 * @description delete the content
 * @param {string} containerId
 */
function deleteContent(containerId) {
  if (document.getElementById(containerId)) {
    document.getElementById(containerId).innerHTML = "";
  }
}

/**
 * @function globalResearch
 * @description
 * @param {string} inputValue
 */
function globalResearch(inputValue) {
  loader.style.display = "flex";
  deleteContent("artist-section");
  deleteContent("album-section");
  deleteContent("track-section");
  document.getElementById("research").innerHTML = "";
  for (let i = 0; i < radioElts.length; i++) {
    if (radioElts[i].checked) {
      radioElts[i].checked = false;
    }
  }
  let popularSection = document.getElementById("popular-section");
  // Recherche par artistes populaires
  fetch(`${baseUrl}search/artist?q=${inputValue}&order=RANKING&limit=4`)
    .then((response) => response.json())
    .then((resFinal) => {
      let artistsList = resFinal.data;
      const artistsOK = artistsList.length > 0;
      // Recherche par albums populaires
      fetch(`${baseUrl}search/album?q=${inputValue}&order=RANKING&limit=4`)
        .then((response) => response.json())
        .then((resFinal2) => {
          let albumsList = resFinal2.data;
          const albumsOK = albumsList.length > 0;
          // Recherche par titres populaires
          fetch(`${baseUrl}search/track?q=${inputValue}&order=RANKING&limit=8`)
            .then((response) => response.json())
            .then((resFinal3) => {
              let tracksList = resFinal3.data;
              const tracksOK = tracksList.length > 0;
              loader.style.display = "none";
              if (artistsOK || albumsOK || tracksOK) {
                popularSection.innerHTML = "<h2>Les plus populaires</h2>";
                let divElt = document.createElement("div");
                divElt.classList.add("popular-container");
                if (artistsOK) {
                  divElt.innerHTML += `<div class="popular-card">
                                <img class="popular-card__profile" src="${artistsList[0].picture_medium}" alt="artist">
                                <div class="popular-card__info">
                                    <p class="popular-card__info--title">${artistsList[0].name}</p>
                                    <p class="popular-card__info--subtitle">Artiste</p>
                                </div>
                                <a href="artiste.html?id=${artistsList[0].id}" class="popular-card__link"></a>
                                    </div>`;
                  displaySection(
                    artistsList,
                    "artist",
                    "Artistes",
                    createArtistCard
                  );
                } else {
                  // deleteContent("artist-container");
                }
                if (albumsOK) {
                  divElt.innerHTML += `<div class="popular-card">
                                <img class="popular-card__cover" src="${albumsList[0].cover_big}" alt="album">
                                <div class="popular-card__info">
                                    <p class="popular-card__info--title">${albumsList[0].title}</p>
                                    <p class="popular-card__info--subtitle">
                                        <span>Album</span><span>${albumsList[0].artist.name}</span>
                                    </p>
                                </div>
                                <a href="album.html?id=${albumsList[0].id}" class="popular-card__link"></a>
                                    </div>`;
                  displaySection(
                    albumsList,
                    "album",
                    "Albums",
                    createAlbumCard
                  );
                } else {
                  // deleteContent("album-container");
                }
                if (tracksOK) {
                  divElt.innerHTML += `<div class="popular-card">
                                <img class="popular-card__cover" src="${tracksList[0].album.cover_big}" alt="titre">
                                <div class="popular-card__info">
                                    <button class="track-card__play" id="${tracksList[0].id}" onclick="playSong(this)"><i class='fas fa-play'></i></button>
                                    <p class="popular-card__info--title">${tracksList[0].title}</p>
                                    <p class="popular-card__info--subtitle">
                                        <span>Titre</span><span>${tracksList[0].artist.name}</span>
                                    </p>
                                </div>
                                <a href="titre.html?id=${tracksList[0].id}" class="popular-card__link"></a>
                                    </div>`;
                  displaySection(
                    tracksList,
                    "track",
                    "Titres",
                    createTrackCard
                  );
                } else {
                  // deleteContent("track-container");
                }
                popularSection.appendChild(divElt);
                getCheckboxState();
              } else {
                // deleteContent("artist-section");
                // deleteContent("album-section");
                // deleteContent("track-section");
                popularSection.innerHTML = "<h2>Il n'y a pas de r??sultats</h2>";
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      errorFetch("research");
    });
}

/**
 * @function search
 * @description displays the result of a search
 * @param {string} requete
 */
function search(sortCriterion) {
  deleteContent("popular-section");
  deleteContent("artist-section");
  deleteContent("album-section");
  deleteContent("track-section");
  switch (sortCriterion) {
    case "ALBUM":
      fetch(`${baseUrl}search/album?q=${searchInput.value}`)
        .then((response) => response.json())
        .then((resFinal) => {
          let albums = resFinal.data;
          if (albums.length > 0) {
            deleteContent("research");
            for (let i = 0; i < albums.length; i++) {
              document
                .getElementById("research")
                .appendChild(createAlbumCard(albums[i]));
            }
          } else {
            document.getElementById("research").innerHTML =
              "<h2>Il n'y a pas de r??sultats</h2>";
          }
        })
        .catch((err) => {
          errorFetch("research");
        });
      break;
    case "ARTIST":
      fetch(`${baseUrl}search/artist?q=${searchInput.value}`)
        .then((response) => response.json())
        .then((resFinal) => {
          let artist = resFinal.data;
          if (artist.length > 0) {
            deleteContent("research");
            for (let i = 0; i < artist.length; i++) {
              document
                .getElementById("research")
                .appendChild(createArtistCard(artist[i]));
            }
          } else {
            document.getElementById("research").innerHTML =
              "<h2>Il n'y a pas de r??sultats</h2>";
          }
        })
        .catch((err) => {
          errorFetch("research");
        });
      break;
    default:
      let urlOrderPart = "&order=" + sortCriterion;
      fetch(`${baseUrl}search?q=${searchInput.value}${urlOrderPart}`)
        .then((response) => response.json())
        .then((resFinal) => {
          let tracks = resFinal.data;
          if (tracks.length > 0) {
            deleteContent("research");
            for (let i = 0; i < tracks.length; i++) {
              document
                .getElementById("research")
                .appendChild(createTrackCard(tracks[i]));
            }
          } else {
            document.getElementById("research").innerHTML =
              "<h2>Il n'y a pas de r??sultats</h2>";
          }
        })
        .catch((err) => {
          errorFetch("research");
        });
      break;
  }
}

// get the url
let search_params = new URLSearchParams(new URL(document.location.href).search);
let qParam;
// check if the q param exists
if (search_params.has("q")) {
  qParam = search_params.get("q");
  searchInput.value = qParam;
  globalResearch(qParam);
}

for (let i = 0; i < radioElts.length; i++) {
  radioElts[i].addEventListener("change", (e) => {
    if (searchInput.value) {
      // launches the search with a sort parameter
      search(e.target.value);
    }
  });
}
/**
 * @event click
 * @description launches the search from the main search input if the button is pressed
 */
document.getElementById("submit").addEventListener("click", () => {
  if (searchInput.value) {
    urlOrderPart = "";
    globalResearch(searchInput.value);
  }
});
/**
 * @event keydown
 * @description launches the search from the main search input if enter is pressed
 */
searchInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    globalResearch(e.target.value);
  }
});
