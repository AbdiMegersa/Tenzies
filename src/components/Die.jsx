import React from 'react';

function Die(props){

    const style = {
        backgroundColor: props.isHeld ? "#59E391" : 'white'
    }

    return(
        <div 
            onClick={props.holdDice}
            className="die-face"
            style={style}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}

export default Die;