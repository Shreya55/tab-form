import React, { useCallback } from 'react';

// Memoized Interests component to prevent unnecessary re-renders
// Only re-renders when data, setFormData, or errors change
const MemoizedInterests = React.memo(function Interests({ data, setFormData, errors }) {
  const { interests } = data;

  // Memoize the change handler to avoid recreation on every render
  const handleChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      interests: e.target.checked
        ? [...prev.interests, e.target.name]
        : prev.interests.filter((interest) => interest !== e.target.name)
    }));
  }, [setFormData]);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={interests.includes('coding')}
          name="coding"
          onChange={handleChange}
        />
        Coding
      </label>
      <label>
        <input
          type="checkbox"
          checked={interests.includes('music')}
          name="music"
          onChange={handleChange}
        />
        Music
      </label>
      <label>
        <input
          type="checkbox"
          checked={interests.includes('reading')}
          name="reading"
          onChange={handleChange}
        />
        Reading
      </label>
      {errors.interests && <span className="error">{errors.interests}</span>}
    </div>
  );
});

MemoizedInterests.displayName = 'MemoizedInterests';

export default MemoizedInterests;