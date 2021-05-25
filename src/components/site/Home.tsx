import React from "react";
import { createApi } from "unsplash-js";
import config from "../../config";
import UserContext from "../../UserContext/UserContext";
import "./home.css";
import MediaDisplay from "../Unsplash/MediaDisplay";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

interface HomeState {
  unsplashResults: any;
  mediaResults: any;
}

interface unsplashResults {
  blur_hash: string;
  image: string;
  thumbnailL: string;
  url_thumb: string;
  url_small: string;
  url_reg: string;
  url_raw: string;
  artist: string;
  artist_imag: string;
  portfolio_url: string;
  private: boolean;
  favorite: boolean;
  userId: string;
}

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "QrZ_4CjnXpZU7ZOT1EJBrOjpWbgZyRvfZQ6QfutowmE",
});
interface HomeProps {}

class Home extends React.Component<{}, HomeState> {
  static contextType = UserContext;
  constructor(props: {}) {
    super(props);
    this.state = {
      unsplashResults: [],
      mediaResults: [],
    };
  }

  componentDidMount() {
    api.photos
      .getRandom({ featured: true, orientation: "squarish", count: 50 })
      .then((result) => {
        if (result.errors) {
          console.log("ERROR!!!!!", result.errors[0]);
        } else {
          const images = result.response;
          // console.log(result);

          this.setState({
            unsplashResults: images,
          });
        }
      });
  }

  render() {
    return (
      <>
        <Container id="homeBG">
          <Row xl={5} lg={4} md={3} sm={2} xs={1} noGutters>
            {this.state.unsplashResults.map((image: any) => {
              return <MediaDisplay unsplashResults={image} />;
            })}
          </Row>
        </Container>
      </>
    );
  }
}

export default Home;
