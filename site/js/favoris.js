
//récupération de l'id de la checkbox
const storedList = localStorage.getItem("deezweb_track_id");
if (storedList) {
    let storageArray = JSON.parse(storedList);
    for (let i = 0; i < storageArray.length; i++) {
        fetch(`https://api.deezer.com/track/${storageArray[i]}`)
            .then(response => response.json())
            .then((track) => {
                document.getElementById("test").appendChild(createTrackCard(track));
                console.log(track);
            })
            .catch((err) => {
                console.log("KO");
                console.log(err);
            });
    }
}

