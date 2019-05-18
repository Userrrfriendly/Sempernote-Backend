import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Context from "../../context/context";

import "./main.css";
import ExpandedNote from "../editor/expandedNote";
import NoteListItem from "./NoteListItem";
import LoadingBlocks from "../loading/loadingBlocks";
import NoteHeader from "../noteHeader/noteHeader";
import NotebookModal from "../createNotebookModal/notebookModal";

class Main extends Component {
  state = {
    createNotebookModalIsOpen: false
  };

  static contextType = Context;

  openCreateNotebookModal = () => {
    this.setState({ createNotebookModalIsOpen: true });
  };

  closeCreateNotebookModal = () => {
    this.setState({ createNotebookModalIsOpen: false });
  };

  expandNote = (noteId, notebookId) => {
    console.log(
      `note with ID ${noteId} and notebookID: ${notebookId} expanded`
    );
    this.context.setActiveNotebook(notebookId);
    this.context.setActiveNote(noteId);
    let path = `/main/editor`;
    this.props.history.push(path);
  };

  componentDidUpdate() {
    console.log("MAIN updated");
  }

  render() {
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
                // title="create note"
                // aria-label="create note"
                className="btn-floating btn-large green"
                // onClick={this.context.createNote}
              >
                <i className="material-icons">create</i>
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
                    <i className="material-icons">add</i>
                  </button>
                </li>
                <li>
                  <button className="btn-floating green">
                    <i className="material-icons">publish</i>
                  </button>
                </li>
                <li>
                  <button
                    title="create note"
                    aria-label="create note"
                    onClick={this.context.createNote}
                    className="btn-floating btn-large blue"
                  >
                    <i className="material-icons">note_add</i>
                  </button>
                </li>
                <li>
                  <button
                    className="btn-floating btn-large green btn modal-trigger"
                    title="create notebook"
                    // href="#create-notebook"
                    onClick={this.openCreateNotebookModal}
                  >
                    <i className="material-icons">library_add</i>
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
            {/* {this.context.activeNote && (
              <Redirect exact from="/main/" to="/main/editor/" />
            )} */}

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
        {/* <a
          class="waves-effect waves-light btn modal-trigger"
          href="#create-notebook"
        >
          Modal
        </a> */}

        {/* <!-- Modal Structure --> */}
        {/* <div id="create-notebook" className="modal">
          <div className="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
              onClick={this.context.createNotebook}
            >
              Agree
            </a>
          </div>
        </div> */}
        <NotebookModal
          notebooks={this.context.notebooks}
          createNotebook={this.context.createNotebook}
          openModal={this.openCreateNotebookModal}
          closeModal={this.closeCreateNotebookModal}
          isOpen={this.state.createNotebookModalIsOpen}
        />
      </main>
    );
  }
}

export default withRouter(Main);
