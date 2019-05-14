import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Context from "../../context/context";

import "./main.css";
import ExpandedNote from "../editor/expandedNote";
import NoteListItem from "./NoteListItem";
import LoadingBlocks from "../loading/loadingBlocks";
import NoteHeader from "../noteHeader/noteHeader";

class Main extends Component {
  static contextType = Context;

  expandNote = (noteId, notebookId) => {
    console.log(
      `note with ID ${noteId} and notebookID: ${notebookId} expanded`
    );
    this.context.setActiveNotebook(notebookId);
    this.context.setActiveNote(noteId);
  };

  componentDidUpdate() {
    console.log("MAIN updated");
  }

  render() {
    //if activeNotebook render only notes from that notebook
    //if not render the following:
    // const renderNotes = "test";

    const renderNotes = this.context.notes ? (
      this.context.notes.map(note => {
        return (
          <NoteListItem
            notebookName={note.notebook.name}
            notebookId={note.notebook._id}
            key={note._id}
            name={note.title}
            updated={note.updatedAt}
            body={note.body}
            id={note._id}
            expandNote={this.expandNote.bind(this, note._id, note.notebook._id)}
          />
        );
      })
    ) : (
      <LoadingBlocks />
    );

    const containerCssClass = this.context.activeNote
      ? "hide-on-small-only note-container"
      : "note-container";

    return (
      <main className="main-section l10">
        <NoteHeader
          activeNote={this.context.activeNote}
          notebooks={this.context.notebooks}
        />
        {/*  */}
        <Route
          // exact
          path="/main/"
          render={props => (
            <div className="fixed-action-btn action-btn-editor">
              <button
                title="create note"
                aria-label="create note"
                className="btn-floating btn-large green"
                onClick={this.context.createNote}
              >
                <i className="material-icons">add</i>
              </button>
              {/* <button className="btn-floating btn-large red">
                <i className="large material-icons">mode_edit</i>
              </button> */}
              <ul>
                <li>
                  <button className="btn-floating red">
                    <i className="material-icons">insert_chart</i>
                  </button>
                </li>
                <li>
                  <button className="btn-floating yellow darken-1">
                    <i className="material-icons">format_quote</i>
                  </button>
                </li>
                <li>
                  <button className="btn-floating green">
                    <i className="material-icons">publish</i>
                  </button>
                </li>
                <li>
                  <button className="btn-floating btn-large blue">
                    <i className="material-icons">note_add</i>
                  </button>
                </li>
                <li>
                  <button
                    className="btn-floating btn-large green"
                    title="create notebook"
                  >
                    <i className="material-icons"> library_add</i>
                  </button>
                </li>
              </ul>
            </div>
          )}
        />
        {/*  */}
        <div className="main-subcontainer">
          <div className={containerCssClass}>{renderNotes}</div>
          <Switch>
            {this.context.activeNote && (
              <Redirect exact from="/main/" to="/main/editor/" />
            )}
            {/*<Route
              exact
              path="/main/"
              render={props => (
                <div className="fixed-action-btn main-action-btn">
                  <button
                    title="create note"
                    aria-label="create note"
                    className="btn-floating btn-large green"
                    onClick={this.context.createNote}
                  >
                    <i className="material-icons">add</i>
                  </button>
                  <ul>
                    <li>
                      <button className="btn-floating red">
                        <i className="material-icons">insert_chart</i>
                      </button>
                    </li>
                    <li>
                      <button className="btn-floating yellow darken-1">
                        <i className="material-icons">format_quote</i>
                      </button>
                    </li>
                    <li>
                      <button className="btn-floating green">
                        <i className="material-icons">publish</i>
                      </button>
                    </li>
                    <li>
                      <button className="btn-floating btn-large blue">
                        <i className="material-icons">note_add</i>
                      </button>
                    </li>
                    <li>
                      <button className="btn-floating btn-large green">
                        <i className="material-icons"> library_add</i>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
              />*/}
            <Route
              exact
              path="/main/editor/"
              render={props => (
                <>
                  {this.context.activeNote && (
                    <ExpandedNote note={this.context.activeNote} />
                  )}
                </>
              )}
            />
          </Switch>
        </div>
      </main>
    );
  }
}

export default Main;
