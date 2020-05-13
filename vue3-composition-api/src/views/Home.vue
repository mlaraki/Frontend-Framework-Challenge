<template>
  <div class="home">
    <form id="form" @submit.prevent="handleSubmitForm">
      <label for="searchTerm">Search an image</label>
      <input
        v-model="searchTerm"
        class="u-full-width"
        type="text"
        id="searchTerm"
        name="searchTerm"
      />
      <button type="submit" class="center-el">Search</button>
    </form>
    <img v-if="loading" class="loader" src="../assets/loading.svg" alt="loading" />
    <section v-if="!loading && formSubmitted" class="images" id="section-images">
      <div v-if="images.length > 0">
        <div v-for="(img, i) in images" :key="i" class="img-container">
          <img :src="img.webformatURL" :alt="searchTerm" />
          <FavoritesIcon :img="img" />
        </div>
      </div>
      <div v-else>
        <p>No results found</p>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import FavoritesIcon from "../components/FavoritesIcon";

export default {
  name: "home",
  components: {
    FavoritesIcon
  },

  setup(_, context) {
    let searchTerm = ref(""),
      loading = ref(false),
      formSubmitted = ref(false),
      images = ref(context.root.$images);
      //no need to set up vuex for only 1 variable

    const toggleLoadingStatus = () => (loading.value = !loading.value);

    const getImages = async searchTerm => {
      try {
        //You can use this key or create your own.
        //If so , make sur to put it in a .env file if you don't want to share it.
        let res = await fetch(
          `https://pixabay.com/api/?key=16470380-d4d16b7e542ef904b93d0542c&q=${searchTerm}&image_type=photo&page=1`,
          {
            method: "GET",
            "Access-Control-Allow-Origin": "*"
          }
        );
        let processed = await res.json();
        return processed.hits;
      } catch (err) {
        alert(err.message);
      }
    };

    const handleSubmitForm = async () => {
      toggleLoadingStatus();
      formSubmitted.value = true;
      images.value = await getImages(searchTerm.value);
      toggleLoadingStatus();
    };

    return {
      searchTerm,
      handleSubmitForm,
      loading,
      formSubmitted,
      images
    };
  }
};
</script>
