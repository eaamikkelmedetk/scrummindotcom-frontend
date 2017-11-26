import React, { Component } from "react";
import Board from "./Components/Board/Board/Board.jsx";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

class App extends Component {
  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
