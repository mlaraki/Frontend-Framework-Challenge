import React, { useState } from "react";
import loader from "../loader.svg";
import "../App.css";

export default function Home(props) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [requested, setRequested] = useState(false);
  let { favorites, addToFavorites, removeFromFavorites } = props;

  const getImages = async (searchTerm) => {
    try {
      setRequested(false);
      let res = await fetch(
        `https://pixabay.com/api/?key=16470380-d4d16b7e542ef904b93d0542c&q=${searchTerm}&image_type=photo&page=1`,
        {
          method: "GET",
          "Access-Control-Allow-Origin": "*",
        }
      );
      let processed = await res.json();
      setRequested(true);
      return processed.hits;
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImages([]);
    try {
      const imgs = await getImages(e.target[0].value);
      setImages(imgs);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const imagesHandler = () => {
    if (!images.length && requested) return <p>No results found</p>;
    else {
      return images.map((img, i) => {
        let { webformatURL: url, id } = img;
        return (
          <div className="img-container" key={id}>
            <img src={url} key={i} alt="" />
            {favorites.find((img) => img.id === id) ? (
              <div onClick={() => removeFromFavorites(url, id)}>
                <i className="fas fa-star favs filled" />
              </div>
            ) : (
              <div onClick={() => addToFavorites(url, id)}>
                <i className="far fa-star favs empty" />
              </div>
            )}
          </div>
        );
      });
    }
  };
  return (
    <div className="App">
      <div>
        <form id="form" onSubmit={handleSubmitForm}>
          <label htmlFor="searchTerm">Search an image</label>
          <input
            className="u-full-width"
            type="text"
            id="searchTerm"
            name="searchTerm"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {loading && (
        <div id="loading-image">
          <img className="loader" src={loader} alt="loader" />
        </div>
      )}
      <section class="images" id="section-images">
        {!loading && imagesHandler()}
      </section>
    </div>
  );
}
