import {
  Button,
  Container,
  FormControlLabel,
  Modal,
  Paper,
  Slider,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import UserContext from "../../UserContext/UserContext";
import React from "react";
import Switch from "@material-ui/core/Switch";
// import UDComments from "./Comments";

interface ISDisplay {
  review: string;
  favorite: boolean;
  rating: number | string;
  editing: boolean;
  id: string;
  private: boolean;
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
    };
  }

  handleEdit(e: React.BaseSyntheticEvent) {
    this.setState({
      editing: !this.state.editing,
    });
    console.log(this.state.editing);
  }

  handleChange(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<ISDisplay, keyof ISDisplay>,
    }));
  }

  handleSwitch(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.checked as Pick<ISDisplay, keyof ISDisplay>,
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
          editing: false,
        });
      });
  }

  componentWillMount() {
    this.setState({
      review: this.props.comment.comment,
      favorite: this.props.comment.favorite,
      rating: this.props.comment.rating,
      editing: false,
      id: this.props.comment.id,
    });
    console.log(this.state.editing);
  }
  render() {
    return (
      <Container>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          onClick={(e) => {
            this.handleEdit(e);
          }}
        >
          Edit Review
        </Button>

        <h3>{this.state.review}</h3>
        <h3>{this.state.rating}</h3>

        <Modal
          open={this.state.editing}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Container maxWidth="md">
            <Paper>
              <Paper>
                <TextareaAutosize
                  value={this.state.review}
                  placeholder="Leave a comment"
                  name="review"
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
                <Button
                  onClick={(e) => {
                    this.updateComment(e);
                  }}
                >
                  Update Your Comment
                </Button>
                <Button
                  onClick={(e) => {
                    this.deleteComment(e);
                  }}
                >
                  Delete Your Comment
                </Button>
              </Paper>
            </Paper>
          </Container>
        </Modal>
      </Container>
    );
  }
}

export default Comments;
