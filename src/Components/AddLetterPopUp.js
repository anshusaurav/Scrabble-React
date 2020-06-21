import React from 'react'
// import correct from './../utilities/images/tick.png'
// import wrong from './../utilities/images/cancel.png'
class AddLetterPopUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            animation_name : '',
            depth: '',
            fade: '', 
            alphabets: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          };
          
    }
    closePopUp(){
        this.setState({animation_name: 'animate-out'});
        this.setState({depth:'above'});
        this.setState({fade:'fade-out'});
        //  this.props.onClosePopUp();
      }
      openPopUp(){
        this.setState({animation_name: 'animate-in'});
        this.setState({depth:'below'});
        this.setState({fade:'fade-in'});
      }
  
      render(){
          // let {type, msg}= this.props.popUpObj;
          return (
            
              <section id="pop-up" className={this.state.animation_name||'animate-in'}>
                <div id="innerPopUp" className={this.state.fade}>
                  
                  <div className="special-letter-text">
                  
                    <p className='all-center s-special-letter'>Select one letter</p>
                    <div className='add-special-letter-grid'>
                        {
                          this.state.alphabets.split('').map(sLetter =>{
                          return (
                            <div className='add-special-letter-div'>
                              <input type='checkbox' id={'special-add-' + sLetter}/>
                              <label htmlFor={'special-add-'+sLetter} className='special-add-label'>
                                <p className='letter-special-single'>{sLetter}</p>
                              </label>
                            </div>
                          )
                          })
                        }
                    </div>
                    <div className='all-center'>
                    <p className='general-btn submit-btn' onClick={this.closePopUp.bind(this)}>OK</p>
                    </div>
                  </div>
                  
                </div>
              </section>
          );
      }
  }
  export default AddLetterPopUp
