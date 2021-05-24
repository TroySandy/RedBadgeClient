import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

interface pPhotos {
  Media: UserMedia;
}

interface sPhotos {
  userMedia: UserMedia | any;
  mediumId: string;
  thumbnail: string;
  artist_name: string;
}
interface UserMedia {
  artist_name: string;
  artist_img: string;
  blur_hash: string;
  comments: string[];
  id: string;
  image: string;
  url_small: string;
  portfolio_url: string;
  private: boolean;
  favorite: boolean;
  thumbnail: string;
  url_reg: string;
  url_raw: string;
  url_thumb: string;
}

class Photos extends React.Component<pPhotos, sPhotos> {
  constructor(props: pPhotos) {
    super(props);
    this.state = {
      userMedia: "",
      mediumId: "",
      thumbnail: "",
      artist_name: "",
    };
  }

  componentDidMount() {
    this.setState({
      userMedia: this.props.Media,
      mediumId: this.props.Media.id,
      thumbnail: this.props.Media.image,
      artist_name: this.props.Media.artist_name,
    });
    setTimeout(() => {
      console.log(
        this.state.userMedia,
        this.state.thumbnail,
        this.state.mediumId
      );
    }, 500);
  }

  render() {
    return (
      <Link
        to={{
          pathname: "/photo",
          state: {
            userMedia: this.state.userMedia,
          },
        }}
      >
        {this.state.thumbnail ? (
          <Grid item>
            <Card
              raised
              //   onClick={
              //     !this.context.isAuth
              //       ? (e) => this.handleOpenModal()
              //       : (e) => this.handleOpenComment()
              //   }
              //   className={classes.card}
            >
              <CardActionArea>
                <CardMedia>
                  <Paper elevation={10}>
                    <img
                      src={this.state.thumbnail}
                      height="200px"
                      width="200px"
                    />
                  </Paper>
                </CardMedia>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="button"
                    component="h4"
                    // className={classes.text}
                  >
                    {this.state.artist_name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ) : (
          <></>
        )}
      </Link>
    );
  }
}

export default Photos;
