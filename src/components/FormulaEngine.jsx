// موتور فرمول
export function evaluateFormula(value, data) {
  if(typeof value!=='string') return value;
  if(!value.startsWith('=')) return value;

  const expr = value.slice(1).trim().toUpperCase();
  const rangeMatch = expr.match(/(SUM|AVG|MAX|MIN|COUNT|CONCAT)\(([^)]+)\)/i);
  if(!rangeMatch) return 'ERROR';

  const fn = rangeMatch[1];
  const rng = rangeMatch[2];
  const [start,end] = rng.split(':').map(s=>s.trim());
  const startCoord = a1ToCoord(start);
  const endCoord = a1ToCoord(end);
  if(!startCoord || !endCoord) return 'ERROR';

  const values=[];
  for(let r=startCoord.row;r<=endCoord.row;r++){
    for(let c=startCoord.col;c<=endCoord.col;c++){
      const cell = data[r] && data[r][c] ? data[r][c] : { value: '' };
      const num = parseFloat(cell.value);
      if(!isNaN(num)) values.push(num);
    }
  }

  if(fn==='SUM') return values.reduce((a,b)=>a+b,0);
  if(fn==='AVG') return values.length? values.reduce((a,b)=>a+b,0)/values.length : 0;
  if(fn==='MAX') return values.length? Math.max(...values) : 0;
  if(fn==='MIN') return values.length? Math.min(...values) : 0;
  if(fn==='COUNT') return values.length;
  if(fn==='CONCAT'){
    const texts=[];
    for(let r=startCoord.row;r<=endCoord.row;r++){
      for(let c=startCoord.col;c<=endCoord.col;c++){
        const cell = data[r] && data[r][c]?data[r][c]:{value:''};
        texts.push(cell.value||'');
      }
    }
    return texts.join('');
  }

  return 'ERROR';
}

function a1ToCoord(a1){
  if(!a1) return null;
  const m = a1.match(/^([A-Z]+)(\d+)$/i);
  if(!m) return null;
  let col=0;
  const colLetters = m[1].toUpperCase();
  for(let i=0;i<colLetters.length;i++) col=col*26 + (colLetters.charCodeAt(i)-64);
  col-=1;
  const row=parseInt(m[2],10)-1;
  return { row, col };
}
