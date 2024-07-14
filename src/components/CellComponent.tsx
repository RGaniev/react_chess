import React from "react";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: React.FC<CellProps> = ({ cell, selected, click }) => {
  const isCellAvailable = cell.available && !cell.figure;
  const isFigureTarget = cell.available && cell.figure;

  return (
    <div
      className={[
        "cell",
        cell.color,
        selected ? "selected" : "",
        isFigureTarget ? "target" : "",
      ].join(" ")}
      onClick={() => click(cell)}
    >
      {isCellAvailable && <div className="available"></div>}
      {cell.figure?.logo && (
        <img src={cell.figure.logo} alt={cell.figure.name} />
      )}
    </div>
  );
};

export default CellComponent;
