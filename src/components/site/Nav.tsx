import React from "react";
import UserContext from "../../UserContext/UserContext";
import { Container, Paper, Button, Menu, MenuItem } from "@material-ui/core";
import { LinkContainer } from "react-router-bootstrap";

interface IMenuProps {}

interface IMenuState {
  anchorEl: null | HTMLElement;
}

class NavBar extends React.Component<{}, IMenuState> {
  static contextType = UserContext;
  constructor(props: {}) {
    super(props);
    this.state = {
      anchorEl: null,
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
              {/* <MenuItem>
                <Link to="/">Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/login">Login</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/register">Register</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/test">test</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/upload">Upload</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/media">Photos</Link>
              </MenuItem> */}
            </Menu>
          </Paper>
        </Paper>
      </Container>
    );
  }
}
export default NavBar;
