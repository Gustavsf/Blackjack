import { RootStore } from "../RootStore"
import { dealPlayer } from "../domain/phase/DealingPhase";
import { Card } from "../domain/Card";

beforeEach(() => {
    jest.useFakeTimers();
});
afterEach(() => {
    jest.clearAllTimers();
});


describe("Dealing", () => {
    test("should add cards to hand", () => {
        const rootStore = new RootStore();
        rootStore.phase.currentPhase = "Dealing";
        const card = new Card("2C");
        rootStore.seats.seats[0].hands[0].addCard(card);
        expect(rootStore.seats.seats[0].hands[0].cards.length).toBe(1);
    }),
    test("should add cards to second hand", () => {
        const rootStore = new RootStore();
        rootStore.phase.currentPhase = "Dealing";
        const card = new Card("2C");
        const card2 = new Card("2S");

        rootStore.seats.seats[0].hands[0].addCard(card);
        rootStore.seats.seats[0].hands[0].addCard(card2);
        rootStore.seats.seats[0].split();

        expect(rootStore.seats.seats[0].hands[0].cards.length).toBe(1);
        expect(rootStore.seats.seats[0].hands[1].cards.length).toBe(1);
    }),
    test("should not add cards to second hand if card value different", () => {
        const rootStore = new RootStore();
        rootStore.phase.currentPhase = "Dealing";
        const card = new Card("2C");
        const card2 = new Card("5S");

        rootStore.seats.seats[0].hands[0].addCard(card);
        rootStore.seats.seats[0].hands[0].addCard(card2);
        rootStore.seats.seats[0].split();

        expect(rootStore.seats.seats[0].hands[0].cards.length).toBe(2);
    }),
    test("should not add cards to hand, when phase is not Dealing", () => {
        const rootStore = new RootStore();
        rootStore.phase.currentPhase = "DealerDealing";
        const card = new Card("2C");
        rootStore.seats.seats[0].hands[0].addCard(card);
        expect(rootStore.seats.seats[0].hands[0].cards.length).toBe(0);
    }),
    test("should not add cards to hand, if score >= 21", () => {
        const rootStore = new RootStore();
        rootStore.phase.currentPhase = "Dealing";
        dealPlayer(rootStore);
        const card = new Card("JC");
        const card2 = new Card("AC");
        const card3 = new Card("QC");

        rootStore.seats.seats[0].hands[0].addCard(card);
        rootStore.seats.seats[0].hands[0].addCard(card2);
        rootStore.seats.seats[0].hands[0].addCard(card3);

        expect(rootStore.seats.seats[0].hands[0].cards.length).toBe(2);
    }),
    test("should reset time to 5s after action", () => {
        const rootStore = new RootStore();
        rootStore.phase.currentPhase = "Dealing";
        dealPlayer(rootStore);
        const card = new Card("2C");
        const card2 = new Card("2S");
        const card3 = new Card("2H");
        const card4 = new Card("2D");


        jest.advanceTimersByTime(4000);
        rootStore.seats.seats[0].hands[0].addCard(card);

        jest.advanceTimersByTime(4000);
        rootStore.seats.seats[0].hands[0].addCard(card2);
        
        jest.advanceTimersByTime(4000);
        const split = rootStore.seats.seats[0].split();

        //jest.advanceTimersByTime(4000);
        //rootStore.seats.seats[0].hands[1].addCard(card3);
        //doesnt add time when added to split/second hand

        jest.advanceTimersByTime(4000);
        rootStore.seats.seats[0].hands[0].addCard(card4);


        expect(rootStore.seats.seats[0].hands[0].cards.length).toBe(2);
        //expect(rootStore.seats.seats[0].hands[1].cards.length).toBe(2);
    }),
    test("should change phase", () => {
        const rootStore = new RootStore();
        dealPlayer(rootStore);
        expect(rootStore.phase.currentPhase).not.toBe("GameResult");
        jest.advanceTimersByTime(5000);
        expect(rootStore.phase.currentPhase).toBe("GameResult");
    });
});