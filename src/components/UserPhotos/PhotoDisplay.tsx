import React from "react";
import UserContext from "../../UserContext/UserContext";
import { Container, Grid, Paper } from "@material-ui/core";
import { NavLink, Redirect } from "react-router-dom";

import Photos from "./Photos";

interface IPhotoDisp {
  userMedia: UserMedia[];
}
interface UserMedia {
  artist_name: string;
  artist_img: string;
  blur_hash: string;
  comments: string[];
  id: string;
  image: string;
  url_reg: string;
  portfolio_url: string;
  private: boolean;
  favorite: boolean;
  thumbnail: string;
  url_raw: string;
  url_thumb: string;
  url_small: string;
}

export default class PhotoDisplay extends React.Component<{}, IPhotoDisp> {
  static contextType = UserContext;
  constructor(props: {}) {
    super(props);
    this.state = {
      userMedia: [],
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
        });
        // console.log(this.state.userMedia);
      });
  }

  render() {
    return (
      <>
        <Container>
          <Grid container spacing={1} item>
            {this.state.userMedia.map((image: UserMedia) => {
              return <Photos Media={image} />;
            })}
          </Grid>
          {!this.context.isAuth ? <Redirect to="/" /> : null}
        </Container>
      </>
    );
  }
}
