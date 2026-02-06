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

  // Determine color based on status - using Amber + Teal color system
  const getColor = () => {
    switch (status) {
      case 'Optimal':
        return {
          dot: '#00BFA5',              // Teal - good contrast on light
          dotShadow: 'rgba(0, 191, 165, 0.5)',
          zone: '#00BFA5',             // Solid teal for optimal - no transparency
        };
      case 'Normal':
        return {
          dot: '#00BFA5',              // Teal
          dotShadow: 'rgba(0, 191, 165, 0.4)',
          zone: '#00BFA5',             // Solid teal for normal range
        };
      case 'High':
        return {
          dot: '#FF7043',              // Coral
          dotShadow: 'rgba(255, 112, 67, 0.5)',
        };
      case 'Moderate':
        return {
          dot: '#FFA726',              // Amber-orange
          dotShadow: 'rgba(255, 167, 38, 0.5)',
        };
      case 'Low':
        return {
          dot: '#E91E63',              // Rose
          dotShadow: 'rgba(233, 30, 99, 0.5)',
        };
      default:
        return {
          dot: '#9ca3af',              // Gray
          dotShadow: 'rgba(156, 163, 175, 0.3)',
        };
    }
  };

  const colors = getColor();
  const height = compact ? 'h-1.5' : 'h-2';
  const isOptimalOrNormal = status === 'Optimal' || status === 'Normal';

  // Clamp position to bar width (with padding for dot)
  const clampedPosition = Math.max(5, Math.min(95, positionPercent));

  return (
    <div className={`w-full ${className}`}>
      {/* Reference range bar */}
      <div className={`relative w-full ${height} rounded-full overflow-hidden`} style={{ background: 'rgba(235, 230, 220, 0.6)' }}>

        {/* Optimal zone highlight - solid color for clear visibility */}
        {showOptimalZone && optimalZone && (
          <div
            className="absolute top-0 bottom-0 rounded-full"
            style={{
              left: `${optimalZone.left}%`,
              width: `${optimalZone.width}%`,
              background: colors.zone || 'rgba(0, 191, 165, 0.6)',
              opacity: colors.zone ? 1 : 0.6,
            }}
          />
        )}

        {/* Value indicator dot */}
        {numericValue !== null && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full transition-all duration-500 ease-out"
            style={{
              left: `${clampedPosition}%`,
              width: compact ? '11px' : '12px',
              height: compact ? '11px' : '12px',
              background: colors.dot,
              boxShadow: `0 0 0 2px white, 0 0 8px ${colors.dotShadow}`,
              border: `1px solid ${colors.dot}`
            }}
          />
        )}
      </div>

      {/* Labels */}
      {showLabels && !compact && (
        <div className="flex justify-between mt-1.5 text-[10px]" style={{ color: '#6B5D4F' }}>
          <span>{rangeConfig.min}</span>
          {showOptimalZone && (
            <span className="text-[9px] font-semibold" style={{ color: '#00BFA5' }}>
              Optimal
            </span>
          )}
          <span>{rangeConfig.max}</span>
        </div>
      )}

      {/* Compact label */}
      {compact && (
        <div className="flex justify-between mt-1 text-[9px]" style={{ color: '#6B5D4F' }}>
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

      {/* Status legend - using Amber + Teal colors */}
      <div className="flex items-center justify-center gap-4 mt-3">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: '#E91E63' }} />
          <span className="text-[9px]" style={{ color: '#6B5D4F' }}>Low</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-2 rounded-full relative overflow-hidden" style={{ background: 'rgba(235, 230, 220, 0.6)' }}>
            <div className="absolute inset-0 rounded-full" style={{ background: '#00BFA5' }} />
          </div>
          <span className="text-[9px] font-semibold" style={{ color: '#00BFA5' }}>Optimal</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: '#FF7043' }} />
          <span className="text-[9px]" style={{ color: '#6B5D4F' }}>High</span>
        </div>
      </div>
    </div>
  );
};

export default ReferenceRangeIndicator;
