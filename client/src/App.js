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
}

export default App;