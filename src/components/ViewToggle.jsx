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
    <div className={`flex items-center bg-white/5 rounded-full p-1 ${className}`}>
      {modes.map((mode) => {
        const isActive = currentMode === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              isActive
                ? 'bg-[#0df280] text-[#0a110e] shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
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
