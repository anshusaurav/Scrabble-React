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
      ['E', 2],
      ['F', 2],
      ['G', 2],
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
    this.state = {
      addedWords: [],
      boardState: [],
      letterMap: new Map(mapLetterArr),
    };

    // console.log(this.state.letterMap);
  }
  static check(word) {
    return languageRegex.test(word);
  }
  render () {
    console.log(Board.check('dog'));
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
