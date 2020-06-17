import React from 'react'
class PlayerDetails extends React.Component{    
    render(){
        return (
            <h2 className="player-control-title">
            {this.props.player.name + ' : '+ this.props.player.score}
          </h2>
        )
    }
}
export default PlayerDetails