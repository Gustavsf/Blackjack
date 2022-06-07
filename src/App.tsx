import { Player } from "./components/Player"
import { Dealer } from "./components/Dealer"

import "./styles.css";
import { RootStore } from "./RootStore";
import { BlackJack } from "./domain/BlackJack"
import * as React from 'react'

function App() {
  const rootStore = new RootStore();
  const blackJack = new BlackJack(rootStore);
  
  const handleClick = () => {
    const title = document.getElementById('title-div');
    const wall = document.getElementById('div-wall');
    const wall2 = document.getElementById('div-wall2');
    const wall3 = document.getElementById('div-wall3');

    title!.style.animationPlayState = "running"
    wall!.style.animationPlayState = "running"
    wall2!.style.animationPlayState = "running"
    wall3!.style.animationPlayState = "running"
    blackJack.start();
  }

  return (
    <>
    <div className="App">
      <div id="title-div">
        <h1 id="bj-title">BlackJack</h1>
        <button onClick={handleClick}>Start</button>
      </div>
      <div id="table-div">
        <div id="div-wall">
          <Dealer />
          <Player />
          <div id="card-template">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div id="div-wall3"></div>
        <div id="div-wall2"></div>
      </div>     
    </div>
    </>
    
  );
}

export default App;
