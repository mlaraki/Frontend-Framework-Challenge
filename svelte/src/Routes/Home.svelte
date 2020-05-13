<script>
  import Form from "../Components/Form.svelte";
  import { favorites } from "../Store/store";
  import AddToFavorites from "../Components/AddToFavorites.svelte";
  import RemoveFromFavorites from "../Components/RemoveFromFavorites.svelte";

  let searchTerm;
  let formSubmitted = false;
  let images = [];

  async function getImages() {
    try {
      let res = await fetch(
        `https://pixabay.com/api/?key=16483404-c54e7f94a8b94a007f34f9793&q=${searchTerm}&image_type=photo&page=1`,
        {
          method: "GET",
          "Access-Control-Allow-Origin": "*"
        }
      );
      let processed = await res.json();
      return (images = processed.hits);
    } catch (err) {
      throw new Error(err.message);
    }
  }
  const handleSubmitForm = async e => {
    let { detail } = e;
    formSubmitted = true;
    searchTerm = detail;
  };

  const isFavorites = id =>  $favorites.find(img => img.id === id) ? true : false;
</script>

<main>
  <Form on:submit={handleSubmitForm} />
  {#if formSubmitted && searchTerm}
    {#await getImages(searchTerm)}
	  <img class="logo" src="images/loading.svg" alt="loading"/>
    {:then}
      <section class="images" id="section-images">
        {#if images.length}
          {#each images as img}
            <div class="img-container" id={img.id}>
              <img src={img.webformatURL} alt={searchTerm} />
              {#if $favorites.find(el => el.id === img.id)}
                <RemoveFromFavorites img={img} />
              {:else}
                <AddToFavorites img={img} />
              {/if}
            </div>
          {/each}
        {:else}
          <p>No results found</p>
        {/if}
      </section>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  {/if}
</main>
