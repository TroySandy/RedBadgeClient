import React, {
  BaseSyntheticEvent,
  Component,
  ContextType,
  SyntheticEvent,
} from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export interface RegisterState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface RegisterProps {}

class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
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

  handleSubmit(e: BaseSyntheticEvent) {
    console.log(this.state.email);
    
    // const {token, setToken} = this.context!
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
      return res.json()})
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  }

  handleChange(e: BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<
        RegisterState,
        keyof RegisterState
      >,
    }));
  }
  componentDidMount(){
    this.setState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      isAdmin: false,
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            id="firstName"
            type="text"
            placeholder="firstName"
            name="firstName"
            value={this.state.firstName}
            onChange={(e) => this.handleChange(e)}
          />
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="lastName"
            value={this.state.lastName}
            onChange={(e) => this.handleChange(e)}
          />
          <input
            id="username"
            type="text"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={(e) => this.handleChange(e)}
          />
          <input
            id="email"
            name="email"
            type="text"
            placeholder="email"
            value={this.state.email}
            onChange={(e) => this.handleChange(e)}
          />
          <input
            id="password"
            type="text"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
          />
          <button type="submit">Register!</button>
        </form>
      </div>
    );
  }
}

export default Register;
