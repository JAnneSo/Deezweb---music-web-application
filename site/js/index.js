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
        for (let i = 0; i < albums.length; i++) {
            document.getElementById("albums-section").appendChild(createAlbumCard(albums[i]));
        }

    })
    .catch((err) => {
        console.log(err);
        alert("Une erreur est survenue");
    });
