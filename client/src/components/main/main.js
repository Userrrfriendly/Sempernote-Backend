import React, { Component } from "react";
import Editor from "../editor/editor";

import "./main.css";
// import * as data from "../../data";
import NotePreview from "./notePreview";
import Context from "../../context/context";

class Main extends Component {
  static contextType = Context;

  // test = this.context.globalState.userNotes[0];

  componentDidUpdate() {
    console.log("<Main/> didUpdate");
    // console.log(this.context.globalState);
  }

  render() {
    const renderNotes = this.context.globalState
      ? this.context.globalState.userNotes.map(note => {
          return (
            <NotePreview
              key={note._id}
              name={note.title}
              updated={note.updatedAt}
              body={note.body}
              id={note._id}
              setActiveNote={this.context.setActiveNote}
            />
          );
        })
      : "no notes yet";

    const test = this.context.globalState
      ? this.context.globalState.userNotes.map(note => {
          return note.body;
        })
      : "WTF";

    return (
      <main className="main-section l10">
        {console.log(test)}
        {this.context.activeNote ? (
          <Editor note={this.context.globalState.userNotes[0].body} />
        ) : (
          renderNotes
        )}
      </main>
    );
  }
}

export default Main;
