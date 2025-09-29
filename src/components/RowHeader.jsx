import React from "react";

export default function RowHeader({ rowIndex }) {
  return <div className="row-header">{rowIndex+1}</div>;
}
