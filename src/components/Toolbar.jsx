import React from "react";

export default function Toolbar({ grid, updateGrid, selectedCells, undo, redo }) {
  const applyStyle = (styleKey, value) => {
    if (selectedCells.length === 0) return;
    updateGrid(g => {
      const newG = g.map(row => row.map(cell => ({ ...cell })));
      selectedCells.forEach(({ r, c }) => {
        newG[r][c].style = { ...newG[r][c].style, [styleKey]: value };
      });
      return newG;
    });
  };

  return (
    <div className="toolbar">
      <button className="btn btn-warning" onClick={undo}>Undo</button>
      <button className="btn btn-danger" onClick={redo}>Redo</button>

      <select onChange={e => applyStyle("fontSize", parseInt(e.target.value))}>
        {[12, 14, 16, 18, 20, 24].map(size => (
          <option key={size} value={size}>{size}px</option>
        ))}
      </select>

      <button className="btn btn-primary" onClick={() => applyStyle("fontWeight", "bold")}>Bold</button>
      <button className="btn btn-success" onClick={() => applyStyle("fontStyle", "italic")}>Italic</button>
      <label htmlFor="color">Text Color</label>
      <input type="color" onChange={e => applyStyle("color", e.target.value)} />
      <label htmlFor="color">Background Color</label>
      <input type="color" onChange={e => applyStyle("background", e.target.value)} />
    </div>
  );
}
