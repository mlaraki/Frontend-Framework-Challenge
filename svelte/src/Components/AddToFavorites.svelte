<script>
export let img;
import { favorites } from "../Store/store";

const addFavorite = img => {
	$favorites.push(img);
	// Svelte doesn't react to array methods like push , only to assignements
	$favorites = $favorites;
}
</script>

<i on:click={addFavorite(img)} class="far fa-star favs empty" />