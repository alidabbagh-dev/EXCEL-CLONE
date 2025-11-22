import React, { useState } from "react";
import Toolbar from "./components/Toolbar";
import FormulaBar from "./components/FormulaBar";
import Spreadsheet from "./components/Spreadsheet";

export default function App() {
  const ROWS = 20;
  const COLS = 10;

  const makeGrid = () =>
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({
        value: "",
        displayValue: "",
        style: { fontSize: 14, fontWeight: "normal", fontStyle: "normal", color: "#000", background: "#fff" }
      }))
    );

  const [grid, setGrid] = useState(makeGrid());
  const [filters, setFilters] = useState(Array(COLS).fill(""));
  const [selectedCells, setSelectedCells] = useState([]); 

  // برای undo/redo
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  // وقتی تغییر ایجاد می‌کنیم
  const updateGrid = (updater) => {
    setHistory((h) => [...h, grid]); 
    setFuture([]); 
    setGrid(updater);
  };

  // undo
  const undo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setFuture((f) => [grid, ...f]);
    setHistory((h) => h.slice(0, -1));
    setGrid(prev);
  };

  // redo
  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setHistory((h) => [...h, grid]);
    setFuture((f) => f.slice(1));
    setGrid(next);
  };

  return (
    <div className="app-root">
      <Toolbar
        grid={grid}
        updateGrid={updateGrid}
        selectedCells={selectedCells}
        undo={undo}
        redo={redo}
      />
      <FormulaBar grid={grid} updateGrid={updateGrid} selectedCells={selectedCells} />
      <Spreadsheet
        grid={grid}
        updateGrid={updateGrid}
        filters={filters}
        setFilters={setFilters}
        selectedCells={selectedCells}
        setSelectedCells={setSelectedCells}
      />
    </div>
  );
}

//https://alidabbagh-excel-clone.vercel.app/