import React from 'react'
import Cell from './Cell'
import shortid from 'shortid'
import findColor from '../utilities/marker-position'
import * as languageRegex from './../utilities/en-regex'
import {
  mapLetterArr,
  mapLetterPointArr,
} from './../utilities/board-init'
import PlayerLetter from './PlayerLetter'
import PlayerControlButtons from './PlayerControlButton'

class Board extends React.Component {
  constructor (props) {
    super(props)

    let arrAllDraws = []

    let board = [
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
    ]
    // console.log(mapLetterArr);
    // console.log(mapLetterPointArr);
    //New word should be checked against dictionary + added words. Shoud present in dictionary and absent from addedWords
    this.state = {
      addedWords: [], // Array of string the words which have been used
      boardState: board, //15*15 array with marked letters
      letterMapCount: new Map(mapLetterArr),
      letterMapPoint: new Map(mapLetterPointArr),
    }
    // let sumLetters = 0,
    //   sumPoints = 0
    //letterMapCount contains letters as many times they are currently avaiable in game
    this.state.letterMapCount.forEach((value, key) => {
      for (let i = 0; i < value; i++) {
        arrAllDraws.push(key)
      }
      // sumLetters += value
      // sumPoints +=
      //   this.state.letterMapPoint.get(key) * value;
    })
    let fPlayerTiles = []
    let sPlayerTiles = []
    console.log(arrAllDraws)
    for (let i = 0; i < 7; i++) {
      let randomOne = Board.randomInteger(
        0,
        arrAllDraws.length,
      )
      let letterGot = arrAllDraws[randomOne]
      fPlayerTiles.push(letterGot)
      arrAllDraws.splice(randomOne, 1)
      let randomTwo = Board.randomInteger(
        0,
        arrAllDraws.length,
      )
      letterGot = arrAllDraws[randomTwo]
      sPlayerTiles.push(letterGot)
      arrAllDraws.splice(randomTwo, 1)
    }
    this.state.fPlayerTiles = fPlayerTiles
    this.state.sPlayerTiles = sPlayerTiles
    this.state.currentMode = 'SelectLetterToPlace';
    this.state.selectedLetter = null;
    
    this.handlePlayerLetterChange = this.handlePlayerLetterChange.bind(this);
    this.handleBoardLetterChange = this.handleBoardLetterChange.bind(this);
  }
  static randomInteger (min, max) {
    // now rand is from  (min-0.5) to (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    return Math.round(rand)
  }
  static checkValidAsync(word) {
    return new Promise((resolve, reject) => {
      languageRegex.test(word, (err, isWordValid) => {
          console.log('HERe', isWordValid);
          if (err) reject(err);
          return resolve(isWordValid);
        })
    });
  }
  handlePlayerLetterChange(lo, selectedLetterValue, pointOfSelectLetter){
    let selectedLetter = {value: selectedLetterValue, point:pointOfSelectLetter};
    this.selectedLetter = selectedLetter;
  }
  handleBoardLetterChange(xPos, yPos) {
    console.log(xPos, yPos);
    if(this.selectedLetter){
      console.log(this.selectedLetter);
      var newBoard = this.state.boardState;
      newBoard[xPos][yPos] = this.selectedLetter.value;
      this.setState({boardState:newBoard});
    }
  }
  componentDidMount(){
    
    let result = Board.checkValidAsync('dog').then(results => {
      console.log(results);
    }).catch(err => console.error(err));

    
  }
  render () {
    // console.log(check('wordf'), 'wordf');
    // console.log(check('word'), 'word');
   
    console.log(this.state);
    let cells = [],
      alphaCells = [],
      numCells = [],
      playerOneLetters = [],
      playerTwoLetters = []
    let alphas = 'ABCDEFGHIJKLMNO'
    for (let i = 0; i < 15; i++)
      for (let j = 0; j < 15; j++) {
        cells.push(
          <Cell
            key={shortid.generate()}
            bgTag={findColor(i, j)}
            value={this.state.boardState[i][j]}
            point={ 
              this.state.boardState[i][j] &&
              this.state.letterMapPoint.get(
                this.state.boardState[i][j],
              )
            }
            xPos = {i}
            yPos = {j}
            onBoardLetterChange = {this.handleBoardLetterChange}
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
    for (let i = 0; i < 7; i++) {
      playerOneLetters.push(
        <PlayerLetter
          key={shortid.generate()}
          id={shortid.generate()}
          value={this.state.fPlayerTiles[i]}
          point={this.state.letterMapPoint.get(
            this.state.fPlayerTiles[i],
          )}
          onPlayerLetterChange = {this.handlePlayerLetterChange}
        />,
      )
    }
    for (let i = 0; i < 7; i++) {
      playerTwoLetters.push(
        <PlayerLetter
          key={shortid.generate()}
          id={shortid.generate()}
          value={this.state.sPlayerTiles[i]}
          point={this.state.letterMapPoint.get(
            this.state.sPlayerTiles[i],
          )}
          onPlayerLetterChange = {this.handlePlayerLetterChange}
        />,
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
        <div className="controls-container">
          <div className="player-control">
            <div className="player-one-outer-div">
              <div className="player-div-one">
              <h2 className='player-control-title'>player I</h2>
                <div className="player-letter-grid">
                  {playerOneLetters }
                </div>
                <PlayerControlButtons/>
              </div>
            </div>
            <div className="player-two-outer-div">
              <div className="player-div-two">
                <PlayerControlButtons/>
                <div className="player-letter-grid">
                  {playerTwoLetters}
                </div>
                <h2 className='player-control-title'>player II</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Board
