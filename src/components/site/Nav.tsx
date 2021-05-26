import React from "react";
import UserContext from "../../UserContext/UserContext";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./Nav.css";
import Logo from "../../assets/brandmark-design.png";
import config from "../../config";

interface IMenuState {
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

class Menu extends React.Component<{}, IMenuState> {
  static contextType = UserContext;
  constructor(props: {}) {
    super(props);
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

  logOut(e: React.BaseSyntheticEvent) {
    this.context.setToken(null);
  }

  postMedia = () => {
    fetch(`${config.REACT_APP_SERVER_API_URL}/media/upload`, {
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
        if (res.status !== 201) {
          console.log("File not Uploaded", res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
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
      [e.target.name]: e.target.value as Pick<IMenuState, keyof IMenuState>,
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
  }
  componentDidUpdate() {
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
        styles: {
          palette: {
            window: "#161616",
            sourceBg: "#000000",
            windowBorder: "#8E9FBF",
            tabIcon: "#FFFFFF",
            inactiveTabIcon: "#8E9FBF",
            menuIcons: "#2AD9FF",
            link: "#0078FF",
            action: "#336BFF",
            inProgess: "#00BFFF",
            complete: "#33ff00",
            error: "#EA2727",
            textDark: "#000000",
            textLight: "#FFFFFF",
          },
          fonts: {
            default: null,
            "'Kalam', cursive": {
              url: "https://fonts.googleapis.com/css?family=Kalam",
              active: true,
            },
          },
        },
      },
      (error: any, res: any) => {
        console.log(res);
        if (res.event !== "success") {
          console.log(this.state.userId, "no file");
        } else {
          this.setState({
            url_thumb: res.info.thumbnail_url,
            image: res.info.secure_url,
            artist_name: this.context.user.username,
            userId: this.context.user.id,
            url_reg: res.info.url,
          });
          setTimeout(() => {
            this.postMedia();
          }, 300);
        }
      }
    );
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" sticky="top" expand="md">
          <Navbar.Brand href="/">
            <img src={Logo} alt="logo" height={50} />
          </Navbar.Brand>
          <Nav className="mr-auto">
            {!this.context.isAuth ? null : (
              <>
                <Nav.Link href="/media">
                  <Button size="sm">Saved Photos</Button>
                </Nav.Link>
                <span className="annoying">
                  <p id="cloudBtn">Upload Media</p>
                </span>
              </>
            )}
            {!this.context.user.isAdmin ? null : (
              <Nav.Link href="/admin">Admin</Nav.Link>
            )}
          </Nav>
          {!this.context.isAuth ? (
            <>
              <Nav.Link href="/login">
                <Button variant="outline-info">LogIn</Button>
              </Nav.Link>
              <Nav.Link href="/register">
                <Button variant="outline-info">Register</Button>
              </Nav.Link>
            </>
          ) : (
            <Button variant="outline-secondary" onClick={(e) => this.logOut(e)}>
              LogOut
            </Button>
          )}
        </Navbar>
      </>
    );
  }
}
export default Menu;
