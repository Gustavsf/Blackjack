import { RootStore } from "./RootStore"
import { startGame } from "./domain/phase/BetsClosedPhase"
import { dealDealer } from "./domain/phase/DealerDealingPhase";
import { dealPlayer } from "./domain/phase/DealingPhase";
import { Card } from "./domain/Card";
import { gameResult } from "./domain/phase/GameResultPhase";
//player => split if same
//dealer => change hidden card to real
//result => score ace (2nd score??), return [score] or [score, score]
//bets
beforeEach(() => {
    jest.useFakeTimers();
});
afterEach(() => {
    jest.clearAllTimers();
});

describe("Bets Closed", () => {
    test("should change phase", () => {
        const rootStore = new RootStore();
        expect(rootStore.phase.currentPhase).toBe("BetsClosed");
        startGame(rootStore);
        expect(rootStore.phase.currentPhase).toBe("BetsOpen");
    });
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
        rootStore.seats.seats[0].split();

        jest.advanceTimersByTime(4000);
        rootStore.seats.seats[0].hands[1].addCard(card3);
        //doesnt add time when added to split hand

        jest.advanceTimersByTime(4000);
        rootStore.seats.seats[0].hands[0].addCard(card4);


        expect(rootStore.seats.seats[0].hands[0].cards.length).toBe(2);
        expect(rootStore.seats.seats[0].hands[1].cards.length).toBe(2);
    }),
    test("should change phase", () => {
        const rootStore = new RootStore();
        dealPlayer(rootStore);
        expect(rootStore.phase.currentPhase).not.toBe("GameResult");
        jest.advanceTimersByTime(5000);
        expect(rootStore.phase.currentPhase).toBe("GameResult");
    });
});

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
        gameResult(rootStore);
        expect(rootStore.phase.currentPhase).not.toBe("BetsOpen");
        jest.advanceTimersByTime(2000);
        expect(rootStore.phase.currentPhase).toBe("BetsOpen");
    });
});