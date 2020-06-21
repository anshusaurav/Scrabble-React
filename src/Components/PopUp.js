import React from 'react'
import correct from './../utilities/images/tick.png'
import wrong from './../utilities/images/cancel.png'
class PopUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            animation_name : '',
            depth: '',
            fade: ''
          };
          
    }
    closePopUp(){
        this.setState({animation_name: 'animate-out'},function(){
          this.setState({depth:'above'}, function(){
            this.setState({fade:'fade-out'}, function(){
              setTimeout(this.props.onClosePopUp, 1500); 
            })
          })
        });
        
        //  
      }
      openPopUp(){
        this.setState({animation_name: 'animate-in'});
        this.setState({depth:'below'});
        this.setState({fade:'fade-in'});
      }
  
      render(){
          let {type, msg}= this.props.popUpObj;
          return (
            
              <section id="pop-up" className={this.state.animation_name||'animate-in'}>
                <div id="innerPopUp" className={this.state.fade}>
                  
                  <div className="text">
                  <div className='img-popup'>
                      <img src={type==='Success'?correct:wrong} alt='Msg'></img>
                    </div>
                    <p>{msg}</p>
                    
                    <div className='all-center'>
                    <p className='general-btn submit-btn' onClick={this.closePopUp.bind(this)}>OK</p>
                    </div>
                  </div>
                  
                </div>
              </section>
          );
      }
  }
  export default PopUp
