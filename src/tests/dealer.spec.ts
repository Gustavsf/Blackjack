import { RootStore } from "../RootStore"
import { dealDealer } from "../domain/phase/DealerDealingPhase";
import { Card } from "../domain/Card";

beforeEach(() => {
    jest.useFakeTimers();
});
afterEach(() => {
    jest.clearAllTimers();
});

describe("Dealer Dealing", () => {
    test("it should add cards to dealer", () => {
        const rootStore = new RootStore();
        rootStore.phase.currentPhase = "DealerDealing";
        const card = new Card("2C");
        rootStore.dealer.addCard(card);
        expect(rootStore.dealer.cards.length).toBe(1);
    }),
    test("should not add cards to dealer, when phase is not DealerDealing", () => {
        //also add cards in results phase
        const rootStore = new RootStore();
        rootStore.phase.currentPhase = "BetsOpen";
        const card = new Card("2C");
        rootStore.dealer.addCard(card);
        expect(rootStore.dealer.cards.length).toBe(0);
    }),
    test("should change phase", () => {
        const rootStore = new RootStore();
        dealDealer(rootStore);
        expect(rootStore.phase.currentPhase).not.toBe("Dealing");
        jest.advanceTimersByTime(2000);
        expect(rootStore.phase.currentPhase).toBe("Dealing");
    });
});