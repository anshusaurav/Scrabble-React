import React from 'react'
import bground from './../utilities/images/game-name.jpg'
class PopUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      animation_name: '',
      depth: '',
      fade: '',
    }
    this.changeFirstPlayerName = this.changeFirstPlayerName.bind(
      this,
    )
    this.changeSecondPlayerName = this.changeSecondPlayerName.bind(
      this,
    )
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

    //
  }
  openPopUp () {
    this.setState({animation_name: 'animate-in'})
    this.setState({depth: 'below'})
    this.setState({fade: 'fade-in'})
  }
  changeFirstPlayerName (event) {
    this.props.onChangeFirst(event.target.value.trim())
  }

  changeSecondPlayerName (event) {
    this.props.onChangeSecond(event.target.value.trim());
  }
  render () {
    //   let {type, msg}= this.props.popUpObj;
    return (
      <section
        id="pop-up"
        className={
          this.state.animation_name || 'animate-in'
        }
      >
        <div id="innerPopUp" className={this.state.fade}>
          <div
            className="welcome-name-text"
            style={{
              backgroundImage: 'url(' + bground + ')',
            }}
          >
            <div className="name-popup-field-div">
                <div class='input-group'>
                        <input
                        type="text"
                        value={this.props.nameOne}
                        onChange={this.changeFirstPlayerName}
                        maxLength={8}
                        required
                    
                    />
                </div>
             <div class='input-group'>
              <input
                type="text"
                value={this.props.nameTwo}
                onChange={this.changeSecondPlayerName}
                maxLength={8}
                required
              />
              </div>
              
            </div>
            <div className='all-center'>
            <p
                className="general-btn submit-btn"
                onClick={this.closePopUp.bind(this)}
              >
                START
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default PopUp
