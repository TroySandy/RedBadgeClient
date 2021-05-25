import React from "react";
import UserContext from "../../UserContext/UserContext";
import "./Register.css";
import { Redirect } from "react-router-dom";
import config from "../../config";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
export interface RegisterState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  // verifyEmail: boolean;
  // verifyPassword: boolean;
}

export interface RegisterProps {}

class Register extends React.Component<{}, RegisterState> {
  static contextType = UserContext;
  constructor(props: {}) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      isAdmin: false,
    };
  }

  registerFetch = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    fetch(`${config.REACT_APP_SERVER_API_URL}/user/register`, {
      method: "POST",
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        isAdmin: this.state.isAdmin,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status != 201) {
          console.log("error");
        } else {
          //redirect to login
          console.log("Success");
          // props.history.push("/login");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        this.context.setToken(res.token);
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    console.log("mounted, hehehe");
    this.setState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      isAdmin: false,
    });
  }

  handleChange(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<
        RegisterState,
        keyof RegisterState
      >,
    }));
  }

  render() {
    return (
      <Container className="registerBG">
        <div className="registerForm">
          <Form
            onSubmit={(e) => this.registerFetch(e)}
            className="registerForm"
          >
            <Form.Row>
              <Form.Group
                as={Col}
                lg={{ span: 4, offset: 4 }}
                controlId="formGridfirstName"
              >
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  className="firstName"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>

              <Form.Group
                as={Col}
                lg={{ span: 4, offset: 4 }}
                controlId="formGridLastname"
              >
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  className="lastName"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group
                as={Col}
                lg={{ span: 4, offset: 4 }}
                controlId="formGridEmail"
              >
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  className="email"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group
                as={Col}
                lg={{ span: 4, offset: 4 }}
                controlId="formGridUsername"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  className="username"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>

              <Form.Group
                as={Col}
                lg={{ span: 4, offset: 4 }}
                controlId="formGridPassword"
                name="password"
                className="password"
                onChange={(e: React.BaseSyntheticEvent) => this.handleChange(e)}
              >
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form.Row>

            <Form.Group id="formGridCheckbox">
              <Col xs={{ span: 4, offset: 4 }}>
                <Form.Check
                  type="checkbox"
                  label="Please confim you are not a robot"
                  required
                />
              </Col>
            </Form.Group>
            <Col xs={{ span: 4, offset: 5 }}>
              <Button variant="primary" type="submit" className="registerBtn">
                Submit
              </Button>
            </Col>
          </Form>
        </div>
        {this.context.isAuth ? <Redirect to="/" /> : null}
      </Container>
    );
  }
}

export default Register;
