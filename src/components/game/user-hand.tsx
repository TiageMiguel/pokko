import { useGameLogic } from "@/hooks/use-game-state";
import { GameCard } from "./GameCard";

const UserHand = () => {
  const { userHand, userHandNewCards, replaceUserCards } = useGameLogic();

  const handleCardClick = (index: number) => {
    replaceUserCards([index]);
  };

  return (
    <div className="grid flex-1 grid-cols-5 gap-2">
      {userHand.map((card, idx) => (
        <GameCard
          key={idx}
          onClick={() => handleCardClick(idx)}
          variant={card}
          state={userHandNewCards.includes(idx) ? "active" : "default"}
        />
      ))}
    </div>
  );
};

export default UserHand;
