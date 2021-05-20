import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteRight,
  faQuoteLeft,
  faSync,
  faImage,
  faMoon,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import store from "store";
import "./App.css";

import BGMusic from "./Components/BGMusic";

const storeKey = "quotes-store-key";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({});
  const [quoteML, setQuoteML] = useState("");
  const [fetchedQuotes, setFetchedQuotes] = useState(false);

  var translateToMl = async () => {};

  var getRandomQuote = () => {
    let quote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(quote);
  };

  var changeBgImage = () => {
    const randomId = new Date().getTime();
    $(".background-image").css(
      "background-image",
      `url('https://picsum.photos/${window.innerWidth}/${window.innerHeight}?random=${randomId}')`
    );
  };

  var removeBgImage = () => {
    $(".background-image").css("background-image", "none");
  };

  useEffect(() => {
    // Jquery
    //Disable cut copy paste
    $("*").bind("cut copy paste", function (e) {
      e.preventDefault();
    });

    //Disable mouse right click
    $("*").on("contextmenu", function (e) {
      return false;
    });

    async function fetchQuotes() {
      await axios
        .get("https://type.fit/api/quotes/")
        .then((response) => {
          setQuotes(response.data);
          store.set(storeKey, response.data);
          setFetchedQuotes(true);
        })
        .catch((err) => {
          alert(err);
          window.location.reload();
        });
    }
    if (typeof store.get(storeKey) !== "undefined") {
      setQuotes(store.get(storeKey));
      setFetchedQuotes(true);
      getRandomQuote();
    } else {
      fetchQuotes();
      getRandomQuote();
    }
    $(".background-image").css(
      "background-image",
      `url('https://picsum.photos/${window.innerWidth}/${window.innerHeight}')`
    );
  }, [fetchedQuotes]);

  return (
    <React.Fragment>
      <BGMusic />
      <button
        className="change-bg top-right"
        onClick={() => {
          getRandomQuote();
        }}
      >
        <FontAwesomeIcon icon={faSync} />
      </button>
      <button className="change-bg top-left" onClick={changeBgImage}>
        <FontAwesomeIcon icon={faImage} />
      </button>
      <button className="change-bg bottom-left" onClick={removeBgImage}>
        <FontAwesomeIcon icon={faMoon} />
      </button>
      <button
        className="change-bg bottom-right"
        onClick={() => {
          window.location.href = `https://translate.google.co.in/?sl=en&tl=ml&text=${quote.text}&op=translate`;
        }}
      >
        <FontAwesomeIcon icon={faLanguage} />
      </button>
      <div
        className="full-width top-fixed background-image"
        onDoubleClick={getRandomQuote}
      >
        <div className="content">
          <h1 className="text">
            <FontAwesomeIcon
              className="quotes-left"
              size="1x"
              icon={faQuoteLeft}
            />
            {quote ? quote.text : " "}
            <FontAwesomeIcon
              className="quotes-right"
              size="1x"
              icon={faQuoteRight}
            />
            <br />
            <br />
            <span className="author">
              {" "}
              {quote ? `  - ${quote.author}` : " "}
            </span>
          </h1>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
