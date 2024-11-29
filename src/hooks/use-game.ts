import create from "zustand";

// Zustand store for managing game state
interface GameState {
  gameRunning: boolean;
  round: number;
  level: number;
  coins: number;
  poolCoins: number;
  botHand: string[];
  userHand: string[];
  userHandNewCards: number[];
  startGame: () => void;
  playGame: () => void;
  handleBetClick: () => void;
  handleGameCardClick: (index: number) => void;
  setUserHandNewCards: (newCards: number[]) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameRunning: true,
  round: 0,
  level: 0,
  coins: 10,
  poolCoins: 0,
  botHand: [],
  userHand: [],
  userHandNewCards: [],
  startGame: () => set((state) => ({ coins: state.coins - 
