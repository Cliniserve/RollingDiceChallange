import React, {useEffect, useState} from "react";
import {generateRandomFace} from "../App";

type DieProps = {
    n: number;
    isAnimatingRolling: boolean;
}

const Die: React.FC<DieProps> = ({n, isAnimatingRolling}: { n: number, isAnimatingRolling: boolean} ) => {
    const [animationInterval, setAnimationInterval] = useState<ReturnType<typeof setInterval> | undefined>(undefined);
    const [tempFace, setTempFace] = useState<number>(0);
    const animationStepLength = 100;

    const changeFace = () => {
        setTempFace(generateRandomFace());
    }

    useEffect(() => {
        if (isAnimatingRolling) {
            setAnimationInterval(
                setInterval(changeFace, animationStepLength)
            );
        }
        else {
            clearInterval(animationInterval);
            setAnimationInterval(undefined);
        }
    }, [isAnimatingRolling]);

    return (
        <>
            <div className={isAnimatingRolling ? `die face-${tempFace}` : `die face-${n}`}></div>
        </>
    )
}

export default Die;
