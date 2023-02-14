import React, { ChangeEvent, useState } from 'react';

type Props = {
    onRoll: (n: number) => void
}

const Form: React.FC<Props> = ({ onRoll }: Props) => {
    const [minDiceNumber, maxDiceNumber] = [1, 99];
    const [diceNumber, setDiceNumber] = useState<number>(1);

    const onDiceNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        let number = +e.target.value;
        number = Math.max(Math.min(number, maxDiceNumber), minDiceNumber);
        setDiceNumber(number);
    }

    return (
        <>
            <input
                type="number"
                min={minDiceNumber}
                max={maxDiceNumber}
                value={diceNumber.toString()}
                onChange={onDiceNumberChange}
            />
            <button onClick={(e) => onRoll(diceNumber)}>Roll</button>
        </>
    )
}

export default Form;
