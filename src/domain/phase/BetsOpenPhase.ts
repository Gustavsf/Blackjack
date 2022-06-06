import { RootStore } from "../../RootStore";

export function addBets(rootStore: RootStore) {
  rootStore.phase.currentPhase = "BetsOpen";
}
