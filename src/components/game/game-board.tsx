import BotHand from "./bot-hand";
import UserHand from "./user-hand";
import GameControls from "./game-controls";

export const GameBoard = () => {
  return (
    <div className="grid flex-1 grid-cols-12 gap-12 h-full">
      <div className="col-span-11">
        <BotHand />
        <GameControls />
        <UserHand />
      </div>
    </div>
  );
};
