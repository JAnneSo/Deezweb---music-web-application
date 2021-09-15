/**
 * @function createSwiperCardContainer
 * @description create a html element : div
 * @returns HTMLDivElement
 */
function createSwiperCardContainer() {
  let swiperSlide = document.createElement("div");
  swiperSlide.classList.add("swiper-slide");
  return swiperSlide;
}

/**
 * @function initializeSwiper
 * @description manages the number of cards displayed in the swiper for all screen size
 */
function initializeSwiper() {
  let swiper = new Swiper(".swiper-container", {
    slidesPerView: "auto",
    spaceBetween: 15,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 500px
      500: {
        slidesPerView: 3,
        spaceBetween: 20,
        slidesPerGroup: 3
      },
      // when window width is >= 1100px
      1100: {
        slidesPerView: 4,
        spaceBetween: 20,
        slidesPerGroup: 4
      },
      // when window width is >= 1250px
      1250: {
        slidesPerView: 5,
        spaceBetween: 20,
        slidesPerGroup: 5
      }
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
}

fetch(`${baseUrl}chart`)
  .then((response) => response.json())
  .then((resFinal) => {
    loader.style.display = "none";
    const albums = resFinal.albums.data;
    const artists = resFinal.artists.data;
    const tracks = resFinal.tracks.data;
    for (let i = 0; i < albums.length; i++) {
      let swiperCntr = createSwiperCardContainer();
      swiperCntr.appendChild(createAlbumCard(albums[i]));
      document.getElementById("albums-section").appendChild(swiperCntr);
    }
    for (let i = 0; i < tracks.length; i++) {
      let swiperCntr = createSwiperCardContainer();
      swiperCntr.appendChild(createTrackCard(tracks[i]));
      document.getElementById("tracks-section").appendChild(swiperCntr);
    }
    for (let i = 0; i < artists.length; i++) {
      let swiperCntr = createSwiperCardContainer();
      swiperCntr.appendChild(createArtistCard(artists[i]));
      document.getElementById("artists-section").appendChild(swiperCntr);
    }

    initializeSwiper();
    getCheckboxState();
  })
  .catch((err) => {
    errorFetch("home-main");
  });
