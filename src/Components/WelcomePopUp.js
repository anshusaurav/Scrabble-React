import React from 'react'
import bground from './../utilities/images/scrabblewcbg.png'
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
              setTimeout(this.props.onClosePopUp, 1200); 
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
        //   let {type, msg}= this.props.popUpObj;
          return (
            
              <section id="pop-up" className={this.state.animation_name||'animate-in'}>
                <div id="innerPopUp" className={this.state.fade}>
                  
                  <div className="welcome-popup-text" style={{ backgroundImage:  "url(" + bground+")" }}>
                    <h2 className='scrabble-welcome'>
                        SCRABBLE-GO
                    </h2>
                    <div className='all-center welcome-popup-btn-div'>
                    <p className='general-btn submit-btn' onClick={this.closePopUp.bind(this)}>PLAY NOW</p>
                    </div>
                  </div>
                  
                </div>
              </section>
          );
      }
  }
  export default PopUp
