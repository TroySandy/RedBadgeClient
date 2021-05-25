import React from "react";
import UserContext from "../../UserContext/UserContext";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Ripples from "react-ripples";
export interface IMediaState {
  unsplashResults: any;
  openModal: boolean;
  openInfo: boolean;
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
  className: string;
}

interface IMediaProps {
  unsplashResults: any;
}

class MediaDisplay extends React.Component<IMediaProps, IMediaState> {
  static contextType = UserContext;
  constructor(props: IMediaProps) {
    super(props);
    this.state = {
      unsplashResults: [],
      openModal: false,
      className: "",
      openInfo: false,
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
  handleOpenModal = () => {
    this.setState({
      openModal: true,
    });
  };
  handleOpenInfo(
    e: React.BaseSyntheticEvent | React.MouseEvent<HTMLInputElement, MouseEvent>
  ) {
    this.setState({
      openInfo: true,
    });
  }

  postPhoto(e: React.BaseSyntheticEvent) {
    // e.preventDefault();
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
        });
        setTimeout(() => {
          this.handleOpenModal();
        }, 300);
      });
  }

  handleChange(
    e: React.BaseSyntheticEvent | React.MouseEvent<HTMLInputElement, MouseEvent>
  ) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<IMediaState, keyof IMediaState>,
    }));
  }

  onHide = () => {
    this.setState({
      openModal: false,
      openInfo: false,
    });
  };

  postComment(e: React.BaseSyntheticEvent) {
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
        // console.log(data);
        this.onHide();
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
      image: this.props.unsplashResults.links.download,
      thumbnail: this.props.unsplashResults.urls.thumb,
      artist_name: this.props.unsplashResults.user.name,
      artist_img: this.props.unsplashResults.user.profile_image.large,
      blur_hash: this.props.unsplashResults.blur_hash,
      portfolio_url: this.props.unsplashResults.user.portfolio_url,
      userId: this.context.user.id,
      url_thumb: this.props.unsplashResults.urls.thumb,
      url_small: this.props.unsplashResults.urls.small,
      url_reg: this.props.unsplashResults.urls.full,
      url_raw: this.props.unsplashResults.urls.raw,
    });
    console.log(this);
  }

  render() {
    return (
      <>
        <Col>
          <Ripples>
            <Card
              className="bg-dark text-white"
              id="mediaCard"
              onClick={(e: React.MouseEvent) => this.handleOpenInfo(e)}
              onMouseEnter={(e: React.MouseEvent) =>
                this.setState({ className: "fa-spin" })
              }
              onMouseLeave={(e: React.MouseEvent) =>
                this.setState({ className: "" })
              }
            >
              <Card.Img
                src={this.state.image}
                alt="Card image"
                id="Card image"
              />
              <Card.ImgOverlay id="nameBg">
                <Card.Title id="artistName">
                  {this.state.artist_name}
                </Card.Title>
                {this.context.isAuth ? (
                  <a onClick={(e: React.MouseEvent) => this.postPhoto(e)}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={this.state.className}
                    />
                  </a>
                ) : null}
              </Card.ImgOverlay>
            </Card>
          </Ripples>
        </Col>

        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          id="commentModal"
          centered
          show={this.state.openInfo}
          backdrop
          onClick={this.onHide}
        >
          <Modal.Title id="commentTitle"></Modal.Title>

          <Modal.Body className="show-grid" id="commentBody">
            <Container>
              <Row>
                <Col>
                  <Image
                    src={this.state.artist_img}
                    width={150}
                    height={150}
                    roundedCircle
                  />
                </Col>
                <Col>
                  <p>{this.state.artist_name}</p>
                  <a href={this.state.portfolio_url} target="_blank">
                    Artist Portfolio
                  </a>
                  <br />
                  <a href={this.state.image} target="_blank">
                    Image Download
                  </a>
                </Col>
              </Row>
              {this.context.isAuth ? (
                <a onClick={(e: React.MouseEvent) => this.postPhoto(e)}>
                  <FontAwesomeIcon icon={faSave} data-fa-transform="grow-25" />
                  Save to your page
                </a>
              ) : null}
            </Container>
          </Modal.Body>
        </Modal>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          id="commentModal"
          centered
          show={this.state.openModal}
        >
          <Modal.Title id="commentTitle">Leave a Comment</Modal.Title>

          <Modal.Body className="show-grid" id="commentBody">
            <Container>
              <Row>
                <Col xs={12} md={8}>
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
                <Col xs={3} md={2}>
                  <Form.Check
                    type="switch"
                    name="favorite"
                    id="favorite"
                    onClick={(e) => this.handleChange(e)}
                    label="Favorite"
                  />
                </Col>
                <Col xs={3} md={2}>
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
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default MediaDisplay;
