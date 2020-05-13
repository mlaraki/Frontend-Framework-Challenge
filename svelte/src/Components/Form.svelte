<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let searchTerm;
	function submitForm(){
		dispatch('submit', searchTerm);
	}
</script>

<form id="form" on:submit|preventDefault={submitForm}>
  <label for="searchTerm">Search an image</label>
  <input
    bind:value={searchTerm}
    class="u-full-width"
    type="text"
    id="searchTerm"
    name="searchTerm" />
  <button type="submit" class="center-el">Search</button>
</form>
