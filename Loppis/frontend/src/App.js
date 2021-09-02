import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import { Home } from "./components/Views/Home";
import { Account } from "./components/Views/Account";
import { Register } from "./components/Views/Register";
import { Login } from "./components/Views/Login";
import { Navbar } from "./components/general/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home}/>
      <Route exact path="/Account" component={Account}/>
      <Route exact path="/Register" component={Register}/>
      <Route exact path="/Login" component={Login}/>
    </Router>
    
  );
}

export default App;
