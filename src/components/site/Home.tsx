import React from "react";
import { createApi } from "unsplash-js";
import config from "../../config";
import UserContext from "../../UserContext/UserContext";
import "./home.css";
import MediaDisplay from "../Unsplash/MediaDisplay";
import { Container, Grid } from "@material-ui/core";

interface HomeState {
  imageResult: any;
  searchInput: string;
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
      imageResult: [],
      searchInput: "",
    };
  }

  componentDidMount() {
    api.photos.getRandom({ featured: true, count: 50 }).then((result) => {
      if (result.errors) {
        console.log("ERROR!!!!!", result.errors[0]);
      } else {
        const images = result.response;
        console.log(result);

        this.setState({
          imageResult: images,
        });
      }
    });
  }

  render() {
    return (
      <>
        <Container>
          <Grid container spacing={1}>
            {this.state.imageResult.map((image: any) => {
              return <MediaDisplay imageResult={image} />;
            })}
          </Grid>
        </Container>
      </>
    );
  }
}

export default Home;
