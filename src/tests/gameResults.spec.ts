import { RootStore } from "../RootStore"
import { Card } from "../domain/Card";
import { gameResult } from "../domain/phase/GameResultPhase";


describe("Results", () => {
    test("should get winning hands", () => {
        const rootStore = new RootStore();

        rootStore.phase.currentPhase = "Dealing";
        const card = new Card("5S");
        const card2 = new Card("5H");

        rootStore.seats.seats[0].hands[0].addCard(card);
        rootStore.seats.seats[0].hands[0].addCard(card2);
        rootStore.seats.seats[0].split();

        rootStore.phase.currentPhase = "DealerDealing";
        const card3 = new Card("3H");
        rootStore.dealer.addCard(card3);

        expect(rootStore.seats.seats[0].hands[1].res).toBe("Win");
        expect(rootStore.seats.seats[0].hands[0].res).toBe("Win");
    }),
    test("should get losing hands", () => {
        const rootStore = new RootStore();

        rootStore.phase.currentPhase = "Dealing";
        const card = new Card("5S");
        const card2 = new Card("5H");

        rootStore.seats.seats[0].hands[0].addCard(card);
        rootStore.seats.seats[0].hands[0].addCard(card2);
        rootStore.seats.seats[0].split();

        rootStore.phase.currentPhase = "DealerDealing";
        const card3 = new Card("AS");
        rootStore.dealer.addCard(card3);

        expect(rootStore.seats.seats[0].hands[1].res).toBe("Lose");
        expect(rootStore.seats.seats[0].hands[0].res).toBe("Lose");
    }),
    test("should get push hands", () => {
        const rootStore = new RootStore();

        rootStore.phase.currentPhase = "Dealing";
        const card = new Card("KS");
        const card2 = new Card("KH");

        rootStore.seats.seats[0].hands[0].addCard(card);
        rootStore.seats.seats[0].hands[0].addCard(card2);
        rootStore.seats.seats[0].split();

        rootStore.phase.currentPhase = "DealerDealing";
        const card3 = new Card("JS");
        rootStore.dealer.addCard(card3);

        expect(rootStore.seats.seats[0].hands[1].res).toBe("Push");
        expect(rootStore.seats.seats[0].hands[0].res).toBe("Push");
    }),
    test("should change phase", () => {
        const rootStore = new RootStore();
        jest.useFakeTimers();
        gameResult(rootStore);
        expect(rootStore.phase.currentPhase).not.toBe("BetsOpen");
        jest.advanceTimersByTime(2000);
        expect(rootStore.phase.currentPhase).toBe("BetsOpen");
        jest.clearAllTimers();
    });
});