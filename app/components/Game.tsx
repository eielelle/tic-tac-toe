'use client'

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function Game() {
    const { state, dispatch } = useContext(GameContext);

    function placeMark(idx: number) {
        dispatch({ type: 'place', payload: idx });
    }

    return <Card className="grid grid-cols-3 grid-rows-3 bg-white row-span-2 p-4">
        {state.game.map((val: string, idx: number) => (
            <Card key={idx} className="flex justify-center items-center bg-slate-300" onClick={() => placeMark(idx)}>
                { (val == 'x' || val == 'o') && <Image className="w-full aspect-square" width={100} height={100} src={`/images/${val}.png`} alt="plate" /> }
            </Card>
        ))}
    </Card>
}