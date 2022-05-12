import { useEffect } from "react";
import "./App.css";
import { Player } from './components/Player'
import { Dealer } from './components/Dealer'

import { useStores } from "./stores";


function App() {
  const RootStore = useStores();

  useEffect(()=>{
    RootStore.CardStore.fillDeck();
  }, [])
  
  return (
    
    <div className="App">
      <Dealer/>
      <Player/>
    </div>
  );
}

export default App;
