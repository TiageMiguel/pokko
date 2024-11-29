import { useGameStore } from "@/stores/game-store";

const GameControls = () => {
  const { playGame, handleBet, userHandNewCards } = useGameStore();

  return (
    <div className="grid place-items min-h-32">
      <div className="flex flex-row gap-4 items-center justify-center">
        <button onClick={() => handleBet(1)}>BET</button>
        <button onClick={playGame}>
          {userHandNewCards.length > 0 ? "PLAY ROUND" : "HOLD HAND"}
        </button>
      </div>
    </div>
  );
};

export default GameControls;
