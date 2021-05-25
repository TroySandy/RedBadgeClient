import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContextProvider } from "./UserContext/UserContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminTable from "./components/Auth/Admin";
import NavBar from "../src/components/site/Nav";
import Collage from "../src/components/Unsplash/Collage";
import DisplayComments from "./components/CommentDisplay/DisplayComments";
import UserContext from "./UserContext/UserContext";
import PhotoDisplay from "./components/UserPhotos/PhotoDisplay";
import CollageDisplay from "./components/Unsplash/CollageDisplay";

class App extends React.Component {
  render() {
    return (
      <div className="AppBg">
        <Router>
          <NavBar />

          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/display" component={CollageDisplay} />
            <Route path="/admin" component={AdminTable} />
            <Route path="/media" component={PhotoDisplay} />
            <Route path="/photo" component={DisplayComments} />
            <Route path="/" component={Collage} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
