const config = {
  REACT_APP_SERVER_API_URL:
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://frozen-eyrie-44849.herokuapp.com",
  REACT_APP_UNSPLASH_APIKEY: "QrZ_4CjnXpZU7ZOT1EJBrOjpWbgZyRvfZQ6QfutowmE",
  REACT_APP_UNSPLASH_APIKEY_SECRET:
    "0cgoyxYPr_bs0UqvMhCwUGt1Xfdss6wXAjVQz_4-frw",
};

export default config;
