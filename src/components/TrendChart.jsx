import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';

/**
 * TrendChart Component - Displays historical biomarker values as a bar chart
 *
 * @param {Object} props
 * @param {string} props.markerName - Name of the biomarker
 * @param {Array} props.historyData - Array of historical data points with date, value, status
 * @param {Object} props.referenceRange - Reference range configuration (min, max, optimalMin, optimalMax)
 * @param {string} props.unit - Unit of measurement
 * @param {string} props.currentStatus - Current status for default coloring
 * @param {boolean} props.compact - Compact mode for smaller displays (default: false)
 */
const TrendChart = ({
  markerName,
  historyData = [],
  referenceRange,
  unit = '',
  currentStatus = 'Normal',
  compact = false,
}) => {
  // Chart dimensions
  const chartHeight = compact ? 140 : 180;
  const chartMargin = { top: 10, right: 10, left: 0, bottom: 20 };

  // Color system matching Amber + Teal design
  const colors = useMemo(() => ({
    optimal: '#00BFA5',      // Teal
    normal: '#00BFA5',       // Teal
    high: '#FF7043',         // Coral
    low: '#E91E63',          // Rose
    moderate: '#FFA726',     // Amber-orange
    referenceLineOptimal: 'rgba(0, 191, 165, 0.3)',
    referenceLineMinMax: 'rgba(107, 93, 79, 0.2)',
    grid: 'rgba(235, 230, 220, 0.5)',
    text: '#6B5D4F',
  }), []);

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

  // Prepare chart data with formatted dates
  const chartData = useMemo(() => {
    return historyData.map(point => {
      const date = new Date(point.date);
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return {
        ...point,
        shortDate: monthNames[date.getMonth()],
        fullDate: date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        color: getBarColor(point.status),
      };
    });
  }, [historyData, colors]);

  // Calculate Y-axis domain with padding
  const yDomain = useMemo(() => {
    if (!referenceRange) {
      const values = historyData.map(d => d.value);
      const minVal = Math.min(...values);
      const maxVal = Math.max(...values);
      const padding = (maxVal - minVal) * 0.15;
      return [minVal - padding, maxVal + padding];
    }

    const { min, max } = referenceRange;
    const padding = (max - min) * 0.1;
    return [min - padding, max + padding];
  }, [referenceRange, historyData]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    return (
      <div
        className="px-3 py-2 rounded-lg shadow-lg text-sm"
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(74, 66, 56, 0.1)',
          color: '#2D2416',
        }}
      >
        <div className="font-semibold" style={{ color: '#6B5D4F' }}>{data.fullDate}</div>
        <div className="flex items-center gap-2 mt-1">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ background: data.color }}
          />
          <span className="font-bold">{data.value}</span>
          <span className="text-xs" style={{ color: '#6B5D4F' }}>{unit}</span>
        </div>
        <div
          className="text-xs mt-1 px-2 py-0.5 rounded inline-block"
          style={{
            background: data.status === 'Optimal' || data.status === 'Normal'
              ? 'rgba(0, 191, 165, 0.15)'
              : data.status === 'High'
                ? 'rgba(255, 112, 67, 0.15)'
                : data.status === 'Low'
                  ? 'rgba(233, 30, 99, 0.15)'
                  : 'rgba(255, 167, 38, 0.15)',
            color: data.color,
          }}
        >
          {data.status}
        </div>
      </div>
    );
  };

  // Don't render if no data
  if (!chartData || chartData.length === 0) {
    return null;
  }

  // Single data point - show simple message
  if (chartData.length === 1) {
    return (
      <div className="text-center py-4" style={{ color: '#6B5D4F' }}>
        <span className="material-symbols-outlined text-sm align-middle mr-1" style={{ color: '#F59E0B' }}>
          info
        </span>
        <span className="text-xs">Only one test result available. More data needed to show trends.</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Chart header */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6B5D4F' }}>
          Historical Trends
        </h4>
        <span className="text-xs" style={{ color: '#6B5D4F' }}>
          {chartData.length} test{chartData.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Chart */}
      <div style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={chartMargin}
            barCategoryGap="20%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.grid}
              horizontal={true}
              vertical={false}
            />

            <XAxis
              dataKey="shortDate"
              tick={{ fill: colors.text, fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: colors.text, fontSize: 10 }}
              domain={yDomain}
              axisLine={false}
              tickLine={false}
              width={35}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Reference lines for optimal range */}
            {referenceRange && (
              <>
                <ReferenceLine
                  y={referenceRange.optimalMin}
                  stroke={colors.referenceLineOptimal}
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                />
                <ReferenceLine
                  y={referenceRange.optimalMax}
                  stroke={colors.referenceLineOptimal}
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                />
              </>
            )}

            {/* Bars with individual colors */}
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              maxBarSize={compact ? 24 : 32}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-3 text-[9px]" style={{ color: '#6B5D4F' }}>
        <div className="flex items-center gap-1">
          <div className="w-6 h-2 rounded" style={{ background: colors.referenceLineOptimal }} />
          <span>Optimal Range</span>
        </div>
      </div>
    </div>
  );
};

/**
 * CompactTrendChart - A smaller version for use in expanded marker cards
 */
export const CompactTrendChart = (props) => {
  return <TrendChart {...props} compact={true} />;
};

export default TrendChart;
