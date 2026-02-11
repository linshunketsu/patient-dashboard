import React, { useMemo } from 'react';

/**
 * TrendSparkline Component - A compact mini chart showing trend preview
 *
 * @param {Object} props
 * @param {Array} props.historyData - Array of historical data points
 * @param {string} props.currentStatus - Current status for color theming
 * @param {string} props.size - 'small' (24px) or 'medium' (32px)
 */
const TrendSparkline = ({
  historyData = [],
  currentStatus = 'Normal',
  size = 'small',
}) => {
  // Color system matching Amber + Teal design
  const colors = useMemo(() => ({
    optimal: '#00BFA5',      // Teal
    normal: '#00BFA5',       // Teal
    high: '#FF7043',         // Coral
    low: '#E91E63',          // Rose
    moderate: '#FFA726',     // Amber-orange
    text: '#6B5D4F',
    improving: '#00BFA5',     // Green for improving trend
    declining: '#E91E63',     // Red for declining trend
    stable: '#FFA726',       // Amber for stable
  }), []);

  const getHeight = () => size === 'medium' ? 32 : 24;

  // Get bar color based on status
  const getBarColor = (status) => {
    switch (status) {
      case 'Optimal':
      case 'Normal':
        return colors.optimal;
      case 'High':
        return colors.high;
      case 'Low':
        return colors.low;
      case 'Moderate':
        return colors.moderate;
      default:
        return colors.optimal;
    }
  };

  // Calculate trend direction
  const trendInfo = useMemo(() => {
    if (!historyData || historyData.length < 2) {
      return { direction: 'stable', icon: 'remove', color: colors.stable };
    }

    const first = historyData[0].value;
    const last = historyData[historyData.length - 1].value;
    const diff = last - first;
    const threshold = Math.abs(first) * 0.05;

    if (Math.abs(diff) < threshold) {
      return { direction: 'stable', icon: 'remove', color: colors.stable };
    }

    const isImproving = diff > 0;
    return {
      direction: isImproving ? 'up' : 'down',
      icon: isImproving ? 'trending_up' : 'trending_down',
      color: isImproving ? colors.improving : colors.declining
    };
  }, [historyData, colors]);

  // Take last 3-4 data points for the sparkline
  const sparklineData = useMemo(() => {
    if (!historyData || historyData.length === 0) return [];
    const count = Math.min(4, historyData.length);
    return historyData.slice(-count);
  }, [historyData]);

  // Don't render if no data
  if (sparklineData.length === 0) {
    return null;
  }

  const height = getHeight();
  const barWidth = Math.max(3, Math.floor(20 / sparklineData.length));

  // Calculate bar heights relative to max value in sparkline
  const values = sparklineData.map(d => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  return (
    <div
      className="flex items-center gap-1.5 cursor-help"
      style={{ height: `${height}px` }}
      title={`${sparklineData.length} test results available. Tap to see full trend.`}
    >
      {/* Mini bars */}
      <div className="flex items-end gap-0.5" style={{ height: `${height - 4}px` }}>
        {sparklineData.map((point, index) => {
          const normalizedHeight = range > 0
            ? ((point.value - minVal) / range) * (height - 8)
            : (height - 8) / 2;
          const barHeight = Math.max(4, normalizedHeight);

          return (
            <div
              key={index}
              className="rounded-sm transition-all hover:opacity-80"
              style={{
                width: `${barWidth}px`,
                height: `${barHeight}px`,
                background: getBarColor(point.status),
                borderRadius: '2px',
                opacity: index === sparklineData.length - 1 ? 1 : 0.7,
              }}
            />
          );
        })}
      </div>

      {/* Trend indicator */}
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: '18px',
          height: '18px',
          background: `${trendInfo.color}15`,
        }}
      >
        <span
          className="material-symbols-outlined text-[12px]"
          style={{ color: trendInfo.color }}
        >
          {trendInfo.icon}
        </span>
      </div>

      {/* Test count badge */}
      <span
        className="text-[9px] font-medium px-1.5 py-0.5 rounded"
        style={{ color: colors.text }}
      >
        {historyData.length}
      </span>
    </div>
  );
};

/**
 * TrendIndicator - A simplified version showing just the trend arrow
 */
export const TrendIndicator = ({ historyData = [] }) => {
  const trendInfo = useMemo(() => {
    if (!historyData || historyData.length < 2) {
      return { direction: 'stable', icon: 'remove', color: '#FFA726' };
    }

    const first = historyData[0].value;
    const last = historyData[historyData.length - 1].value;
    const diff = last - first;
    const threshold = Math.abs(first) * 0.05;

    if (Math.abs(diff) < threshold) {
      return { direction: 'stable', icon: 'remove', color: '#FFA726' };
    }

    const isImproving = diff > 0;
    return {
      direction: isImproving ? 'up' : 'down',
      icon: isImproving ? 'arrow_upward' : 'arrow_downward',
      color: isImproving ? '#00BFA5' : '#E91E63'
    };
  }, [historyData]);

  if (historyData.length < 2) return null;

  return (
    <div
      className="flex items-center gap-1"
      title={`${historyData.length} test results available`}
    >
      <span
        className="material-symbols-outlined text-[14px]"
        style={{ color: trendInfo.color }}
      >
        {trendInfo.icon}
      </span>
      <span className="text-[9px]" style={{ color: '#6B5D4F' }}>
        {historyData.length}
      </span>
    </div>
  );
};

export default TrendSparkline;
