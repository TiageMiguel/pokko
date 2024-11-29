import { useGameState } from "@/hooks/use-game-state";
import { GameCard } from "./card";

const BotHand = () => {
  const { botHand } = useGameState();

  return (
    <div className="grid flex-1 grid-cols-5 gap-2">
      {botHand.map((card, idx) => (
        <GameCard key={idx} variant={card} state="inactive" />
      ))}
    </div>
  );
};

export default BotHand;
