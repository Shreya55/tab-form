import React, { useState, useMemo, useCallback } from 'react';
import './TabForm.css'; // Assuming shared CSS; adjust if needed

// Import memoized child components for better performance
import MemoizedProfile from './MemoizedProfile';
import MemoizedInterests from './MemoizedInterests';
import MemoizedSettings from './MemoizedSettings';

// Memoized TabForm component to prevent unnecessary re-renders
// Only re-renders when internal state changes, not on parent re-renders
const MemoizedTabComponent = React.memo(function TabForm() {
  const [activeTab, setActiveTab] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    age: null,
    email: '',
    interests: [],
    theme: ''
  });

  const [errors, setErrors] = useState({});

  // Memoize the tabs configuration to avoid recreation on every render
  // Validation functions are pure and take data/setErrors to prevent stale closures
  const tabs = useMemo(() => [
    {
      name: 'Profile',
      component: MemoizedProfile,
      validate: (data, setErrors) => {
        const err = {};
        if (!data.name || data.name.length < 3) {
          err.name = 'Name is required and must be at least 3 characters';
        }
        if (!data.age || data.age < 18) {
          err.age = 'Age is required and must be 18 or older';
        }
        if (!data.email || !data.email.includes('@')) {
          err.email = 'Valid email is required';
        }
        setErrors(err);
        return Object.keys(err).length === 0;
      }
    },
    {
      name: 'Interests',
      component: MemoizedInterests,
      validate: (data, setErrors) => {
        const err = {};
        if (data.interests.length === 0) {
          err.interests = 'At least one interest is required';
        }
        setErrors(err);
        return Object.keys(err).length === 0;
      }
    },
    {
      name: 'Settings',
      component: MemoizedSettings,
      validate: () => true // No validation for settings
    }
  ], []); // Static config, no dependencies

  // Memoize the active component to avoid re-computation
  const ActiveTabComponent = useMemo(() => tabs[activeTab]?.component, [tabs, activeTab]);

  // Memoize event handlers to prevent child re-renders
  const handleNextClick = useCallback(() => {
    if (tabs[activeTab].validate(formData, setErrors)) {
      setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));
    }
  }, [tabs, activeTab, formData]);

  const handlePrevClick = useCallback(() => {
    if (tabs[activeTab].validate(formData, setErrors)) {
      setActiveTab((prev) => Math.max(prev - 1, 0));
    }
  }, [tabs, activeTab, formData]);

  const handleSubmitClick = useCallback(() => {
    // Validate all tabs before submission
    const allValid = tabs.every(tab => tab.validate(formData, setErrors));
    if (allValid) {
      console.log('Form submitted:', formData);
      // Add submission logic here (e.g., API call)
    }
  }, [tabs, formData]);

  const handleTabClick = useCallback((index) => {
    // Allow direct tab navigation without validation for flexibility
    setActiveTab(index);
  }, []);

  return (
    <div>
      <div className="heading-container">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`heading ${index === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="tab-container">
        {ActiveTabComponent && (
          <ActiveTabComponent
            data={formData}
            setFormData={setFormData}
            errors={errors}
          />
        )}
      </div>
      <div className="button-container">
        {activeTab > 0 && (
          <button onClick={handlePrevClick}>Previous</button>
        )}
        {activeTab < tabs.length - 1 ? (
          <button onClick={handleNextClick}>Next</button>
        ) : (
          <button onClick={handleSubmitClick}>Submit</button>
        )}
      </div>
    </div>
  );
});

MemoizedTabComponent.displayName = 'MemoizedTabComponent';

export default MemoizedTabComponent;