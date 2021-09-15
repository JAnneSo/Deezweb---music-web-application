//get the list of ids stored
const storedList = localStorage.getItem("deezweb_track_id");
let storageArray = JSON.parse(storedList);
if (storageArray && storageArray.length !== 0) {
  loader.style.display = "none";
  //if the list exists, we display the tracks
  document.getElementById("title").innerHTML = "Mes favoris";
  for (let i = 0; i < storageArray.length; i++) {
    fetch(`${baseUrl}track/${storageArray[i]}`)
      .then((response) => response.json())
      .then((track) => {
        document
          .getElementById("fav-container")
          .appendChild(createListCard(i, track));
        getCheckboxState();
      })
      .catch((err) => {
        errorFetch("fav-container");
      });
  }
} else {
  loader.style.display = "none";
  document.getElementById("title").innerHTML =
    "Vous n'avez pas encore de favoris!<br>Ajoutez-en 😉";
}
