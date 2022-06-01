import { RootStore } from "../RootStore"
import { startGame } from "../domain/phase/BetsClosedPhase"
import { addBets } from "../domain/phase/BetsOpenPhase"
beforeEach(() => {
    jest.useFakeTimers();
});
afterEach(() => {
    jest.clearAllTimers();
});

describe("Bets", () => {
    test("should change phase", () => {
        const rootStore = new RootStore();
        expect(rootStore.phase.currentPhase).not.toBe("BetsOpen");
        startGame(rootStore);
        expect(rootStore.phase.currentPhase).toBe("BetsOpen");
    }),
    test("should add bet amount", () => {
        const rootStore = new RootStore();
        rootStore.phase.currentPhase = "BetsOpen";
        addBets(rootStore);
        jest.advanceTimersByTime(1000);
        rootStore.seats.seats[0].betAmount = 20;
        jest.advanceTimersByTime(1000);
        expect(rootStore.seats.seats[0].bet).toBe(20);
    });
});