import React from "react";

function Die(props){

    const styles = {
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