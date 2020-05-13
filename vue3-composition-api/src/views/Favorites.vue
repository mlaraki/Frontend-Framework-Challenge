<template>
  <div class="about">
    <section v-if="$favorites.length > 0" class="images" id="favorites-section-images">
      <div class="img-container" v-for="(img, i) in favorites" :key="i">
        <img :src="img.webformatURL" alt />
        <FavoritesIcon :img="img" />
      </div>
    </section>
    <p v-else>No favorites yet</p>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import FavoritesIcon from "../components/FavoritesIcon";

export default {
  name: "Favorites",
  components: {
    FavoritesIcon
  },
  setup(_, context) {
    let favorites = ref(context.root.$favorites);

    return {
      favorites
    };
  }
};
</script>