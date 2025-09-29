import React from "react";
import ColumnHeader from "./ColumnHeader";
import RowHeader from "./RowHeader";
import Cell from "./Cell";

export default function Spreadsheet({ grid, updateGrid, filters, setFilters, selectedCells, setSelectedCells }) {
  const rows = grid.length;
  const cols = grid[0].length;

  const setFilterAt = (colIdx, val) => {
    const newF = [...filters];
    newF[colIdx] = val;
    setFilters(newF);
  };

  return (
    <div className="sheet-wrap">
      <div className="grid-row header-row" style={{ gridTemplateColumns: `40px repeat(${cols}, 140px)` }}>
        <div className="corner-cell"></div>
        {Array.from({ length: cols }, (_, c) => (
          <ColumnHeader key={c} colIndex={c} filterValue={filters[c]} setFilterValue={v=>setFilterAt(c,v)} setSelectedCells={setSelectedCells} />
        ))}
      </div>

      {grid.map((row, r) => {
        const visible = row.every((cell, c) => {
          const f = filters[c];
          if (!f) return true;
          return String(cell.value || '').toLowerCase().includes(f.toLowerCase());
        });
        if (!visible) return null;

        return (
          <div key={r} className="grid-row" style={{ gridTemplateColumns: `40px repeat(${cols}, 140px)` }}>
            <RowHeader rowIndex={r} />
            {row.map((cell, c) => (
              <Cell key={c} r={r} c={c} cell={cell} grid={grid} updateGrid={updateGrid} selectedCells={selectedCells} setSelectedCells={setSelectedCells} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
