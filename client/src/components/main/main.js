import React, { Component } from "react";

import "./main.css";
// import * as data from "../../data";
import NotePreview from "./notePreview";
import Context from "../../context/context";

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
  static contextType = Context;

  componentDidUpdate() {
    console.log("this is from the main");
    console.log(this.context.globalState);
  }

  render() {
    // const renderNotes = () => {
    //   this.context.globalState.userNotes.map(note => {
    //     return (
    //       <NotePreview
    //         key={note._id}
    //         name={note.title}
    //         updated={note.updatedAt}
    //         body={note.body}
    //       />
    //     );
    //   });

    //   let data;

    //   if (this.context.globalState) {
    //     data = this.context.globalState.userNotes;
    //     console.log(data);
    //     data.map(note => {
    //       return (
    //         <NotePreview
    //           key={note._id}
    //           name={note.title}
    //           updated={note.updatedAt}
    //           body={note.body}
    //         />
    //       );
    //     });
    //   } else {
    //     return <p>No Data yet</p>;
    //   }
    // };

    const renderNotes = this.context.globalState
      ? this.context.globalState.userNotes.map(note => {
          return (
            <NotePreview
              key={note._id}
              name={note.title}
              updated={note.updatedAt}
              body={note.body}
            />
          );
        })
      : "no notes yet";
    // const test = data.notes.map(note => {
    //   return (
    //     <NotePreview
    //       key={note.id}
    //       name={note.name}
    //       updated={note.updated}
    //       body={note.body}
    //     />
    //   );
    // });

    return (
      <main className="main-section l10">
        {renderNotes}

        {/*OLD TESTING LEAVE IT FOR NOW {test.map(item => (typeof item === "string" ? item : item()))} */}

        {/* {data.notes.map(note => {
          return (
            <NotePreview
              key={note.id}
              name={note.name}
              updated={note.updated}
              body={note.body}
            />
          );
        })} */}
      </main>
    );
  }
}

export default Main;
