
//get the list of ids stored
const storedList = localStorage.getItem("deezweb_track_id");
if (storedList) { //if the list exists, we display the tracks
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
