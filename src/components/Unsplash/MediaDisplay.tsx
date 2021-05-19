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
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Link,
  Modal,
  FormControl,
  FormControlLabel,
  styled,
  withStyles,
  Backdrop,
  Fade,
  Avatar,
} from "@material-ui/core";

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

interface IMediaState {
  imageResult: any;
  searchInput: string;
  openComment: boolean;
  openModal: boolean;
  private: boolean;
  userId: string;
  comment: string;
  rating: number;
  favorite: true;
  mediumId: string;
  blurhash: string;
  urls: string[];
  user: string[];
  image: string;
  thumbnail: string;
  artist: string;
  artist_image: string;
  portfolio: string;
}

interface IMediaProps {
  imageResult: any;
}

class MediaDisplay extends React.Component<IMediaProps, IMediaState> {
  static contextType = UserContext;
  constructor(props: IMediaProps) {
    super(props);
    this.state = {
      imageResult: [],
      searchInput: "",
      openComment: false,
      openModal: false,
      private: false,
      userId: "",
      comment: "",
      rating: 3,
      favorite: true,
      mediumId: "",
      blurhash: "",
      urls: [],
      user: [],
      image: "",
      thumbnail: "",
      artist: "",
      artist_image: "",
      portfolio: "",
    };
  }
  handleOpenModal(e: React.BaseSyntheticEvent) {
    this.setState({
      openModal: true,
    });
  }

  handleOpenComment(e: React.BaseSyntheticEvent) {
    this.setState({
      openComment: true,
    });
    console.log(this.state.image, this.state.thumbnail, this.state.artist);

    fetch("http://localhost:4000/media/upload", {
      method: "POST",
      body: JSON.stringify({
        private: this.state.private,
        userId: this.state.userId,
        blurhash: this.state.blurhash,
        urls: this.state.urls,
        user: this.state.user,
        image: this.state.image,
        thumbnail: this.state.thumbnail,
        artist: this.state.artist,
        artist_image: this.state.artist_image,
        portfolio: this.state.portfolio,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.context.token}`,
      },
    })
      .then((res) => {
        console.log(res);

        if (res.status !== 201) {
          console.log("File not Uploaded", res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log("Media", data);
        this.setState({
          mediumId: data.newMedia.id,
          blurhash: data.newMedia.blur_hash,
          urls: data.newMedia.urls,
          user: data.newMedia.user,
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
    console.log("giggity");

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
          console.log("File not Uploaded", res.status);
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
    // console.log(this.props, "image");
    this.setState({
      image: this.props.imageResult.urls.regular,
      thumbnail: this.props.imageResult.urls.thumb,
      artist: this.props.imageResult.user.name,
      artist_image: this.props.imageResult.user.profile_image.small,
      blurhash: this.props.imageResult.blurhash,
      portfolio: this.props.imageResult.user.portfolio_url,
      userId: this.context.user.id,
      urls: this.props.imageResult.urls,
      user: this.props.imageResult.user,
    });
  }

  render() {
    return (
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <Paper elevation={20} variant="outlined">
          <Card>
            <CardActionArea>
              <CardMedia>
                <img src={this.state.thumbnail} />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h4">
                  {this.state.artist}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                onClick={(e) => this.handleOpenComment(e)}
                color="primary"
              >
                Save Photo
              </Button>
            </CardActions>

            <CardActions>
              <Button
                size="small"
                variant="outlined"
                onClick={(e) => this.handleOpenModal(e)}
                color="primary"
              >
                More Info
              </Button>
            </CardActions>
          </Card>
        </Paper>
        <Modal
          open={this.state.openComment}
          onClose={this.handleClose}
          aria-labelledby="Leave A Comment"
          aria-describedby="Leave A Comment"
        >
          <Fade in={this.state.openComment}>
            <Container maxWidth="md">
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
                    <Button type="submit" variant="contained" color="primary">
                      Submit Comment
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
            </Container>
          </Fade>
        </Modal>
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
                  alt={this.state.artist}
                  src={this.props.imageResult.user.profile_image.small}
                />
                <Link href={this.state.portfolio} target="_blank">
                  <Typography>Artist Porfolio</Typography>
                </Link>
                <Link href={this.props.imageResult.urls.full} target="_blank">
                  <Typography>Full Image Download</Typography>
                </Link>
                <Link href={this.props.imageResult.urls.raw} target="_blank">
                  <Typography>Raw Image Download</Typography>
                </Link>
                <Link
                  href={this.props.imageResult.urls.regular}
                  target="_blank"
                >
                  <Typography>Image Download</Typography>
                </Link>
              </Paper>
            </Container>
          </Fade>
        </Modal>
      </Grid>
    );
  }
}

export default MediaDisplay;
