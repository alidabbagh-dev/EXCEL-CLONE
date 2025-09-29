import React, { useState } from "react";
import { evaluateFormula } from "./FormulaEngine";

export default function FormulaBar({ grid, updateGrid, selectedCells }) {
  const [formula, setFormula] = useState("");

  const apply = () => {
    if (!formula) return;
    if (!selectedCells || selectedCells.length === 0) return alert("Select a cell first.");

    let target = null;
    let expr = formula;

    const match = formula.match(/^([A-Z]+\d+)\s*=\s*(.+)$/i);
    if (match) { 
      target = match[1].toUpperCase(); 
      expr = '=' + match[2]; 
    } else { 
      const { r, c } = selectedCells[0]; 
      target = String.fromCharCode(65+c) + (r+1);
      expr = formula.startsWith('=') ? formula : '=' + formula;
    }

    const a1ToCoord = (a1) => {
      const m = a1.match(/^([A-Z]+)(\d+)$/i);
      if(!m) return null;
      let col=0; for(let i=0;i<m[1].length;i++) col=col*26 + (m[1].charCodeAt(i)-64);
      col-=1; const row=parseInt(m[2],10)-1;
      return { row, col };
    };

    const coord = a1ToCoord(target);
    if(!coord) return alert("Invalid target cell.");

    updateGrid(g=>{
      const newG = g.map(row=>row.map(cell=>({...cell})));
      const result = evaluateFormula(expr, g);
      newG[coord.row][coord.col].value = expr;
      newG[coord.row][coord.col].displayValue = result;
      return newG;
    });

    setFormula('');
  };

  return (
    <div className="formula-bar">
      <input className="formula-input" placeholder="A3 = AVG(A1:A2)" value={formula} onChange={e=>setFormula(e.target.value)} />
      <button  className="btn btn-success" onClick={apply}>Apply</button>
    </div>
  );
}
