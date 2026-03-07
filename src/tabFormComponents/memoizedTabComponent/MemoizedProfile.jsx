import React, { useCallback } from 'react';

// Memoized Profile component to prevent unnecessary re-renders
// Only re-renders when data, setFormData, or errors change
const MemoizedProfile = React.memo(function Profile({ data, setFormData, errors }) {
  const { name, age, email } = data;

  // Memoize the change handler to avoid recreation on every render
  const handleChange = useCallback((e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'age' ? (e.target.value ? parseInt(e.target.value) : null) : e.target.value
    }));
  }, [setFormData]);

  return (
    <div className="profile-form">
      <label>Name: </label>
      <input
        type="text"
        name="name"
        value={name || ''}
        onChange={(e) => handleChange(e, 'name')}
      />
      {errors.name && <span className="error">{errors.name}</span>}
      <label>Age: </label>
      <input
        type="number"
        name="age"
        value={age || ''}
        onChange={(e) => handleChange(e, 'age')}
      />
      {errors.age && <span className="error">{errors.age}</span>}
      <label>Email: </label>
      <input
        type="email"
        name="email"
        value={email || ''}
        onChange={(e) => handleChange(e, 'email')}
      />
      {errors.email && <span className="error">{errors.email}</span>}
    </div>
  );
});

// Custom comparison function for React.memo to optimize further
MemoizedProfile.displayName = 'MemoizedProfile';

export default MemoizedProfile;