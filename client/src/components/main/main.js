import React, { Component } from "react";
import Context from "../../context/context";

import "./main.css";
import ExpandedNote from "../editor/expandedNote";
import NoteListItem from "./NoteListItem";
// import ExpandedNote from "../editor/expandedNote";

class Main extends Component {
  static contextType = Context;

  // componentDidUpdate() {
  //   console.log("<Main/> didUpdate");
  // }

  expandNote = (e, noteId) => {
    // console.log(`note with ID ${noteId} expanded`);
    this.context.setActiveNote(noteId);
  };

  render() {
    const renderNotes = this.context.globalState
      ? this.context.globalState.userNotes.map(note => {
          return (
            <NoteListItem
              key={note._id}
              name={note.title}
              updated={note.updatedAt}
              body={note.body}
              id={note._id}
              setActiveNote={this.context.setActiveNote}
              expandNote={this.expandNote.bind(this, note._id)}
            />
          );
        })
      : "no notes yet";

    const containerCssClass = this.context.activeNote
      ? "hide-on-small-only note-container"
      : "note-container";

    return (
      <main className="main-section l10">
        <div className={containerCssClass}>{renderNotes}</div>
        {this.context.activeNote && (
          <ExpandedNote note={this.context.globalState.userNotes[0].body} />
        )}

        {/* {this.context.activeNote ? (
          <Editor note={this.context.globalState.userNotes[0].body} />
        ) : (
          renderNotes
        )} */}
      </main>
    );
  }
}

export default Main;
