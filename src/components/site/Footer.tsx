import React from "react";
import Navbar from "react-bootstrap/Navbar";

class Footer extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="dark" fixed="bottom">
          <Navbar.Brand>
            <img
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Navbar>
        <br />
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </Navbar>
      </>
    );
  }
}
