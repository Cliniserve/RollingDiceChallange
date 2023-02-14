import React, {useState} from 'react';
import './App.css';
import Form from "./components/Form";
import Die from "./components/Die";

export const generateRandomFace = () => {
    return Math.floor(Math.random() * 6) + 1;
}

const App: React.FC = () => {
    const [diceList, setDiceList] = useState<Array<number>>([]);
    const [prevDiceListQueue, setPrevDiceListQueue] = useState<Array<Array<number>>>([]);
    const [isAnimatingRolling, setIsAnimatingRolling] = useState<boolean>(false);
    const animationLength = 2000;
    const historyLength = 10;

    const rollDice = (n: number) => {
        const newDiceList = new Array(n).fill(0).map(generateRandomFace);

        if (diceList) {
            setPrevDiceListQueue([diceList, ...prevDiceListQueue].slice(0, historyLength));
        }

        setDiceList(newDiceList);
        setIsAnimatingRolling(true);

        setTimeout(() => {
            setIsAnimatingRolling(false);
        }, animationLength);
    }

    return (
        <div className="App">
            <div className="container">
                <h2>Number of dice</h2>
                <Form onRoll={rollDice}/>
                <div className="dice-wrapper">
                    {diceList.map((n, index) => {
                        return (
                            <Die key={index} n={n} isAnimatingRolling={isAnimatingRolling} />
                        )
                    })}
                </div>
                <div className="previous-rolls-wrapper">
                    <h3>Previous rolls</h3>
                    <div className="previous-rolls-list">
                        {prevDiceListQueue.map((prevDiceList, index) => {
                            return (
                                <div key={index} className="previous-rolls">
                                    {prevDiceList.map((n, index) => {
                                        return (
                                            <Die key={index} n={n} isAnimatingRolling={false} />
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
