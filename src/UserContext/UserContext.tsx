import React, { Component } from "react";

type ContextProps = {};
const UserContext = React.createContext<Partial<ContextProps>>({});

export default UserContext;

export interface UserContextProviderProps {}

export interface UserContextProviderState {
  token: string | null;
  isAuth: boolean;
  user: any;
}

export class UserContextProvider extends Component<
  UserContextProviderProps,
  UserContextProviderState
> {
  constructor(props: UserContextProviderProps) {
    super(props);
    this.state = {
      token: null,
      isAuth: false,
      user: {},
    };
  }

  componentDidMount() {
    this.setState({
      token: localStorage.getItem("token"),
    });
  }

  componentDidUpdate(
    prevProps: UserContextProviderProps,
    prevState: UserContextProviderState
  ) {
    // console.log(prevState.token, "|", this.state.token);
    if (this.state.token !== prevState.token) {
      if (this.state.token) {
        localStorage.setItem("token", this.state.token);
        // console.log(this.state.token);
        fetch(`http://localhost:4000/user/`, {
          headers: new Headers({
            Authorization: `Bearer ${this.state.token}`,
          }),
        })
          .then((res) => {
            // console.log(res);
            if (res.status !== 200) {
              this.setState({
                token: null,
                isAuth: false,
                user: {},
              });
              localStorage.removeItem("token");
            }
            return res.json();
          })
          .then((data) => {
            // console.log("helloworld");

            if (data.user) {
              this.setState({
                isAuth: true,
                user: data.user,
              });
            }
          });
      } else {
        // console.log("fail");
        this.setState({
          isAuth: false,
          user: {},
        });
        localStorage.removeItem("token");
      }
    }
  }

  setToken = (token: string | null) => {
    this.setState({
      token: token,
    });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          token: this.state.token,
          setToken: this.setToken,
          isAuth: this.state.isAuth,
          user: this.state.user,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
