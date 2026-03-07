import React, { useCallback } from 'react';

// Memoized Settings component to prevent unnecessary re-renders
// Only re-renders when data or setFormData change
const MemoizedSettings = React.memo(function Settings({ data, setFormData }) {
  const { theme } = data;

  // Memoize the change handler to avoid recreation on every render
  const handleChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      theme: e.target.name
    }));
  }, [setFormData]);

  return (
    <div>
      <label>
        <input
          type="radio"
          checked={theme === 'light'}
          name="light"
          onChange={handleChange}
        />
        Light
      </label>
      <label>
        <input
          type="radio"
          checked={theme === 'dark'}
          name="dark"
          onChange={handleChange}
        />
        Dark
      </label>
    </div>
  );
});

MemoizedSettings.displayName = 'MemoizedSettings';

export default MemoizedSettings;