<script>
export let img;
import { favorites } from "../Store/store";

const removeFavorite = img => {
	$favorites.splice( $favorites.indexOf(img), 1);
	// Svelte doesn't react to array methods like splice , only to assignements
	$favorites = $favorites;
}
</script>

<i on:click={removeFavorite(img)} class="fas fa-star favs filled" />