import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { UserContextProvider } from "./UserContext/UserContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/site/Home";
import Gallery from "./components/UserPhotos/Gallery";
import CloudUpload from "./components/Upload/Cloudinary";
// import NavBar from "../src/components/site/Nav";
import UserContext from "./UserContext/UserContext";
import {
  Container,
  Paper,
  Button,
  Menu,
  Modal,
  MenuItem,
} from "@material-ui/core";

interface IMenuState {
  anchorEl: null | HTMLElement;
  isAuth: boolean;
}

class App extends React.Component<{}, IMenuState> {
  static contextType = UserContext;
  constructor(props: {}) {
    super(props);
    this.state = {
      anchorEl: null,
      isAuth: false,
    };
  }

  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Container fixed disableGutters id="NavBar">
            <Paper elevation={20}>
              <Paper>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(e) => this.handleClick(e)}
                >
                  Open Menu
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/">Home</Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/media">Photos</Link>
                  </MenuItem>
                </Menu>
                <Link to="/login">
                  <Button size="small" variant="outlined" color="primary">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="small" variant="outlined" color="primary">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button size="small" variant="outlined" color="primary">
                    Upload Media
                  </Button>
                </Link>
              </Paper>
            </Paper>
          </Container>

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/upload">
              <CloudUpload />
            </Route>
            <Route path="/media">
              <Gallery />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
