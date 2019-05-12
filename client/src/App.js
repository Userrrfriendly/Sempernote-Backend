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

import { mergeNotes } from "./helpers/helpers";
class App extends Component {
  state = {
    token: false,
    userId: null,
    userName: null,
    notebooks: null,
    notes: null,
    activeNote: null,
    activeNotebook: null
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
                  name
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
          userName: resData.data.user.username,
          notebooks: resData.data.user.notebooks,
          notes: mergeNotes(resData.data.user.notebooks)
        });
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
            ...this.state,
            login: this.login,
            logout: this.logout,
            fetchUserData: this.fetchUserData,
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
