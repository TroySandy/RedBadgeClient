import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import UserContext from "../../UserContext/UserContext";
import config from "../../config";
import { AnyNaptrRecord } from "dns";
interface IAdminState {
  userInfo: userInfo[];
}
interface userInfo {
  createdAt: string;
  email?: string;
  firstName?: string;
  id: string;
  isAdmin: boolean;
  media: Media[];
  password?: string;
  updatedAt: string;
  username: string;
}

interface Media {
  artist_img?: string;
  artist_name?: string;
  blur_hash?: string;
  comments: Comments[];
  createdAt: string;
  favorite: boolean;
  id: string;
  image: string;
  portfolio_url?: string;
  private: boolean;
  thumbnail: string;
  updatedAt?: string;
  url_raw?: string;
  url_reg?: string;
  url_small?: string;
  url_thumb?: string;
  userId: string;
}

interface Comments {
  comment?: string;
  createdAt?: string;
  favorite: boolean;
  id: string;
  mediumId?: string;
  private: boolean;
  rating?: string;
  updatedAt?: string;
  userId?: string;
}
class AdminTable extends React.Component<{}, IAdminState> {
  static contextType = UserContext;
  constructor(props: {}) {
    super(props);
    this.state = {
      userInfo: [],
    };
  }
  fetchUser = () => {
    fetch(`${config.REACT_APP_SERVER_API_URL}/admin/users`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200) {
        } else {
          return res.json();
        }
      })
      .then((data) => {
        this.setState({
          userInfo: data.User,
        });
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <Container>
        {this.context.user.isAdmin ? null : <Redirect to="/" />}
        <div>
          <div>
            {this.state.userInfo.map((user: userInfo) => {
              return (
                <>
                  <p>{user.username}</p>
                  <UserDelete user={user} update={this.fetchUser} />
                </>
              );
            })}
          </div>
        </div>
      </Container>
    );
  }
}

export default AdminTable;

interface userstate {
  id: string;
  username: string;
  media: Media[];
}
interface userprop {
  user: userInfo;
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
    fetch(`${config.REACT_APP_SERVER_API_URL}/user/admin`, {
      method: "DELETE",
      body: JSON.stringify({
        id: this.state.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200) {
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
        <Button variant="outline-secondary" onClick={(e) => this.deleteUser(e)}>
          Delete User
        </Button>
        <div>
          {this.state.media.map((image: Media) => {
            return (
              <>
                <MediaDelete image={image} update={this.props.update} />
              </>
            );
          })}
        </div>
      </>
    );
  }
}

interface mediastate {
  id: string;
  image: string;
  comments: Comments[];
}

interface mediaprop {
  image: Media;
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
    fetch(`${config.REACT_APP_SERVER_API_URL}/media/admin`, {
      method: "DELETE",
      body: JSON.stringify({
        id: this.state.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
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
          variant="outline-secondary"
          onClick={(e) => this.deleteMedia(e)}
        >
          Delete Media
        </Button>
        <div>
          {this.state.comments.map((comment: Comments) => {
            return <CommentDelete comment={comment} />;
          })}
        </div>
      </>
    );
  }
}

interface commentstate {
  id: string;
  comment: Comments[];
}

interface commentprop {
  comment: Comments | any;
}

class CommentDelete extends React.Component<commentprop, commentstate> {
  constructor(props: commentprop) {
    super(props);
    this.state = {
      comment: [],
      id: "",
    };
  }

  deleteComment(e: React.BaseSyntheticEvent) {
    fetch(`${config.REACT_APP_SERVER_API_URL}/comment/admin`, {
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
      comment: this.props.comment,
      id: this.props.comment.id,
    });
  }
  render() {
    return (
      <>
        <p>{this.state.comment}</p>
        <Button
          variant="outline-secondary"
          onClick={(e) => this.deleteComment(e)}
        >
          Delete Comment
        </Button>
      </>
    );
  }
}
