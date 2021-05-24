import React from "react";
import { Button, Container, Paper } from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { Redirect } from "react-router-dom";
interface IAdminState {
  userInfo: any;
}

class AdminTable extends React.Component<{}, IAdminState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      userInfo: [],
    };
  }
  fetchUser = () => {
    fetch("http://localhost:4000/admin/users", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);

        if (res.status !== 200) {
          console.log("Record not Deleted", res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        this.setState({
          userInfo: data.User,
        });
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <Container>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <TreeItem nodeId="1" label="Users">
            {this.state.userInfo.map((user: any) => {
              return (
                <>
                  <p>{user.username}</p>
                  <UserDelete user={user} update={this.fetchUser} />
                </>
              );
            })}
          </TreeItem>
        </TreeView>
        {/* {!this.context.user.isAdmin ? <Redirect to="/" /> : null} */}
      </Container>
    );
  }
}

export default AdminTable;

interface userstate {
  id: string;
  username: string;
  media: any;
}
interface userprop {
  user: any;
  update: CallableFunction;
}
class UserDelete extends React.Component<userprop, userstate> {
  constructor(props: userprop) {
    super(props);
    this.state = {
      id: "",
      username: "",
      media: [],
    };
  }

  deleteUser(e: React.BaseSyntheticEvent) {
    console.log(this.state.id);

    fetch("http://localhost:4000/user/admin", {
      method: "DELETE",
      body: JSON.stringify({
        id: this.state.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);

        if (res.status !== 201) {
          console.log("Record not Deleted", res.status);
        } else {
          this.props.update();
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.setState({
      id: this.props.user.id,
      username: this.props.user.username,
      media: this.props.user.media,
    });
  }

  render() {
    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => this.deleteUser(e)}
        >
          Delete User
        </Button>
        <TreeItem nodeId="2" label="Media">
          {this.state.media.map((image: any) => {
            return (
              <>
                <MediaDelete image={image} update={this.props.update} />
              </>
            );
          })}
        </TreeItem>
      </>
    );
  }
}

interface mediastate {
  id: string;
  image: string;
  comments: any;
}

interface mediaprop {
  image: any;
  update: CallableFunction;
}

class MediaDelete extends React.Component<mediaprop, mediastate> {
  constructor(props: mediaprop) {
    super(props);
    this.state = {
      id: "",
      image: "",
      comments: [],
    };
  }
  deleteMedia(e: React.BaseSyntheticEvent) {
    console.log(this.state.id);

    fetch("http://localhost:4000/media/admin", {
      method: "DELETE",
      body: JSON.stringify({
        id: this.state.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);

        if (res.status !== 201) {
          console.log("Record not Deleted", res.status);
        } else {
          this.props.update();
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.setState({
      id: this.props.image.id,
      image: this.props.image.thumbnail,
      comments: this.props.image.comments,
    });
  }
  render() {
    return (
      <>
        <img src={this.state.image} />
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => this.deleteMedia(e)}
        >
          Delete Media
        </Button>
        <TreeItem nodeId="3" label="Comment">
          {this.state.comments.map((comment: any) => {
            return <CommentDelete comment={comment} />;
          })}
        </TreeItem>
      </>
    );
  }
}

interface commentstate {
  id: string;
  comment: string;
}

interface commentprop {
  comment: any;
}

class CommentDelete extends React.Component<commentprop, commentstate> {
  constructor(props: commentprop) {
    super(props);
    this.state = {
      comment: "",
      id: "",
    };
  }

  deleteComment(e: React.BaseSyntheticEvent) {
    fetch("http://localhost:4000/comment/admin", {
      method: "DELETE",
      body: JSON.stringify({
        id: this.state.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);

        if (res.status !== 200) {
          console.log("Record not Deleted", res.status);
        } else {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.setState({
      comment: this.props.comment.comment,
      id: this.props.comment.id,
    });
  }
  render() {
    return (
      <>
        <p>{this.state.comment}</p>
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => this.deleteComment(e)}
        >
          Delete Comment
        </Button>
      </>
    );
  }
}
