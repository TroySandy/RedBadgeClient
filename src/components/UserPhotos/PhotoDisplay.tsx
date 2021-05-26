import React from "react";
import UserContext from "../../UserContext/UserContext";
import Container from "react-bootstrap/Container";
import InfiniteScroll from "react-infinite-scroll-component";
import "../Unsplash/Collage.css";
import config from "../../config";
import { Link, Redirect } from "react-router-dom";

interface IPhotoDisp {
  userMedia: UserMedia[];
  userId: string;
  loaded: boolean;
}
interface UserMedia {
  artist_name: string;
  artist_img: string;
  blur_hash: string;
  comments: string[];
  id: string;
  image: string;
  url_reg: string;
  portfolio_url: string;
  private: boolean;
  favorite: boolean;
  thumbnail: string;
  url_raw: string;
  url_thumb: string;
  url_small: string;
}

export default class PhotoDisplay extends React.Component<{}, IPhotoDisp> {
  static contextType = UserContext;
  constructor(props: {}) {
    super(props);
    this.state = {
      userMedia: [],
      userId: "",
      loaded: true,
    };
  }

  fetchAllPhotos = () => {
    // console.log(this.state.userId);

    fetch(`${config.REACT_APP_SERVER_API_URL}/media/media`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.context.token}`,
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          console.log("Files not found", res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        const media = data.Media;
        this.setState({
          userMedia: media,
        });
        // console.log(this.context.isAuth);
      });
  };

  componentDidMount() {
    // console.log(this.context.user.id);

    this.setState({
      userId: this.context.user.id,
    });

    setTimeout(() => {
      this.fetchAllPhotos();
    }, 250);
  }

  render() {
    return (
      <>
        <Container className="divContainer">
          <InfiniteScroll
            dataLength={this.state.userMedia.length}
            next={() => this.fetchAllPhotos()}
            hasMore={true}
            loader={<></>}
            refreshFunction={this.fetchAllPhotos}
          >
            <div className="ImageDisplay" style={{ marginTop: "30px" }}>
              {this.state.loaded
                ? this.state.userMedia.map((image: any, index: number) => (
                    <UserMedia image={image} key={index} />
                  ))
                : null}
            </div>
          </InfiniteScroll>
        </Container>
      </>
    );
  }
}

interface UserMediaState {
  image: imageType[] | any;
}

interface imageType {
  alt_description: string;
  blur_hash: string;
  description: string | null;
  links: {
    download: string;
    download_locations: string;
    html: string;
    self: string;
  };
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    bio: string;
    links: {
      photos: string;
      portfolio: string;
      html: string;
      self: string;
    };
    name: string;
    portfolio_url: string;
    profile_image: {
      large: string;
      medium: string;
      small: string;
    };
  };
}
interface UserMediaProps {
  image: imageType;
}

class UserMedia extends React.Component<UserMediaProps, UserMediaState> {
  constructor(props: UserMediaProps) {
    super(props);
    this.state = {
      image: [],
    };
  }
  componentWillUnmount() {
    this.setState({
      image: [],
    });
  }
  componentDidMount() {
    this.setState({
      image: this.props.image,
    });
    console.log(this.props.image);
  }
  render() {
    return (
      <>
        <div className="photos">
          <Link
            to={{
              pathname: "/photo",
              state: {
                id: this.state.image.id,
              },
            }}
          >
            <img src={this.state.image.url_reg} className="imgPhoto" />
          </Link>
        </div>
      </>
    );
  }
}
