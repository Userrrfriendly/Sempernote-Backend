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

// import { arrayToObject } from "./helpers/helpers";
import { mergeNotes } from "./helpers/helpers";

class App extends Component {
  state = {
    token: false,
    userId: null,
    userData: null,
    activeNote: null,
    activeNotebook: null,
    notebooks: null,
    notes: null
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

  setActiveNote = noteId => {
    this.setState({
      activeNote: noteId ? noteId : null
    });
  };

  setActiveNotebook = notebookId => {
    this.setState({
      activeNotebook: notebookId ? notebookId : null
    });
  };

  fetchUserData = () => {
    let requestBody = {
      query: `
        query {
          user(userId: "${this.state.userId}") {
            username
            notebooks {
              _id
              name
              notes{
                _id
                title
                body
                createdAt
                updatedAt
                notebook{
                  _id
                }
              }
            }
          }
        }`
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
          userData: resData.data.user,
          // notebooks: concatNotebooks(resData.data.user.notebooks),
          notes: mergeNotes(resData.data.user.notebooks)
        });
        console.log("this.state.userData=");
        console.log(this.state.userData);
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
            activeNote: this.state.activeNote,
            activeNotebook: this.state.activeNotebook,
            login: this.login,
            logout: this.logout,
            fetchUserData: this.fetchUserData,
            userData: this.state.userData,
            setActiveNote: this.setActiveNote,
            setActiveNotebook: this.setActiveNotebook
          }}
        >
          <Switch>
            {!this.state.token && <Redirect exact from="/" to="/auth/" />}
            {!this.state.token && <Redirect from="/main/" to="/auth/" />}
            {this.state.token && <Redirect exact from="/auth/" to="/main/" />}
            <Route path="/auth" component={AuthScreen} />
            <Route
              // exact
              path="/main/"
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
