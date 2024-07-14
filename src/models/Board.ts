import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { King } from "./figures/King";
import { Queen } from "./figures/Queen";
import { Bishop } from "./figures/Bishop";
import { Knight } from "./figures/Knight";
import { Rook } from "./figures/Rook";
import { Pawn } from "./figures/Pawn";
import { Figure } from "./figures/Figure";

export class Board {
  cells: Cell[][] = [];
  lostWhiteFigures: Figure[] = [];
  lostBlackFigures: Figure[] = [];

  public initCells() {
    // Создание доски
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null));
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null));
        }
      }

      this.cells.push(row);
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      // Проход по строкам
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        // Проход по ячейкам строки
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addKings() {
    // Расстановка королей
    new King(Colors.WHITE, this.getCell(4, 7));
    new King(Colors.BLACK, this.getCell(4, 0));
  }

  private addQueens() {
    // Расстановка ферзей
    new Queen(Colors.WHITE, this.getCell(3, 7));
    new Queen(Colors.BLACK, this.getCell(3, 0));
  }

  private addBishops() {
    // Расстановка слонов
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
  }

  private addKnights() {
    // Расстановка коней
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
  }

  private addRooks() {
    // Расстановка ладей
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
  }

  private addPawns() {
    // Расстановка пешек
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.WHITE, this.getCell(i, 6));
      new Pawn(Colors.BLACK, this.getCell(i, 1));
    }
  }

  public addFigures() {
    this.addPawns();
    this.addRooks();
    this.addKnights();
    this.addBishops();
    this.addQueens();
    this.addKings();
  }

  public addFigureToLostList(figure: Figure) {
    figure.color === Colors.WHITE
      ? this.lostWhiteFigures.push(figure)
      : this.lostBlackFigures.push(figure);
  }
}
