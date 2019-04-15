import React, { Component } from "react";
import "./authscreen.css";
import Context from "../../context/context";

class AuthScreen extends Component {
  state = {
    logIn: true,
    username: "",
    password: "",
    email: "",
    failedLogIn: false
  };

  static contextType = Context;
  // myRef = React.createRef();

  toggleLogIn = () => {
    this.setState(prevState => {
      return { logIn: !prevState.logIn };
    });
  };

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      failedLogIn: false
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password, username } = { ...this.state };

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (!this.state.logIn) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {username:"${username}",email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }

    // console.log(requestBody);
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          if (res.status === 500) {
            //Can't finda a way to access the error message in the response body
            this.setState({
              failedLogIn: true
            });
          }
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        console.log(resData.errors[0]);
        if (this.state.logIn && resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .then(() => {
        if (this.state.logIn) {
          this.context.fetchGlobalData();
        } else {
          this.setState({
            logIn: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      // <div className="mask">
      <>
        <h1 className="flow-text" style={{ textAlign: "center" }}>
          {this.state.logIn ? "Login " : "Sign Up "}
          To SemperNote
        </h1>
        <form
          className="row hoverable center-text authscreen"
          onSubmit={this.onSubmit}
        >
          <div className="col s12 ">
            <div className="card white darken-4">
              <div className="card-content white-text">
                <span className="card-title black-text center-text">
                  {this.state.logIn ? "Login" : "Sign Up"}
                </span>
                {!this.state.logIn && (
                  <div className="form-field left-align">
                    <label htmlFor="username">Username or Full Name</label>
                    <input
                      type="text"
                      id="username"
                      onChange={this.onChange}
                      value={this.state.username}
                    />
                  </div>
                )}
                <div className="form-field left-align">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    type="email"
                    id="email"
                  />
                </div>
                <div className="form-field left-align">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                </div>
                {this.state.failedLogIn && (
                  <p className="red-text">Invalid Credentials</p>
                )}
              </div>
              <div className="card-action center-align">
                <button
                  type="submit"
                  className="btn btn-large waves-effect waves-green black-text cyan lighten-5"
                  name="action"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-large cyan lighten-5 black-text waves-effect waves-green"
                  onClick={this.toggleLogIn}
                >
                  {this.state.logIn ? "Switch to Sign Up" : "Switch to Login"}
                </button>
                <button
                  type="submit"
                  style={{ borderColor: "#ffb74d" }}
                  className="btn btn-large orange lighten-2 black-text waves-effect waves-light tooltipped"
                  data-position="bottom"
                  data-tooltip="Log in without registration - for demonstration purposes only"
                  name="action"
                >
                  Login as Guest
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
      // </div>
    );
  }
}

export default AuthScreen;
