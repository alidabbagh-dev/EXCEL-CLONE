import React from "react";

export default function ColumnHeader({ colIndex, filterValue, setFilterValue, setSelectedCells }) {
  const name = String.fromCharCode(65 + colIndex);

  const handleClick = () => {
    const exampleRowCount = 20;
    const arr = [];
    for (let r=0;r<exampleRowCount;r++) arr.push({ r, c: colIndex });
    setSelectedCells(arr);
  };

  return (
    <div className="column-header">
      <div className="col-name" onClick={handleClick} title="Click to select column">{name}</div>
      <div>
        <input className="filter-input" placeholder="filter..." value={filterValue||''} onChange={e=>setFilterValue && setFilterValue(e.target.value)} />
      </div>
    </div>
  );
}
