import React, { Component, BaseSyntheticEvent } from "react";
import UserContext from "../../UserContext/UserContext";
import { Container, Button, TextField, PropTypes } from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

interface ILoginState {
  username: string;
  password: string;
  showPassword: boolean;
}
interface ILoginProps {}

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

  logIn = (e: React.BaseSyntheticEvent) => {
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
        } else {
          //redirect to home
          // this.props.history.push("/");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.token);
        this.context.setToken(data.token);
      });
  };
  handleChange(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<ILoginState, keyof ILoginState>,
    }));
  }

  handleClickShowPassword = (e: React.BaseSyntheticEvent) => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };
  handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  render() {
    return (
      <Container>
        <form>
          <FormControl>
            <TextField
              name="username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              onChange={(e) => this.handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <OutlinedInput
              name="password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={(e) => this.handleChange(e)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) => this.handleClickShowPassword(e)}
                    onMouseDown={(e) => this.handleMouseDownPassword(e)}
                  >
                    {this.state.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </form>

        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={(e) => this.logIn(e)}
        >
          Login
        </Button>
      </Container>
    );
  }
}

export default Login;
