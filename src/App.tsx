import { Player } from "./components/Player"
import { Dealer } from "./components/Dealer"

import "./styles.css";
import { RootStore } from "./RootStore";
import { BlackJack } from "./domain/BlackJack"
import * as React from 'react'

type betAmount = 10 | 20 | 40 | 80 | 100;

//actual card deck
//blackjack returns 3:2
//side bets / insurence (if dealer dealt ace)
//surrender (half of bet is lost), only on dealer first card

function App() {
  const rootStore = new RootStore();
  const blackJack = new BlackJack(rootStore);
  blackJack.start();
  //components
  //current phase display
  //player cards + score
  //dealer cards + score
  return (
    <div className="App">
      <Dealer />
      <Player /> 
    </div>
  );
}

export default App;
