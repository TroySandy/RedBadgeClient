import React from "react";
import UserContext from "../../UserContext/UserContext";
import {
  Container,
  Paper,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Fab,
  withStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { BrowserRouter as Redirect, NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/NavBar";

interface IMenuProps {}

interface IMenuState {
  anchorEl: null | HTMLElement;
  isAuth: boolean;
}

class NavBar extends React.Component<{}, IMenuState> {
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
  logOut(e: React.BaseSyntheticEvent) {
    this.context.setToken(null);
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {!this.context.isAuth ? null : (
              <>
                {" "}
                <Nav.Link href="/media">Media</Nav.Link>
                <Nav.Link href="/upload">Upload</Nav.Link>
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
            <Button variant="outline-info" onClick={(e) => this.logOut(e)}>
              LogOut
            </Button>
          )}
        </Navbar>
      </>
    );
  }
}
export default NavBar;
