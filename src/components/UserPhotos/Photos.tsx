import React from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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
    // setTimeout(() => {
    //   // console.log(
    //   //   this.state.userMedia,
    //   //   this.state.thumbnail,
    //   //   this.state.mediumId
    //   // );
    // }, 500);
  }

  render() {
    return (
      <Link
        to={{
          pathname: "/photo",
          state: {
            id: this.state.mediumId,
          },
        }}
      >
        {this.state.thumbnail ? (
          <Col>
            <Card
              className="bg-dark text-white"
              // onClick={(e: any) => this.postPhoto(e)}
            >
              <Card.Img src={this.state.thumbnail} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title>{this.state.artist_name}</Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ) : null}
      </Link>
    );
  }
}

export default Photos;
