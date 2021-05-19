import React from "react";
import UserContext from "../../UserContext/UserContext";
import Tile from "./Tile";
import AwesomeSlider from "react-awesome-slider";
import { Container, Link, Paper } from "@material-ui/core";

interface IGallery {
  userMedia: string[];
  numOfImages: number | null;
}
export default class Gallery extends React.Component<{}, IGallery> {
  static contextType = UserContext;
  constructor(props: {}) {
    super(props);
    this.state = {
      userMedia: [],
      numOfImages: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/media/media", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.context.token}`,
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          console.log("Files not found", res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        const media = data.Media;
        console.log(data.Media);
        this.setState({
          userMedia: media,
          numOfImages: media.length,
        });
        console.log(this.state.userMedia);
      });
  }

  render() {
    return (
      <>
        <Container>
          <Paper>
            {this.state.userMedia.map((image: any) => {
              return (
                // <Paper key={image.id}>
                // <Link href="" target="_blank">
                <Tile image={image} />
                // </Link>
                // </Paper>
              );
            })}
          </Paper>
        </Container>
      </>
    );
  }
}
