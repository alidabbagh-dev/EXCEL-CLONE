import React from "react";
import { evaluateFormula } from "./FormulaEngine";

function coordsToA1(r,c){
  let col = '';
  let n = c+1;
  while(n>0){
    const rem = (n-1)%26;
    col = String.fromCharCode(65+rem) + col;
    n = Math.floor((n-1)/26);
  }
  return col + (r+1);
}

export default function Cell({ r, c, cell, grid, updateGrid, selectedCells, setSelectedCells }) {
  const style = cell.style || {};
  const isSelected = selectedCells.some(s => s.r===r && s.c===c);

  const handleClick = (e) => {
    if (e.shiftKey) {
      setSelectedCells(prev => {
        const exists = prev.some(p => p.r===r && p.c===c);
        if (exists) return prev;
        return [...prev, { r, c }];
      });
    } else if (e.ctrlKey || e.metaKey) {
      setSelectedCells(prev => {
        const exists = prev.some(p => p.r===r && p.c===c);
        if (exists) return prev.filter(p => !(p.r===r && p.c===c));
        return [...prev, { r, c }];
      });
    } else {
      setSelectedCells([{ r, c }]);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    updateGrid(g => {
      const newG = g.map(row => row.map(cell => ({ ...cell })));
      newG[r][c].value = val;
      if (val.startsWith("=")) {
        const result = evaluateFormula(val, g);
        newG[r][c].displayValue = result;
      } else {
        newG[r][c].displayValue = val;
      }
      return newG;
    });
  };

  const display = cell.displayValue !== undefined ? cell.displayValue : (cell.value || '');

  return (
    <input
      className={`cell ${isSelected ? 'selected' : ''}`}
      style={{ ...style, width: `140px` }}
      value={display}
      onChange={handleChange}
      onClick={handleClick}
      placeholder={coordsToA1(r,c)}
    />
  );
}

