import React, { useState, useMemo, useEffect } from 'react';
import foundationZoomerData from '../data/foundation-zoomer-data.json';
import ReferenceRangeIndicator from './ReferenceRangeIndicator.jsx';
import ProgressBarIndicator from './ProgressBarIndicator.jsx';
import ViewToggle from './ViewToggle.jsx';
import { getReferenceRange, calculateStatus } from '../data/reference-ranges-config.js';

// Theme tokens matching the dashboard
const theme = {
  colors: {
    primary: '#0df280',
    primaryDim: 'rgba(13, 242, 128, 0.1)',
    backgroundDark: '#102219',
    surfaceDark: '#1a2c24',
  },
};

// Zoomer to health category mapping
const zoomerCategoryMap = {
  neural: 'Neural',
  cardio: 'Cardio',
  gut: 'Gut',
  hormone: 'Sex Hormones',
  immune: 'Immune',
  foundation: null, // Shows all categories
};

// Demo scores for each zoomer
const zoomerScores = {
  neural: { score: 88, label: 'Neural Health Score', status: 'Optimal' },
  cardio: { score: 64, label: 'Cardiovascular Score', status: 'Moderate' },
  gut: { score: 92, label: 'Gut Health Score', status: 'Optimal' },
  hormone: { score: 45, label: 'Hormone Balance Score', status: 'Low' },
  immune: { score: 81, label: 'Immune Function Score', status: 'Good' },
  foundation: { score: 85, label: 'Foundation Score', status: 'Good' },
};

// Demo markers for each category based on Foundation Zoomer biomarkers
const demoMarkersByCategory = {
  'Neural': ['Homocysteine', 'B12', 'Serotonin', 'Vitamin D', 'Omega-3', 'Folate'],
  'Cardio': ['LDL Cholesterol', 'HDL Cholesterol', 'Triglycerides', 'ApoB', 'CRP', 'Homocysteine'],
  'Gut': ['Zonulin', 'Calprotectin', 'Bifidobacterium', 'Lactobacillus', 'E. coli', 'Short-Chain Fatty Acids'],
  'Sex Hormones': ['Cortisol', 'DHEA-S', 'Testosterone', 'Estradiol', 'Progesterone', 'FSH'],
  'Immune': ['IgG', 'IgA', 'IgM', 'White Blood Cell', 'Lymphocytes', 'Neutrophils'],
  'Thyroid': ['TSH', 'Free T4', 'Free T3', 'Reverse T3', 'Anti-TPO', 'Anti-Tg'],
  'Nutrition': ['Ferritin', 'Vitamin D', 'Vitamin B12', 'Folate', 'Iron', 'Transferrin'],
  'RBC': ['Hemoglobin', 'Hematocrit', 'MCV', 'MCH', 'MCHC', 'RDW'],
  'WBC': ['White Blood Cells', 'Neutrophils', 'Lymphocytes', 'Monocytes', 'Eosinophils', 'Basophils'],
  'Liver': ['ALT', 'AST', 'GGT', 'Alkaline Phosphatase', 'Bilirubin', 'Albumin'],
  'Kidney': ['Creatinine', 'eGFR', 'BUN', 'Uric Acid', 'Microalbumin', 'Electrolytes'],
  'Pancreas': ['Glucose', 'HbA1c', 'Insulin', 'C-Peptide', 'Amylase', 'Lipase'],
  'Bone': ['Calcium', 'Vitamin D', 'Phosphorus', 'Magnesium', 'PTH', 'Bone Density'],
  'Adrenal / Stress': ['Cortisol', 'DHEA-S', 'Pregnenolone', 'Testosterone', 'Progesterone', 'Aldosterone'],
  'Platelet/Thrombosis': ['Platelet Count', 'MPV', 'PDW', 'Fibrinogen', 'D-Dimer', 'Homocysteine'],
  'Lung': ['spirometry', 'DLCO', 'FeNO', 'C-Reactive Protein', 'Eosinophils', 'IgE'],
  'Muscle': ['Creatine Kinase', 'LDH', 'Myoglobin', 'Aldolase', 'Testosterone', 'IGF-1'],
  'Skin and Hair': ['Vitamin D', 'Biotin', 'Iron', 'Zinc', 'Omega-3', 'Collagen'],
  'Energy': ['Cortisol', 'Thyroid hormones', 'Iron', 'Vitamin B12', 'Magnesium', 'CoQ10'],
};

// Process the raw data into markers grouped by category
const processFoundationData = (data) => {
  const categories = {};
  const markerNameToInfo = {};

  data.forEach((row) => {
    // Skip empty rows
    if (!row['Health  Category'] && !row['Marker']) return;

    // Store marker info
    if (row['Marker']) {
      markerNameToInfo[row['Marker']] = {
        testId: row['Test ID'],
        testCode: row['Test Code'],
        referenceRange: row['Reference Range '],
        description: row['Marker Description '],
        reference: row['Reference'],
      };
    }

    // Group by health category
    if (row['Health  Category']) {
      const category = row['Health  Category'].trim();
      if (!categories[category]) {
        categories[category] = {
          markers: [],
          supplements: [],
          foods: [],
          lifestyles: [],
        };
      }

      // Add marker if present (with a valid name)
      if (row['Marker'] && row['Marker'].trim()) {
        categories[category].markers.push({
          name: row['Marker'],
          testId: row['Test ID'],
          testCode: row['Test Code'],
          referenceRange: row['Reference Range '],
          description: row['Marker Description '],
        });
      }

      // Add supplement if present
      if (row['Unique supplements'] && row['Unique supplements'].trim() && row['Unique supplements'] !== ' ') {
        categories[category].supplements.push({
          name: row['Unique supplements'].trim(),
          category: row['Supplement Category '],
          purpose: row['Supplement purpose'],
          dosage: row['Dosage'],
          rating: row['Rating'],
        });
      }

      // Add food sources if present
      if (row['Food sources'] && row['Food sources'].trim() && row['Food sources'] !== ' ') {
        categories[category].foods.push({
          sources: row['Food sources'],
          categories: row['Food Source Categories'],
        });
      }

      // Add lifestyle if present
      if (row['Lifestyle '] && row['Lifestyle '].trim() && row['Lifestyle '] !== ' ') {
        categories[category].lifestyles.push({
          name: row['Lifestyle '],
          purpose: row['Lifestyle purpose'],
        });
      }
    }
  });

  return { categories, markerNameToInfo };
};

// Generate demo values for markers
const generateDemoValues = (markers, baseScore, applyDemoScores) => {
  return markers.map((marker, index) => {
    // Get reference range configuration for this marker
    const rangeConfig = getReferenceRange(marker.name);
    const { min, max, optimalMin, optimalMax, invertOptimal } = rangeConfig;

    // Only apply demo low/high scores for foundation zoomer (~30% non-optimal for demo)
    const isDemoLowScore = applyDemoScores && index === 2;
    const isDemoHighScore = applyDemoScores && index === 4;

    let value, status, trend;

    if (isDemoLowScore) {
      // Value below minimum
      value = Math.round(min - (min * 0.2));
      status = 'Low';
      trend = 'down';
    } else if (isDemoHighScore) {
      // Value above maximum
      value = Math.round(max + (max * 0.1));
      status = 'High';
      trend = 'up';
    } else {
      // Random value within or near optimal range
      const optimalMidpoint = (optimalMin + optimalMax) / 2;
      const optimalRange = optimalMax - optimalMin;
      value = Math.round(optimalMidpoint + (Math.random() - 0.5) * optimalRange);
      status = calculateStatus(value, rangeConfig);
      trend = ['up', 'down', 'stable'][index % 3];
    }

    return {
      ...marker,
      value: String(value),
      unit: rangeConfig.unit,
      status,
      trend,
      referenceRange: rangeConfig, // Store full range config for visualization
    };
  });
};

const FoundationZoomerDetail = ({ zoomer, onBack }) => {
  const [activeTab, setActiveTab] = useState('latest');
  const [expandedMarker, setExpandedMarker] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // For 2-level navigation in foundation zoomer

  // View mode toggle state with localStorage persistence
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('biomarkerViewMode');
      return saved || 'reference';
    }
    return 'reference';
  });

  // Persist view mode preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('biomarkerViewMode', viewMode);
    }
  }, [viewMode]);

  const { categories, markerNameToInfo } = useMemo(() => processFoundationData(foundationZoomerData), []);

  // Get the category for this zoomer
  const categoryName = zoomerCategoryMap[zoomer];
  const zoomerInfo = zoomerScores[zoomer] || zoomerScores.foundation;

  // Get markers for the selected category (or all for foundation)
  const categoryData = useMemo(() => {
    if (zoomer === 'foundation') {
      // For foundation, show a summary of all categories
      return Object.entries(categories).map(([name, data]) => {
        // Use demo markers if actual data is insufficient
        let markers = data.markers.filter(m => m.name && m.name.trim());
        if (markers.length < 6) {
          const demoNames = demoMarkersByCategory[name] || demoMarkersByCategory['Nutrition'];
          const demoMarkers = demoNames.slice(0, 6).map((demoName, i) => ({
            name: demoName,
            testId: i + 1,
            testCode: demoName.substring(0, 4).toUpperCase(),
            referenceRange: null, // No reference range for demo markers
            description: `${demoName} biomarker for ${name} health assessment.`,
          }));
          // Merge actual markers with demo markers
          const existingNames = new Set(markers.map(m => m.name));
          const additionalDemoMarkers = demoMarkers.filter(m => !existingNames.has(m.name));
          markers = [...markers, ...additionalDemoMarkers].slice(0, 6);
        }
        return {
          name,
          ...data,
          markers: generateDemoValues(markers.slice(0, 6), 75, true),
        };
      });
    }
    return categoryName ? categories[categoryName] : null;
  }, [categories, zoomer, categoryName]);

  // Get the selected category's markers for detail view
  const selectedCategoryData = useMemo(() => {
    if (!selectedCategory || zoomer !== 'foundation') return null;
    const cat = categoryData.find(c => c.name === selectedCategory);
    if (!cat) return null;

    // Return the category with its markers for detail view
    return cat;
  }, [selectedCategory, categoryData, zoomer]);

  // Generate demo values for markers
  const markersWithValues = useMemo(() => {
    if (zoomer === 'foundation') return [];

    // Get actual markers from data, or create demo markers if data is empty
    let actualMarkers = (categoryData?.markers || []).filter(m => m.name && m.name.trim());

    // If no markers found in data, create demo markers for display
    if (actualMarkers.length === 0) {
      const demoMarkerNames = {
        neural: ['Homocysteine', 'B12', 'Serotonin', 'Dopamine', 'Norepinephrine', 'GABA'],
        cardio: ['LDL Cholesterol', 'HDL Cholesterol', 'Triglycerides', 'ApoB', 'CRP', 'Homocysteine'],
        gut: ['Zonulin', 'Calprotectin', 'Bifidobacterium', 'Lactobacillus', 'E. coli', 'Akkermansia'],
        hormone: ['Cortisol', 'DHEA-S', 'Testosterone', 'Estradiol', 'Progesterone', 'FSH'],
        immune: ['IgG', 'IgA', 'IgM', 'White Blood Cell', 'Lymphocytes', 'Neutrophils'],
      };

      const names = demoMarkerNames[zoomer] || ['Marker 1', 'Marker 2', 'Marker 3', 'Marker 4', 'Marker 5', 'Marker 6'];
      actualMarkers = names.map((name, i) => ({
        name,
        testId: i + 1,
        testCode: name.substring(0, 4).toUpperCase(),
        referenceRange: i % 3 === 0 ? '< Lower limit' : i % 3 === 1 ? '> Upper limit' : null,
        description: `Demo marker for ${name} testing.`,
      }));
    }

    return generateDemoValues(actualMarkers, zoomerInfo.score, false);
  }, [categoryData, zoomer, zoomerInfo.score]);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Optimal': case 'Normal': return { bg: 'rgba(13, 242, 128, 0.1)', color: '#0df280', border: 'rgba(13, 242, 128, 0.2)' };
      case 'High': return { bg: 'rgba(255, 92, 0, 0.1)', color: '#ff5c00', border: 'rgba(255, 92, 0, 0.2)' };
      case 'Low': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.2)' };
      case 'Moderate': return { bg: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', border: 'rgba(251, 191, 36, 0.2)' };
      default: return { bg: 'rgba(13, 242, 128, 0.1)', color: '#0df280', border: 'rgba(13, 242, 128, 0.2)' };
    }
  };

  const getBarColor = (status) => {
    switch (status) {
      case 'Optimal': case 'Normal': return '#0df280';
      case 'High': return '#ff5c00';
      case 'Low': return '#ef4444';
      case 'Moderate': return '#fbbf24';
      default: return '#0df280';
    }
  };

  const getZoomerIcon = (z) => {
    const icons = {
      neural: 'psychology',
      cardio: 'ecg_heart',
      gut: 'spa',
      hormone: 'bloodtype',
      immune: 'shield',
      foundation: 'hexagon',
    };
    return icons[z] || 'hexagon';
  };

  const getZoomerLabel = (z) => {
    const labels = {
      neural: 'Neural Zoomer',
      cardio: 'Cardio Zoomer',
      gut: 'Gut Zoomer',
      hormone: 'Hormone Zoomer',
      immune: 'Immune Zoomer',
      foundation: 'Foundation Zoomer',
    };
    return labels[z] || 'Zoomer Profile';
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: theme.colors.backgroundDark }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 shrink-0" style={{ background: 'rgba(16, 34, 25, 0.9)', borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="flex items-center justify-between px-4 h-16 max-w-4xl mx-auto w-full">
          <button
            onClick={() => {
              if (zoomer === 'foundation' && selectedCategory) {
                setSelectedCategory(null);
              } else {
                onBack();
              }
            }}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors text-white"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ color: theme.colors.primary }}>{getZoomerIcon(zoomer)}</span>
            <h1 className="text-lg font-bold tracking-tight text-white">
              {zoomer === 'foundation' && selectedCategory ? selectedCategory : getZoomerLabel(zoomer)}
            </h1>
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors text-white">
            <span className="material-symbols-outlined text-[24px]">ios_share</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 min-h-0 w-full max-w-4xl mx-auto px-4 pt-6 pb-28 space-y-6 overflow-y-auto">
        {/* North Star Metric - hide when viewing specific category */}
        {!(zoomer === 'foundation' && selectedCategory) && (
          <section className="flex flex-col items-center justify-center space-y-4 py-2">
          <div className="relative w-56 h-56 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full blur-2xl transform scale-90" style={{ background: 'rgba(13, 242, 128, 0.1)' }}></div>
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle className="text-white/5" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeWidth="6"></circle>
              <circle
                style={{ color: getBarColor(zoomerInfo.status) }}
                cx="50"
                cy="50"
                fill="transparent"
                r="42"
                stroke="currentColor"
                strokeDasharray={`${(zoomerInfo.score / 100) * 263.89} 263.89`}
                strokeLinecap="round"
                strokeWidth="6"
              ></circle>
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{categoryName || 'Overall'}</span>
              <span className="text-6xl font-extrabold text-white tracking-tighter leading-none">{zoomerInfo.score}</span>
              <div className="flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full" style={{ background: getStatusStyles(zoomerInfo.status).bg, color: getStatusStyles(zoomerInfo.status).color }}>
                <span className="material-symbols-outlined text-[14px]">
                  {zoomerInfo.status === 'Optimal' || zoomerInfo.status === 'Good' ? 'check_circle' :
                   zoomerInfo.status === 'Low' || zoomerInfo.status === 'Moderate' ? 'warning' : 'trending_up'}
                </span>
                <span className="text-xs font-bold">{zoomerInfo.status}</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-white font-bold text-xl">{zoomerInfo.label}</h2>
            <p className="text-gray-400 text-xs mt-1">
              {zoomer === 'foundation' ? 'Comprehensive overview of all health categories' : `Detailed ${categoryName} biomarker analysis`}
            </p>
          </div>
        </section>
        )}

        {/* Foundation Level 1: Category Cards Overview */}
        {zoomer === 'foundation' && !selectedCategory && (
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-white">Health Categories Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryData.map((cat, idx) => {
                // Calculate category status based on actual marker statuses
                const lowCount = cat.markers.filter(m => m.status === 'Low').length;
                const highCount = cat.markers.filter(m => m.status === 'High').length;
                const optimalCount = cat.markers.filter(m => m.status === 'Optimal' || m.status === 'Normal').length;
                // Calculate score based on marker statuses (75-95 range for mostly optimal)
                const optimalRatio = optimalCount / cat.markers.length;
                const catScore = 75 + (optimalRatio * 18) + (Math.random() * 2);
                // Most categories show as Optimal or Good (green), only show Moderate if significant issues
                const catStatus = lowCount > 3 ? 'Low' : highCount > 3 || lowCount > 1 ? 'Moderate' : optimalRatio >= 0.6 ? 'Optimal' : 'Good';
                return (
                  <div
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className="rounded-xl p-4 border cursor-pointer hover:border-white/20 transition-all active:scale-[0.98]"
                    style={{ background: theme.colors.surfaceDark, borderColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400">category</span>
                        <span className="font-bold text-white">{cat.name}</span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ ...getStatusStyles(catStatus) }}>
                        {catStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-400">{cat.markers.length} markers</span>
                      <span className="text-white font-bold">{Math.round(catScore)}</span>
                    </div>
                    <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="absolute left-0 top-0 bottom-0 rounded-full transition-all" style={{ width: `${catScore}%`, background: getBarColor(catStatus) }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Foundation Level 2: Category Detail View with Biomarkers */}
        {zoomer === 'foundation' && selectedCategory && selectedCategoryData && (
          <section className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{selectedCategory}</h3>
              <ViewToggle
                currentMode={viewMode}
                onModeChange={setViewMode}
              />
            </div>
            <div className="space-y-3">
              {selectedCategoryData.markers.map((marker, mIdx) => {
                const statusStyles = getStatusStyles(marker.status);
                const isExpanded = expandedMarker === mIdx;

                return (
                  <div key={mIdx} className="rounded-xl overflow-hidden border" style={{ background: theme.colors.surfaceDark, borderColor: 'rgba(255,255,255,0.05)' }}>
                    {/* Main metric card */}
                    <div
                      className="p-4 cursor-pointer hover:bg-white/5 transition-colors"
                      onClick={() => setExpandedMarker(isExpanded ? null : mIdx)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white text-sm">{marker.name}</h4>
                            {marker.testCode && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400">
                                {marker.testCode}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {marker.referenceRange?.unit ? `Range: ${marker.referenceRange.min}-${marker.referenceRange.max} ${marker.referenceRange.unit}` : 'Reference range available'}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <span className="block font-bold text-white">{marker.value}</span>
                            {marker.unit && <span className="text-xs text-gray-400">{marker.unit}</span>}
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: statusStyles.bg, color: statusStyles.color }}>
                            {marker.status}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {/* Visualization with transition */}
                        <div className="transition-all duration-300 ease-in-out">
                          {viewMode === 'reference' ? (
                            <ReferenceRangeIndicator
                              markerName={marker.name}
                              value={marker.value}
                              status={marker.status}
                              customRange={marker.referenceRange}
                              showLabels={!isExpanded}
                              compact={isExpanded}
                            />
                          ) : (
                            <ProgressBarIndicator
                              markerName={marker.name}
                              value={marker.value}
                              status={marker.status}
                              unit={marker.unit}
                              compact={isExpanded}
                            />
                          )}
                        </div>
                      </div>
                      {isExpanded && marker.description && (
                        <div className="mt-3 pt-3 border-t border-white/5">
                          <p className="text-xs text-gray-400 leading-relaxed">{marker.description}</p>
                        </div>
                      )}
                    </div>

                    {/* Expanded recommendations */}
                    {isExpanded && (
                      <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                        {/* Supplements */}
                        {categories[selectedCategory]?.supplements && categories[selectedCategory].supplements.length > 0 && (
                          <div>
                            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Supplements</h5>
                            <div className="flex flex-wrap gap-2">
                              {categories[selectedCategory].supplements.slice(0, 3).map((supp, sIdx) => (
                                <span key={sIdx} className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(13, 242, 128, 0.1)', color: '#0df280', border: '1px solid rgba(13, 242, 128, 0.2)' }}>
                                  {supp.name} {supp.dosage && `(${supp.dosage})`}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Food Sources */}
                        {categories[selectedCategory]?.foods && categories[selectedCategory].foods.length > 0 && (
                          <div>
                            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Food Sources</h5>
                            <p className="text-xs text-gray-300">{categories[selectedCategory].foods[0].sources}</p>
                          </div>
                        )}

                        {/* Lifestyle */}
                        {categories[selectedCategory]?.lifestyles && categories[selectedCategory].lifestyles.length > 0 && (
                          <div>
                            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Lifestyle</h5>
                            <div className="flex items-center gap-2 text-xs text-gray-300">
                              <span className="material-symbols-outlined text-[14px]" style={{ color: theme.colors.primary }}>self_improvement</span>
                              {categories[selectedCategory].lifestyles[0].name}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Detailed Metrics for single category */}
        {zoomer !== 'foundation' && markersWithValues.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Detailed Markers</h3>
              <button className="text-xs font-bold flex items-center gap-1" style={{ color: theme.colors.primary }}>
                <span>Sort by Status</span>
                <span className="material-symbols-outlined text-base">sort</span>
              </button>
            </div>
            <div className="space-y-3">
              {markersWithValues.map((metric, i) => {
                const statusStyles = getStatusStyles(metric.status);
                const isExpanded = expandedMarker === i;

                return (
                  <div key={i} className="rounded-xl overflow-hidden border" style={{ background: theme.colors.surfaceDark, borderColor: 'rgba(255,255,255,0.05)' }}>
                    {/* Main metric card */}
                    <div
                      className="p-4 cursor-pointer hover:bg-white/5 transition-colors"
                      onClick={() => setExpandedMarker(isExpanded ? null : i)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white text-sm">{metric.name}</h4>
                            {metric.testCode && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400">
                                {metric.testCode}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {metric.referenceRange || 'Reference range available'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="block font-bold text-white">{metric.value}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: statusStyles.bg, color: statusStyles.color }}>
                            {metric.status}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-[1fr_60px] gap-3 items-center">
                        <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                          <div className="absolute left-0 top-0 bottom-0 rounded-full transition-all duration-500" style={{ width: `${metric.barWidth}%`, background: getBarColor(metric.status) }}></div>
                        </div>
                        <div className="h-6 w-full">
                          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 60 20">
                            <path
                              d={metric.trend === 'up' ? "M0,15 L10,12 L20,16 L30,8 L40,10 L50,5 L60,8" :
                                metric.trend === 'down' ? "M0,5 L10,8 L20,10 L30,12 L40,15 L50,15 L60,18" :
                                "M0,10 L60,10"}
                              fill="none"
                              stroke={getBarColor(metric.status)}
                              strokeLinecap="round"
                              strokeWidth="1.5"
                              strokeDasharray={metric.trend === 'stable' ? "4 2" : "none"}
                            ></path>
                          </svg>
                        </div>
                      </div>
                      {isExpanded && metric.description && (
                        <div className="mt-3 pt-3 border-t border-white/5">
                          <p className="text-xs text-gray-400 leading-relaxed">{metric.description}</p>
                        </div>
                      )}
                    </div>

                    {/* Expanded recommendations */}
                    {isExpanded && (
                      <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                        {/* Supplements */}
                        {categoryData?.supplements && categoryData.supplements.length > 0 && (
                          <div>
                            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Supplements</h5>
                            <div className="flex flex-wrap gap-2">
                              {categoryData.supplements.slice(0, 3).map((supp, idx) => (
                                <span key={idx} className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(13, 242, 128, 0.1)', color: '#0df280', border: '1px solid rgba(13, 242, 128, 0.2)' }}>
                                  {supp.name} {supp.dosage && `(${supp.dosage})`}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Food Sources */}
                        {categoryData?.foods && categoryData.foods.length > 0 && (
                          <div>
                            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Food Sources</h5>
                            <p className="text-xs text-gray-300">{categoryData.foods[0].sources}</p>
                          </div>
                        )}

                        {/* Lifestyle */}
                        {categoryData?.lifestyles && categoryData.lifestyles.length > 0 && (
                          <div>
                            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Lifestyle</h5>
                            <div className="flex items-center gap-2 text-xs text-gray-300">
                              <span className="material-symbols-outlined text-[14px]" style={{ color: theme.colors.primary }}>self_improvement</span>
                              {categoryData.lifestyles[0].name}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <button className="w-full py-3 text-sm font-medium hover:text-white transition-colors" style={{ color: theme.colors.primary }}>
              View All {categoryData?.markers?.length || 0} Markers
            </button>
          </section>
        )}

        {/* Category Summary for single zoomer */}
        {zoomer !== 'foundation' && categoryData && (
          <section className="grid grid-cols-3 gap-3">
            {[
              { label: 'Markers', value: categoryData.markers?.length || 0, status: 'Tracked' },
              { label: 'Supplements', value: categoryData.supplements?.length || 0, status: 'Available' },
              { label: 'Foods', value: categoryData.foods?.length || 0, status: 'Sources' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl p-3 border shadow-sm flex flex-col items-center text-center space-y-1" style={{ background: theme.colors.surfaceDark, borderColor: 'rgba(255,255,255,0.05)' }}>
                <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                <span className="text-xl font-bold text-white">{item.value}</span>
                <span className="text-[10px] text-gray-500">{item.status}</span>
              </div>
            ))}
          </section>
        )}
      </main>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-40" style={{ background: 'linear-gradient(to top, #102219, rgba(16, 34, 25, 0.9), transparent)' }}>
        <div className="max-w-4xl mx-auto flex gap-3">
          <button className="flex-1 border text-white font-bold py-4 rounded-xl shadow-lg hover:bg-neutral-800 transition-all flex items-center justify-center gap-2" style={{ background: theme.colors.surfaceDark, borderColor: 'rgba(255,255,255,0.1)' }}>
            <span className="material-symbols-outlined">calendar_month</span>
            <span>Consult</span>
          </button>
          <button className="flex-[2] font-bold py-4 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2" style={{ background: theme.colors.primary, color: '#102219', boxShadow: '0 10px 25px -5px rgba(13, 242, 128, 0.3)' }}>
            <span className="material-symbols-outlined">download</span>
            <span>Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoundationZoomerDetail;
