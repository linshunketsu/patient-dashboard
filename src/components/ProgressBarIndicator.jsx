import React, { useMemo } from 'react';
import { getReferenceRange, calculateStatus } from '../data/reference-ranges-config.js';

/**
 * ProgressBarIndicator - Unidirectional health score progress bar
 * Shows health as a fill percentage from left to right
 *
 * @param {Object} props
 * @param {string} props.markerName - Name of the biomarker
 * @param {string|number} props.value - Current value
 * @param {string} props.status - Pre-calculated status (optional, will be calculated if not provided)
 * @param {string} props.unit - Display unit (optional)
 * @param {boolean} props.compact - Compact mode (default: false)
 * @param {string} props.className - Additional CSS classes
 */
const ProgressBarIndicator = ({
  markerName,
  value,
  status: propsStatus,
  unit,
  compact = false,
  className = ''
}) => {
  // Get reference range configuration
  const rangeConfig = getReferenceRange(markerName);

  // Parse numeric value
  const numericValue = useMemo(() => {
    if (typeof value === 'number') return value;
    const parsed = parseFloat(String(value).replace(/[^\d.-]/g, ''));
    return isNaN(parsed) ? null : parsed;
  }, [value]);

  // Calculate status if not provided
  const status = propsStatus || (numericValue !== null ? calculateStatus(numericValue, rangeConfig) : 'Unknown');

  // Calculate progress bar fill percentage based on health status
  const fillPercent = useMemo(() => {
    if (numericValue === null) return 50;
    const { optimalMin, optimalMax, min, max } = rangeConfig;

    if (status === 'Optimal') {
      // Within optimal range: 90-100% based on position within optimal
      const optimalRange = optimalMax - optimalMin;
      const optimalPosition = optimalRange > 0
        ? (numericValue - optimalMin) / optimalRange
        : 0.5;
      return 90 + (optimalPosition * 10); // 90-100%
    }

    if (status === 'Normal') {
      // Within reference range but outside optimal: 70-85%
      // Closer to optimal = higher fill
      const distToOptimalMin = Math.abs(numericValue - optimalMin);
      const distToOptimalMax = Math.abs(numericValue - optimalMax);
      const distToBoundary = Math.min(
        distToOptimalMin / Math.abs(min - optimalMin),
        distToOptimalMax / Math.abs(max - optimalMax)
      );
      return 85 - (Math.min(1, distToBoundary) * 15); // 70-85%
    }

    if (status === 'Moderate') {
      // Borderline: 50-70%
      return 60;
    }

    if (status === 'Low') {
      // Below minimum: 0-40% based on severity
      const severity = Math.min(1, (min - numericValue) / min);
      return 40 * (1 - severity);
    }

    if (status === 'High') {
      // Above maximum: 0-40% based on severity
      const severity = Math.min(1, (numericValue - max) / max);
      return 40 * (1 - severity);
    }

    return 50; // Unknown
  }, [numericValue, status, rangeConfig]);

  // Get bar color based on status - using Amber + Teal color system
  const getBarColor = () => {
    switch (status) {
      case 'Optimal':
        return '#00BFA5'; // Teal
      case 'Normal':
        return '#4DD0E1'; // Light teal
      case 'Moderate':
        return '#FFA726'; // Amber-orange
      case 'Low':
        return '#E91E63'; // Rose
      case 'High':
        return '#FF7043'; // Coral
      default:
        return '#9ca3af'; // Gray
    }
  };

  const barColor = getBarColor();
  const barHeight = compact ? 'h-5' : 'h-6';

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center gap-3">
        {/* Label */}
        <span className={`${compact ? 'text-xs' : 'text-sm'}`} style={{ color: '#6B5D4F' }}>Health Score</span>

        {/* Score percentage */}
        <span className={`font-bold ${compact ? 'text-sm' : 'text-base'}`} style={{ color: '#2D2416' }}>
          {Math.round(fillPercent)}
        </span>
      </div>

      {/* Progress bar */}
      <div className={`relative w-full ${barHeight} rounded-full overflow-hidden mt-2`} style={{ background: 'rgba(74, 66, 56, 0.12)' }}>
        {/* Fill bar */}
        <div
          className="absolute top-0 bottom-0 left-0 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${fillPercent}%`,
            background: barColor
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBarIndicator;
