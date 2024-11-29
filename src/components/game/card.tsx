import { GAME_CARDS } from "@/constants/game";
import { cva, VariantProps } from "class-variance-authority";
import { FC, HTMLAttributes } from "react";

const game_card_variants = cva(
  "grid place-items-center rounded-md aspect-[3/4] transition-all duration-150 ease-in-out will-change-transform transform-gpu",
  {
    variants: {
      variant: {
        cloud: "bg-sky-600",
        moon: "bg-amber-600",
        sun: "bg-yellow-600",
        planet: "bg-violet-600",
        ship: "bg-rose-600",
        star: "bg-amber-600",
      },
      state: {
        default: "translate-y-0",
        active: "-translate-y-8",
        inactive: "translate-y-0 pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "cloud",
      state: "default",
    },
  }
);

interface GameCardProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof game_card_variants> {
  index: number;
}

export const GameCard: FC<GameCardProps> = ({
  variant,
  state,
  className,
  ...props
}) => {
  const Card =
    GAME_CARDS.find((card) => card.variant === variant) || GAME_CARDS[0];

  return (
    <button
      type="button"
      role="button"
      className={game_card_variants({ variant, state, className })}
      {...props}
    >
      <Card.icon size={48} />
    </button>
  );
};
