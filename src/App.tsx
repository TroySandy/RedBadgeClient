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
import Collage from "../src/components/Unsplash/Collage";
import DisplayComments from "./components/CommentDisplay/DisplayComments";
import UserContext from "./UserContext/UserContext";
import PhotoDisplay from "./components/UserPhotos/PhotoDisplay";
import CollageDisplay from "./components/Unsplash/CollageDisplay";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="AppBg">
          <NavBar />

          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/upload" component={CloudUpload} />
            <Route path="/stream" component={Collage} />
            <Route path="/display" component={CollageDisplay} />
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
