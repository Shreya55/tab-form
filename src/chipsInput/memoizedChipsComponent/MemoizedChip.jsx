import React from 'react';
import '../chips.css';

// Memoized Chip component to prevent unnecessary re-renders
const MemoizedChip = React.memo(function Chip({ chip, index, onDelete }) {
  return (
    <div className='chip'>
      {chip}
      <button onClick={() => onDelete(index)}> x </button>
    </div>
  );
});

MemoizedChip.displayName = 'MemoizedChip';

export default MemoizedChip;