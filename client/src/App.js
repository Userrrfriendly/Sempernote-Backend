import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
// import "./mat.css"; //core styles from materialize-css
import M from "materialize-css";

import "./App.css";
import Nav from "./components/header/nav";
import Main from "./components/main/main";
import ErrorRoute from "./components/ErrorRoute/errorRoute";
import AuthScreen from "./components/authScreen/authscreen";
import Context from "./context/context";

import { mergeNotes } from "./helpers/helpers";
import {
  fetchUserData,
  createNote,
  createNotebook
} from "./helpers/graphQLrequests";

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
    // window.M = M;
    // window.M.AutoInit();
    M.AutoInit();
    // M.AutoInit(); original code was this oneliner
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  setActiveNote = noteId => {
    const activeNote = this.state.notes.find(note => note._id === noteId);
    this.setState({
      activeNote: activeNote ? activeNote : null
    });
  };

  setActiveNotebook = notebookId => {
    this.setState({
      activeNotebook: notebookId ? notebookId : null
    });
  };

  createNote = (e, note) => {
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    // console.log(e);

    console.log("creating note");
    const title = "Shopping List";
    const body = window.dd; //JSON.stringify(JSON.strignigy(delta))
    const notebook = this.state.activeNotebook;
    const requestBody = {
      query: createNote(title, body, notebook)
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        // console.log(res.json());
        return res.json();
      })
      .then(r => console.log(r.data));
  };

  createNotebook = name => {
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    console.log(`...createing Notebook ${name}`);
    let requestBody = {
      query: createNotebook(name)
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData.data.createNotebook);
        const notebooks = this.state.notebooks;
        notebooks.push(resData.data.createNotebook);
        this.setState({
          notebooks: notebooks
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchUserData = () => {
    let requestBody = {
      query: fetchUserData(this.state.userId)
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
            setActiveNotebook: this.setActiveNotebook,
            createNote: this.createNote,
            createNotebook: this.createNotebook
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
