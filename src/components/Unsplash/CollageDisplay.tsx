import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import UserContext from "../../UserContext/UserContext";
import config from "../../config";
import {
  faHeart,
  faSave,
  faHeartBroken,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
interface Iprops {
  location: {
    state: {
      image: any;
    };
  };
}

interface CDState {
  media: any;
  comment: string;
  comments: string[];
  rating: 3;
  favorite: boolean;
  private: boolean;
  openModal: boolean;
  openComment: boolean;
  redirect: boolean;
  userId: string;
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

class CollageDisplay extends React.Component<Iprops, CDState> {
  static contextType = UserContext;
  constructor(props: Iprops) {
    super(props);
    this.state = {
      media: [],
      comment: "",
      comments: [],
      rating: 3,
      favorite: false,
      private: false,
      openModal: false,
      openComment: false,
      userId: "",
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
      redirect: false,
    };
  }
  handleOpenModal = () => {
    this.setState({
      openModal: true,
    });
  };

  postPhoto(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    fetch(`${config.REACT_APP_SERVER_API_URL}/media/upload`, {
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
        // console.log(res);

        if (res.status !== 201) {
          console.log("File not Uploaded", res);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        // console.log("Media", data);
        this.setState({
          mediumId: data.newMedia.id,
          openComment: true,
          openModal: true,
        });
      });
  }

  handleChange(
    e: React.BaseSyntheticEvent | React.MouseEvent<HTMLInputElement, MouseEvent>
  ) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<CDState, keyof CDState>,
    }));
  }

  onHide = () => {
    this.setState({
      openModal: false,
      redirect: true,
    });
  };

  postComment(e: React.BaseSyntheticEvent) {
    fetch(`${config.REACT_APP_SERVER_API_URL}/comments/create`, {
      method: "POST",
      body: JSON.stringify({
        comment: this.state.comment,
        rating: this.state.rating,
        favorite: this.state.favorite,
        private: this.state.private,
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
        this.setState({
          private: false,
          comment: "",
          rating: 3,
          favorite: true,
          openModal: false,
        });
      });
  }

  componentDidMount() {
    console.log(this.props.location.state.image);

    this.setState({
      media: this.props.location.state.image,
      blur_hash: this.props.location.state.image.blur_hash,
      url_thumb: this.props.location.state.image.urls.thumb,
      url_small: this.props.location.state.image.urls.small,
      url_reg: this.props.location.state.image.urls.regular,
      url_raw: this.props.location.state.image.urls.raw,
      image: this.props.location.state.image.urls.full,
      artist_name: this.props.location.state.image.user.name,
      artist_img: this.props.location.state.image.user.profile_image.large,
      portfolio_url: this.props.location.state.image.user.portfolio_url,
    });
  }

  render() {
    return (
      <>
        <Container>
          <Card className="bg-dark text-white">
            <Card.Img
              src={this.state.url_reg}
              alt="Card image"
              width="100%"
              height="100%"
            />
            <Card.ImgOverlay>
              <Card.Title>
                {this.state.artist_name}
                {this.context.isAuth ? (
                  <a onClick={(e: React.MouseEvent) => this.postPhoto(e)}>
                    | <FontAwesomeIcon icon={faHeart} />
                  </a>
                ) : null}
              </Card.Title>
              <a href={this.state.portfolio_url} target="_blank">
                Artist Portfolio
              </a>
            </Card.ImgOverlay>
          </Card>
          {this.state.redirect ? <Redirect to="/" /> : null}
        </Container>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          id="commentModal"
          centered
          show={this.state.openModal}
          backdrop
        >
          <Modal.Title id="commentTitle"></Modal.Title>

          <Modal.Body className="show-grid" id="commentBody">
            <Container>
              <Row>
                <Col>
                  <img
                    src={this.state.artist_img}
                    width={150}
                    height={150}
                    className="profilePic"
                  />
                </Col>
                <Col>
                  <p>{this.state.artist_name}</p>
                  {this.state.portfolio_url ? (
                    <a
                      href={this.state.portfolio_url}
                      target="_blank"
                      onClick={this.onHide}
                    >
                      Artist Portfolio
                    </a>
                  ) : null}

                  <br />
                  <a
                    href={this.state.image}
                    onClick={this.onHide}
                    target="_blank"
                  >
                    Image Download
                  </a>
                </Col>
              </Row>

              {this.state.openComment ? (
                <Container>
                  <Row>
                    <Col xs={6}>
                      Rating
                      <Form.Control
                        type="range"
                        custom
                        min="0"
                        max="5"
                        name="rating"
                        id="rating"
                        value={this.state.rating}
                        onChange={(e) => this.handleChange(e)}
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Check
                        type="switch"
                        name="favorite"
                        id="favorite"
                        onClick={(e) => this.handleChange(e)}
                        label="Favorite"
                      />

                      <Form.Check
                        type="switch"
                        name="private"
                        id="private"
                        onClick={(e) => this.handleChange(e)}
                        label="Private"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={6} md={4}>
                      <Form.Control
                        type="textarea"
                        custom
                        size="lg"
                        name="comment"
                        id="comment"
                        onChange={(e) => this.handleChange(e)}
                      />
                    </Col>
                    <Col xs={6} md={4}></Col>
                    <Col xs={3} md={2}>
                      <Button onClick={(e) => this.postComment(e)}>
                        Post A Comment
                      </Button>
                    </Col>
                  </Row>
                </Container>
              ) : null}
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default CollageDisplay;
