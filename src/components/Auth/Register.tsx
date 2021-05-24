import React from "react";
import UserContext from "../../UserContext/UserContext";
import "./Register.css";
import { Redirect } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
export interface RegisterState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
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
    fetch(`http://localhost:4000/user/register`, {
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
      <div>
        <>
          <Form onSubmit={(e) => this.registerFetch(e)}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridfirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>

              <Form.Group
                as={Col}
                controlId="formGridPassword"
                name="password"
                onChange={(e: React.BaseSyntheticEvent) => this.handleChange(e)}
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form.Row>

            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
        {this.context.isAuth ? <Redirect to="/" /> : null}
      </div>
    );
  }
}

export default Register;
