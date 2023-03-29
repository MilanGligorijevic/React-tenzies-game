import React from "react"
import Die from "./Die.js"
import {nanoid} from "nanoid"


function App() {
  
  let numberOfDiceComponents = 10;

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [clicks, setClicks] = React.useState(0);
  
  
  React.useEffect(() =>
    {
      const allHeld = dice.every(die => die.isHeld);
      const firstValue = dice[0].value;
      const allSameValue = dice.every(die => die.value === firstValue);
      if(allHeld && allSameValue){
        setTenzies(true);
      }

    }, [dice]);

  function allNewDice(){
    const diceArray = [];
    for(let i=0; i<numberOfDiceComponents; i++){
      diceArray.push(createNewDie());
    }
    return diceArray;
  }
  
  
  function createNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function holdDice(id){
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} : die;
    }))
  }
  
  const diceElements = dice.map(die => 
      <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)} 
      />
    )
  
  const letterElements = dice.map((die, index) => 
      <Die 
      key={die.id} 
      value={getLetter(index)} 
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)} 
      />
    )

  function getLetter(index){
    const letterArray = ["Y", "O", "U", "", "", "", "", "W", "I", "N"];
    return letterArray[index];
  }

  function handleRollClick(){
    if(!tenzies){
      setClicks(prevClicks => prevClicks = prevClicks + 1);
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : createNewDie();
      }));
    }else{
      setTenzies(false);
      setDice(allNewDice);
      setClicks(0);
    }
  }

  function decideColor(){
    if(clicks <= 7) return "#59E391";
    if(clicks > 7 && clicks <= 13) return "yellow";
    if(clicks > 13) return "red";

  }

  const styles = {
    backgroundColor: decideColor()
  }

  return (
    <main>
      <h1>Tenzies</h1>
      <h2 style={styles}>Number of rolls: {clicks}</h2>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value betweeen rolls.</p>
      <div className="dice-container">
        {!tenzies ? diceElements : letterElements}
      </div>
      <button className="roll-button" onClick={handleRollClick}>{tenzies ? "Play again" : "Roll"}</button>
    </main>
  )
  
}

export default App;
