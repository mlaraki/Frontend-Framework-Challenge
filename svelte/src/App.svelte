<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./Routes/Home.svelte";
  import Favorites from "./Routes/Favorites.svelte";

  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="/favorites">
      <nav>
        <Link to="/">Home</Link>
        /
        <span>Favorites</span>
      </nav>
      <h1 class="center-text">Favorites</h1>
      <Favorites />
    </Route>
    <Route path="/">
      <nav>
        <span>Home</span>
        /
        <Link to="/favorites">Favorites</Link>
      </nav>
      <!-- <h1 class="center-text">Svelte</h1> -->
	  <img class="logo" src="images/logo.png" alt="logo"/>
      <Home />
    </Route>
  </div>
</Router>
