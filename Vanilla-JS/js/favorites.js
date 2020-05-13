//@ts-nocheck
const favoritesImagesSection = document.getElementById("favorites-section-images");
var favs = JSON.parse(localStorage.getItem("Vanilla-js-favorites")) || initFavorites();

const updateFavorites = () => localStorage.setItem('Vanilla-js-favorites', JSON.stringify(favs));

const displayNoFavs = () => {
	favoritesImagesSection.innerHTML = "";
	let noFavs = document.createElement("p");
	noFavs.innerText = "No Favorites yet";
	favoritesImagesSection.append(noFavs);
}

const removeFromFavorites = id => {
	favs.splice(favs.findIndex(img => img.id == id), 1);
	let imgElement = document.getElementById(id);
	imgElement.remove();
}

const displayFavs = favs => {
	favoritesImagesSection.innerHTML = "";
	for (let obj of favs) {
		let {id , url} = obj;
		let container = document.createElement('div');
		container.className = 'img-container';
		container.id = id;
		let imgElement = document.createElement('img');
		imgElement.src = url;
		let remove_icon = document.createElement('i');
		remove_icon.className = "fas fa-star favs filled";
		remove_icon.addEventListener('click', () => {
			removeFromFavorites(id);
			updateFavorites();
			favs.length ? displayFavs(favs) : displayNoFavs();
		})
		container.append(imgElement, remove_icon);
		favoritesImagesSection.append(container);
	}
}

function initFavorites(){
	localStorage.setItem("Vanilla-js-favorites", JSON.stringify([]));
	return JSON.parse(localStorage.getItem("Vanilla-js-favorites"));
}

favs.length ? displayFavs(favs) : displayNoFavs();