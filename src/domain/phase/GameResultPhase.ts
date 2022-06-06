import { RootStore } from "../../RootStore";

export function gameResult(rootStore: RootStore) {
  rootStore.phase.currentPhase = "GameResult";
}
