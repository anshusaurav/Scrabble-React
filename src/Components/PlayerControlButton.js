import React from 'react'

class PlayerControlButtons extends React.Component {
  constructor (props) {
    super(props)
    this.handlePass = this.handlePass.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDraw = this.handleDraw.bind(this)
  }
  handlePass (e) {
    this.props.handlePlayerPass()
  }
  handleSubmit (e) {
    this.props.handlePlayerSubmit()
  }
  handleDraw (e) {
    this.props.handlePlayerDraw()
  }
  render () {
    return (
      <div className="player-control-button">
        <div className="all-center">
          <button
            className="pass-btn general-btn"
            onClick={this.handlePass}
          >
            Pass
          </button>
        </div>
        <div className="all-center">
          <button
            className="submit-btn general-btn"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="all-center">
          <button
            className="draw-btn general-btn"
            onClick={this.handle}
          >
            Draw
          </button>
        </div>
      </div>
    )
  }
}
export default PlayerControlButtons
