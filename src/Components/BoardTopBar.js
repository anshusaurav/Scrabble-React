import React from 'react'
import shortid from 'shortid'

class BoardTopBar extends React.Component {
  render () {
    let alphas = 'ABCDEFGHIJKLMNO'
    let cells = new Array(15).fill('')
    return (
      <div className="top-bar-grid">
        {cells.map((cell, index) => {
          return (
            <div
              className="all-center"
              key={shortid.generate()}
            >
              <p>{alphas[index]}</p>
            </div>
          )
        })}
      </div>
    )
  }
}
export default BoardTopBar
