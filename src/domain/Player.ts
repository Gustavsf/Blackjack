import { RootStore } from "../RootStore";

type betAmount = 10 | 20 | 40 | 80 | 100;

export class Player {
  public readonly name: string;
  public totalAmount: number = 500;

  public constructor(
    name: string,
    private readonly store: RootStore
    ){
    this.name = name;
  }
  public addToBet(bet: betAmount): void{
    this.totalAmount -= bet;
  }
  public winFromBet(num: number): void{
    this.totalAmount += num;
  }
}
