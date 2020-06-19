import React from 'react'
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
        this.setState({animation_name: 'animate-out'});
        this.setState({depth:'above'});
         this.setState({fade:'fade-out'});
         this.props.onClosePopUp();
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
                    <h1>{type}</h1>
                    <p className="close" onClick={this.closePopUp.bind(this)}>X</p>
                    <p>{msg}</p>
                  </div>
                  
                </div>
              </section>
          );
      }
  }
  export default PopUp
