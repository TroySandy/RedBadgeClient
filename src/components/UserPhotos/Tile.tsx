import { Link, Paper } from "@material-ui/core";
import React from "react";

interface ITileState {
  artist?: string;
  artist_image?: string;
  blurhash?: string;
  comments?: string;
  id: string;
  image?: string;
  private: boolean;
  thumbnail?: string;
  url_regular?: string;
  url_thumb?: string;
  imageData: any;
}

interface ITileProps {
  image: any;
}

class Tile extends React.Component<ITileProps, ITileState> {
  constructor(props: ITileProps) {
    super(props);
    this.state = {
      blurhash: "",
      id: "",
      image: "",
      private: false,
      thumbnail: "",
      url_regular: "",
      url_thumb: "",
      imageData: [],
    };
  }

  componentDidMount() {
    console.log(this.props.image);
    this.setState({
      blurhash: this.props.image.blurhash,
      id: this.props.image.id,
      image: this.props.image.image,
      private: this.props.image.private,
      thumbnail: this.props.image.thumbnail,
      url_regular: this.props.image.url_regular,
      url_thumb: this.props.image.url_thumb,
      imageData: this.props.image,
    });
  }

  render() {
    return (
      <>{this.state.thumbnail ? <img src={this.state.thumbnail} /> : <></>}</>
    );
  }
}

export default Tile;
