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
 * @function resizeSquareElement
 * @description resizes the image correctly
 * @param {string} className 
 */
function resizeSquareElement(className) {
    let imgCtnr = document.getElementsByClassName(className);

    for (let i = 0; i < imgCtnr.length; i++) {
        imgCtnr[i].style.height = imgCtnr[i].offsetWidth + "px";
    }
}

/**
 * @function initializeSwiper
 * @description manages the number of cards displayed in the swiper for all screen size
 */
function initializeSwiper() {
    let nbOfSlides;
    if (1250 < window.outerWidth) {
        nbOfSlides = 5;
    } else if (1100 < window.outerWidth && window.outerWidth < 1250) {
        nbOfSlides = 4;
    } else if (window.outerWidth < 500) {
        nbOfSlides = 2;
    } else if (window.outerWidth < 1100) {
        nbOfSlides = 3;
    }

    let swiper = new Swiper('.swiper-container', {
        slidesPerView: nbOfSlides,
        spaceBetween: 20,
        slidesPerGroup: nbOfSlides,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

fetch("https://api.deezer.com/chart")
    .then(response => response.json())
    .then(resFinal => {
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
        resizeSquareElement("square");

        window.onresize = () => {
            initializeSwiper();
            resizeSquareElement("square");
        }

    })
    .catch((err) => {
        console.log(err);
        alert("Une erreur est survenue");
    });

/**
 * @event load
 * @description executes these functions 500 milliseconds after the load
 */
window.addEventListener("load", () => {
    setTimeout(function () {
        initializeSwiper();
        resizeSquareElement("square");
        getCheckboxState();
    }, 500);
});