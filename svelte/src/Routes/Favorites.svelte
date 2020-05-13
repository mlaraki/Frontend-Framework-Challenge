<script>
  import { favorites } from "../Store/store";
  import RemoveFromFavorites from "../Components/RemoveFromFavorites.svelte";
</script>

<section class="images" id="section-images">
  {#if $favorites.length}
    {#each $favorites as img}
      <div class="img-container" id={img.id}>
        <img src={img.webformatURL} alt="" />
          <RemoveFromFavorites {img} />
      </div>
    {/each}
  {:else}
    <p>No favorites yet</p>
  {/if}
</section>
