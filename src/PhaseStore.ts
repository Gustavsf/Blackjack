import { makeAutoObservable } from "mobx";

type GamePhase =
  | "BetsClosed"
  | "BetsOpen"
  | "DealerDealing"
  | "Dealing"
  | "GameResult"
  | "finalDealerDealing";

export class PhaseStore {
  public current: GamePhase = "BetsClosed";

  constructor() {
    makeAutoObservable(this);
  }
  public get currentPhase() {
    return this.current;
  }
  public set currentPhase(phase: GamePhase) {
    this.current = phase;
  }
}
