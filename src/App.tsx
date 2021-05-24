import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContextProvider } from "./UserContext/UserContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/site/Home";
import AdminTable from "./components/Auth/Admin";
import CloudUpload from "./components/Upload/Cloudinary";
import NavBar from "../src/components/site/Nav";
import DisplayComments from "./components/CommentDisplay/DisplayComments";
import UserContext from "./UserContext/UserContext";
import PhotoDisplay from "./components/UserPhotos/PhotoDisplay";
import { GuardProvider, GuardedRoute } from "react-router-guards";

// const requireLogin = (to, from, next) => {
//   if (to.meta.auth) {
//     if () {
//       next();
//     }
//     next.redirect('/login');
//   } else {
//     next();
//   }
// };

class App extends React.Component<{}, {}> {
  static contextType = UserContext;
  constructor(props: {}) {
    super(props);
    this.state = {
      isAuth: "",
    };
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />

          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/upload" component={CloudUpload} />
            <Route path="/admin" component={AdminTable} />
            <Route path="/media" component={PhotoDisplay} />
            <Route path="/photo" component={DisplayComments} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
