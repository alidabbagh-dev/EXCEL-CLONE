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
      <div className="toolbar-group">
        <button className="btn warning" onClick={undo}>Undo</button>
        <button className="btn danger" onClick={redo}>Redo</button>
      </div>

      <div className="toolbar-group">
        <select onChange={e => applyStyle("fontSize", parseInt(e.target.value))}>
          {[12, 14, 16, 18, 20, 24].map(size => (
            <option key={size} value={size}>{size}px</option>
          ))}
        </select>
        <button className="btn primary" onClick={() => applyStyle("fontWeight", "bold")}>Bold</button>
        <button className="btn success" onClick={() => applyStyle("fontStyle", "italic")}>Italic</button>
      </div>

      <div className="toolbar-group colors">
        <label>Text Color</label>
        <input type="color" onChange={e => applyStyle("color", e.target.value)} />
        <label>Background</label>
        <input type="color" onChange={e => applyStyle("background", e.target.value)} />
      </div>
    </div>
  );
}
