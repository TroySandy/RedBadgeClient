import React from "react";
import UserContext from "../../UserContext/UserContext";
import { Redirect } from "react-router-dom";
import "./Login.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import config from "../../config";

interface ILoginState {
  username: string;
  password: string;
  showPassword: boolean;
  validated: boolean;
}
class Login extends React.Component<{}, ILoginState> {
  static contextType = UserContext;
  constructor(props: {}) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      validated: false,
    };
  }

  logIn(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    fetch(`${config.REACT_APP_SERVER_API_URL}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status != 200) {
          console.log("Invalid username or password.");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.token);
        this.context.setToken(data.token);
      });
  }

  handleChange(e: React.BaseSyntheticEvent) {
    console.log(this.state.username);
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<ILoginState, keyof ILoginState>,
    }));
  }

  render() {
    return (
      <Container fluid className="loginBG">
        <Container className="loginContainer">
          <Form onSubmit={(e) => this.logIn(e)} className="loginForm">
            <Form.Group as={Row} controlId="formHorizontalUserName">
              <Col lg={{ span: 4, offset: 4 }}>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  className="username"
                  onChange={(e) => this.handleChange(e)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Col lg={{ span: 4, offset: 4 }}>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="password"
                  onChange={(e) => this.handleChange(e)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalCheck">
              <Col lg={{ span: 4, offset: 4 }}>
                <Form.Check
                  type="checkbox"
                  label="Please confim you are not a robot"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col xs={{ span: 4, offset: 5 }}>
                <Button type="submit" className="loginBtn">
                  Sign in
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Container>
        {this.context.isAuth ? <Redirect to="/" /> : null}
      </Container>
    );
  }
}

export default Login;
