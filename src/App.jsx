import { useState, useEffect } from 'react'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect( () => {
    // code to check if game won
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allHaveSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allHaveSameValue){
      setTenzies(true);
      console.log('You won!');
    }
  }
  , [dice]);


  function allNewDice(){
    const newDice = []
    for(let i=0; i<10; i++){
      newDice.push(rollDie())
    }
    return newDice;
  }
  
  function rollDie(){
    const newDie = {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
    return newDie
  }

  function rollDice(){
    if (tenzies){
      setTenzies(false)
      setDice(allNewDice())
    } else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : rollDie() 
      }))
  }
  }

  function holdDice(id){

    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
    
  }

  const diceElements = dice.map(die => 
    <Die isHeld={die.isHeld} 
         value={die.value} 
         key={die.id}
         holdDice={()=>holdDice(die.id)}
    />)

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
        <button 
          onClick={rollDice}
          className="dice-reroll"
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
    </main>
  )
}

export default App
