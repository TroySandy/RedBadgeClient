import React, { Component, BaseSyntheticEvent } from "react";
import UserContext from "../../UserContext/UserContext";
import { Redirect } from "react-router-dom";
import Tree from "../../assets/TreesBG.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface ILoginState {
  username: string;
  password: string;
  showPassword: boolean;
}
interface ILoginProps {
  classes: any;
}
class Login extends Component<ILoginProps, ILoginState> {
  static contextType = UserContext;
  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
    };
  }

  logIn(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    fetch(`http://localhost:4000/user/login`, {
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
    const { classes } = this.props;
    return (
      <Container fluid>
        <Container fluid>
          <Form onSubmit={(e) => this.logIn(e)}>
            <Form.Group as={Row} controlId="formHorizontalUserName">
              <Form.Label column sm={2}>
                Username
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => this.handleChange(e)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => this.handleChange(e)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalCheck">
              <Col sm={{ span: 10, offset: 2 }}>
                <Form.Check label="I am not a robot" />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Sign in</Button>
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
