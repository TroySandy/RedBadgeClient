import React from "react";
import PhotoDisplay from "../Unsplash/Display";
import { createApi } from "unsplash-js";
import config from "../../config";
import UserContext from "../../UserContext/UserContext";
import "./home.css";
import { IUnsplash } from "../Unsplash/Interfaces";
import CommentDisplay from "../CommentDisplay/Display";
// import NavBar from "./Nav";
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
} from "@material-ui/core";

interface HomeState {
  imageResult: any;
  searchInput: string;
  open: boolean;
}

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "QrZ_4CjnXpZU7ZOT1EJBrOjpWbgZyRvfZQ6QfutowmE",
});
interface HomeProps {}

class Home extends React.Component<HomeProps, HomeState> {
  static contextType = UserContext;
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      imageResult: [],
      searchInput: "",
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  componentDidMount() {
    api.photos.getRandom({ featured: true, count: 20 }).then((result) => {
      // console.log(result);
      // this.setState= ({
      //   imageResult: result.response
      // })
      if (result.errors) {
        console.log("ERROR!!!!!", result.errors[0]);
      } else {
        const image = result.response;

        this.setState({
          imageResult: image,
        });
        console.log(result.response);
        console.log(image);
        console.log(this.state.imageResult);
      }
    });
  }

  render() {
    return (
      <>
        <Container>
          {/* <NavBar /> */}
          <Grid container spacing={0}>
            {this.state.imageResult.map((image: any) => {
              console.log(image.urls.small);

              return (
                <>
                  <Grid item sm={3} lg={4} spacing={0}>
                    <Paper elevation={20} variant="outlined">
                      <Card>
                        <CardActionArea>
                          <CardMedia>
                            <img src={image.urls.small} />
                          </CardMedia>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h4"
                            >
                              {image.user.name} | {image.user.location}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                          >
                            Save to your list
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={this.handleOpen}
                          >
                            Photographer Portfolio
                          </Button>
                        </CardActions>
                        <Modal
                          open={this.state.open}
                          onClose={this.handleClose}
                          aria-labelledby="simple-modal-title"
                          aria-describedby="simple-modal-description"
                        >
                          <CommentDisplay image={this.state.imageResult} />
                        </Modal>
                      </Card>
                    </Paper>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Container>
      </>
    );
  }
}

export default Home;
