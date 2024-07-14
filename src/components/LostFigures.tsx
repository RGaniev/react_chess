import React from "react";
import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: React.FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className="lost">
      <h3 className="lost-title">{title}</h3>
      {figures.map((figure) => (
        <div key={figure.id}>
          <div className="lost-info">
            {figure.logo && (
              <img width={24} height={24} src={figure.logo} alt={figure.name} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LostFigures;
