import React from "react";
import UserContext from "../../UserContext/UserContext";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import config from "../../config";
import Card from "react-bootstrap/Card";

interface ISDisplay {
  review: string;
  favorite: boolean;
  rating: number;
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
      favorite: true,
      rating: 3,
      editing: false,
      id: "",
      private: false,
      openModal: false,
    };
  }

  handleOpenModal(e: React.MouseEventHandler<HTMLButtonElement>) {
    this.setState({
      openModal: true,
    });
  }

  handleChange(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<ISDisplay, keyof ISDisplay>,
    }));
  }

  deleteComment(e: React.BaseSyntheticEvent) {
    console.log("fired");
    fetch(`${config.REACT_APP_SERVER_API_URL}/comments/`, {
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
          rating: 3,
        })
      )
      .catch((err) => console.log(err));
  }

  updateComment(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    fetch(`${config.REACT_APP_SERVER_API_URL}/comments/`, {
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
        console.log(data.updatedComment[1][0]);
        this.setState({
          openModal: false,
        });
      });
  }

  // fetchComment = () => {
  //   // console.log(this.state.id);

  //   fetch("http://localhost:4000/comment/comment", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       id: this.state.id,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${this.context.token}`,
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status !== 201) {
  //         console.log("Files not found", res.status);
  //       } else {
  //         return res.json();
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       //   this.setState({
  //       //     review: "",
  //       // favorite: true,
  //       // rating: 3,
  //       // editing: false,
  //       // id: "",
  //       // private: false,
  //       //   });
  //     });
  // };

  componentDidMount() {
    console.log(this.props.comment);

    this.setState({
      review: this.props.comment.comment,
      favorite: this.props.comment.favorite,
      rating: this.props.comment.rating,
      openModal: false,
      id: this.props.comment.id,
    });
    // setTimeout(() => {
    //   this.fetchComment();
    // }, 500);
  }
  render() {
    return (
      <>
        <Container fluid>
          <Card
            style={{ width: "18rem" }}
            bg="dark"
            border="light"
            text="white"
          >
            <Card.Body onClick={(e: any) => this.handleOpenModal(e)}>
              <Card.Title>{this.state.rating} out of 5</Card.Title>
              <Card.Text>{this.state.review}</Card.Text>
              <Button variant="outline-light" size="sm">
                Update Comment
              </Button>
            </Card.Body>
          </Card>
        </Container>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          id="commentModal"
          centered
          show={this.state.openModal}
        >
          <Modal.Title id="commentTitle">Update Your Comment</Modal.Title>

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
                    name="review"
                    id="review"
                    onChange={(e) => this.handleChange(e)}
                  />
                </Col>
                <Col xs={6} md={4}></Col>
                <Col xs={3} md={2}>
                  <Button onClick={(e) => this.updateComment(e)}>
                    Edit Comment
                  </Button>
                  <Button onClick={(e) => this.deleteComment(e)}>
                    Delete Comment
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
