import React, { useState, useCallback } from 'react';
import '../chips.css';
import MemoizedChip from './MemoizedChip';

// Memoized Chips component to prevent unnecessary re-renders
const MemoizedChips = React.memo(function Chips() {
  const [input, setInput] = useState('');
  const [chips, setChips] = useState([]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && input.trim()) {
      setChips((prev) => [...prev, input.trim()]);
      setInput('');
    }
  }, [input]);

  const handleDelete = useCallback((index) => {
    setChips((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  return (
    <div>
      <h1>Memoized Chips Input</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      <div className='main-box'>
        {chips.map((chip, index) => (
          <MemoizedChip
            key={index}
            chip={chip}
            index={index}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
});

MemoizedChips.displayName = 'MemoizedChips';

export default MemoizedChips;