import { CardContent, Container, Card, Paper } from "@material-ui/core";
import React from "react";
import Comments from "./SingleComment";

interface Iprops {
  location: {
    state: {
      userMedia: IDisplayComments;
    };
  };
}

interface IDisplayComments {
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
const newArr = [];

class DisplayComments extends React.Component<Iprops, IDisplayComments> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      artist_name: "",
      artist_img: "",
      blur_hash: "",
      comments: [],
      id: "",
      image: "",
      url_small: "",
      portfolio_url: "",
      private: false,
      favorite: true,
      thumbnail: "",
      url_reg: "",
      url_raw: "",
      url_thumb: "",
    };
  }

  componentDidMount() {
    this.setState({
      artist_name: this.props.location.state.userMedia.artist_name,
      artist_img: this.props.location.state.userMedia.artist_img,
      blur_hash: this.props.location.state.userMedia.blur_hash,
      comments: this.props.location.state.userMedia.comments,
      id: this.props.location.state.userMedia.id,
      image: this.props.location.state.userMedia.image,
      url_small: this.props.location.state.userMedia.url_small,
      portfolio_url: this.props.location.state.userMedia.portfolio_url,
      private: this.props.location.state.userMedia.private,
      favorite: this.props.location.state.userMedia.favorite,
      thumbnail: this.props.location.state.userMedia.thumbnail,
      url_reg: this.props.location.state.userMedia.url_reg,
      url_raw: this.props.location.state.userMedia.url_raw,
      url_thumb: this.props.location.state.userMedia.url_thumb,
    });
  }

  mapArr() {}

  render() {
    return (
      <Container>
        <Container>
          <Paper>
            <Card>
              <CardContent>
                <img src={this.state.thumbnail} alt="" />
                {this.state.comments.map((comment: any) => {
                  return <Comments comment={comment} />;
                })}
              </CardContent>
            </Card>
          </Paper>
        </Container>
      </Container>
    );
  }
}

export default DisplayComments;
