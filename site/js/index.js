let searchInput = document.getElementById("search");
let urlOrderPart = "";
let radioElts = document.getElementsByName("order");
for (let i = 0; i < radioElts.length; i++) {
    radioElts[i].addEventListener("change", (e) => {
        console.log("Critère de tri : " + e.target.value);
        urlOrderPart += "&order=" + e.target.value;
        if (searchInput.value) {
            search(`https://api.deezer.com/search?q=${searchInput.value}${urlOrderPart}`);
        }
    });
}
document.getElementById("submit")
    .addEventListener("click", () => {
        if (searchInput.value) {

            document.getElementById("album-section").style.display = "none";
            document.getElementById("artist-section").style.display = "none";
            document.getElementById("playlist-section").style.display = "none";

            search(`https://api.deezer.com/search?q=${searchInput.value}${urlOrderPart}`);
        }
    });



// fetch("https://api.deezer.com/chart")
//     .then(response => response.json())
//     .then(resFinal => {
//         console.log(resFinal);
//         const albums = resFinal.albums.data;
//         for (let i = 0; i < albums.length; i++) {
//             document.getElementById("album-section").appendChild(createAlbumCard(albums[i]));
//         }
//     })
//     .catch((err) => {
//         console.log(err);
//         alert("Une erreur est survenue");
//     });
