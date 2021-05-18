
//get the list of ids stored
const storedList = localStorage.getItem("deezweb_track_id");
let storageArray = JSON.parse(storedList);
console.log(storageArray.length);
if (storageArray && storageArray.length !== 0) { //if the list exists, we display the tracks
    document.getElementById("title").innerHTML = "Mes favoris";
    for (let i = 0; i < storageArray.length; i++) {
        fetch(`https://api.deezer.com/track/${storageArray[i]}`)
            .then(response => response.json())
            .then((track) => {
                document.getElementById("fav-container").appendChild(createListCard(i, track));
            })
            .catch((err) => {
                console.log("KO");
                console.log(err);
            });
    }
} else {
    console.log("pas de fav");
    document.getElementById("title").innerHTML = "Vous n'avez pas encore de favoris!<br>Ajoutez-en 😉";
}

window.addEventListener("load", () => {
    setTimeout(function () { getCheckboxState(); }, 1000);
});
