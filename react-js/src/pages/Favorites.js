import React from "react";
import "../App.css";

export default function Favorites(props) {
  let { favorites, removeFromFavorites } = props;
  const displayImages = () => {
    return favorites.map((img, i) => {
      let { url, id } = img;
      return (
        <div className="img-container" key={id}>
          <img src={url} key={i} alt="" />
          <div onClick={() => removeFromFavorites(url, id)}>
            <i className="fas fa-star favs filled" />
          </div>
        </div>
      );
    });
  };

  return (
    <section class="images" id="section-images">
      {favorites.length > 0 ? displayImages() : <p>No Favorites yet</p>}
    </section>
  );
}
