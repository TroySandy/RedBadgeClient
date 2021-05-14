import React from "react";
import "./App.css";
import { BrowserRouter as Switch, Route, Link } from "react-router-dom";
import { UserContextProvider } from "./UserContext/UserContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/site/Home";
import FileUpload from './components/FilePond/FilePond'
import Body from './components/Unsplash/Display'


const App: React.FC = () => {
  return (
    <div className="App">
      <div>
        
      </div>

      
      <UserContextProvider>


  
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/media" component={FileUpload} />
            {/* <Route path='/media' commponent={Media} />
            <Route path="/extra" component={Extra} />
          <Route path="/admin" component={Admin} /> */}
            <Route path="/" component={Home} />
            </Switch>
            
            
          </UserContextProvider>
      {/* <Body /> */}
        
    </div>
  );
};

export default App;
