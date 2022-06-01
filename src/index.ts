// import "./styles.css";
// import { RootStore } from "./RootStore";
// import { BlackJack } from "./domain/BlackJack"
// type betAmount = 10 | 20 | 40 | 80 | 100;

// //actual card deck
// //blackjack returns 3:2
// //side bets / insurence (if dealer dealt ace)
// //surrender (half of bet is lost), only on dealer first card
// const rootStore = new RootStore();
// const blackJack = new BlackJack(rootStore);

// function addCardOnClick() {
//   postMessage("addCardOnClick");
//   postMessage("playerAction");
// }
// function splitOnClick() {
//   postMessage("splitOnClick");
//   postMessage("playerAction");
// }
// function addBetOnClick(){
//   postMessage("addBetOnClick");
// }
// function doubleOnClick(){
//   postMessage("doubleOnClick");
//   postMessage("playerAction");
// }
// function stayOnClick(){
//   postMessage("stayOnClick");
//   postMessage("playerAction");
// }
// function addEventListeners(){
//   document.getElementById("hit-btn")?.addEventListener('click', addCardOnClick)
//   document.getElementById("split-btn")?.addEventListener('click', splitOnClick)
//   document.getElementById("double-btn")?.addEventListener('click', doubleOnClick)
//   document.getElementById("stay-btn")?.addEventListener('click', stayOnClick)
// }
// function removeListeners(){
//   document.getElementById("hit-btn")?.removeEventListener('click', addCardOnClick)
//   document.getElementById("split-btn")?.removeEventListener('click', splitOnClick)
//   document.getElementById("double-btn")?.removeEventListener('click', doubleOnClick)
//   document.getElementById("stay-btn")?.removeEventListener('click', stayOnClick)
// }

// blackJack.start();

// window.onmessage = event => {
//   switch (event.data) {
//     case "addBets":
//         document.getElementById("addBet-btn")?.addEventListener('click', addBetOnClick)
//       break;
//     case "dealDealer":
//         document.getElementById("addBet-btn")?.removeEventListener('click', addBetOnClick)   
//       break;
//     case "dealPlayer":
//         addEventListeners();
//       break;
//     case "finalDealerDealing":
//         removeListeners();
//       break;
//     case "gameResults":
//       break;
//     default:
//       break;
//   }
// }
