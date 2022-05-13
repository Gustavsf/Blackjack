import { makeAutoObservable } from "mobx";
import { addCards } from "../components/cardUtil"
import { RootStore } from "../stores";
import { card } from "../components/types/Types";


class CardStore {
  root: RootStore;
  cards: card[] = [];

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }
  
  fillDeck = () => {
    this.cards = addCards();
  }

  clearHands = () => {
    // ??
    this.root.PlayerStore.cards = [];
    this.root.PlayerStore.splitCards = [];
    this.root.PlayerStore.isSplit = false;
    this.root.DealerStore.cards = [];
    //reshuffle when under 20 cards left
    if(this.cards.length < 20){
      this.cards = addCards();
    }
  }

  drawCard = () => {
      return this.cards.pop();
  }
  //ugly temporary code
  shouldDraw = () => {
    let isGood = false;
    let a, b, c, d, e, f, g, h = false;
    
    if (this.root.PlayerStore.score[0] <= 21) {
      a = ((this.root.DealerStore.score[0] <= 17) ||
        this.root.DealerStore.score[0] < this.root.PlayerStore.score[0]);
      b = ((this.root.DealerStore.score[1] <= 17) ||
        this.root.DealerStore.score[1] < this.root.PlayerStore.score[0]);
      e = ((this.root.DealerStore.score[0] <= 17) ||
        this.root.DealerStore.score[0] < this.root.PlayerStore.splitScore[0]);
      f = ((this.root.DealerStore.score[1] <= 17) ||
        this.root.DealerStore.score[1] < this.root.PlayerStore.splitScore[0]);
    }

    if (this.root.PlayerStore.score[1] <= 21) {
      d = ((this.root.DealerStore.score[0] <= 17) ||
        this.root.DealerStore.score[0] < this.root.PlayerStore.score[1]);     
      c = ((this.root.DealerStore.score[1] <= 17) ||
        this.root.DealerStore.score[1] < this.root.PlayerStore.score[1]);
      g = ((this.root.DealerStore.score[0] <= 17) ||
        this.root.DealerStore.score[0] < this.root.PlayerStore.splitScore[1]);     
      h = ((this.root.DealerStore.score[1] <= 17) ||
        this.root.DealerStore.score[1] < this.root.PlayerStore.splitScore[1]);
    }
  
    if (a || b || c || d || e || f || g || h) {
      isGood = true;
    }
    return isGood;   
  }
}

export default CardStore;