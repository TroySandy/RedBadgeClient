import React from "react";
// import UserContext from "../../UserContext/UserContext";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";
// import Slider from "@material-ui/core/Slider";
// import Typography from "@material-ui/core/Typography";
// import { FormControl, Paper } from "@material-ui/core";
// import Switch from "@material-ui/core/Switch";

// export interface CommentState {
//   image: any;
//   private: boolean;
//   userId: string;
//   comment: string;
//   rating: number;
//   favorite: true;
// }

// const marks = [
//   {
//     value: 1,
//     label: "1",
//   },
//   {
//     value: 2,
//     label: "2",
//   },
//   {
//     value: 3,
//     label: "3",
//   },
//   {
//     value: 4,
//     label: "4",
//   },
//   {
//     value: 5,
//     label: "5",
//   },
// ];

// export interface CommentProps {
//   image: any;
// }

class CommentDisplay extends React.Component<{}, {}> {
  // static contextType = UserContext;
  // constructor(props: CommentProps) {
  //   super(props);
  //   this.state = {
  //     private: false,
  //     userId: "",
  //     comment: "",
  //     rating: 3,
  //     favorite: true,
  //     image: "",
  //   };
  // }

  // handleChange(e: React.BaseSyntheticEvent) {
  //   this.setState((prevstate) => ({
  //     ...prevstate,
  //     [e.target.name]: e.target.value as Pick<CommentState, keyof CommentState>,
  //   }));
  // }
  // handleSwitch(e: React.BaseSyntheticEvent) {
  //   this.setState((prevstate) => ({
  //     ...prevstate,
  //     [e.target.name]: e.target.checked as Pick<
  //       CommentState,
  //       keyof CommentState
  //     >,
  //   }));
  // }

  // postComment(e: React.BaseSyntheticEvent) {
  //   e.preventDefault();

  //   fetch("http://localhost:4000/comments/create", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       comment: this.state.comment,
  //       rating: this.state.rating,
  //       favorite: this.state.favorite,
  //       private: this.state.private,
  //       userId: this.state.userId,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${this.context.token}`,
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status !== 201) {
  //         console.log("File not Uploaded", res.status);
  //       } else {
  //         return res.json();
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       this.setState({
  //         private: false,
  //         userId: "",
  //         comment: "",
  //         rating: 3,
  //         favorite: true,
  //         image: "",
  //       });
  //     });
  // }

  // componentDidMount() {
  //   this.setState({
  //     private: false,
  //     userId: this.context.user.id,
  //     comment: "",
  //     rating: 3,
  //     favorite: true,
  //     image: this.props.image,
  //   });
  //   console.log(this.state.image, "loaded comments");
  // }

  render() {
    return (
      <>
        {/* <Paper>
        <form onSubmit={(e) => this.postComment(e)}>
          <FormControl>
            <TextareaAutosize
              value={this.state.comment}
              placeholder="Leave a comment"
              name="comment"
              onChange={(e) => this.handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <Typography id="discrete-slider-always" gutterBottom>
              Always visible
            </Typography>
            <Slider
              defaultValue={3}
              value={this.state.rating}
              aria-labelledby="discrete-slider-always"
              step={5}
              marks={marks}
              valueLabelDisplay="on"
              name="rating"
              onChange={(e) => this.handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <Switch
              checked={this.state.favorite}
              onChange={(e) => this.handleSwitch(e)}
              name="favorite"
              inputProps={{ "aria-label": "favorite checkbox" }}
            />
            <Switch
              checked={this.state.private}
              onChange={(e) => this.handleSwitch(e)}
              color="primary"
              name="private"
              inputProps={{ "aria-label": "private checkbox" }}
            />
          </FormControl>
          <FormControl></FormControl>
          <button type="submit">Click me</button>
        </form>
      </Paper> */}
      </>
    );
  }
}

export default CommentDisplay;
