import { RootStore } from "../../RootStore";

export function startGame(rootStore: RootStore) {
  rootStore.phase.currentPhase = "BetsClosed";
}
