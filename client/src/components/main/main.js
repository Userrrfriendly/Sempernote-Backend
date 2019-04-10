import React, { Component } from "react";

import "./main.css";
import * as data from "../../data";
import NotePreview from "./notePreview";
// const test = [
//   "fsdfsdfs fsd sdf sdf ",
//   () => (
//     <>
//       <strong>
//         <em>I am StronG! </em>
//       </strong>
//       <ul>
//         <li>I</li>
//         <li>II</li>
//         <li>III</li>
//       </ul>
//     </>
//   ),
//   " i am not strong. ",
//   "https://dev.to/donghyukjacobjang/how-to-prevent-xss-attacks-when-using-dangerouslysetinnerhtml-in-react-1464"
// ];
class Main extends Component {
  render() {
    return (
      <main className="main-section l10">
        {/* {test.map(item => (typeof item === "string" ? item : item()))} */}
        {data.notes.map(note => {
          return (
            <NotePreview
              key={note.id}
              name={note.name}
              updated={note.updated}
              body={note.body}
            />
          );
        })}
      </main>
    );
  }
}

export default Main;
