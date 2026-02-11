import { getReferenceRange, calculateStatus } from '../data/reference-ranges-config.js';

/**
 * Generates realistic historical data for a biomarker
 * @param {string} markerName - Name of the biomarker
 * @param {number} currentValue - Current value
 * @returns {Array} Array of historical data points
 */
export const generateTrendData = (markerName, currentValue) => {
  const rangeConfig = getReferenceRange(markerName);
  const { min, max, optimalMin, optimalMax } = rangeConfig;

  // Determine trend type based on current value status
  const currentStatus = calculateStatus(currentValue, rangeConfig);

  // Number of historical data points (6-12 months)
  const numPoints = Math.floor(Math.random() * 4) + 6; // 6-10 points
  const history = [];

  // Generate dates going back from today
  const today = new Date();
  const dates = [];
  for (let i = numPoints - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - i);
    // Add some randomness to the day (10-25th of month)
    date.setDate(Math.floor(Math.random() * 15) + 10);
    dates.push(date);
  }

  // Generate values based on trend type
  let trendType;
  if (currentStatus === 'Optimal' || currentStatus === 'Normal') {
    // If currently optimal, either improved or stayed stable
    trendType = Math.random() > 0.4 ? 'improving' : 'stable';
  } else if (currentStatus === 'Low') {
    // If low, either declining further or trying to improve
    trendType = Math.random() > 0.5 ? 'declining' : 'improving';
  } else if (currentStatus === 'High') {
    // If high, either increasing or trying to decrease
    trendType = Math.random() > 0.5 ? 'increasing' : 'decreasing';
  } else {
    trendType = ['stable', 'fluctuating'][Math.floor(Math.random() * 2)];
  }

  // Generate values along the trend
  dates.forEach((date, index) => {
    let value;
    const isLastPoint = index === dates.length - 1;

    if (isLastPoint) {
      // Last point is the current value
      value = currentValue;
    } else {
      // Generate historical value based on trend
      const progress = index / (dates.length - 1);

      switch (trendType) {
        case 'improving': {
          // Start from worse state, move toward optimal
          const optimalMid = (optimalMin + optimalMax) / 2;
          const startOffset = (max - min) * 0.3;
          value = optimalMid - startOffset + (startOffset * progress);
          break;
        }
        case 'declining':
        case 'increasing': {
          // Moving away from optimal
          const optimalMid = (optimalMin + optimalMax) / 2;
          const deviation = (max - min) * 0.2;
          value = optimalMid - (deviation * 0.5) + (deviation * progress * (trendType === 'increasing' ? 1 : -1));
          break;
        }
        case 'decreasing': {
          // Moving toward lower values (good for high markers like LDL)
          const optimalMid = (optimalMin + optimalMax) / 2;
          const startOffset = (max - min) * 0.3;
          value = optimalMid + startOffset - (startOffset * progress);
          break;
        }
        case 'stable': {
          // Fluctuate around current value
          const variance = (max - min) * 0.05;
          value = currentValue + (Math.random() - 0.5) * variance * 2;
          break;
        }
        case 'fluctuating': {
          // Random fluctuations
          const range = max - min;
          value = min + range * 0.3 + Math.random() * range * 0.4;
          break;
        }
        default: {
          value = (min + max) / 2;
        }
      }

      // Add some random variation
      const variance = (max - min) * 0.03;
      value += (Math.random() - 0.5) * variance;
    }

    // Clamp value to reasonable bounds
    value = Math.max(min * 0.5, Math.min(max * 1.2, value));
    value = Math.round(value * 10) / 10; // Round to 1 decimal place

    const status = calculateStatus(value, rangeConfig);

    history.push({
      date: date.toISOString().split('T')[0], // YYYY-MM-DD format
      value,
      status,
    });
  });

  return history;
};

/**
 * Generates historical data for multiple markers
 * @param {Array} markers - Array of marker objects with name and value
 * @returns {Object} Object with marker names as keys and history arrays as values
 */
export const generateBulkTrendData = (markers) => {
  const trendData = {};

  markers.forEach(marker => {
    const numericValue = parseFloat(marker.value) || parseFloat(marker.value?.replace(/[^\d.-]/g, ''));
    if (!isNaN(numericValue)) {
      trendData[marker.name] = {
        history: generateTrendData(marker.name, numericValue),
      };
    }
  });

  return trendData;
};
