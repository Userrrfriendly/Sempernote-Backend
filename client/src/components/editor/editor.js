import React, { Component } from "react";
import Quill from "quill";
import Delta from "quill-delta";
import "./quillSnow.css";

class Editor extends Component {
  editorRef = React.createRef();

  componentDidMount() {
    // console.log(this.editorRef);
    const toolbarOptions = [
      ["bold", "bold", "italic", "underline", "strike"], // toggled buttons
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ["blockquote", "code-block"],

      // [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, false] }],

      [{ font: [] }],
      [{ align: [] }],

      ["clean"] // remove formatting button
    ];

    this.editor = new Quill(this.editorRef.current, {
      modules: {
        toolbar: toolbarOptions
      },
      theme: "snow" // Specify theme in configuration
    });

    console.log(this.props.note);
    // window.note = this.props.note;
    // window.editor = this.editor;
    // const testJson = JSON.parse(this.props.note);
    // const delta = new Delta(testJson);
    //set contents JSON
    // this.editor.setContents(delta);
    this.editor.setText(this.props.note + "\n");
  }

  getDelta = () => {
    //*Get Delta
    const delta = this.editor.getContents();

    window.delta = delta;
    //*Convert Delta to string
    const strFromDelta = JSON.stringify(delta);
    // console.log(strFromDelta);
    window.strFromDelta = strFromDelta;
    // *Convert string to Delta
    const resultDelta = new Delta(JSON.parse(strFromDelta));
    // console.log(resultDelta);
    window.resultDelta = resultDelta;
  };

  setDelta = () => {
    //*Set Delta
    this.editor.setContents(window.resultDelta);
  };

  render() {
    return (
      <>
        <div ref={this.editorRef} className="editor">
          Hello Hell
        </div>
        <button className="btn" onClick={this.getDelta}>
          Get Delta
        </button>
        <button
          style={{ backgroundColor: "red" }}
          className="btn"
          onClick={this.setDelta}
        >
          SET Delta
        </button>
      </>
    );
  }
}

export default Editor;
