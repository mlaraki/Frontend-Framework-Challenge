import React, { useState } from "react";
import logo from "./logo.svg";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Navigation() {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (url, id) => {
    let favs = favorites;
    favs.push({ url, id });
    setFavorites([...favs]);
  };

  const removeFromFavorites = (url, id) => {
    let favs = favorites;
    favs.splice(favs.indexOf(id), 1);
    setFavorites([...favs]);
  };
  let props = {
    favorites,
    addToFavorites,
    removeFromFavorites,
  };
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/favorites">
            <nav>
              <Link to="/">Home</Link>
              <span> / </span>
              <span>Favorites</span>
            </nav>
            <header className="App-header">
              <div>
                <h1 className="center-text">Favorites</h1>
              </div>
            </header>
            <Favorites {...props} />
          </Route>
          <Route path="/">
            <nav>
              <span>Home</span>
              <span> / </span>
              <Link to="/favorites">Favorites</Link>
            </nav>
            <header className="App-header">
              <div>
                <img class="logo" src={logo} alt="logo" />
              </div>
            </header>
            <Home {...props} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
