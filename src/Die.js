import React from "react";

function Die(props){

    let dieColor = "#F5F5F5";
    
    if(props.isHeld) {
        dieColor = "#04AA6D";
    }
    
    const styles = {
        backgroundColor: dieColor,
    }

    return (
        <div 
            className="die-square"
            style={styles}
            onClick={props.holdDice}
        >
            <h2>{props.value}</h2>
        </div>
    )
}

export default Die;