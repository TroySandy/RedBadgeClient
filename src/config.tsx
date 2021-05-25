const config = {
  REACT_APP_SERVER_API_URL:
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://frozen-eyrie-44849.herokuapp.com/",
};

export default config;
