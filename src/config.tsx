const config = {
  REACT_APP_SERVER_API_URL:
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "http://localhost:4000",
};

export default config;
