import React from "react";
import moment from "moment";

const NotePreview = props => {
  const shortenStr = str => {
    if (str.length > 400) {
      const sliceIndex = str.lastIndexOf(" ", 400);
      return str.slice(0, sliceIndex).concat("...");
    }
    return str;
  };

  return (
    <section className="note-thumbnail-container">
      <p className="note-thumb-text thumb-date">
        {moment(props.updated).format("LLL")}
      </p>
      <h1 className="note-thumb-text thumb-title">{props.name}</h1>
      <p className="note-thumb-text thumb-body">{shortenStr(props.body)}</p>
    </section>
  );
};

export default NotePreview;
