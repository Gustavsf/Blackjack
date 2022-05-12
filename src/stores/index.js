import CardStore from "./CardStore.ts";
import PlayerStore from "./PlayerStore.ts";

import React from "react";

export class RootStore {
  constructor() {
    this.CardStore = new CardStore(this)
    this.PlayerStore = new PlayerStore(this, 'user')
    this.DealerStore = new PlayerStore(this, 'dealer')
  }
}
const StoresContext = React.createContext(new RootStore());

export const useStores = () => React.useContext(StoresContext);