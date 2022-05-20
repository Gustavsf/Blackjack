import { RootStore } from "../../RootStore";

export function addBets(rootStore: RootStore) {

  window.setTimeout(() => {
    rootStore.phase.currentPhase = "DealerDealing";
  }, 2000);
}
