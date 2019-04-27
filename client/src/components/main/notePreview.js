import React from "react";
import moment from "moment";
// import Context from "../../context/context";

const NotePreview = props => {
  const shortenStr = str => {
    if (str.length > 400) {
      const sliceIndex = str.lastIndexOf(" ", 400);
      return str.slice(0, sliceIndex).concat("...");
    }
    return str;
  };

  const openNote = e => {
    console.log("note opened");
    let noteId;
    if (e.target.getAttribute("data-note-id")) {
      noteId = e.target.getAttribute("data-note-id");
    } else {
      noteId = e.target.parentElement.getAttribute("data-note-id");
    }
    console.log(noteId);
    props.setActiveNote(noteId);
  };

  return (
    <section
      data-note-id={props.id}
      onClickCapture={openNote}
      className="note-thumbnail-container"
    >
      <p className="note-thumb-text thumb-date">
        {moment(props.updated).format("LLL")}
      </p>
      <h1 className="note-thumb-text thumb-title">{props.name}</h1>
      <p className="note-thumb-text thumb-body">{shortenStr(props.body)}</p>
    </section>
  );
};

export default NotePreview;
