import Header from "./components/Header";
import Game from "./components/Game";
import ScoreBoard from "./components/ScoreBoard";
import TurnBoard from "./components/TurnBoard";
import { GameProvider } from "./context/GameContext";

export default function Home() {
  return (
    <GameProvider>
      <main className="w-screen h-screen bg-slate-800">
        <Header />

        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-[800px] mx-auto">
          <Game />
          <ScoreBoard />
          <TurnBoard />
        </div>
      </main>
    </GameProvider>
  );
}
