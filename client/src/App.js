import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";

import "./App.css";
import Nav from "./components/header/nav";
import Main from "./components/main/main";
// import Drawer from "./components/drawer/drawer";
import ErrorRoute from "./components/ErrorRoute/errorRoute";

class App extends Component {
  state = {
    drawerVisible: false
  };

  toggleDrawer = () => {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  };

  closeDrawer = () => {
    this.setState({ drawerVisible: false });
  };

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div className="App">
        <Nav toggleDrawer={this.toggleDrawer} />
        {/* <Drawer
          drawerVisible={this.state.drawerVisible}
          closeDrawer={this.closeDrawer}
        /> */}
        <Switch>
          <Route exact path="/" component={Main} />
          <Route component={ErrorRoute} />
        </Switch>
      </div>
    );
  }
}

export default App;
