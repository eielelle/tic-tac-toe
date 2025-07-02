'use client'

import { createContext, ReactNode, useReducer } from "react";
import { toast } from "sonner";

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

type GameState = {
    game: string[];
    turn: string;
    score: {
        x: number;
        o: number;
        draw: number;
    };
    win: string;
}

type Action =
  | { type: 'place'; payload: number }
  | { type: 'new-game' }
  | { type: 'reset' };

type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<Action>;
};

const checkWin = (game: string[]): string => {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (
      game[a] &&
      game[a] === game[b] &&
      game[a] === game[c]
    ) {
      return game[a];
    }
  }

  if (!game.includes("")) return 'draw'

  return '-';
}

const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'place':
      if (state.win === '-') {
        const newGame = [...state.game];
        newGame[action.payload] = state.turn;

        const newState = { ...state, turn: state.turn === 'x' ? 'o' : 'x', game: newGame };

        // Check game status
        const winner = checkWin(newGame);

        // Show toast
        if (winner !== '-') {
          toast(`${winner !== 'draw' ? `Player ${winner.toUpperCase()} wins` : winner.toUpperCase()}`);
        }

        // Update score based on winner
        if (winner === 'x') {
          return { ...newState, score: { ...newState.score, x: newState.score.x + 1 }, win: winner };
        }

        if (winner === 'o') {
          return { ...newState, score: { ...newState.score, o: newState.score.o + 1 }, win: winner };
        }

        if (winner === 'draw') {
          return { ...newState, score: { ...newState.score, draw: newState.score.draw + 1 }, win: winner };
        }

        return newState;
      }

      return state;

    case 'new-game':
      return {
        ...state,
        game: ["", "", "", "", "", "", "", "", ""], // Reset game board
        turn: 'x',
        win: '-'
      };

    case 'reset':
      return {
        ...state,
        score: { x: 0, o: 0, draw: 0 },
        game: ["", "", "", "", "", "", "", "", ""], // Reset board
        turn: 'x',
        win: '-'
      };

    default:
      return state;
  }
};

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameProvider = ({children} : {children: ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, {
        game: ["", "", "", "", "", "", "", "", ""],
        turn: 'x',
        score: {
            x: 0,
            o: 0,
            draw: 0
        },
        win: '-'
    });

    return <GameContext.Provider value={{state, dispatch}}>
        { children }
    </GameContext.Provider>
}