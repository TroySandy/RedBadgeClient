import React from "react";
import UserContext from "../../UserContext/UserContext";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Paper,
} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";

export interface CommentState {
  private: boolean;
  comment: string;
  rating: number;
  favorite: true;
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

export interface CommentProps {
  id: string;
}

class UDComments extends React.Component<CommentProps, CommentState> {
  static contextType = UserContext;
  constructor(props: CommentProps) {
    super(props);
    this.state = {
      private: false,
      comment: "",
      rating: 3,
      favorite: true,
    };
  }

  handleChange(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<CommentState, keyof CommentState>,
    }));
  }
  handleSwitch(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.checked as Pick<
        CommentState,
        keyof CommentState
      >,
    }));
  }

  postComment(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    fetch("http://localhost:4000/comments/create", {
      method: "PUT",
      body: JSON.stringify({
        comment: this.state.comment,
        rating: this.state.rating,
        favorite: this.state.favorite,
        private: this.state.private,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.context.token}`,
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          console.log("File not updated", res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        this.setState({
          private: false,
          comment: "",
          rating: 3,
          favorite: true,
        });
      });
  }

  componentDidMount() {
    this.setState({
      private: false,
      comment: "",
      rating: 3,
      favorite: true,
    });
  }

  render() {
    return (
      <>
        <Container maxWidth="md">
          <Paper>
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
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  this.postComment(e);
                }}
              >
                <Typography>Submit Comment</Typography>
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
              <Button
                onClick={(e) => {
                  this.postComment(e);
                }}
              >
                Update Your Comment
              </Button>
              <Button
                onClick={(e) => {
                  this.postComment(e);
                }}
              >
                Delete Your Comment
              </Button>
            </Paper>
          </Paper>
        </Container>
      </>
    );
  }
}

export default UDComments;
