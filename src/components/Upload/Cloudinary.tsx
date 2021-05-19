import React from "react";
import { withRouter } from "react-router";
import UserContext from "../../UserContext/UserContext";

export interface CloudState {
  imageSecure: string;
  image: string;
  thumbnail: string;
  fileTag: string[];
  private: boolean;
  userId: string;
  date: string;
  blurhash: string;
  url_regular: string;
  url_thumb: string;
  artist: string;
  artist_image: string;
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
      imageSecure: "",
      image: "",
      thumbnail: "",
      fileTag: [],
      private: false,
      userId: "",
      date: dateCurrent,
      blurhash: "",
      url_regular: "",
      url_thumb: "",
      artist: "",
      artist_image: "",
      portfolio_url: "",
    };
  }

  postMedia = () => {
    console.log(this.context.user.id);

    fetch("http://localhost:4000/media/upload", {
      method: "POST",
      body: JSON.stringify({
        image: this.state.image,
        imageSecure: this.state.imageSecure,
        thumbnail: this.state.thumbnail,
        tags: this.state.fileTag,
        private: this.state.private,
        userId: this.state.userId,
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
          imageSecure: "",
          image: "",
          thumbnail: "",
          fileTag: [],
          private: false,
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
      imageSecure: "",
      image: "",
      thumbnail: "",
      fileTag: [],
      private: false,
      userId: this.context.user.id,
      blurhash: "",
      url_regular: "",
      url_thumb: "",
      artist: "",
      artist_image: "",
      portfolio_url: "",
    });

    // setTimeout(() => {
    console.log(this.state.userId, this.context.token);
    (window as any).cloudinary.applyUploadWidget(
      document.getElementById("cloudBtn"),
      {
        cloud_name: "wd1150photohost",
        upload_preset: "upload1",
        sources: ["local", "url", "camera", "image_search"],
        tags: [this.state.userId, this.state.date],
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
            imageSecure: res.info.secure_url,
            image: res.info.url,
            userId: this.context.user.id,
            thumbnail: res.info.thumbnail_url,
            fileTag: res.info.tags,
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
