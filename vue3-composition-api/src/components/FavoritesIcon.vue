<template>
  <div @click="toggleFavorite">
    <i v-if="isFavorite" class="fas fa-star favs filled"></i>
    <i v-else class="far fa-star favs empty"></i>
  </div>
</template>

<script>
import { ref, computed } from "@vue/composition-api";

export default {
  name: "FavoritesIcon",
  props: {
    img: Object
  },
  setup(props, context) {
	let favorites = ref(context.root.$favorites);
    let isFavorite = computed({
      get: () =>
         favorites.value.find(img => img.id === props.img.id) ? true : false,
      set: val => val
    });

    const toggleFavorite = () => {
      let { img } = props;
      isFavorite.value
        ?  favorites.value.splice(favorites.value.indexOf(img), 1)
        :  favorites.value.push(img);
    };

    return {
      isFavorite,
      toggleFavorite
    };
  }
};
</script>
