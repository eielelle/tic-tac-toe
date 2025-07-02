'use client'

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameContext";
import { Button } from "@/components/ui/button";

export default function TurnBoard() {
    const [turnClass, setTurnClass] = useState('text-green-400');
    const [text, setText] = useState('');
    const { state, dispatch } = useContext(GameContext);

    useEffect(() => {
        if (state.win == '-') {
            // set color
            if (state.turn == 'x') {
                setTurnClass('text-red-400')
            } 

            if (state.turn == 'o') {
                setTurnClass('text-amber-400')
            }
        }

        // set text
        switch (state.win) {
            case 'draw':
                setTurnClass('text-green-400')
                setText("Draw")
                break;
            case '-':
                setText(`Player ${state.turn.toUpperCase()}'s turn`)
                break;
            default:
                setText(`Player ${state.win.toUpperCase()} wins`)
                break;
        }
    }, [state])

    return <Card>
            <CardHeader className="text-center font-bold">
                <h2 className={`text-4xl ${turnClass}`}>{text}</h2>
            </CardHeader>

            <CardFooter className="gap-4 flex justify-center items-center flex-wrap">
                <Button onClick={() => dispatch({ type: 'new-game' }) }>New Game</Button>
                <Button onClick={() => dispatch({ type: 'reset' }) }>Reset Game</Button>
            </CardFooter>
        </Card>
}