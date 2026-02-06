import React from 'react';

/**
 * ViewToggle - Toggle switch for biomarker visualization modes
 *
 * @param {Object} props
 * @param {string} props.currentMode - Current view mode ('reference' or 'progress')
 * @param {Function} props.onModeChange - Callback when mode changes
 * @param {string} props.className - Additional CSS classes
 */
const ViewToggle = ({ currentMode, onModeChange, className = '' }) => {
  const modes = [
    {
      id: 'reference',
      label: 'Reference Range',
      icon: 'show_chart',
      description: 'Show value position on reference range'
    },
    {
      id: 'progress',
      label: 'Progress Bar',
      icon: 'bar_chart',
      description: 'Show health score progress bar'
    }
  ];

  return (
    <div className={`flex items-center rounded-full p-1 ${className}`} style={{ background: '#F5F0E8' }}>
      {modes.map((mode) => {
        const isActive = currentMode === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              isActive
                ? 'bg-white shadow-sm'
                : ''
            }`}
            style={{
              color: isActive ? '#2D2416' : '#6B5D4F'
            }}
            title={mode.description}
          >
            <span className="material-symbols-outlined text-[16px]">
              {mode.icon}
            </span>
            <span className="hidden sm:inline">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ViewToggle;
