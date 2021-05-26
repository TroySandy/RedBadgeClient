import React from "react";
import { createApi } from "unsplash-js";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Collage.css";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import config from "../../config";
import { Blurhash } from "react-blurhash";

interface CollageState {
  images: imageType[];
  loaded: boolean;
}

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: `${config.REACT_APP_UNSPLASH_APIKEY}`,
});

interface ResultsType {
  response?: string[];
  status?: number;
  type?: string;
  errors?: string[];
  source?: string;
}
class Collage extends React.Component<{}, CollageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      images: [],
      loaded: false,
    };
  }

  fetchImages = () => {
    api.photos.getRandom({ featured: true, count: 50 }).then((result: any) => {
      if (result.errors) {
        console.log("ERROR!!!!!", result.errors[0]);
      } else {
        const results = result.response;
        console.log(result);

        this.setState({
          images: results,
          loaded: true,
        });
      }
    });
  };

  componentDidMount() {
    this.fetchImages();
  }
  render() {
    return (
      <Container className="divContainer">
        <InfiniteScroll
          dataLength={this.state.images.length}
          next={() => this.fetchImages()}
          hasMore={true}
          loader={<></>}
          refreshFunction={this.fetchImages}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          <div className="ImageDisplay" style={{ marginTop: "30px" }}>
            {this.state.loaded
              ? this.state.images.map((image: imageType, index: number) => (
                  <UnsplashImage image={image} key={index} />
                ))
              : null}
          </div>
        </InfiniteScroll>
      </Container>
    );
  }
}

export default Collage;

interface UnsplasheState {
  url: string;
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
interface unsplashProps {
  image: imageType;
}

class UnsplashImage extends React.Component<unsplashProps, UnsplasheState> {
  constructor(props: unsplashProps) {
    super(props);
    this.state = {
      url: "",
      image: [],
    };
  }
  componentWillUnmount() {
    this.setState({
      url: "",
      image: [],
    });
  }
  componentDidMount() {
    this.setState({
      url: this.props.image.urls.regular,
      image: this.props.image,
    });
  }
  render() {
    return (
      <>
        <div className="photos">
          <Link
            to={{
              pathname: "/display",
              state: {
                image: this.state.image,
              },
            }}
          >
            <img src={this.state.url} className="imgPhoto" />
          </Link>
        </div>
      </>
    );
  }
}
