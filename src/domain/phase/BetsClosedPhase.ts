import { Seat } from "../Seat";
import { RootStore } from "../../RootStore";

export function startGame(rootStore: RootStore) {
  new Seat(rootStore, "0");
  rootStore.phase.currentPhase = "BetsOpen";
}
