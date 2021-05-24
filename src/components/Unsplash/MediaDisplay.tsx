import React from "react";
import UserContext from "../../UserContext/UserContext";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";
import {
  Container,
  Grid,
  Paper,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Link,
  Modal,
  FormControlLabel,
  styled,
  withStyles,
  Backdrop,
  Fade,
  Avatar,
  createStyles,
} from "@material-ui/core";

const styles = {
  card: {
    width: "200px",
    borderRadius: "25px",
    backgroundColor: "#424242",
  },

  text: {
    color: "#fff",
  },
};

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

export interface IMediaState {
  unsplashResults: any;
  searchInput: string;
  openComment: boolean;
  openModal: boolean;
  private: boolean;
  userId: string;
  comment: string;
  rating: number;
  favorite: true;
  mediumId: string;
  blur_hash: string;
  url_thumb: string;
  url_small: string;
  url_reg: string;
  url_raw: string;
  image: string;
  thumbnail: string;
  artist_name: string;
  artist_img: string;
  portfolio_url: string;
}

interface IMediaProps {
  classes?: any;
  unsplashResults: any;
}

class MediaDisplay extends React.Component<IMediaProps, IMediaState> {
  static contextType = UserContext;
  constructor(props: IMediaProps) {
    super(props);
    this.state = {
      unsplashResults: [],
      searchInput: "",
      openComment: false,
      openModal: false,
      private: false,
      userId: "",
      comment: "",
      rating: 3,
      favorite: true,
      mediumId: "",
      blur_hash: "",
      url_thumb: "",
      url_small: "",
      url_reg: "",
      url_raw: "",
      image: "",
      thumbnail: "",
      artist_name: "",
      artist_img: "",
      portfolio_url: "",
    };
  }
  handleOpenModal() {
    this.setState({
      openModal: true,
    });
  }

  handleOpenComment() {
    this.setState({
      openModal: true,
    });
    fetch("http://localhost:4000/media/upload", {
      method: "POST",
      body: JSON.stringify({
        private: this.state.private,
        userId: this.state.userId,
        blur_hash: this.state.blur_hash,
        url_thumb: this.state.url_thumb,
        url_small: this.state.url_small,
        url_reg: this.state.url_reg,
        url_raw: this.state.url_raw,
        image: this.state.image,
        thumbnail: this.state.thumbnail,
        artist_name: this.state.artist_name,
        artist_img: this.state.artist_img,
        portfolio_url: this.state.portfolio_url,
        favorite: this.state.favorite,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.context.token}`,
      },
    })
      .then((res) => {
        console.log(res);

        if (res.status !== 201) {
          console.log("File not Uploaded", res);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log("Media", data);
        this.setState({
          mediumId: data.newMedia.id,
        });
      });
  }

  handleClose = () => {
    this.setState({
      openComment: false,
      openModal: false,
    });
  };

  handleChange(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<IMediaState, keyof IMediaState>,
    }));
  }

  handleSwitch(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.checked as Pick<IMediaState, keyof IMediaState>,
    }));
  }

  postComment(e: React.BaseSyntheticEvent) {
    e.preventDefault();

    fetch("http://localhost:4000/comments/create", {
      method: "POST",
      body: JSON.stringify({
        comment: this.state.comment,
        rating: this.state.rating,
        favorite: this.state.favorite,
        private: this.state.private,
        userId: this.state.userId,
        mediumId: this.state.mediumId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.context.token}`,
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          console.log("Comment not Uploaded", res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        this.handleClose();
        console.log(data);
        this.setState({
          private: false,
          userId: "",
          comment: "",
          rating: 3,
          favorite: true,
        });
      });
  }

  componentDidMount() {
    console.log(this.props, "image");
    this.setState({
      image: this.props.unsplashResults.links.download,
      thumbnail: this.props.unsplashResults.urls.thumb,
      artist_name: this.props.unsplashResults.user.name,
      artist_img: this.props.unsplashResults.user.profile_image.small,
      blur_hash: this.props.unsplashResults.blur_hash,
      portfolio_url: this.props.unsplashResults.user.portfolio_url,
      userId: this.context.user.id,
      url_thumb: this.props.unsplashResults.urls.thumb,
      url_small: this.props.unsplashResults.urls.small,
      url_reg: this.props.unsplashResults.urls.full,
      url_raw: this.props.unsplashResults.urls.raw,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <Card
          raised
          onClick={
            !this.context.isAuth
              ? (e) => this.handleOpenModal()
              : (e) => this.handleOpenComment()
          }
          className={classes.card}
        >
          <CardActionArea>
            <CardMedia>
              <Paper elevation={10}>
                <img src={this.state.thumbnail} />
              </Paper>
            </CardMedia>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h4"
                className={classes.text}
              >
                {this.state.artist_name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.openModal}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.openModal}>
            <Container>
              <Paper>
                <Avatar
                  alt={this.state.artist_name}
                  src={this.props.unsplashResults.user.profile_image.small}
                />
                <Link href={this.state.portfolio_url} target="_blank">
                  <Typography>Artist Porfolio</Typography>
                </Link>
                <Link
                  href={this.props.unsplashResults.urls.full}
                  target="_blank"
                >
                  <Typography>Full Image Download</Typography>
                </Link>
                <Link
                  href={this.props.unsplashResults.urls.raw}
                  target="_blank"
                >
                  <Typography>Raw Image Download</Typography>
                </Link>
                <Link
                  href={this.props.unsplashResults.urls.regular}
                  target="_blank"
                >
                  <Typography>Image Download</Typography>
                </Link>
                {!this.context.isAuth ? (
                  <></>
                ) : (
                  <Paper>
                    <form onSubmit={(e) => this.postComment(e)}>
                      <Paper>
                        <TextareaAutosize
                          value={this.state.comment}
                          placeholder="Leave a comment"
                          name="comment"
                          onChange={(e) => this.handleChange(e)}
                        />
                      </Paper>
                      <Paper>
                        <Slider
                          aria-labelledby="Rate this image!"
                          valueLabelDisplay="on"
                          defaultValue={3}
                          step={0.25}
                          onChange={(e) => this.handleChange(e)}
                          onChangeCommitted={(e) => this.handleChange(e)}
                          marks={marks}
                          name="rating"
                          max={5}
                        />
                      </Paper>
                      <Paper>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          <Typography>Submit Comment</Typography>
                        </Button>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.favorite}
                              onChange={(e) => this.handleSwitch(e)}
                              name="favorite"
                              title="Favorite"
                              inputProps={{
                                "aria-label": "favorite checkbox",
                              }}
                            />
                          }
                          label="Favorite"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.private}
                              onChange={(e) => this.handleSwitch(e)}
                              color="primary"
                              name="private"
                              title="Private"
                              inputProps={{
                                "aria-label": "private checkbox",
                              }}
                            />
                          }
                          label="Make Private"
                        />
                      </Paper>
                    </form>
                  </Paper>
                )}
              </Paper>
            </Container>
          </Fade>
        </Modal>
      </Grid>
    );
  }
}

export default withStyles(styles)(MediaDisplay);
