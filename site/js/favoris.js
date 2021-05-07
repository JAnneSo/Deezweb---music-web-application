
//récupération de l'id de la checkbox
const storedList = localStorage.getItem("deezweb_track_id");
if (storedList) {
    let storageArray = JSON.parse(storedList);
    for (let i = 0; i < storageArray.length; i++) {
        fetch(`https://api.deezer.com/track/${storageArray[i]}`)
            .then(response => response.json())
            .then((track) => {
                document.getElementById("test").appendChild(createListCard(i, track));
            })
            .catch((err) => {
                console.log("KO");
                console.log(err);
            });
    }
}

window.addEventListener("load", () => {
    setTimeout(function () { getCheckboxState(); }, 1000);

});

// const likedTrackList = document.querySelectorAll("input[type=checkbox]");
// for (let i = 0; i < likedTrackList.length; i++) {
//     const track = likedTrackList[i];
//     track.addEventListener("click", (e)=>{
//         if (!e.target.checked) {
//             // gérer la disparission de l'élément
//         }
//     })
// }