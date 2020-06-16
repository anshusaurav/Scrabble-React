import React from 'react'
import * as languageRegex from './../utilities/en-regex'
import {
  mapLetterArr,
  mapLetterPointArr,
} from './../utilities/board-init'
import PlayerControlButtons from './PlayerControlButton'
import BoardMainCell from './BoardMainCell'
import BoardSideBar from './BoardSideBar'
import BordTopBar from './BoardTopBar'
import PlayerLetterGrpOne from './PlayerLetterGrpOne'
import PlayerLetterGrpTwo from './PlayerLetterGrpTwo'

class Board extends React.Component {
  constructor(props) {
    super(props)

    let arrAllDraws = []

    let board = Array(225).fill('')
    //New word should be checked against dictionary + added words. Shoud present in dictionary and absent from addedWords
    this.state = {
      addedWords: [], // Array of string the words which have been used
      boardState: board, //15*15 array with marked letters
      letterMapCount: new Map(mapLetterArr),
      letterMapPoint: new Map(mapLetterPointArr),
      firstIsNext: true,
    }

    //letterMapCount contains letters as many times they are currently avaiable in game
    this.state.letterMapCount.forEach((value, key) => {
      for (let i = 0; i < value; i++) {
        arrAllDraws.push(key)
      }
    })
    let fPlayerTiles = [] //First player tiles
    let sPlayerTiles = [] //second player tiles
    // console.log(arrAllDraws)
    for (let i = 0; i < 7; i++) {
      let randomOne = Board.randomInteger(
        0,
        arrAllDraws.length,
      )
      // console.log(randomOne, arrAllDraws.length);
      let letterGot = arrAllDraws[randomOne]
      console.log(randomOne, letterGot, arrAllDraws.length)
      fPlayerTiles.push({letter: letterGot, checked:false})
      arrAllDraws.splice(randomOne, 1)
      let randomTwo = Board.randomInteger(
        0,
        arrAllDraws.length,
      )
      letterGot = arrAllDraws[randomTwo]
      console.log(randomTwo, letterGot, arrAllDraws.length)
      sPlayerTiles.push({letter: letterGot, checked:false})
      arrAllDraws.splice(randomTwo, 1)
    }
    this.state.fPlayerTiles = fPlayerTiles;
    this.state.sPlayerTiles = sPlayerTiles;
    this.state.currentMode = 'SelectLetterToPlace';
    this.state.selectedLetter = null;

    this.handlePlayerLetterChange = this.handlePlayerLetterChange.bind(
      this,
    )
    this.handleBoardLetterChange = this.handleBoardLetterChange.bind(
      this,
    )
    this.onPlayerDraw = this.onPlayerDraw.bind(this);
    this.onPlayerPass = this.onPlayerPass.bind(this);
    this.onPlayerSubmit = this.onPlayerSubmit.bind(this);
  }
  static randomInteger(min, max) {
    let rand = min + Math.random() * (max - min)
    return Math.floor(rand)
  }
  static checkValidAsync(word) {
    return new Promise((resolve, reject) => {
      languageRegex.test(word, (err, isWordValid) => {
        if (err) reject(err)
        return resolve(isWordValid)
      })
    })
  }
  handlePlayerLetterChange(
    lo, index,
    selectedLetterValue,
    pointOfSelectLetter,
  ) {
    // if(lo){
      console.log(lo, selectedLetterValue, pointOfSelectLetter)
      let selectedLetter = {
        value: selectedLetterValue,
        point: pointOfSelectLetter,
      }
      if(this.state.firstIsNext){
        let fPlayerTiles = this.state.fPlayerTiles;
        fPlayerTiles[index].checked = !fPlayerTiles[index].checked;
        this.setState({fPlayerTiles});
      }
      else{
        let sPlayerTiles = this.state.sPlayerTiles;
        sPlayerTiles[index].checked = !sPlayerTiles[index].checked;
        this.setState({sPlayerTiles});
      }
    //   this.setState({selectedLetter :selectedLetter});
    // }
  }
  handleBoardLetterChange(xPos, yPos) {
    console.log('dsadas', xPos, yPos)
    if (this.selectedLetter) {
      console.log(this.selectedLetter)
      var newBoard = this.state.boardState
      newBoard[xPos * 15 + yPos] = this.selectedLetter.value
      this.setState({ boardState: newBoard })
    }
  }
  onPlayerPass(){

  }

  onPlayerDraw(){

  }
  onPlayerSubmit(){

  }
  componentWillMount() { }
  componentDidMount() { }
  render() {
    console.log(this.state)

    return (
      <div className="main-container">
        <div className="game-container">
          <div className="side-bar-one">
            <BoardSideBar />
          </div>
          <div className="top-bar-one">
            <BordTopBar />
          </div>
          <div className="side-bar-two">
            <BoardSideBar />
          </div>
          <div className="top-bar-two">
            <BordTopBar />
          </div>
          <BoardMainCell
            boardState={this.state.boardState}
            letterMapPoint={this.state.letterMapPoint}
            handleBoardLetterChange={
              this.handleBoardLetterChange
            }
          />
        </div>
        <div className="controls-container">
          <div className="player-control">
            <div className="player-one-outer-div">
              <div className="player-div-one">
                <h2 className="player-control-title">
                  player I
                </h2>
                <PlayerLetterGrpOne
                  playerTiles={this.state.fPlayerTiles}
                  handlePlayerLetterChange={
                    this.handlePlayerLetterChange
                  }
                  letterMapPoint={this.state.letterMapPoint}
                />
                <PlayerControlButtons handlePlayerPass = {this.onPlayerPass} handlePlayerSubmit={this.onPlayerSubmit} handlePayerDraw = {this.onPlayerDraw}/>
              </div>
            </div>
            <div className="player-two-outer-div">
              <div className="player-div-two">
                <PlayerControlButtons handlePlayerPass = {this.onPlayerPass} handlePlayerSubmit={this.onPlayerSubmit} handlePayerDraw = {this.onPlayerDraw}/>
                <PlayerLetterGrpTwo
                  playerTiles={this.state.sPlayerTiles}
                  handlePlayerLetterChange={
                    this.handlePlayerLetterChange
                  }
                  letterMapPoint={this.state.letterMapPoint}
                />
                <h2 className="player-control-title">
                  player II
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Board
