<template>
  <div id="app">
    <div id="nav" v-if="$route.name == 'home'">
      <span>Home</span> /
      <router-link to="/favorites">Favorites</router-link>
    </div>
    <div id="nav" v-else>
      <router-link to="/">Home</router-link> /
      <span>Favorites</span>
    </div>
	<img v-if="$route.name == 'home'" class="logo" src="./assets/logo.png" alt="logo"/>
    <h1 v-else class="center-text">Favorites</h1>
    <router-view />
  </div>
</template>

<style>
@import "./assets/App.css";
</style>
