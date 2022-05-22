import { RootStore } from "../RootStore"
import { startGame } from "../domain/phase/BetsClosedPhase"

describe("Bets Closed", () => {
    test("should change phase", () => {
        const rootStore = new RootStore();
        expect(rootStore.phase.currentPhase).toBe("BetsClosed");
        startGame(rootStore);
        expect(rootStore.phase.currentPhase).toBe("BetsOpen");
    });
});