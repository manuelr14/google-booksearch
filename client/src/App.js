<<<<<<< HEAD
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
=======
import React from "react";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Books from "./pages/Books";
import Saved from "./pages/Saved";
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {

  return (
    <ThemeProvider theme={createMuiTheme({})}>
      <Router>
        <Navbar>
        <Container>
          <Switch>
            <Route path="/booksearch" component={Books} />
            <Route path="/saved" component={Saved} />
            <Route path="/" component={Home} />
            {/* <Books /> */}
            <Saved />
          </Switch>
        </Container>
        </Navbar>
      </Router>
    </ThemeProvider>
  );
>>>>>>> cfb465dd80608d29282d5002ab241bc5ad490606
}

export default App;