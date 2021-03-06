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
          <button disabled={this.props.isDisabled}
            className="pass-btn general-btn"
            onClick={this.handlePass}
          >
            PASS
          </button>
        </div>
        <div className="all-center">
          <button disabled={this.props.isDisabled}
            className="submit-btn general-btn"
            onClick={this.handleSubmit}
          >
            SUBMIT
          </button>
        </div>
        <div className="all-center">
          <button disabled={this.props.isDisabled}
            className="general-btn"
            onClick={this.handleDraw}
          >
            DRAW
          </button>
        </div>
      </div>
    )
  }
}
export default PlayerControlButtons
