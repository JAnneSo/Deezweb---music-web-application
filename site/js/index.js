
// gestion de la recherche
let searchInput = document.getElementById("side-search");
let urlParam = "";

fetch("https://api.deezer.com/chart")
    .then(response => response.json())
    .then(resFinal => {
        console.log(resFinal);
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

// fetch(`https://api.deezer.com/track/1253711502`)
//     .then(response => response.json())
//     .then(resFinal => {
//         console.log("track");
//         console.log(resFinal);
//         // const tracks = resFinal.tracks.data;
//         // for (let i = 0; i < tracks.length; i++) {
//         //     document.getElementById("audio-song").appendChild(createAlbumCard(tracks[i]));
//         // }

//     })
//     .catch((err) => {
//         console.log(err);
//         alert("Une erreur est survenue");
//     });


window.addEventListener("load", () => {
    setTimeout(function () {
        getCheckboxState();
        initializeSwiper();
        resizeSquareElement("square");
    }, 1000);

});

function resizeSquareElement(className) {
    let imgCtnr = document.getElementsByClassName(className);

    for (let i = 0; i < imgCtnr.length; i++) {
        imgCtnr[i].style.height = imgCtnr[i].offsetWidth + "px";
    }
}

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

    swiper = new Swiper('.swiper-container', {
        slidesPerView: nbOfSlides,
        spaceBetween: 20,
        slidesPerGroup: nbOfSlides,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

