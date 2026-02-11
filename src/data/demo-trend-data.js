import { generateTrendData } from '../utils/trend-data-generator.js';

// Demo historical data for common biomarkers
// This is pre-generated for the demo to ensure consistent, realistic data

const demoTrendData = {
  // Nutrition markers
  'Ferritin': {
    history: [
      { date: '2024-06-15', value: 22, status: 'Low' },
      { date: '2024-07-20', value: 28, status: 'Low' },
      { date: '2024-08-18', value: 35, status: 'Normal' },
      { date: '2024-09-22', value: 42, status: 'Optimal' },
      { date: '2024-10-15', value: 55, status: 'Optimal' },
      { date: '2024-11-10', value: 68, status: 'Optimal' },
      { date: '2024-12-12', value: 75, status: 'Optimal' },
    ]
  },
  'Vitamin D': {
    history: [
      { date: '2024-05-12', value: 18, status: 'Low' },
      { date: '2024-06-18', value: 25, status: 'Normal' },
      { date: '2024-07-22', value: 32, status: 'Normal' },
      { date: '2024-08-15', value: 38, status: 'Normal' },
      { date: '2024-09-20', value: 45, status: 'Optimal' },
      { date: '2024-10-25', value: 48, status: 'Optimal' },
      { date: '2024-11-14', value: 52, status: 'Optimal' },
    ]
  },
  'Vitamin B12': {
    history: [
      { date: '2024-04-10', value: 350, status: 'Normal' },
      { date: '2024-06-15', value: 380, status: 'Normal' },
      { date: '2024-08-20', value: 420, status: 'Optimal' },
      { date: '2024-10-12', value: 480, status: 'Optimal' },
      { date: '2024-12-05', value: 520, status: 'Optimal' },
      { date: '2025-01-08', value: 550, status: 'Optimal' },
    ]
  },
  'Folate': {
    history: [
      { date: '2024-03-15', value: 4.2, status: 'Normal' },
      { date: '2024-05-20', value: 5.8, status: 'Optimal' },
      { date: '2024-07-18', value: 7.2, status: 'Optimal' },
      { date: '2024-09-22', value: 8.5, status: 'Optimal' },
      { date: '2024-11-10', value: 9.1, status: 'Optimal' },
      { date: '2025-01-05', value: 9.8, status: 'Optimal' },
    ]
  },
  'Iron': {
    history: [
      { date: '2024-05-12', value: 45, status: 'Low' },
      { date: '2024-07-18', value: 55, status: 'Normal' },
      { date: '2024-09-22', value: 72, status: 'Optimal' },
      { date: '2024-11-15', value: 85, status: 'Optimal' },
      { date: '2025-01-08', value: 95, status: 'Optimal' },
    ]
  },

  // Cardio markers
  'LDL Cholesterol': {
    history: [
      { date: '2024-02-15', value: 145, status: 'Moderate' },
      { date: '2024-04-20', value: 138, status: 'Moderate' },
      { date: '2024-06-18', value: 125, status: 'Moderate' },
      { date: '2024-08-22', value: 110, status: 'Normal' },
      { date: '2024-10-15', value: 98, status: 'Optimal' },
      { date: '2024-12-10', value: 92, status: 'Optimal' },
      { date: '2025-01-12', value: 88, status: 'Optimal' },
    ]
  },
  'HDL Cholesterol': {
    history: [
      { date: '2024-03-12', value: 32, status: 'Normal' },
      { date: '2024-05-18', value: 35, status: 'Normal' },
      { date: '2024-07-22', value: 38, status: 'Normal' },
      { date: '2024-09-15', value: 42, status: 'Optimal' },
      { date: '2024-11-10', value: 45, status: 'Optimal' },
      { date: '2025-01-05', value: 48, status: 'Optimal' },
    ]
  },
  'Triglycerides': {
    history: [
      { date: '2024-01-15', value: 180, status: 'Moderate' },
      { date: '2024-03-20', value: 165, status: 'Moderate' },
      { date: '2024-05-18', value: 150, status: 'Normal' },
      { date: '2024-07-22', value: 135, status: 'Normal' },
      { date: '2024-09-15', value: 125, status: 'Optimal' },
      { date: '2024-11-10', value: 118, status: 'Optimal' },
      { date: '2025-01-05', value: 112, status: 'Optimal' },
    ]
  },
  'Homocysteine': {
    history: [
      { date: '2024-02-12', value: 14, status: 'Normal' },
      { date: '2024-04-18', value: 13, status: 'Optimal' },
      { date: '2024-06-22', value: 11, status: 'Optimal' },
      { date: '2024-08-15', value: 10, status: 'Optimal' },
      { date: '2024-10-20', value: 9, status: 'Optimal' },
      { date: '2024-12-12', value: 8, status: 'Optimal' },
      { date: '2025-01-10', value: 7.5, status: 'Optimal' },
    ]
  },
  'CRP': {
    history: [
      { date: '2024-03-15', value: 4.2, status: 'Normal' },
      { date: '2024-05-20', value: 3.8, status: 'Normal' },
      { date: '2024-07-18', value: 2.5, status: 'Optimal' },
      { date: '2024-09-22', value: 1.8, status: 'Optimal' },
      { date: '2024-11-15', value: 1.2, status: 'Optimal' },
      { date: '2025-01-08', value: 0.9, status: 'Optimal' },
    ]
  },

  // Gut markers
  'Zonulin': {
    history: [
      { date: '2024-04-12', value: 65, status: 'Normal' },
      { date: '2024-06-18', value: 58, status: 'Optimal' },
      { date: '2024-08-22', value: 45, status: 'Optimal' },
      { date: '2024-10-15', value: 38, status: 'Optimal' },
      { date: '2024-12-10', value: 32, status: 'Optimal' },
      { date: '2025-01-12', value: 28, status: 'Optimal' },
    ]
  },
  'Calprotectin': {
    history: [
      { date: '2024-02-15', value: 85, status: 'Normal' },
      { date: '2024-04-20', value: 72, status: 'Optimal' },
      { date: '2024-06-18', value: 55, status: 'Optimal' },
      { date: '2024-08-22', value: 42, status: 'Optimal' },
      { date: '2024-10-15', value: 35, status: 'Optimal' },
      { date: '2024-12-10', value: 28, status: 'Optimal' },
    ]
  },

  // Hormone markers
  'Cortisol': {
    history: [
      { date: '2024-03-12', value: 22, status: 'Normal' },
      { date: '2024-05-18', value: 20, status: 'Normal' },
      { date: '2024-07-22', value: 17, status: 'Optimal' },
      { date: '2024-09-15', value: 15, status: 'Optimal' },
      { date: '2024-11-10', value: 14, status: 'Optimal' },
      { date: '2025-01-05', value: 13, status: 'Optimal' },
    ]
  },
  'Testosterone': {
    history: [
      { date: '2024-01-15', value: 320, status: 'Normal' },
      { date: '2024-03-20', value: 350, status: 'Normal' },
      { date: '2024-05-18', value: 420, status: 'Optimal' },
      { date: '2024-07-22', value: 480, status: 'Optimal' },
      { date: '2024-09-15', value: 520, status: 'Optimal' },
      { date: '2024-11-10', value: 550, status: 'Optimal' },
      { date: '2025-01-05', value: 580, status: 'Optimal' },
    ]
  },
  'DHEA-S': {
    history: [
      { date: '2024-02-12', value: 85, status: 'Normal' },
      { date: '2024-04-18', value: 120, status: 'Normal' },
      { date: '2024-06-22', value: 180, status: 'Normal' },
      { date: '2024-08-15', value: 220, status: 'Optimal' },
      { date: '2024-10-20', value: 250, status: 'Optimal' },
      { date: '2024-12-12', value: 280, status: 'Optimal' },
      { date: '2025-01-10', value: 300, status: 'Optimal' },
    ]
  },

  // Thyroid markers
  'TSH': {
    history: [
      { date: '2024-02-15', value: 4.2, status: 'Normal' },
      { date: '2024-04-20', value: 3.5, status: 'Normal' },
      { date: '2024-06-18', value: 2.8, status: 'Optimal' },
      { date: '2024-08-22', value: 2.2, status: 'Optimal' },
      { date: '2024-10-15', value: 1.8, status: 'Optimal' },
      { date: '2024-12-10', value: 1.5, status: 'Optimal' },
      { date: '2025-01-12', value: 1.4, status: 'Optimal' },
    ]
  },
  'Free T4': {
    history: [
      { date: '2024-03-12', value: 0.95, status: 'Normal' },
      { date: '2024-05-18', value: 1.05, status: 'Optimal' },
      { date: '2024-07-22', value: 1.15, status: 'Optimal' },
      { date: '2024-09-15', value: 1.25, status: 'Optimal' },
      { date: '2024-11-10', value: 1.30, status: 'Optimal' },
      { date: '2025-01-05', value: 1.35, status: 'Optimal' },
    ]
  },
  'Free T3': {
    history: [
      { date: '2024-02-15', value: 2.3, status: 'Normal' },
      { date: '2024-04-20', value: 2.6, status: 'Optimal' },
      { date: '2024-06-18', value: 2.9, status: 'Optimal' },
      { date: '2024-08-22', value: 3.1, status: 'Optimal' },
      { date: '2024-10-15', value: 3.3, status: 'Optimal' },
      { date: '2024-12-10', value: 3.4, status: 'Optimal' },
      { date: '2025-01-12', value: 3.5, status: 'Optimal' },
    ]
  },

  // Immune markers
  'IgG': {
    history: [
      { date: '2024-01-15', value: 950, status: 'Normal' },
      { date: '2024-03-20', value: 1050, status: 'Normal' },
      { date: '2024-05-18', value: 1150, status: 'Optimal' },
      { date: '2024-07-22', value: 1250, status: 'Optimal' },
      { date: '2024-09-15', value: 1300, status: 'Optimal' },
      { date: '2024-11-10', value: 1350, status: 'Optimal' },
      { date: '2025-01-05', value: 1400, status: 'Optimal' },
    ]
  },
  'IgA': {
    history: [
      { date: '2024-02-12', value: 95, status: 'Normal' },
      { date: '2024-04-18', value: 120, status: 'Optimal' },
      { date: '2024-06-22', value: 150, status: 'Optimal' },
      { date: '2024-08-15', value: 180, status: 'Optimal' },
      { date: '2024-10-20', value: 200, status: 'Optimal' },
      { date: '2024-12-12', value: 220, status: 'Optimal' },
      { date: '2025-01-10', value: 235, status: 'Optimal' },
    ]
  },
  'White Blood Cells': {
    history: [
      { date: '2024-03-15', value: 6.8, status: 'Optimal' },
      { date: '2024-05-20', value: 7.2, status: 'Optimal' },
      { date: '2024-07-18', value: 7.5, status: 'Optimal' },
      { date: '2024-09-22', value: 7.0, status: 'Optimal' },
      { date: '2024-11-15', value: 6.9, status: 'Optimal' },
      { date: '2025-01-08', value: 7.1, status: 'Optimal' },
    ]
  },
  'Lymphocytes': {
    history: [
      { date: '2024-02-15', value: 22, status: 'Normal' },
      { date: '2024-04-20', value: 24, status: 'Optimal' },
      { date: '2024-06-18', value: 26, status: 'Optimal' },
      { date: '2024-08-22', value: 28, status: 'Optimal' },
      { date: '2024-10-15', value: 29, status: 'Optimal' },
      { date: '2024-12-10', value: 30, status: 'Optimal' },
      { date: '2025-01-12', value: 31, status: 'Optimal' },
    ]
  },

  // Neural markers
  'Serotonin': {
    history: [
      { date: '2024-01-15', value: 95, status: 'Normal' },
      { date: '2024-03-20', value: 115, status: 'Normal' },
      { date: '2024-05-18', value: 135, status: 'Optimal' },
      { date: '2024-07-22', value: 150, status: 'Optimal' },
      { date: '2024-09-15', value: 165, status: 'Optimal' },
      { date: '2024-11-10', value: 175, status: 'Optimal' },
      { date: '2025-01-05', value: 180, status: 'Optimal' },
    ]
  },
  'Omega-3': {
    history: [
      { date: '2024-02-12', value: 3.5, status: 'Normal' },
      { date: '2024-04-18', value: 4.8, status: 'Normal' },
      { date: '2024-06-22', value: 6.2, status: 'Optimal' },
      { date: '2024-08-15', value: 7.5, status: 'Optimal' },
      { date: '2024-10-20', value: 8.2, status: 'Optimal' },
      { date: '2024-12-12', value: 8.8, status: 'Optimal' },
      { date: '2025-01-10', value: 9.2, status: 'Optimal' },
    ]
  },
  'Vitamin D (Neural)': {
    history: [
      { date: '2024-05-12', value: 18, status: 'Low' },
      { date: '2024-06-18', value: 25, status: 'Normal' },
      { date: '2024-07-22', value: 32, status: 'Normal' },
      { date: '2024-08-15', value: 38, status: 'Normal' },
      { date: '2024-09-20', value: 45, status: 'Optimal' },
      { date: '2024-10-25', value: 48, status: 'Optimal' },
      { date: '2024-11-14', value: 52, status: 'Optimal' },
    ]
  },
  'B12': {
    history: [
      { date: '2024-04-10', value: 350, status: 'Normal' },
      { date: '2024-06-15', value: 380, status: 'Normal' },
      { date: '2024-08-20', value: 420, status: 'Optimal' },
      { date: '2024-10-12', value: 480, status: 'Optimal' },
      { date: '2024-12-05', value: 520, status: 'Optimal' },
      { date: '2025-01-08', value: 550, status: 'Optimal' },
    ]
  },

  // Liver markers
  'ALT': {
    history: [
      { date: '2024-02-15', value: 52, status: 'Normal' },
      { date: '2024-04-20', value: 45, status: 'Optimal' },
      { date: '2024-06-18', value: 38, status: 'Optimal' },
      { date: '2024-08-22', value: 32, status: 'Optimal' },
      { date: '2024-10-15', value: 28, status: 'Optimal' },
      { date: '2024-12-10', value: 25, status: 'Optimal' },
      { date: '2025-01-12', value: 24, status: 'Optimal' },
    ]
  },
  'AST': {
    history: [
      { date: '2024-03-12', value: 42, status: 'Normal' },
      { date: '2024-05-18', value: 38, status: 'Optimal' },
      { date: '2024-07-22', value: 32, status: 'Optimal' },
      { date: '2024-09-15', value: 28, status: 'Optimal' },
      { date: '2024-11-10', value: 25, status: 'Optimal' },
      { date: '2025-01-05', value: 22, status: 'Optimal' },
    ]
  },

  // Kidney markers
  'Creatinine': {
    history: [
      { date: '2024-02-15', value: 1.15, status: 'Normal' },
      { date: '2024-04-20', value: 1.08, status: 'Optimal' },
      { date: '2024-06-18', value: 1.02, status: 'Optimal' },
      { date: '2024-08-22', value: 0.98, status: 'Optimal' },
      { date: '2024-10-15', value: 0.95, status: 'Optimal' },
      { date: '2024-12-10', value: 0.92, status: 'Optimal' },
      { date: '2025-01-12', value: 0.90, status: 'Optimal' },
    ]
  },
  'eGFR': {
    history: [
      { date: '2024-03-12', value: 82, status: 'Normal' },
      { date: '2024-05-18', value: 88, status: 'Optimal' },
      { date: '2024-07-22', value: 95, status: 'Optimal' },
      { date: '2024-09-15', value: 102, status: 'Optimal' },
      { date: '2024-11-10', value: 108, status: 'Optimal' },
      { date: '2025-01-05', value: 115, status: 'Optimal' },
    ]
  },

  // Pancreas markers
  'Glucose': {
    history: [
      { date: '2024-02-15', value: 108, status: 'Normal' },
      { date: '2024-04-20', value: 98, status: 'Optimal' },
      { date: '2024-06-18', value: 92, status: 'Optimal' },
      { date: '2024-08-22', value: 88, status: 'Optimal' },
      { date: '2024-10-15', value: 85, status: 'Optimal' },
      { date: '2024-12-10', value: 82, status: 'Optimal' },
      { date: '2025-01-12', value: 80, status: 'Optimal' },
    ]
  },
  'HbA1c': {
    history: [
      { date: '2024-01-15', value: 6.0, status: 'Normal' },
      { date: '2024-03-20', value: 5.7, status: 'Normal' },
      { date: '2024-05-18', value: 5.4, status: 'Optimal' },
      { date: '2024-07-22', value: 5.2, status: 'Optimal' },
      { date: '2024-09-15', value: 5.1, status: 'Optimal' },
      { date: '2024-11-10', value: 5.0, status: 'Optimal' },
      { date: '2025-01-05', value: 4.9, status: 'Optimal' },
    ]
  },

  // RBC markers
  'Hemoglobin': {
    history: [
      { date: '2024-02-15', value: 12.8, status: 'Normal' },
      { date: '2024-04-20', value: 13.2, status: 'Optimal' },
      { date: '2024-06-18', value: 13.8, status: 'Optimal' },
      { date: '2024-08-22', value: 14.2, status: 'Optimal' },
      { date: '2024-10-15', value: 14.5, status: 'Optimal' },
      { date: '2024-12-10', value: 14.8, status: 'Optimal' },
      { date: '2025-01-12', value: 15.0, status: 'Optimal' },
    ]
  },
  'Hematocrit': {
    history: [
      { date: '2024-03-12', value: 38, status: 'Normal' },
      { date: '2024-05-18', value: 40, status: 'Optimal' },
      { date: '2024-07-22', value: 42, status: 'Optimal' },
      { date: '2024-09-15', value: 43, status: 'Optimal' },
      { date: '2024-11-10', value: 44, status: 'Optimal' },
      { date: '2025-01-05', value: 45, status: 'Optimal' },
    ]
  },
};

/**
 * Gets historical data for a specific marker
 * If not found in demo data, generates it on the fly
 * @param {string} markerName - Name of the biomarker
 * @param {number} currentValue - Current value for generating data if not found
 * @returns {Array|null} Array of historical data points or null
 */
export const getHistoricalDataForMarker = (markerName, currentValue) => {
  if (demoTrendData[markerName]) {
    return demoTrendData[markerName].history;
  }

  // If no pre-made data exists and a current value is provided, generate it
  if (currentValue !== undefined) {
    return generateTrendData(markerName, currentValue);
  }

  return null;
};

/**
 * Gets all demo trend data
 * @returns {Object} All demo trend data
 */
export const getAllDemoTrendData = () => {
  return demoTrendData;
};

export default demoTrendData;
