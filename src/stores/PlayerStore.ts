import { makeAutoObservable } from "mobx";
import { RootStore } from "../stores";
import { card } from "../components/types/Types";


type TwoNum = (1 | 2);

class PlayerStore {
    root: RootStore;
    cards: card[] = [];
    score: number[] = [0, 0];

    splitScore: number[] = [0, 0];
    splitCards: card[] = [];
    isSplit = false;

    playerType: string;

    constructor(root: RootStore, str: string) {
        makeAutoObservable(this);
        this.root = root;
        this.playerType = str;
    }

    addCardToHand = (num: TwoNum = 1) => {
        let card = this.root.CardStore.drawCard();
        this.cards.push(card);
        if(num === 2){
            let card2 = this.root.CardStore.drawCard();
            this.cards.push(card2);
        }
        this.calcScore();
    }

    addSplitCards = () => {
        let first: string = this.root.PlayerStore.cards[0].imgSrc;
        let second: string  = this.root.PlayerStore.cards[1].imgSrc;

        let firstArr = first.split("_");
        let secondArr = second.split("_");

        if(firstArr[0] === secondArr[0]){
            let a = this.cards.pop() as card;
            this.isSplit = true;
            this.splitCards.push(a);
        }
    }

    addCardToSplitHand = () => {
        let card = this.root.CardStore.drawCard();
        this.splitCards.push(card);
        this.calcScore("split");
    }

    private calcScore(opt: string = "one"){
        let sum = 0;
        let otherSum = 0;
        let cardsArr = [];
        if(opt === "split"){
            console.log('yes')
            cardsArr = this.splitCards
        } else {
            cardsArr = this.cards
        }
        if(cardsArr.length != 0){
            cardsArr.map(item=>{
                if(item.value === 11){
                    otherSum += 1;
                } else {
                    otherSum += item.value;
                }
                sum+=item.value
            })
        }   
        if(opt === "split"){
            this.splitScore[1] = otherSum;
            this.splitScore[0] = sum;
        } else {
            this.score[1] = otherSum;
            this.score[0] = sum;
        }     
    }
}

export default PlayerStore;