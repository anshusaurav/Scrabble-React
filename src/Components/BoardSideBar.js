import React from 'react'
import shortid from 'shortid'

class BoardSideBar extends React.Component {
  render () {
    let cells = new Array(15).fill('')
    return (
      <div className="side-bar-grid">
        {cells.map((cell, index) => {
          return (
            <div
              className="all-center"
              key={shortid.generate()}
            >
              <p>{index + 1}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default BoardSideBar
