// get the url
let search_params = new URLSearchParams(new URL(document.location.href).search);
let id;
// check if the id param exists
if (search_params.has("id")) {
  id = search_params.get("id");
  // API call
  fetch(`${baseUrl}album/${id}`)
    .then((response) => response.json())
    .then((album) => {
      loader.style.display = "none";
      if (!album.error) {
        // creation of Html elements and display
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
                    <h2 class="album__info--artist"><a href="artiste.html?id=${
                      album.artist.id
                    }">${album.artist.name}</a></h2>
                    <p class="album__info--genre">${
                      album.genres.data[0]
                        ? `<a href="explorer.html?id=${album.genres.data[0].id}">${album.genres.data[0].name}</a>`
                        : ""
                    }${new Date(album.release_date).getFullYear()}</p>
                    <p class="btn-ctnr">
                        <button id="readPlaylist" class="album-btn"><i class="fas fa-play"></i>Écouter</button>
                        <a href="${
                          album.link
                        }" target="blank" class="album-btn"><i class="fab fa-deezer"></i>Voir l'album sur Deezer</a>
                    </p>
                `;
        document.getElementById("album-ctnr").appendChild(coverCtnr);
        document.getElementById("album-ctnr").appendChild(albumInfoCtnr);
        getCheckboxState();
        /**
         * @event mousemove
         * @description puts hover effect on the cover
         */
        document
          .getElementById("cover")
          .addEventListener("mousemove", function (e) {
            let elem = e.target;
            mX = e.pageX;
            mY = e.pageY;
            distanceY = (calculateDistanceY(elem, mY) / 100) * -4;
            distanceX = (calculateDistanceX(elem, mX) / 100) * 4;
            elem.style.transform = `rotateY(${distanceX}deg) rotateX(${distanceY}deg)`;
            elem.style.transition = "all 0.1s ease";
          });

        /**
         * @event mouseleave
         * @description reset the rotation of the cover
         */
        document
          .getElementById("cover")
          .addEventListener("mouseleave", function (e) {
            let elem = e.target;
            elem.style.transition = "all 0.1s ease";
            elem.style.transform = `rotateY(0deg) rotateX(0deg)`;
          });
        const albumTracks = album.tracks.data;
        let trackList = [];
        let previewList = [];
        for (let i = 0; i < albumTracks.length; i++) {
          document
            .getElementById("tracks-section")
            .appendChild(createListCard(i + 1, albumTracks[i]));
          previewList.push(albumTracks[i].preview);
          trackList.push(albumTracks[i]);
        }
        /**
         * @function loadMusic
         * @description fill the player with the new track to play
         * @param {object} track
         */
        function loadMusic(track) {
          song.setAttribute("src", `${track.preview}`);
          document.getElementById(
            "cover-container"
          ).innerHTML = `<img src="${album.cover_small}" alt="${track.title}"/>`;
          document.getElementById(
            "info-container__title"
          ).innerHTML = `${track.title}`;
          document.getElementById(
            "info-container__artist"
          ).innerHTML = `${track.artist.name} - ${album.title}`;
          range.style.display = "block";
          range.setAttribute("value", "0");
        }
        loadMusic(trackList[0]);
        /**
         * @function playPlaylist
         * @param {number} index
         */
        function playPlaylist(index) {
          if (index < previewList.length) {
            // Check if the player is selected
            if (song === null) {
              throw "Playlist Player does not exists ...";
            } else {
              // Start the player
              loadMusic(trackList[index]);
              song.play();
              // Listen for the music ended event, to play the next audio file
              song.addEventListener(
                "ended",
                () => {
                  playPlaylist(index + 1);
                },
                false
              );
            }
          } else {
            loadMusic(trackList[0]);
          }
        }
        let index = 0;
        /**
         * @event click
         * @description plays the previous song
         */
        prevSongBtn.addEventListener("click", (e) => {
          if (index == 0) {
            index = previewList.length - 1;
          } else {
            index--;
          }
          song.pause();
          playPlaylist(index);
        });
        /**
         * @event click
         * @description plays the next song
         */
        nextSongBtn.addEventListener("click", (e) => {
          if (index == previewList.length) {
            index = 0;
          } else {
            index++;
          }
          song.pause();
          playPlaylist(index);
        });
        /**
         * @event click
         * @description launches the playlist
         */
        document
          .getElementById("readPlaylist")
          .addEventListener("click", () => {
            playPlaylist(index);
            player.innerHTML = '<i class="fa fa-pause"></i>';
          });
      } else {
        errorPage("album-ctnr");
      }
    })
    .catch((err) => {
      errorFetch("album-ctnr");
    });
}

/**
 * calculateDistanceX
 * @param {HTMLElement} elem
 * @param {number} mouseX
 * @returns {number}
 */
function calculateDistanceX(elem, mouseX) {
  return Math.pow(
    mouseX -
      (window.scrollX +
        elem.getBoundingClientRect().left +
        elem.style.width / 2),
    1
  );
}

/**
 * calculateDistanceY
 * @param {HTMLElement} elem
 * @param {number} mouseY
 * @returns {number}
 */
function calculateDistanceY(elem, mouseY) {
  return Math.pow(
    mouseY -
      (window.scrollY +
        elem.getBoundingClientRect().top +
        elem.style.height / 2),
    1
  );
}
