import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { createApi } from "unsplash-js";
import config from "../../config";
import UserContext from "../../UserContext/UserContext";
import { Row, Col } from "react-bootstrap";

export interface HomeState {
  imageResult: any;
  searchInput: string;
}

type Photo = {
  id: number;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
};

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "QrZ_4CjnXpZU7ZOT1EJBrOjpWbgZyRvfZQ6QfutowmE",
});

export const PhotoComp: React.FC<{ photo: Photo }> = ({ photo }) => {
  const { user, urls } = photo;

  return (
    <div>
      <img className="img" src={urls.regular} width='150px' />
      <a
        className="credit"
        target="_blank"
        href={`https://unsplash.com/@${user.username}`}
      >
        {user.name}
      </a>
    </div>
  );
};

export interface HomeProps {}

class Home extends React.Component<HomeProps, HomeState> {
  static contextType = UserContext;
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      imageResult: [],
      searchInput: "",
    };
  }

  fetchUnsplash() {
    api.photos.getRandom({ featured: true, count: 20 }).then((result) => {
      // console.log(result);
      // this.setState= ({
        //   imageResult: result.response
        // })
        if (result.errors) {
          console.log("ERROR!!!!!", result.errors[0]);
        } else {
          const image = result.response;
          this.setState({
            imageResult: result.response,
          });
          console.log(this.state.imageResult);
        }
      });
    }

    componentDidMount() {
      this.setState({
        imageResult: [],
        searchInput: ''
      })
      // this.fetchUnsplash()
    }

  render() {
    return (
      <Row>
        {this.state.imageResult.map((image: any, index: number) => {
          return (
            <Col key={index}>
              <PhotoComp photo={image}/>
            </Col>
          )
        })}
      </Row>
    );
  }
}

export default Home;
