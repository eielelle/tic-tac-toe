'use client'

import { Card } from "@/components/ui/card";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function ScoreBoard() {
    const { state } = useContext(GameContext);
    
    return <Card className="p-4 text-center">
        <h2 className="text-3xl font-bold">Score Board</h2>

        <div className="grid grid-cols-3 gap-4">
            <Card className="bg-red-400">
                <h3 className="font-semibold">Player X</h3>
                <p>{state.score.x}</p>
            </Card>
            <Card className="bg-green-400">
                <h3 className="font-semibold">Draw</h3>
                <p>{state.score.draw}</p>
            </Card>
            <Card className="bg-amber-400">
                <h3 className="font-semibold">Player O</h3>
                <p>{state.score.o}</p>
            </Card>
        </div>
    </Card>
}