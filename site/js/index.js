// gestion de la recherche
let searchInput = document.getElementById("side-search");
let urlParam = "";

document.getElementById("side-submit")
    .addEventListener("click", () => {
        if (searchInput.value) {
            urlParam += `?q=${searchInput.value}`;
            location.href = `pages/recherche.html${urlParam}`;
        }
    });



fetch("https://api.deezer.com/chart")
    .then(response => response.json())
    .then(resFinal => {
        console.log(resFinal);
        const albums = resFinal.albums.data;
        const artists = resFinal.artists.data;
        const tracks = resFinal.tracks.data;
        for (let i = 0; i < albums.length; i++) {
            document.getElementById("albums-section").appendChild(createAlbumCard(albums[i]));
        }
        for (let i = 0; i < tracks.length; i++) {
            document.getElementById("tracks-section").appendChild(createTrackCard(tracks[i]));
        }
        for (let i = 0; i < artists.length; i++) {
            document.getElementById("artists-section").appendChild(createArtistCard(artists[i]));
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
    setTimeout(function () { getCheckboxState(); }, 1000);

});




