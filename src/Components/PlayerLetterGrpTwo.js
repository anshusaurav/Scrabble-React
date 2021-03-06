//     const arr = ['a', 'b', 'c', 'd', 'e'];
// const indexToRemove = 2; // the 'c'
// const result = [...arr.slice(0, indexToRemove), ...arr.slice(indexToRemove + 1)];

import React from 'react'
import shortid from 'shortid'

import PlayerLetterTwo from './PlayerLetterTwo'
class PlayerLetterGrpTwo extends React.Component {
  
  render () {
    let letters = new Array(7).fill('')
    return (
      <div className="player-letter-grid">
        {letters.map((letter, index) => {
          return (
            <PlayerLetterTwo
              key={shortid.generate()}
              id={index}
              value={
                index < this.props.playerTiles.length
                  ? this.props.playerTiles[index].letter
                  : ''
              }
              isDisabled={
                index < this.props.playerTiles.length
                  ? this.props.isDisabled
                  : ''
              }
              checked={
                index < this.props.playerTiles.length
                  ?this.props.playerTiles[index].checked:''
              }
              point={
                index < this.props.playerTiles.length
                  ? this.props.letterMapPoint.get(
                      this.props.playerTiles[index].letter,
                    )
                  : ''
              }
              onPlayerLetterChange={
                index < this.props.playerTiles.length
                  ? this.props.handlePlayerLetterChange
                  : null
              }
              used={
                index < this.props.playerTiles.length? this.props.playerTiles[index].used:''
              }
            />
          )
        })}
      </div>
    )
  }
}
export default PlayerLetterGrpTwo
