//for (let i = 0; i < 7; i++) {
//   playerOneLetters.push(
//     <PlayerLetter
//       key={shortid.generate()}
//       id={shortid.generate()}
//       value={this.state.fPlayerTiles[i]}
//       point={this.state.letterMapPoint.get(
//         this.state.fPlayerTiles[i],
//       )}
//       onPlayerLetterChange = {this.handlePlayerLetterChange}
//     />,
//   )
// }
//     const arr = ['a', 'b', 'c', 'd', 'e'];

// const indexToRemove = 2; // the 'c'

// const result = [...arr.slice(0, indexToRemove), ...arr.slice(indexToRemove + 1)];

import React from 'react'
import shortid from 'shortid'

import PlayerLetter from './PlayerLetter'
class PlayerLetterGrp extends React.Component {
  constructor (props) {
    super(props)
    // this.handlePlayerLetterChange= this.handlePlayerLetterChange.bind(this);
  }

  render () {
    let letters = new Array(7).fill('')
    return (
      <div className="player-letter-grid">
        {letters.map((letter, index) => {
          return (
            <PlayerLetter
              key={shortid.generate()}
              id={shortid.generate()}
              value={
                index < this.props.playerTiles.length
                  ? this.props.playerTiles[index]
                  : ''
              }
              point={
                index < this.props.playerTiles.length
                  ? this.props.letterMapPoint.get(
                      this.props.playerTiles[index],
                    )
                  : ''
              }
              onPlayerLetterChange={
                index < this.props.playerTiles.length
                  ? this.props.handlePlayerLetterChange
                  : null
              }
            />
          )
        })}
      </div>
    )
  }
}
export default PlayerLetterGrp
