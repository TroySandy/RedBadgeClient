import React from "react";
import { Redirect, withRouter } from "react-router";
import UserContext from "../../UserContext/UserContext";

export interface CloudState {
  private: boolean;
  userId: string;
  comment: string;
  rating: number;
  favorite: true;
  mediumId: string;
  blur_hash: string;
  url_thumb: string;
  url_small: string;
  url_reg: string;
  url_raw: string;
  image: string;
  thumbnail: string;
  artist_name: string;
  artist_img: string;
  portfolio_url: string;
}

interface CloudProps {}
class CloudUpload extends React.Component<CloudProps, CloudState> {
  static contextType = UserContext;
  constructor(props: CloudProps) {
    super(props);
    var today = new Date(),
      dateCurrent =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    this.state = {
      userId: "",
      comment: "",
      rating: 3,
      mediumId: "",
      private: false,
      favorite: true,
      blur_hash: "",
      url_thumb: "",
      url_small: "",
      url_reg: "",
      url_raw: "",
      image: "",
      thumbnail: "",
      artist_name: "",
      artist_img: "",
      portfolio_url: "",
    };
  }

  postMedia = () => {
    console.log(this.context.user.id);

    fetch("http://localhost:4000/media/upload", {
      method: "POST",
      body: JSON.stringify({
        private: this.state.private,
        favorite: this.state.favorite,
        blur_hash: this.state.blur_hash,
        url_thumb: this.state.url_thumb,
        url_small: this.state.url_small,
        url_reg: this.state.url_reg,
        url_raw: this.state.url_raw,
        image: this.state.image,
        thumbnail: this.state.thumbnail,
        artist_name: this.state.artist_name,
        artist_img: this.state.artist_img,
        portfolio_url: this.state.portfolio_url,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.context.token}`,
      },
    })
      .then((res) => {
        console.log(res);

        if (res.status !== 201) {
          console.log("File not Uploaded", res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log("Media", data);
        this.setState({
          private: false,
          favorite: true,
          blur_hash: "",
          url_thumb: "",
          url_small: "",
          url_reg: "",
          url_raw: "",
          image: "",
          thumbnail: "",
          artist_name: "",
          artist_img: "",
          portfolio_url: "",
          userId: this.context.user.id,
        });
      });
  };

  handleChange(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<CloudState, keyof CloudState>,
    }));
  }

  componentDidMount() {
    this.setState({
      private: false,
      favorite: true,
      blur_hash: "",
      url_thumb: "",
      url_small: "",
      url_reg: "",
      url_raw: "",
      image: "",
      thumbnail: "",
      artist_name: "",
      artist_img: "",
      portfolio_url: "",
      userId: this.context.user.id,
    });

    // setTimeout(() => {
    console.log(this.state.userId, this.context.token);
    (window as any).cloudinary.applyUploadWidget(
      document.getElementById("cloudBtn"),
      {
        cloud_name: "wd1150photohost",
        upload_preset: "upload1",
        sources: ["local", "url", "camera", "image_search"],
        tags: [this.state.userId],
        multiple: true,
        cropping: true,
        croppingShowDimensions: true,
        showPoweredBy: true,
      },
      (error: any, res: any) => {
        console.log(res);
        if (res.event !== "success") {
          console.log(this.state.userId, "no file");
        } else {
          this.setState({
            url_thumb: res.info.thumbnail_url,
            image: res.info.url,
            artist_name: this.context.user.username,
            userId: this.context.user.id,
          });
          setTimeout(() => {
            this.postMedia();
          }, 500);
        }
      }
    );
  }

  render() {
    return (
      <div>
        <p id="cloudBtn">Click Me</p>
      </div>
    );
  }
}

export default CloudUpload;
