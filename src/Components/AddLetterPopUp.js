import React from 'react'
// import correct from './../utilities/images/tick.png'
// import wrong from './../utilities/images/cancel.png'
class AddLetterPopUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      animation_name: '',
      depth: '',
      fade: '',
      alphabets: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      selectedLetter: 'A',
    }
  }
  closePopUp () {
    this.setState(
      {animation_name: 'animate-out'},
      function () {
        this.setState({depth: 'above'}, function () {
          this.setState({fade: 'fade-out'}, function () {
            setTimeout(this.props.onClosePopUp, 1500)
          })
        })
      },
    )
    //  this.props.onClosePopUp();
  }
  openPopUp () {
    this.setState({animation_name: 'animate-in'})
    this.setState({depth: 'below'})
    this.setState({fade: 'fade-in'})
  }
  applyPopUp () {
    this.props.onSpecialLetter(this.state.selectedLetter);
  }
  onChange (e) {
    let nameLetter = e.target.value
    console.log(nameLetter)
    const letterValue = nameLetter.slice(4, 5)
    this.setState({selectedLetter: letterValue})
  }
  render () {
    // let {type, msg}= this.props.popUpObj;
    return (
      <section
        id="pop-up"
        className={
          this.state.animation_name || 'animate-in'
        }
      >
        <div id="innerPopUp" className={this.state.fade}>
          <div className="special-letter-text">
            <p className="all-center s-special-letter">
              Select one letter
            </p>
            <div className="add-special-letter-grid">
              {this.state.alphabets
                .split('')
                .map(sLetter => {
                  return (
                    <div className="add-special-letter-div">
                      <input
                        type="radio"
                        name="letter-sp-option"
                        id={'special-add-' + sLetter}
                        checked={
                          sLetter ===
                          this.state.selectedLetter
                        }
                        value={'name' + sLetter}
                        onChange={this.onChange.bind(this)}
                      />
                      <label
                        htmlFor={'special-add-' + sLetter}
                        className="special-add-label"
                      >
                        <p className="letter-special-single">
                          {sLetter}
                        </p>
                      </label>
                    </div>
                  )
                })}
            </div>
            <div className="special-letter-warning all-center">
              <p>
                *You wont be able to change assigned letter
                in subsequest moves.
              </p>
            </div>
            <div className="all-center">
              <button
                className="general-btn apply-btn"
                onClick={this.applyPopUp.bind(this)}
              >
                APPLY
              </button>
              <button
                className="general-btn pass-btn"
                onClick={this.closePopUp.bind(this)}
              >
                EXIT
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default AddLetterPopUp
