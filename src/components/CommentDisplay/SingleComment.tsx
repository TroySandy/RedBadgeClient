import React from "react";
import UserContext from "../../UserContext/UserContext";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
interface ISDisplay {
  review: string;
  favorite: boolean;
  rating: number | string;
  editing: boolean;
  id: string;
  private: boolean;
  openModal: boolean;
}
interface IComment {
  comment: {
    comment: string;
    favorite: boolean;
    rating: number;
    id: string;
    mediumId: string;
    userId: string;
  };
}
class Comments extends React.Component<IComment, ISDisplay> {
  static contextType = UserContext;
  constructor(props: IComment) {
    super(props);
    this.state = {
      review: "",
      favorite: false,
      rating: 3,
      editing: false,
      id: "",
      private: false,
      openModal: false,
    };
  }

  handleOpenModal = () => {
    this.setState({
      openModal: true,
    });
  };

  handleChange(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<ISDisplay, keyof ISDisplay>,
    }));
  }

  deleteComment(e: React.BaseSyntheticEvent) {
    console.log("fired");
    fetch("http://localhost:4000/comments/", {
      method: "DELETE",
      body: JSON.stringify({ id: this.state.id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.context.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          editing: false,
          review: "",
          rating: "",
        })
      )
      .catch((err) => console.log(err));
  }

  updateComment(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    fetch("http://localhost:4000/comments/", {
      method: "PUT",
      body: JSON.stringify({
        comment: this.state.review,
        rating: this.state.rating,
        favorite: this.state.favorite,
        private: this.state.private,
        id: this.state.id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.context.token}`,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          console.log("File not updated", res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        this.setState({
          openModal: false,
        });
      });
  }

  componentWillMount() {
    this.setState({
      review: this.props.comment.comment,
      favorite: this.props.comment.favorite,
      rating: this.props.comment.rating,
      openModal: false,
      id: this.props.comment.id,
    });
    console.log(this.state.openModal);
  }
  render() {
    return (
      <>
        <Container fluid>
          <p>{this.state.review}</p>
          <Col xs={12} md={8}>
            Rating
            <Form.Control
              type="range"
              min="0"
              max="5"
              name="rating"
              id="rating"
              value={this.state.rating}
            />
          </Col>
        </Container>
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
                  <Button onClick={(e) => this.updateComment(e)}>
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

export default Comments;
