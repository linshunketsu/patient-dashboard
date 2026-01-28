import React, { useMemo } from 'react';
import { getReferenceRange, calculateStatus } from '../data/reference-ranges-config.js';

/**
 * ReferenceRangeIndicator - A visual component showing biomarker value within reference range
 *
 * @param {Object} props
 * @param {string} props.markerName - Name of the biomarker
 * @param {string|number} props.value - Current value
 * @param {string} props.status - Pre-calculated status (optional, will be calculated if not provided)
 * @param {Object} props.customRange - Custom reference range to override config (optional)
 * @param {boolean} props.showLabels - Show min/max labels (default: true)
 * @param {boolean} props.showOptimalZone - Highlight optimal range (default: true)
 * @param {boolean} props.compact - Compact mode for smaller cards (default: false)
 * @param {string} props.className - Additional CSS classes
 */
const ReferenceRangeIndicator = ({
  markerName,
  value,
  status: propsStatus,
  customRange,
  showLabels = true,
  showOptimalZone = true,
  compact = false,
  className = ''
}) => {
  // Get reference range configuration
  const rangeConfig = customRange || getReferenceRange(markerName);

  // Parse numeric value
  const numericValue = useMemo(() => {
    if (typeof value === 'number') return value;
    const parsed = parseFloat(String(value).replace(/[^\d.-]/g, ''));
    return isNaN(parsed) ? null : parsed;
  }, [value]);

  // Calculate status if not provided
  const status = propsStatus || (numericValue !== null ? calculateStatus(numericValue, rangeConfig) : 'Unknown');

  // Calculate position percentage (0-100)
  const positionPercent = useMemo(() => {
    if (numericValue === null) return 50;
    const { min, max, displayScale } = rangeConfig;

    if (displayScale === 'log') {
      // Logarithmic scale for markers like TSH
      const logMin = Math.log10(min);
      const logMax = Math.log10(max);
      const logValue = Math.log10(Math.max(numericValue, min * 0.1));
      return ((logValue - logMin) / (logMax - logMin)) * 100;
    } else {
      // Linear scale
      const clampedValue = Math.max(min, Math.min(max, numericValue));
      return ((clampedValue - min) / (max - min)) * 100;
    }
  }, [numericValue, rangeConfig]);

  // Calculate optimal zone position
  const optimalZone = useMemo(() => {
    if (!showOptimalZone) return null;
    const { min, max, optimalMin, optimalMax, displayScale } = rangeConfig;

    let leftPercent, widthPercent;

    if (displayScale === 'log') {
      const logMin = Math.log10(min);
      const logMax = Math.log10(max);
      const logOptimalMin = Math.log10(optimalMin);
      const logOptimalMax = Math.log10(optimalMax);

      leftPercent = ((logOptimalMin - logMin) / (logMax - logMin)) * 100;
      widthPercent = ((logOptimalMax - logOptimalMin) / (logMax - logMin)) * 100;
    } else {
      leftPercent = ((optimalMin - min) / (max - min)) * 100;
      widthPercent = ((optimalMax - optimalMin) / (max - min)) * 100;
    }

    return { left: leftPercent, width: widthPercent };
  }, [rangeConfig, showOptimalZone]);

  // Determine color based on status
  const getColor = () => {
    switch (status) {
      case 'Optimal':
        return {
          dot: '#0df280',
          dotShadow: 'rgba(13, 242, 128, 0.4)',
          zone: 'rgba(13, 242, 128, 0.2)'
        };
      case 'Normal':
        return {
          dot: '#0df280',
          dotShadow: 'rgba(13, 242, 128, 0.4)',
          zone: 'rgba(13, 242, 128, 0.15)'
        };
      case 'High':
        return {
          dot: '#ff5c00',
          dotShadow: 'rgba(255, 92, 0, 0.4)',
          zone: 'rgba(13, 242, 128, 0.1)'
        };
      case 'Moderate':
        return {
          dot: '#fbbf24',
          dotShadow: 'rgba(251, 191, 36, 0.4)',
          zone: 'rgba(13, 242, 128, 0.1)'
        };
      case 'Low':
        return {
          dot: '#ef4444',
          dotShadow: 'rgba(239, 68, 68, 0.4)',
          zone: 'rgba(13, 242, 128, 0.1)'
        };
      default:
        return {
          dot: '#9ca3af',
          dotShadow: 'rgba(156, 163, 175, 0.3)',
          zone: 'rgba(13, 242, 128, 0.1)'
        };
    }
  };

  const colors = getColor();
  const height = compact ? 'h-1.5' : 'h-2';

  // Clamp position to bar width (with padding for dot)
  const clampedPosition = Math.max(5, Math.min(95, positionPercent));

  return (
    <div className={`w-full ${className}`}>
      {/* Reference range bar */}
      <div className={`relative w-full ${height} rounded-full overflow-hidden`} style={{ background: 'rgba(255, 255, 255, 0.1)' }}>

        {/* Optimal zone highlight */}
        {showOptimalZone && optimalZone && (
          <div
            className="absolute top-0 bottom-0 rounded-full"
            style={{
              left: `${optimalZone.left}%`,
              width: `${optimalZone.width}%`,
              background: colors.zone,
              border: '1px solid rgba(13, 242, 128, 0.15)'
            }}
          />
        )}

        {/* Value indicator dot */}
        {numericValue !== null && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full transition-all duration-500 ease-out"
            style={{
              left: `${clampedPosition}%`,
              width: compact ? '10px' : '12px',
              height: compact ? '10px' : '12px',
              background: colors.dot,
              boxShadow: `0 0 8px ${colors.dotShadow}, inset 0 0 4px rgba(255, 255, 255, 0.3)`,
              border: '2px solid rgba(255, 255, 255, 0.9)'
            }}
          />
        )}
      </div>

      {/* Labels */}
      {showLabels && !compact && (
        <div className="flex justify-between mt-1.5 text-[10px] text-gray-500">
          <span>{rangeConfig.min}</span>
          {showOptimalZone && (
            <span className="text-[9px]" style={{ color: '#0df280' }}>
              Optimal
            </span>
          )}
          <span>{rangeConfig.max}</span>
        </div>
      )}

      {/* Compact label */}
      {compact && (
        <div className="flex justify-between mt-1 text-[9px] text-gray-500">
          <span>{rangeConfig.min}</span>
          <span>{rangeConfig.max}</span>
        </div>
      )}
    </div>
  );
};

/**
 * CompactReferenceRange - A minimal version for use in cards
 */
export const CompactReferenceRange = ({ value, markerName, status, className = '' }) => {
  return (
    <ReferenceRangeIndicator
      markerName={markerName}
      value={value}
      status={status}
      compact={true}
      showLabels={false}
      showOptimalZone={true}
      className={className}
    />
  );
};

/**
 * DetailedReferenceRange - Full version with labels and legend
 */
export const DetailedReferenceRange = ({ markerName, value, status, customRange, className = '' }) => {
  const rangeConfig = customRange || getReferenceRange(markerName);

  return (
    <div className={`w-full ${className}`}>
      <ReferenceRangeIndicator
        markerName={markerName}
        value={value}
        status={status}
        customRange={customRange}
        showLabels={true}
        showOptimalZone={true}
      />

      {/* Status legend */}
      <div className="flex items-center justify-center gap-4 mt-3">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: '#ef4444' }} />
          <span className="text-[9px] text-gray-500">Low</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: '#0df280' }} />
          <span className="text-[9px] text-gray-500">Optimal</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: '#ff5c00' }} />
          <span className="text-[9px] text-gray-500">High</span>
        </div>
      </div>
    </div>
  );
};

export default ReferenceRangeIndicator;
