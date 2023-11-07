import { Board } from "./Board";
import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { King } from "./pieces/King";
import { PiecesNames } from "./pieces/PiecesNames";

export class Player{
  color: Colors;

  constructor(color: Colors){
    this.color = color;
  }
}