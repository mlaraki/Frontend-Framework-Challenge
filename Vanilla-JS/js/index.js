// @ts-nocheck

const form = document.getElementById("form");
const loadingImage = document.getElementById("loading-image");
const imagesSection = document.getElementById("section-images");
var images;
var favs = JSON.parse(localStorage.getItem("Vanilla-js-favorites")) || initFavorites();

function initFavorites(){
	localStorage.setItem("Vanilla-js-favorites", JSON.stringify([]));
	return JSON.parse(localStorage.getItem("Vanilla-js-favorites"));
}

const updateFavorites = () => localStorage.setItem('Vanilla-js-favorites', JSON.stringify(favs));

const updateImage = (id, type) => {
	let el = document.getElementById(id).childNodes;
	el[1].className = type === 'remove' ? "far fa-star favs empty" : "fas fa-star favs filled";
}

const addToFavorites = (id, url) => {
	favs.push({id , url});
	updateFavorites();
	updateImage(id, 'add');
}

const removeFromFavorites = (id, url) => {
	favs.splice(favs.findIndex(img => img.id == id), 1);
	updateFavorites();
	updateImage(id, 'remove');
}

const toggleFavorites = (id, url) => {	
	favs.find(img => img.id == id) ? removeFromFavorites(id, url) : addToFavorites(id, url);
};

const isFavorite = (id) => {
	if(favs.length == 0) return false;
	return favs.find((img) => img.id == id) != undefined ? true : false;
}

const appendImages = (images) => {
  imagesSection.innerHTML = "";
  for (let img of images) {
    let { webformatURL: url, id } = img;
    let container = document.createElement("div");
    container.className = "img-container";
    container.id = id;
    let imgElement = document.createElement("img");
	imgElement.src = url;
	let favorites_icon = document.createElement("i");
    favorites_icon.className = isFavorite(id)
      ? "fas fa-star favs filled"
      : "far fa-star favs empty";
    favorites_icon.addEventListener("click", () => {
      toggleFavorites(id, url);
	});
	imgElement.addEventListener("load", () => {
		container.append(imgElement, favorites_icon);
		imagesSection.append(container);
	});
  }
};

const appendText = (text) => {
  imagesSection.innerHTML = "";
  let textElement = document.createElement("p");
  textElement.innerText = text;
  textElement.className = "center-text";
  imagesSection.append(textElement);
};

const getImages = async (input) => {
  try {
    let res = await fetch(
      `https://pixabay.com/api/?key=16470380-d4d16b7e542ef904b93d0542c&q=${input}&image_type=photo&page=1`,
      {
        method: "GET",
        "Access-Control-Allow-Origin": "*",
      }
    );
    let processed = await res.json();
    images = processed.hits;
  } catch (err) {
    alert(err.message);
  }
};

const toggleLoadingStatus = () => {
  let { display } = loadingImage.style;
  display == "none"
    ? (loadingImage.style.display = "block")
    : (loadingImage.style.display = "none");
};

form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    toggleLoadingStatus();
    await getImages(e.target[0].value);
    images.length > 0 ? appendImages(images) : appendText("No results found");
    toggleLoadingStatus();
  } catch (err) {
    alert(err.message);
    toggleLoadingStatus();
  }
});
