import React from 'react'
import Cell from './Cell'
import shortid from 'shortid'
import findColor from './../utilities/markerPosition'
import * as languageRegex from './../utilities/en-regex'
class Board extends React.Component {
  constructor (props) {
    super(props)
    let mapLetterArr = [
      ['A', 9],
      ['B', 2],
      ['C', 2],
      ['D', 4],
      ['E', 12],
      ['F', 2],
      ['G', 3],
      ['H', 2],
      ['I', 9],
      ['J', 1],
      ['K', 1],
      ['L', 4],
      ['M', 2],
      ['N', 6],
      ['O', 8],
      ['P', 2],
      ['Q', 1],
      ['R', 6],
      ['S', 4],
      ['T', 6],
      ['U', 4],
      ['V', 2],
      ['W', 2],
      ['X', 1],
      ['Y', 2],
      ['Z', 1],
      [' ', 2],
    ];
    let mapLetterPointArr =[
      ['A', 1],
      ['B', 3],
      ['C', 3],
      ['D', 2],
      ['E', 1],
      ['F', 4],
      ['G', 2],
      ['H', 4],
      ['I', 1],
      ['J', 8],
      ['K', 5],
      ['L', 1],
      ['M', 3],
      ['N', 1],
      ['O', 1],
      ['P', 3],
      ['Q', 10],
      ['R', 1],
      ['S', 1],
      ['T', 1],
      ['U', 1],
      ['V', 4],
      ['W', 4],
      ['X', 8],
      ['Y', 4],
      ['Z', 10],
      [' ', 2],
    ];
    let board = [
      ["","","","","","","","","","","","","","","","","",],
      ["","","","","","","","","","","","","","","","","",],
      ["","","","","","","","","H","","","","","","","","",],
      ["","","","","","","","","O","W","N","A","G","E","","","",],
      ["","","","","","","","","P","","","","","","","","",],
      ["","","","","","","","","E","X","P","E","N","S","E","","",],
      ["","","","","","","","","","","","","","","","","",],
      ["","","","","","","","","","","","","","","","","",],
      ["","","","","","","","","","","","","","","","","",],
      ["","","","","","","","","","","","","","","","","",],
      ["","","","","","","","","","","","","","","","","",],
      ["","","","","","","","","","","","","","","","","",],
      ["","","","","","","","","","","","","","","","","",],
      ["","","","","","","","","","","","","","","","","",],
      ["","","","","","","","","","","","","","","","","",]
    ];
    //New word should be checked against dictionary + added words. Shoud present in dictionary and absent from addedWords
    this.state = {
      addedWords: [], // Array of string the words which have been used
      boardState: board, //15*15 array with marked letters
      letterMapCount: new Map(mapLetterArr),
      letterMapPoint: new Map(mapLetterPointArr)
    }

    // console.log(this.state.letterMap);
  }
  static check (word) {
    return languageRegex.test(word)
  }
  render () {
    console.log(Board.check('dog'))
    let cells = [],
      alphaCells = [],
      numCells = []
    let alphas = 'ABCDEFGHIJKLMNO'
    for (let i = 0; i < 15; i++)
      for (let j = 0; j < 15; j++) {
        cells.push(
          <Cell
            key={shortid.generate()}
            bgTag={findColor(i, j)}
            value={this.state.boardState[i][j]}
            point={this.state.boardState[i][j] && this.state.letterMapPoint.get(this.state.boardState[i][j])}
          />,
        )
      }

    for (let i = 0; i < 15; i++) {
      alphaCells.push(
        <div
          className="all-center"
          key={shortid.generate()}
        >
          <p>{alphas[i]}</p>
        </div>,
      )
    }

    for (let i = 0; i < 15; i++) {
      numCells.push(
        <div
          className="all-center"
          key={shortid.generate()}
        >
          <p>{i + 1}</p>
        </div>,
      )
    }

    return (
      <div className="main-container">
        <div className="game-container">
          <div className="side-bar-one">
            <div className="side-bar-grid">{numCells}</div>
          </div>
          <div className="top-bar-one">
            <div className="top-bar-grid">{alphaCells}</div>
          </div>
          <div className="side-bar-two">
            <div className="side-bar-grid">{numCells}</div>
          </div>
          <div className="top-bar-two">
            <div className="top-bar-grid">{alphaCells}</div>
          </div>
          <div className="board">{cells}</div>
        </div>
      </div>
    )
  }
}
export default Board
