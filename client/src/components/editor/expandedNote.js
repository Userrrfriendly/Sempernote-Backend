import React, { Component } from "react";
import Quill from "quill";
import Delta from "quill-delta";
import "./quillSnow.css";

class ExpandedNote extends Component {
  editorRef = React.createRef();

  state = {
    body: new Delta(JSON.parse(this.props.note))
  };

  componentDidMount() {
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
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

    // const noteBody = new Delta(JSON.parse(this.props.note));

    this.editor.setContents(this.state.body);
  }

  componentDidUpdate() {
    // const noteBody = new Delta(JSON.parse(this.props.note));
    // this.editor.setContents(noteBody);
    console.log("EDITO UPDATED");
  }
  /*
  getDelta & setDelta ARE USED ONLY IN DEBUGGING
  
  getDelta = () => {
    //*Get Delta from editor
    const delta = this.editor.getContents();

    window.delta = delta;
    //*Convert Delta to string
    const strFromDelta = JSON.stringify(delta);
    //to get the string from delta to insert it in mongo as default note use console.log(JSON.stringify(strFromDelta))
    window.strFromDelta = strFromDelta;
    // *Convert string to Delta
    const noteBody = new Delta(JSON.parse(strFromDelta));
    // console.log(noteBody);
    window.noteBody = noteBody;
  };

  setDelta = () => {
    //*Set Delta
    this.editor.setContents(window.noteBody);
  };
*/
  render() {
    return (
      <div className="editor-container">
        <div ref={this.editorRef} className="editor">
          Hello Hell
        </div>
        {/* THE BUTTONS ARE USED ONLY IN DEBUGGING 
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
        */}
      </div>
    );
  }
}

export default ExpandedNote;
