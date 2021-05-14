import React, { BaseSyntheticEvent, Component, ContextType, SyntheticEvent } from "react";
import UserContext from "../../UserContext/UserContext";

export interface LoginState {
  username: string;
  password: string;
}

export interface LoginProps {}

class Login extends Component<LoginProps, LoginState> {
  static contextType = UserContext;
  // context: ContextType<typeof UserContext>
  
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  
  handleSubmit(e: BaseSyntheticEvent) {
    // const {token, setToken} = this.context!
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
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.context.setToken(data.token);
      });
  }
  logOut(e: BaseSyntheticEvent){
    localStorage.removeItem("token");
    console.log("logout");
    
  }

  


  handleChange(e: BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<LoginState, keyof LoginState>,
    }));
  }

  render() {
    return (
      <div>
        <span>You are logged {this.context.isAuth ? "in" : "out"}</span>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            id="username"
            type="text"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={(e) => this.handleChange(e)}
          />
          <input
            id="password"
            name="password"
            type="text"
            placeholder="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
          />
          <button type="submit">
            {this.context.isAuth ? "Logout" : "Login"}
          </button>
          <button type="button" onClick={(e) => this.logOut(e)}>
           LogOut
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
