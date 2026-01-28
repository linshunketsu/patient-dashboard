// Reference range configuration for demo biomarkers
// In production, this would come from the API or lab results

export const referenceRangesConfig = {
  // Nutrition markers
  'Ferritin': {
    unit: 'ng/mL',
    min: 30,
    max: 300,
    optimalMin: 50,
    optimalMax: 150,
    displayScale: 'linear'
  },
  'Vitamin D': {
    unit: 'ng/mL',
    min: 20,
    max: 100,
    optimalMin: 40,
    optimalMax: 60,
    displayScale: 'linear'
  },
  'Vitamin B12': {
    unit: 'pg/mL',
    min: 200,
    max: 900,
    optimalMin: 400,
    optimalMax: 700,
    displayScale: 'linear'
  },
  'Folate': {
    unit: 'ng/mL',
    min: 3,
    max: 20,
    optimalMin: 5,
    optimalMax: 15,
    displayScale: 'linear'
  },
  'Iron': {
    unit: 'mcg/dL',
    min: 50,
    max: 170,
    optimalMin: 70,
    optimalMax: 150,
    displayScale: 'linear'
  },
  'Transferrin': {
    unit: 'mg/dL',
    min: 200,
    max: 400,
    optimalMin: 220,
    optimalMax: 350,
    displayScale: 'linear'
  },

  // Cardio markers
  'LDL Cholesterol': {
    unit: 'mg/dL',
    min: 50,
    max: 200,
    optimalMin: 50,
    optimalMax: 100,
    displayScale: 'linear',
    invertOptimal: true // lower is better
  },
  'HDL Cholesterol': {
    unit: 'mg/dL',
    min: 20,
    max: 100,
    optimalMin: 40,
    optimalMax: 100,
    displayScale: 'linear'
  },
  'Triglycerides': {
    unit: 'mg/dL',
    min: 50,
    max: 400,
    optimalMin: 50,
    optimalMax: 150,
    displayScale: 'linear'
  },
  'ApoB': {
    unit: 'mg/dL',
    min: 50,
    max: 150,
    optimalMin: 50,
    optimalMax: 90,
    displayScale: 'linear'
  },
  'CRP': {
    unit: 'mg/L',
    min: 0,
    max: 10,
    optimalMin: 0,
    optimalMax: 3,
    displayScale: 'linear'
  },
  'Homocysteine': {
    unit: 'umol/L',
    min: 5,
    max: 20,
    optimalMin: 5,
    optimalMax: 12,
    displayScale: 'linear'
  },

  // Gut markers
  'Zonulin': {
    unit: 'ng/mL',
    min: 0,
    max: 100,
    optimalMin: 0,
    optimalMax: 50,
    displayScale: 'linear'
  },
  'Calprotectin': {
    unit: 'ug/g',
    min: 0,
    max: 200,
    optimalMin: 0,
    optimalMax: 50,
    displayScale: 'linear'
  },
  'Bifidobacterium': {
    unit: '%',
    min: 0,
    max: 20,
    optimalMin: 5,
    optimalMax: 15,
    displayScale: 'linear'
  },
  'Lactobacillus': {
    unit: '%',
    min: 0,
    max: 15,
    optimalMin: 3,
    optimalMax: 10,
    displayScale: 'linear'
  },
  'E. coli': {
    unit: '%',
    min: 0,
    max: 15,
    optimalMin: 2,
    optimalMax: 8,
    displayScale: 'linear'
  },
  'Short-Chain Fatty Acids': {
    unit: 'mmol/L',
    min: 50,
    max: 150,
    optimalMin: 80,
    optimalMax: 130,
    displayScale: 'linear'
  },
  'Akkermansia': {
    unit: '%',
    min: 0,
    max: 10,
    optimalMin: 1,
    optimalMax: 5,
    displayScale: 'linear'
  },

  // Hormone markers
  'Cortisol': {
    unit: 'ug/dL',
    min: 3,
    max: 25,
    optimalMin: 8,
    optimalMax: 18,
    displayScale: 'linear'
  },
  'DHEA-S': {
    unit: 'ug/dL',
    min: 10,
    max: 400,
    optimalMin: 100,
    optimalMax: 350,
    displayScale: 'linear'
  },
  'Testosterone': {
    unit: 'ng/dL',
    min: 200,
    max: 1200,
    optimalMin: 400,
    optimalMax: 900,
    displayScale: 'linear'
  },
  'Estradiol': {
    unit: 'pg/mL',
    min: 10,
    max: 400,
    optimalMin: 30,
    optimalMax: 200,
    displayScale: 'linear'
  },
  'Progesterone': {
    unit: 'ng/mL',
    min: 0.1,
    max: 30,
    optimalMin: 5,
    optimalMax: 20,
    displayScale: 'linear'
  },
  'FSH': {
    unit: 'mIU/mL',
    min: 1,
    max: 30,
    optimalMin: 3,
    optimalMax: 15,
    displayScale: 'linear'
  },
  'Pregnenolone': {
    unit: 'ng/dL',
    min: 10,
    max: 200,
    optimalMin: 50,
    optimalMax: 150,
    displayScale: 'linear'
  },
  'Aldosterone': {
    unit: 'ng/dL',
    min: 2,
    max: 20,
    optimalMin: 5,
    optimalMax: 15,
    displayScale: 'linear'
  },

  // Immune markers
  'IgG': {
    unit: 'mg/dL',
    min: 500,
    max: 1800,
    optimalMin: 700,
    optimalMax: 1600,
    displayScale: 'linear'
  },
  'IgA': {
    unit: 'mg/dL',
    min: 50,
    max: 500,
    optimalMin: 100,
    optimalMax: 400,
    displayScale: 'linear'
  },
  'IgM': {
    unit: 'mg/dL',
    min: 20,
    max: 300,
    optimalMin: 40,
    optimalMax: 230,
    displayScale: 'linear'
  },
  'White Blood Cell': {
    unit: 'x10^3/uL',
    min: 3.5,
    max: 12,
    optimalMin: 4.5,
    optimalMax: 10,
    displayScale: 'linear'
  },
  'White Blood Cells': {
    unit: 'x10^3/uL',
    min: 3.5,
    max: 12,
    optimalMin: 4.5,
    optimalMax: 10,
    displayScale: 'linear'
  },
  'Lymphocytes': {
    unit: '%',
    min: 15,
    max: 50,
    optimalMin: 20,
    optimalMax: 40,
    displayScale: 'linear'
  },
  'Neutrophils': {
    unit: '%',
    min: 35,
    max: 80,
    optimalMin: 40,
    optimalMax: 70,
    displayScale: 'linear'
  },
  'Monocytes': {
    unit: '%',
    min: 1,
    max: 12,
    optimalMin: 2,
    optimalMax: 8,
    displayScale: 'linear'
  },
  'Eosinophils': {
    unit: '%',
    min: 0,
    max: 6,
    optimalMin: 0.5,
    optimalMax: 4,
    displayScale: 'linear'
  },
  'Basophils': {
    unit: '%',
    min: 0,
    max: 2,
    optimalMin: 0.1,
    optimalMax: 1,
    displayScale: 'linear'
  },

  // Thyroid markers
  'TSH': {
    unit: 'mIU/L',
    min: 0.3,
    max: 5,
    optimalMin: 0.5,
    optimalMax: 2.5,
    displayScale: 'log' // logarithmic scale better for TSH
  },
  'Free T4': {
    unit: 'ng/dL',
    min: 0.7,
    max: 2,
    optimalMin: 1,
    optimalMax: 1.6,
    displayScale: 'linear'
  },
  'Free T3': {
    unit: 'pg/mL',
    min: 2,
    max: 4.5,
    optimalMin: 2.5,
    optimalMax: 4,
    displayScale: 'linear'
  },
  'Reverse T3': {
    unit: 'ng/dL',
    min: 5,
    max: 35,
    optimalMin: 5,
    optimalMax: 20,
    displayScale: 'linear'
  },
  'Anti-TPO': {
    unit: 'IU/mL',
    min: 0,
    max: 35,
    optimalMin: 0,
    optimalMax: 9,
    displayScale: 'linear'
  },
  'Anti-Tg': {
    unit: 'IU/mL',
    min: 0,
    max: 40,
    optimalMin: 0,
    optimalMax: 4,
    displayScale: 'linear'
  },

  // Neural markers
  'Serotonin': {
    unit: 'ng/mL',
    min: 50,
    max: 250,
    optimalMin: 100,
    optimalMax: 200,
    displayScale: 'linear'
  },
  'Omega-3': {
    unit: '%',
    min: 2,
    max: 12,
    optimalMin: 6,
    optimalMax: 10,
    displayScale: 'linear'
  },
  'Dopamine': {
    unit: 'pg/mL',
    min: 10,
    max: 100,
    optimalMin: 30,
    optimalMax: 70,
    displayScale: 'linear'
  },
  'Norepinephrine': {
    unit: 'pg/mL',
    min: 100,
    max: 600,
    optimalMin: 200,
    optimalMax: 450,
    displayScale: 'linear'
  },
  'GABA': {
    unit: 'pmol/mL',
    min: 0.1,
    max: 0.5,
    optimalMin: 0.2,
    optimalMax: 0.4,
    displayScale: 'linear'
  },

  // RBC markers
  'Hemoglobin': {
    unit: 'g/dL',
    min: 12,
    max: 17,
    optimalMin: 13,
    optimalMax: 16,
    displayScale: 'linear'
  },
  'Hematocrit': {
    unit: '%',
    min: 35,
    max: 50,
    optimalMin: 38,
    optimalMax: 47,
    displayScale: 'linear'
  },
  'MCV': {
    unit: 'fL',
    min: 78,
    max: 100,
    optimalMin: 82,
    optimalMax: 96,
    displayScale: 'linear'
  },
  'MCH': {
    unit: 'pg',
    min: 27,
    max: 34,
    optimalMin: 28,
    optimalMax: 32,
    displayScale: 'linear'
  },
  'MCHC': {
    unit: 'g/dL',
    min: 32,
    max: 37,
    optimalMin: 33,
    optimalMax: 36,
    displayScale: 'linear'
  },
  'RDW': {
    unit: '%',
    min: 11,
    max: 15,
    optimalMin: 12,
    optimalMax: 14,
    displayScale: 'linear'
  },

  // Liver markers
  'ALT': {
    unit: 'U/L',
    min: 5,
    max: 60,
    optimalMin: 10,
    optimalMax: 40,
    displayScale: 'linear'
  },
  'AST': {
    unit: 'U/L',
    min: 5,
    max: 50,
    optimalMin: 10,
    optimalMax: 35,
    displayScale: 'linear'
  },
  'GGT': {
    unit: 'U/L',
    min: 5,
    max: 80,
    optimalMin: 9,
    optimalMax: 50,
    displayScale: 'linear'
  },
  'Alkaline Phosphatase': {
    unit: 'U/L',
    min: 30,
    max: 120,
    optimalMin: 45,
    optimalMax: 100,
    displayScale: 'linear'
  },
  'Bilirubin': {
    unit: 'mg/dL',
    min: 0.2,
    max: 1.5,
    optimalMin: 0.3,
    optimalMax: 1.2,
    displayScale: 'linear'
  },
  'Albumin': {
    unit: 'g/dL',
    min: 3.4,
    max: 5.5,
    optimalMin: 4,
    optimalMax: 5,
    displayScale: 'linear'
  },

  // Kidney markers
  'Creatinine': {
    unit: 'mg/dL',
    min: 0.5,
    max: 1.3,
    optimalMin: 0.7,
    optimalMax: 1.1,
    displayScale: 'linear'
  },
  'eGFR': {
    unit: 'mL/min',
    min: 60,
    max: 130,
    optimalMin: 90,
    optimalMax: 120,
    displayScale: 'linear'
  },
  'BUN': {
    unit: 'mg/dL',
    min: 5,
    max: 25,
    optimalMin: 7,
    optimalMax: 20,
    displayScale: 'linear'
  },
  'Uric Acid': {
    unit: 'mg/dL',
    min: 2,
    max: 7,
    optimalMin: 3,
    optimalMax: 6,
    displayScale: 'linear'
  },
  'Microalbumin': {
    unit: 'mg/L',
    min: 0,
    max: 30,
    optimalMin: 0,
    optimalMax: 20,
    displayScale: 'linear'
  },
  'Electrolytes': {
    unit: 'mmol/L',
    min: 135,
    max: 145,
    optimalMin: 138,
    optimalMax: 142,
    displayScale: 'linear'
  },

  // Pancreas markers
  'Glucose': {
    unit: 'mg/dL',
    min: 65,
    max: 140,
    optimalMin: 70,
    optimalMax: 100,
    displayScale: 'linear'
  },
  'HbA1c': {
    unit: '%',
    min: 4,
    max: 6.5,
    optimalMin: 4.5,
    optimalMax: 5.7,
    displayScale: 'linear'
  },
  'Insulin': {
    unit: 'uIU/mL',
    min: 2,
    max: 25,
    optimalMin: 3,
    optimalMax: 15,
    displayScale: 'linear'
  },
  'C-Peptide': {
    unit: 'ng/mL',
    min: 0.5,
    max: 3,
    optimalMin: 0.8,
    optimalMax: 2,
    displayScale: 'linear'
  },
  'Amylase': {
    unit: 'U/L',
    min: 25,
    max: 150,
    optimalMin: 50,
    optimalMax: 120,
    displayScale: 'linear'
  },
  'Lipase': {
    unit: 'U/L',
    min: 10,
    max: 140,
    optimalMin: 20,
    optimalMax: 100,
    displayScale: 'linear'
  },

  // Bone markers
  'Calcium': {
    unit: 'mg/dL',
    min: 8.5,
    max: 10.5,
    optimalMin: 9,
    optimalMax: 10,
    displayScale: 'linear'
  },
  'Phosphorus': {
    unit: 'mg/dL',
    min: 2.5,
    max: 4.5,
    optimalMin: 2.8,
    optimalMax: 4.2,
    displayScale: 'linear'
  },
  'Magnesium': {
    unit: 'mg/dL',
    min: 1.5,
    max: 2.5,
    optimalMin: 1.8,
    optimalMax: 2.3,
    displayScale: 'linear'
  },
  'PTH': {
    unit: 'pg/mL',
    min: 10,
    max: 70,
    optimalMin: 15,
    optimalMax: 55,
    displayScale: 'linear'
  },
  'Bone Density': {
    unit: 'T-score',
    min: -3,
    max: 2,
    optimalMin: -1,
    optimalMax: 2,
    displayScale: 'linear'
  },

  // Platelet/Thrombosis markers
  'Platelet Count': {
    unit: 'x10^3/uL',
    min: 150,
    max: 450,
    optimalMin: 200,
    optimalMax: 400,
    displayScale: 'linear'
  },
  'MPV': {
    unit: 'fL',
    min: 7,
    max: 12,
    optimalMin: 8,
    optimalMax: 11,
    displayScale: 'linear'
  },
  'PDW': {
    unit: '%',
    min: 9,
    max: 17,
    optimalMin: 10,
    optimalMax: 15,
    displayScale: 'linear'
  },
  'Fibrinogen': {
    unit: 'mg/dL',
    min: 150,
    max: 450,
    optimalMin: 200,
    optimalMax: 400,
    displayScale: 'linear'
  },
  'D-Dimer': {
    unit: 'ng/mL',
    min: 0,
    max: 500,
    optimalMin: 0,
    optimalMax: 250,
    displayScale: 'linear'
  },

  // Lung markers
  'spirometry': {
    unit: '% predicted',
    min: 50,
    max: 120,
    optimalMin: 80,
    optimalMax: 100,
    displayScale: 'linear'
  },
  'DLCO': {
    unit: '% predicted',
    min: 50,
    max: 120,
    optimalMin: 80,
    optimalMax: 100,
    displayScale: 'linear'
  },
  'FeNO': {
    unit: 'ppb',
    min: 0,
    max: 50,
    optimalMin: 0,
    optimalMax: 25,
    displayScale: 'linear'
  },
  'C-Reactive Protein': {
    unit: 'mg/L',
    min: 0,
    max: 10,
    optimalMin: 0,
    optimalMax: 3,
    displayScale: 'linear'
  },
  'IgE': {
    unit: 'IU/mL',
    min: 0,
    max: 100,
    optimalMin: 0,
    optimalMax: 50,
    displayScale: 'linear'
  },

  // Muscle markers
  'Creatine Kinase': {
    unit: 'U/L',
    min: 30,
    max: 250,
    optimalMin: 50,
    optimalMax: 200,
    displayScale: 'linear'
  },
  'LDH': {
    unit: 'U/L',
    min: 100,
    max: 250,
    optimalMin: 120,
    optimalMax: 220,
    displayScale: 'linear'
  },
  'Myoglobin': {
    unit: 'ng/mL',
    min: 0,
    max: 100,
    optimalMin: 0,
    optimalMax: 60,
    displayScale: 'linear'
  },
  'Aldolase': {
    unit: 'U/L',
    min: 1,
    max: 8,
    optimalMin: 2,
    optimalMax: 6,
    displayScale: 'linear'
  },
  'IGF-1': {
    unit: 'ng/mL',
    min: 50,
    max: 350,
    optimalMin: 100,
    optimalMax: 250,
    displayScale: 'linear'
  },

  // Skin and Hair markers
  'Biotin': {
    unit: 'ng/mL',
    min: 100,
    max: 500,
    optimalMin: 200,
    optimalMax: 400,
    displayScale: 'linear'
  },
  'Zinc': {
    unit: 'mcg/dL',
    min: 60,
    max: 130,
    optimalMin: 80,
    optimalMax: 120,
    displayScale: 'linear'
  },
  'Collagen': {
    unit: 'ng/mL',
    min: 50,
    max: 150,
    optimalMin: 80,
    optimalMax: 130,
    displayScale: 'linear'
  },

  // Energy markers
  'Thyroid hormones': {
    unit: 'combined',
    min: 0,
    max: 100,
    optimalMin: 50,
    optimalMax: 80,
    displayScale: 'linear'
  },
  'CoQ10': {
    unit: 'ug/mL',
    min: 0.3,
    max: 2,
    optimalMin: 0.5,
    optimalMax: 1.5,
    displayScale: 'linear'
  },

  // Default fallback for unknown markers
  '_default': {
    unit: '',
    min: 0,
    max: 100,
    optimalMin: 30,
    optimalMax: 70,
    displayScale: 'linear'
  }
};

// Helper function to get reference range config for a marker
export const getReferenceRange = (markerName) => {
  return referenceRangesConfig[markerName] || referenceRangesConfig['_default'];
};

// Helper to calculate status based on value and reference range
export const calculateStatus = (value, referenceRange) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return 'Unknown';

  const { min, max, optimalMin, optimalMax, invertOptimal } = referenceRange;

  if (invertOptimal) {
    // For markers where lower is better (e.g., LDL)
    if (numValue < optimalMin) return 'Optimal';
    if (numValue > max) return 'High';
    if (numValue > optimalMax) return 'Moderate';
    return 'Normal';
  } else {
    // Standard interpretation
    if (numValue < min) return 'Low';
    if (numValue > max) return 'High';
    if (numValue >= optimalMin && numValue <= optimalMax) return 'Optimal';
    return 'Normal';
  }
};
