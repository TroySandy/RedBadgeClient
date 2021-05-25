import React from "react";
import Comments from "./SingleComment";
import Card from "react-bootstrap/Card";
import UserContext from "../../UserContext/UserContext";
import Container from "react-bootstrap/Container";
import { Redirect } from "react-router-dom";

interface Iprops {
  location: {
    state: {
      id: string;
    };
  };
}

interface IState {
  id: string;
  photoResult: IDisplayComments[];
  artist_name: string;
  artist_img: string;
  blur_hash: string;
  comments: string[];
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

class DisplayComments extends React.Component<Iprops, IState> {
  static contextType = UserContext;
  constructor(props: Iprops) {
    super(props);
    this.state = {
      id: "",
      photoResult: [],
      artist_name: "",
      artist_img: "",
      blur_hash: "",
      comments: [],
      image: "",
      url_small: "",
      portfolio_url: "",
      private: false,
      favorite: false,
      thumbnail: "",
      url_reg: "",
      url_raw: "",
      url_thumb: "",
    };
  }

  fetchPhoto = () => {
    // console.log(this.state.id);

    fetch("http://localhost:4000/media/photo", {
      method: "POST",
      body: JSON.stringify({
        id: this.state.id,
      }),
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
        console.log(data);
        this.setState({
          artist_name: data.photo[0].artist_name,
          artist_img: data.photo[0].artist_img,
          blur_hash: data.photo[0].blur_hash,
          comments: data.photo[0].comments,
          image: data.photo[0].image,
          url_small: data.photo[0].url_small,
          portfolio_url: data.photo[0].portfolio_url,
          private: data.photo[0].private,
          favorite: data.photo[0].favorite,
          thumbnail: data.photo[0].thumbnail,
          url_reg: data.photo[0].url_reg,
          url_raw: data.photo[0].url_raw,
          url_thumb: data.photo[0].url_thumb,
          photoResult: data.photo[0],
        });
      });
  };

  componentDidMount() {
    console.log(this.props.location.state.id);

    this.setState({
      id: this.props.location.state.id,
    });

    setTimeout(() => {
      this.fetchPhoto();
    }, 300);
  }

  render() {
    return (
      <Container>
        <Container>
          <Card>
            <Card
              className="bg-dark text-white"
              // onClick={(e: any) => this.postPhoto(e)}
            >
              <Card.Img src={this.state.image} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title>{this.state.artist_name}</Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Card>
          {this.state.comments.map((comment: any) => {
            return <Comments comment={comment} />;
          })}
        </Container>
        {!this.context.isAuth ? <Redirect to="/" /> : null}
      </Container>
    );
  }
}

export default DisplayComments;
