function app() {
  return {
    searchTerm: "",
    loadingStatus: false,
    formSubmitted: false,
	images: [],
	favorites: JSON.parse(localStorage.getItem("__alpine-app__")) || [],
    async handleSubmitForm(e) {
	  this.formSubmitted = true;
	  this.loadingStatus = true;
      this.images = await this.getImages();
	  this.loadingStatus = false;
    },
    async getImages() {
      try {
        let res = await fetch(
          `https://pixabay.com/api/?key=16470380-d4d16b7e542ef904b93d0542c&q=${this.searchTerm}&image_type=photo&page=1`,
          {
            method: "GET",
            "Access-Control-Allow-Origin": "*",
          }
        );
        let processed = await res.json();
        return processed.hits;
      } catch (err) {
        alert(err.message);
      }
	},
	isFavorite(url){
		return this.favorites.includes(url);
	},
	toggleFavorite(url){
		if(this.isFavorite(url)) this.favorites.splice(this.favorites.indexOf(url), 1);
		else this.favorites.push(url);
		localStorage.setItem("__alpine-app__", JSON.stringify(this.favorites));
	}
  };
}