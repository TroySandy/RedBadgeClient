import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import "./Register.css";

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
      .then((res) => console.log(res))
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
        <form onSubmit={(e) => this.registerFetch(e)}>
          <FormControl>
            <TextField
              label="First Name"
              type="text"
              name="firstName"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => this.handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Surname"
              type="text"
              name="lastName"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => this.handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Email"
              type="email"
              name="email"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => this.handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Username"
              type="text"
              name="username"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => this.handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Password"
              type="password"
              name="password"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => this.handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <Button variant="outlined" color="primary" type="submit">
              Submit
            </Button>
          </FormControl>
        </form>
      </div>
    );
  }
}

export default Register;
