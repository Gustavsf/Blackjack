import { RootStore } from "../../RootStore";

export function dealDealer(rootStore: RootStore) {

  window.setTimeout(() => {
    rootStore.phase.currentPhase = "Dealing";
  }, 2000);
}
