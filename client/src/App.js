import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";

import "./App.css";
import Nav from "./components/header/nav";
import Main from "./components/main/main";
import ErrorRoute from "./components/ErrorRoute/errorRoute";
import AuthScreen from "./components/authScreen/authscreen";
import Context from "./context/context";

class App extends Component {
  state = {
    token: false,
    userId: null,
    globalState: null
  };

  componentDidMount() {
    window.M = M;
    window.M.AutoInit();
    // M.AutoInit(); original code was this oneliner
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  fetchGlobalData = () => {
    //It actually makes more sense to land on a user gather all his data (favorites tags notebooks etc) and then extrapolate to notes
    let requestBody = {
      query: `
        query {
          userNotes(userId: "${this.state.userId}") {
            title
            _id
            body
            createdAt
            updatedAt
          }
        }
      `
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          globalState: resData.data
        });
        console.log(this.state.globalState);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <Context.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout,
            fetchGlobalData: this.fetchGlobalData,
            globalState: this.state.globalState
          }}
        >
          <Switch>
            {!this.state.token && <Redirect exact from="/" to="/auth/" />}
            {this.state.token && <Redirect exact from="/auth/" to="/" />}
            <Route path="/auth" component={AuthScreen} />
            <Route
              exact
              path="/"
              render={props => (
                <>
                  <Nav />
                  <Main />
                </>
              )}
            />
            <Route component={ErrorRoute} />
          </Switch>
        </Context.Provider>
      </div>
    );
  }
}

export default App;
