import React, { useState, useEffect, useCallback } from 'react';
import FoundationZoomerDetail from './components/FoundationZoomerDetail.jsx';

// ==================== DESIGN TOKENS ====================
const theme = {
  colors: {
    primary: '#0df280',
    primaryDim: 'rgba(13, 242, 128, 0.1)',
    backgroundDark: '#0a110e',
    backgroundDarkAlt: '#102219',
    surfaceDark: '#1b2721',
    cardDark: '#1a2c24',
    statusWarning: '#F2C94C',
    statusAlert: '#FF4B4B',
    statusLocked: '#4B5563',
    // Check-in theme (purple)
    checkInPrimary: '#8c2bee',
    checkInBgDark: '#130c1a',
    checkInSurface: '#1f162b',
    checkInCard: '#2d2438',
  },
};

// ==================== ZOOMER DATA ====================
const zoomerData = {
  foundation: { score: 85, status: 'unlocked' },
  neural: { score: 88, icon: 'psychology', status: 'unlocked', color: 'primary' },
  cardio: { score: 64, icon: 'ecg_heart', status: 'unlocked', color: 'warning' },
  gut: { score: 92, icon: 'spa', status: 'unlocked', color: 'primary' },
  hormone: { score: 45, icon: 'bloodtype', status: 'unlocked', color: 'alert' },
  immune: { score: 81, icon: 'shield', status: 'unlocked', color: 'primary' },
  toxin: { icon: 'science', status: 'locked' },
  nutrient: { icon: 'medication', status: 'locked' },
  food: { icon: 'restaurant', status: 'locked' },
  genetics: { icon: 'genetics', status: 'locked' },
};

// ==================== GUT ZOOMER DETAILED DATA ====================
const gutMetrics = [
  { name: 'Akkermansia Muciniphila', category: 'Keystone Species • Lining Support', value: '4.2%', status: 'Optimal', statusColor: 'primary', barWidth: 75, trend: 'up' },
  { name: 'Calprotectin', category: 'Inflammatory Marker', value: '128', unit: 'μg/g', status: 'High', statusColor: 'warning', barWidth: 80, trend: 'up' },
  { name: 'Bifidobacterium', category: 'Probiotic Species', value: '0.5%', status: 'Low', statusColor: 'danger', barWidth: 15, trend: 'down' },
  { name: 'F. Prausnitzii', category: 'Butyrate Producer', value: '12.1%', status: 'Optimal', statusColor: 'primary', barWidth: 65, trend: 'stable' },
  { name: 'Zonulin', category: 'Permeability Marker', value: '45', unit: 'ng/mL', status: 'Normal', statusColor: 'primary', barWidth: 40, trend: 'stable' },
];

// ==================== DAILY TASKS ====================
const dailyTasks = [
  { id: 1, goal: 'Optimize Vitamin D', title: 'Take Vitamin D3', description: 'Task Completed!', completed: true, xp: 50, color: 'green', icon: 'check_circle' },
  { id: 2, goal: 'Boost Bone Health', title: '15 min Sunshine', description: 'Exposure to natural light before 10 AM', completed: false, xp: 30, color: 'yellow', icon: 'wb_sunny' },
  { id: 3, goal: 'Improve Gut Diversity', title: 'Eat Fermented Foods', description: '1 serving of kimchi, sauerkraut, or kefir', completed: false, xp: 25, color: 'orange', icon: 'nutrition' },
];

// ==================== LOCKED ZOOMER INFO ====================
const lockedZoomerInfo = {
  toxin: {
    name: 'Toxin Zoomer',
    category: 'Environmental Health',
    icon: 'science',
    tagline: 'Detect hidden environmental toxins affecting your health.',
    description: 'This comprehensive test analyzes heavy metals, mycotoxins, and environmental pollutants that may be silently impacting your wellness and energy levels.',
    benefits: [
      { icon: 'eco', label: 'Detox' },
      { icon: 'healing', label: 'Recovery' },
      { icon: 'shield', label: 'Protection' },
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg9wyzA5iyoiyXS2hToaPi3fx69Xg2wYAijoq51LPsMGWNp5uHlZx5FmRyyL1iR5g8ALfQ0bFU9EougTLnwhHOlp2eOpCIy8eR0iOnyzzsAFFRYUbYTk0eWJ5PyJllravFse5Ji3etZ5qHTX5kEgHcAZ8H8WCFKO0BbG5etMqj_jD9ZjrXVwwXEEy6ZJRqsQRBjWH9U7qXDVkqfM-ZIPnlAwIUclMYKdJR9a17ugaRan47NWnQ9Gx6E-yTjtVNCx5YYQu3fKbx69k',
    whyItMatters: 'Environmental toxins accumulate in your body over time. Identifying and addressing toxic burden can dramatically improve energy, mental clarity, and long-term health outcomes.',
    details: [
      { icon: 'water_drop', color: 'blue', title: 'Heavy Metals', description: 'Tests for lead, mercury, arsenic, and cadmium that accumulate in tissues over time.' },
      { icon: 'coronavirus', color: 'purple', title: 'Mycotoxins', description: 'Detects mold-derived toxins that can cause chronic inflammation and fatigue.' },
      { icon: 'factory', color: 'orange', title: 'Environmental Pollutants', description: 'Screens for pesticides, plasticizers, and industrial chemicals.' },
    ],
    measures: [
      { title: 'Heavy Metal Panel', subtitle: 'Lead, Mercury, Arsenic, Cadmium, Aluminum' },
      { title: 'Mycotoxin Screen', subtitle: 'Ochratoxin, Aflatoxin, Trichothecenes' },
      { title: 'Chemical Exposure', subtitle: 'Glyphosate, Phthalates, BPA' },
    ],
    experience: [
      { icon: 'home_health', text: 'At-home collection kit' },
      { icon: 'science', text: 'Analysis at CLIA lab' },
      { icon: 'description', text: 'Results in 10-14 days' },
    ],
  },
  nutrient: {
    name: 'Nutrient Zoomer',
    category: 'Nutritional Health',
    icon: 'medication',
    tagline: 'Optimize your nutrition at the cellular level.',
    description: 'This test measures essential vitamins, minerals, and antioxidants to identify deficiencies that may be affecting your energy, immunity, and overall vitality.',
    benefits: [
      { icon: 'bolt', label: 'Energy' },
      { icon: 'fitness_center', label: 'Strength' },
      { icon: 'psychology', label: 'Focus' },
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg9wyzA5iyoiyXS2hToaPi3fx69Xg2wYAijoq51LPsMGWNp5uHlZx5FmRyyL1iR5g8ALfQ0bFU9EougTLnwhHOlp2eOpCIy8eR0iOnyzzsAFFRYUbYTk0eWJ5PyJllravFse5Ji3etZ5qHTX5kEgHcAZ8H8WCFKO0BbG5etMqj_jD9ZjrXVwwXEEy6ZJRqsQRBjWH9U7qXDVkqfM-ZIPnlAwIUclMYKdJR9a17ugaRan47NWnQ9Gx6E-yTjtVNCx5YYQu3fKbx69k',
    whyItMatters: 'Even with a balanced diet, nutrient deficiencies are common. Identifying gaps allows for targeted supplementation to optimize your health and prevent chronic disease.',
    details: [
      { icon: 'wb_sunny', color: 'yellow', title: 'Vitamins', description: 'Comprehensive panel including D, B12, folate, and fat-soluble vitamins.' },
      { icon: 'diamond', color: 'cyan', title: 'Minerals', description: 'Essential minerals like magnesium, zinc, selenium, and iron status.' },
      { icon: 'local_fire_department', color: 'red', title: 'Antioxidants', description: 'Measures CoQ10, glutathione, and other protective compounds.' },
    ],
    measures: [
      { title: 'Vitamin Panel', subtitle: 'Vitamin D, B12, Folate, A, E, K' },
      { title: 'Mineral Status', subtitle: 'Magnesium, Zinc, Selenium, Iron, Copper' },
      { title: 'Antioxidant Capacity', subtitle: 'CoQ10, Glutathione, Vitamin C' },
    ],
    experience: [
      { icon: 'home_health', text: 'At-home collection kit' },
      { icon: 'science', text: 'Analysis at CLIA lab' },
      { icon: 'description', text: 'Results in 7-10 days' },
    ],
  },
  food: {
    name: 'Food Sensitivity Zoomer',
    category: 'Digestive Health',
    icon: 'restaurant',
    tagline: 'Discover which foods work for your unique body.',
    description: 'This test identifies IgG and IgA reactions to over 200 foods, helping you understand which foods may be causing inflammation, digestive issues, or other symptoms.',
    benefits: [
      { icon: 'spa', label: 'Digestion' },
      { icon: 'favorite', label: 'Wellness' },
      { icon: 'trending_down', label: 'Inflammation' },
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg9wyzA5iyoiyXS2hToaPi3fx69Xg2wYAijoq51LPsMGWNp5uHlZx5FmRyyL1iR5g8ALfQ0bFU9EougTLnwhHOlp2eOpCIy8eR0iOnyzzsAFFRYUbYTk0eWJ5PyJllravFse5Ji3etZ5qHTX5kEgHcAZ8H8WCFKO0BbG5etMqj_jD9ZjrXVwwXEEy6ZJRqsQRBjWH9U7qXDVkqfM-ZIPnlAwIUclMYKdJR9a17ugaRan47NWnQ9Gx6E-yTjtVNCx5YYQu3fKbx69k',
    whyItMatters: 'Food sensitivities are different from allergies and can cause delayed reactions. Identifying trigger foods can resolve chronic symptoms and improve gut health.',
    details: [
      { icon: 'egg', color: 'amber', title: 'Common Allergens', description: 'Tests reactions to dairy, gluten, eggs, soy, and other common triggers.' },
      { icon: 'grass', color: 'green', title: 'Plant Foods', description: 'Comprehensive testing of grains, legumes, fruits, and vegetables.' },
      { icon: 'set_meal', color: 'blue', title: 'Proteins', description: 'Reactions to various meat, poultry, and seafood sources.' },
    ],
    measures: [
      { title: 'IgG Food Panel', subtitle: '200+ foods tested for delayed reactions' },
      { title: 'IgA Reactions', subtitle: 'Mucosal immune response markers' },
      { title: 'Cross-Reactivity', subtitle: 'Gluten cross-reactive foods identified' },
    ],
    experience: [
      { icon: 'home_health', text: 'At-home finger prick kit' },
      { icon: 'science', text: 'Analysis at CLIA lab' },
      { icon: 'description', text: 'Results in 10-14 days' },
    ],
  },
  genetics: {
    name: 'Genetics Zoomer',
    category: 'Genomic Health',
    icon: 'genetics',
    tagline: 'Unlock your genetic blueprint for personalized wellness.',
    description: 'This test analyzes key genetic variants affecting metabolism, detoxification, and nutrient processing to create a truly personalized health optimization plan.',
    benefits: [
      { icon: 'fingerprint', label: 'Personalized' },
      { icon: 'timeline', label: 'Longevity' },
      { icon: 'psychology', label: 'Insights' },
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg9wyzA5iyoiyXS2hToaPi3fx69Xg2wYAijoq51LPsMGWNp5uHlZx5FmRyyL1iR5g8ALfQ0bFU9EougTLnwhHOlp2eOpCIy8eR0iOnyzzsAFFRYUbYTk0eWJ5PyJllravFse5Ji3etZ5qHTX5kEgHcAZ8H8WCFKO0BbG5etMqj_jD9ZjrXVwwXEEy6ZJRqsQRBjWH9U7qXDVkqfM-ZIPnlAwIUclMYKdJR9a17ugaRan47NWnQ9Gx6E-yTjtVNCx5YYQu3fKbx69k',
    whyItMatters: 'Your genes influence how you respond to foods, supplements, and lifestyle factors. Understanding your genetic makeup enables precision health interventions.',
    details: [
      { icon: 'sync_alt', color: 'purple', title: 'Methylation', description: 'MTHFR and related genes affecting B-vitamin metabolism and detox.' },
      { icon: 'local_pharmacy', color: 'pink', title: 'Drug Response', description: 'Pharmacogenomic markers for medication effectiveness and safety.' },
      { icon: 'monitor_heart', color: 'red', title: 'Health Risks', description: 'Genetic predispositions for cardiovascular and metabolic conditions.' },
    ],
    measures: [
      { title: 'Methylation Genes', subtitle: 'MTHFR, COMT, CBS, MTR variants' },
      { title: 'Detox Pathways', subtitle: 'CYP450, GST, NAT enzyme variants' },
      { title: 'Nutrigenomics', subtitle: 'VDR, FTO, APOE genetic markers' },
    ],
    experience: [
      { icon: 'home_health', text: 'At-home saliva collection' },
      { icon: 'science', text: 'Analysis at CLIA lab' },
      { icon: 'description', text: 'Results in 3-4 weeks' },
    ],
  },
};

// ==================== LOCKED ZOOMER MODAL ====================
const LockedZoomerModal = ({ zoomer, onClose, onLearnMore }) => {
  const info = lockedZoomerInfo[zoomer];
  if (!info) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 w-full max-h-[90vh] z-50 flex flex-col">
        <div 
          className="w-full rounded-t-[32px] shadow-2xl relative flex flex-col pb-8 ring-1 ring-white/10"
          style={{ background: '#111814' }}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors z-20"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {/* Drag Handle */}
          <div className="w-full flex justify-center pt-3 pb-1">
            <div className="h-1.5 w-12 rounded-full" style={{ background: '#3b5447' }}></div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto px-6 pt-2 pb-4">
            {/* Hero Image */}
            <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden mb-6 relative group shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10"></div>
              <img 
                src={info.image} 
                alt={info.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 z-20 h-12 w-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]" style={{ color: '#0df280' }}>{info.icon}</span>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-center text-center">
              <h1 className="text-white tracking-tight text-[32px] font-extrabold leading-tight mb-2">
                {info.name}
              </h1>
              <p className="font-medium text-lg mb-4" style={{ color: '#0df280' }}>
                {info.tagline}
              </p>
              <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto mb-8">
                {info.description}
              </p>

              {/* Benefit Icons */}
              <div className="flex w-full justify-between gap-2 mb-8 max-w-xs">
                {info.benefits.map((benefit, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1">
                    <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]" style={{ color: 'rgba(13, 242, 128, 0.8)' }}>{benefit.icon}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{benefit.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="px-6 pb-2 w-full flex flex-col gap-3">
            <button 
              className="w-full font-bold text-lg h-14 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-200"
              style={{ 
                background: '#0df280', 
                color: '#102219',
                boxShadow: '0 0 20px rgba(13, 242, 128, 0.3)'
              }}
            >
              <span>Request from Provider</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <button 
              onClick={onLearnMore}
              className="w-full bg-transparent hover:bg-white/5 text-gray-400 font-medium text-sm h-10 rounded-lg transition-colors"
            >
              Learn more about this test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== LOCKED ZOOMER LEARN MORE VIEW ====================
const LockedZoomerLearnMore = ({ zoomer, onBack }) => {
  const info = lockedZoomerInfo[zoomer];
  if (!info) return null;

  const getDetailColor = (color) => {
    const colors = {
      blue: { bg: 'rgba(59, 130, 246, 0.1)', text: '#60a5fa' },
      purple: { bg: 'rgba(168, 85, 247, 0.1)', text: '#a78bfa' },
      pink: { bg: 'rgba(236, 72, 153, 0.1)', text: '#f472b6' },
      orange: { bg: 'rgba(251, 146, 60, 0.1)', text: '#fb923c' },
      yellow: { bg: 'rgba(250, 204, 21, 0.1)', text: '#facc15' },
      cyan: { bg: 'rgba(34, 211, 238, 0.1)', text: '#22d3ee' },
      red: { bg: 'rgba(239, 68, 68, 0.1)', text: '#f87171' },
      green: { bg: 'rgba(74, 222, 128, 0.1)', text: '#4ade80' },
      amber: { bg: 'rgba(251, 191, 36, 0.1)', text: '#fbbf24' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="relative w-full min-h-screen" style={{ background: '#0b120f' }}>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 pt-4 pb-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <button 
          onClick={onBack}
          className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10 pointer-events-auto hover:bg-black/40 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <button className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10 pointer-events-auto hover:bg-black/40 transition-colors">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="w-full pb-32">
        {/* Hero Image */}
        <div className="w-full aspect-[16/9] relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b120f] via-[#0b120f]/20 to-transparent z-10"></div>
          <img 
            src={info.image} 
            alt={info.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full p-6 z-20">
            <div className="inline-flex items-center px-2.5 py-1 rounded-md backdrop-blur-sm mb-3" style={{ background: 'rgba(13, 242, 128, 0.1)', border: '1px solid rgba(13, 242, 128, 0.2)' }}>
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: '#0df280' }}>{info.category}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white leading-tight mb-1">{info.name}</h1>
            <div className="flex items-center gap-1.5 text-gray-400 text-sm font-medium">
              <span className="material-symbols-outlined text-[16px]" style={{ color: '#0df280' }}>verified</span>
              <span>Comprehensive Panel</span>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="px-6 flex flex-col gap-8 mt-2">
          {/* Why It Matters */}
          <section>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Why It Matters</h3>
            <p className="text-base text-gray-300 leading-relaxed mb-6">{info.whyItMatters}</p>
            <div className="space-y-3">
              {info.details.map((detail, i) => {
                const colorStyle = getDetailColor(detail.color);
                return (
                  <div key={i} className="rounded-xl p-4 flex gap-4 items-start border border-white/5" style={{ background: '#16201b' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: colorStyle.bg }}>
                      <span className="material-symbols-outlined" style={{ color: colorStyle.text }}>{detail.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{detail.title}</h4>
                      <p className="text-sm text-gray-400 leading-snug">{detail.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* What We Measure */}
          <section>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">What We Measure</h3>
            <div className="rounded-2xl p-5 border border-white/5" style={{ background: '#16201b' }}>
              <div className="flex flex-col gap-4">
                {info.measures.map((measure, i) => (
                  <React.Fragment key={i}>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[20px] mt-0.5" style={{ color: '#0df280' }}>check_circle</span>
                      <div>
                        <p className="font-bold text-white text-sm">{measure.title}</p>
                        <p className="text-xs text-gray-500">{measure.subtitle}</p>
                      </div>
                    </div>
                    {i < info.measures.length - 1 && <div className="h-px bg-white/5 w-full"></div>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* The Patient Experience */}
          <section>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">The Patient Experience</h3>
            <div className="relative pl-4 space-y-6">
              {/* Timeline line */}
              <div className="absolute left-[27px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#0df280] to-transparent"></div>
              {info.experience.map((step, i) => (
                <div key={i} className="relative flex items-center gap-4">
                  <div 
                    className="w-6 h-6 rounded-full border-4 z-10"
                    style={{ 
                      background: i === 0 ? '#0df280' : i === 1 ? 'rgba(13, 242, 128, 0.5)' : 'rgba(13, 242, 128, 0.2)',
                      borderColor: '#0b120f'
                    }}
                  ></div>
                  <div className="flex-1 bg-white/5 p-3 rounded-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400">{step.icon}</span>
                    <span className="text-sm font-medium text-white">{step.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Clinically Validated Badge */}
          <section className="mb-6">
            <div className="rounded-xl p-4 border flex items-center gap-4" style={{ background: 'linear-gradient(to right, #1a2e24, #111814)', borderColor: 'rgba(13, 242, 128, 0.2)' }}>
              <div className="h-12 w-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(13, 242, 128, 0.1)', color: '#0df280' }}>
                <span className="material-symbols-outlined text-[28px]">verified_user</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Clinically Validated</h4>
                <p className="text-xs text-gray-400 mt-1">Our methodologies are rigorously tested for accuracy and precision, meeting the highest industry standards.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full p-6 backdrop-blur-md border-t border-white/5 z-40" style={{ background: 'rgba(11, 18, 15, 0.9)' }}>
        <button 
          className="w-full font-extrabold text-lg h-14 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-200"
          style={{ 
            background: '#0df280', 
            color: '#102219',
            boxShadow: '0 0 20px rgba(13, 242, 128, 0.4)'
          }}
        >
          <span>Request This Test</span>
          <span className="material-symbols-outlined text-[22px] font-bold">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

// ==================== WELLNESS MAP (HONEYCOMB) ====================
const WellnessMap = ({ onZoomerClick }) => {
  // Using exact pixel positioning from the original design
  // Container is 380x420, center at (190, 210)
  // Satellite nodes overflow the container but we use overflow-visible
  return (
    <div 
      className="relative scale-[0.85] sm:scale-100"
      style={{ 
        width: '380px', 
        height: '420px',
        overflow: 'visible'
      }}
    >
      {/* SVG Connection Lines */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-30" viewBox="0 0 380 420">
        <line stroke="#0df280" strokeWidth="1" x1="190" x2="190" y1="210" y2="105"></line>
        <line stroke="#0df280" strokeWidth="1" x1="190" x2="280" y1="210" y2="157"></line>
        <line stroke="#0df280" strokeWidth="1" x1="190" x2="280" y1="210" y2="262"></line>
        <line stroke="#0df280" strokeWidth="1" x1="190" x2="190" y1="210" y2="315"></line>
        <line stroke="#0df280" strokeWidth="1" x1="190" x2="100" y1="210" y2="262"></line>
        <line stroke="#0df280" strokeWidth="1" x1="190" x2="100" y1="210" y2="157"></line>
        <line stroke="white" strokeDasharray="4 2" strokeOpacity="0.2" x1="190" x2="190" y1="105" y2="20"></line>
        <line stroke="white" strokeDasharray="4 2" strokeOpacity="0.2" x1="280" x2="350" y1="157" y2="110"></line>
        <line stroke="white" strokeDasharray="4 2" strokeOpacity="0.2" x1="280" x2="350" y1="262" y2="310"></line>
      </svg>

      {/* Center - Foundation (at 190, 210) */}
      <div 
        className="absolute z-30 group cursor-pointer"
        style={{ left: '190px', top: '210px', transform: 'translate(-50%, -50%)' }}
        onClick={() => onZoomerClick('foundation')}
      >
        <div className="relative w-28 h-32 transition-transform group-hover:scale-105 duration-300">
          <div className="absolute inset-0 blur-xl rounded-full animate-pulse" style={{ background: 'rgba(13, 242, 128, 0.2)' }}></div>
          <div 
            className="absolute inset-0 p-[2px]"
            style={{ 
              background: 'linear-gradient(to bottom right, #0df280, rgba(13, 242, 128, 0.5), rgba(13, 242, 128, 0.1))',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            }}
          >
            <div 
              className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
              style={{ 
                background: '#0a110e',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
              }}
            >
              <div className="absolute inset-0" style={{ background: 'rgba(13, 242, 128, 0.1)' }}></div>
              <span className="relative text-4xl font-extrabold tracking-tighter z-10" style={{ color: '#0df280' }}>85</span>
              <span className="relative text-[9px] font-bold text-white uppercase tracking-widest mt-1 z-10">Foundation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Neural - Top (at 190, 100) */}
      <HexNode 
        name="Neural" icon="psychology" score={88} color="primary"
        style={{ left: '190px', top: '100px' }}
        onClick={() => onZoomerClick('neural')}
      />

      {/* Cardio - Top Right (at 280, 155) */}
      <HexNode 
        name="Cardio" icon="ecg_heart" score={64} color="warning"
        style={{ left: '280px', top: '155px' }}
        onClick={() => onZoomerClick('cardio')}
      />

      {/* Gut - Bottom Right (at 280, 265) */}
      <HexNode 
        name="Gut" icon="spa" score={92} color="primary"
        style={{ left: '280px', top: '265px' }}
        onClick={() => onZoomerClick('gut')}
      />

      {/* Hormone - Bottom (at 190, 320) */}
      <HexNode 
        name="Hormone" icon="bloodtype" score={45} color="alert"
        style={{ left: '190px', top: '320px' }}
        onClick={() => onZoomerClick('hormone')}
      />

      {/* Immune - Bottom Left (at 100, 265) */}
      <HexNode 
        name="Immune" icon="shield" score={81} color="primary"
        style={{ left: '100px', top: '265px' }}
        onClick={() => onZoomerClick('immune')}
      />

      {/* Toxin - Top Left (at 100, 155) - LOCKED */}
      <HexNode 
        name="Toxin" icon="lock" locked
        style={{ left: '100px', top: '155px' }}
        onClick={() => onZoomerClick('toxin')}
      />

      {/* Satellite Nodes - these overflow the container symmetrically */}
      {/* Nutrient - Far Top */}
      <HexNodeSmall 
        name="Nutrient"
        style={{ left: '190px', top: '5px' }}
        onClick={() => onZoomerClick('nutrient')}
      />

      {/* Food - Far Right (155px from center) */}
      <HexNodeSmall 
        name="Food"
        style={{ left: '345px', top: '210px' }}
        onClick={() => onZoomerClick('food')}
      />

      {/* Genetics - Far Left (155px from center) */}
      <HexNodeSmall 
        name="Genetics"
        style={{ left: '35px', top: '210px' }}
        onClick={() => onZoomerClick('genetics')}
      />
    </div>
  );
};

// Inner ring hexagon node
const HexNode = ({ name, icon, score, color, locked, style, onClick }) => {
  const getColor = () => {
    if (locked) return { gradient: 'rgba(255,255,255,0.1)', icon: '#6b7280', text: '#9ca3af' };
    if (color === 'warning') return { gradient: 'rgba(242, 201, 76, 0.6)', icon: '#F2C94C', text: '#F2C94C', scoreBg: 'rgba(242, 201, 76, 0.2)', scoreBorder: 'rgba(242, 201, 76, 0.3)' };
    if (color === 'alert') return { gradient: 'rgba(255, 75, 75, 0.6)', icon: '#FF4B4B', text: '#FF4B4B', scoreBg: 'rgba(255, 75, 75, 0.2)', scoreBorder: 'rgba(255, 75, 75, 0.3)' };
    return { gradient: 'rgba(13, 242, 128, 0.6)', icon: '#0df280', text: '#0df280', scoreBg: 'rgba(13, 242, 128, 0.2)', scoreBorder: 'rgba(13, 242, 128, 0.3)' };
  };
  
  const colors = getColor();
  
  return (
    <div 
      className={`absolute z-20 group ${locked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      style={{ ...style, transform: 'translate(-50%, -50%)' }}
      onClick={onClick}
    >
      <div className={`relative w-24 h-28 transition-transform ${!locked && 'group-hover:scale-105'} duration-300 ${locked ? 'opacity-70 hover:opacity-100' : ''}`}>
        <div 
          className="absolute inset-0 p-[1px]"
          style={{ 
            background: locked ? 'rgba(255,255,255,0.1)' : `linear-gradient(to bottom, ${colors.gradient}, transparent)`,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
        >
          <div 
            className="w-full h-full backdrop-blur-md flex flex-col items-center justify-center"
            style={{ 
              background: locked ? 'rgba(16, 24, 20, 0.9)' : 'rgba(27, 39, 33, 0.8)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            }}
          >
            <span 
              className="material-symbols-outlined mb-1" 
              style={{ fontSize: '24px', color: colors.icon }}
            >
              {icon}
            </span>
            <span className={`text-[10px] font-bold ${locked ? 'text-gray-400' : 'text-white'}`}>{name}</span>
            {!locked && score && (
              <div 
                className="mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
                style={{ background: colors.scoreBg, border: `1px solid ${colors.scoreBorder}`, color: colors.text }}
              >
                {score}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Satellite (outer ring) small hexagon node - always locked
const HexNodeSmall = ({ name, style, onClick }) => {
  return (
    <div 
      className="absolute z-10 group cursor-not-allowed"
      style={{ ...style, transform: 'translate(-50%, -50%)' }}
      onClick={onClick}
    >
      <div className="relative w-20 h-24 opacity-50 hover:opacity-80 transition-opacity">
        <div 
          className="absolute inset-0 p-[1px]"
          style={{ 
            background: 'rgba(255,255,255,0.05)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
        >
          <div 
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ 
              background: 'rgba(10, 17, 14, 0.9)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            }}
          >
            <span className="material-symbols-outlined text-gray-600 mb-0.5" style={{ fontSize: '18px' }}>lock</span>
            <span className="text-[9px] font-bold text-gray-500">{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== HEALTH JOURNEY TIMELINE ====================
const HealthJourneyTimeline = () => {
  const milestones = [
    { date: 'Sep 01', label: 'Start', status: 'past' },
    { date: 'Sep 15', label: 'Biomarkers', status: 'completed' },
    { date: 'Oct 24', label: 'Full Panel', status: 'current' },
    { date: 'Nov 12', label: 'Check-up', status: 'future' },
    { date: 'Dec 01', label: 'Retest', status: 'future' },
  ];

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex items-center min-w-max relative px-4">
        <div className="absolute left-0 right-10 top-[15px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent w-full"></div>
        {milestones.map((milestone, index) => (
          <div 
            key={index}
            className={`relative flex flex-col items-center mr-10 group transition-all ${
              milestone.status === 'past' ? 'opacity-50 grayscale hover:grayscale-0' : 
              milestone.status === 'future' ? 'opacity-40' : ''
            }`}
          >
            <div className="relative z-10 mb-2">
              {milestone.status === 'current' ? (
                <div className="size-3 rounded-full border flex items-center justify-center" style={{ background: '#0a110e', borderColor: '#0df280', boxShadow: '0 0 15px rgba(13,242,128,0.6)' }}>
                  <div className="size-1.5 rounded-full animate-pulse" style={{ background: '#0df280' }}></div>
                </div>
              ) : milestone.status === 'completed' ? (
                <div className="size-2 rounded-full" style={{ background: '#0df280', boxShadow: '0 0 10px rgba(13,242,128,0.3)' }}></div>
              ) : (
                <div className="size-2 rounded-full border" style={{ background: '#1b2721', borderColor: milestone.status === 'past' ? 'rgba(13, 242, 128, 0.4)' : 'rgba(255,255,255,0.2)' }}></div>
              )}
            </div>
            <span className={`text-[9px] font-medium ${milestone.status === 'current' || milestone.status === 'completed' ? 'text-primary' : 'text-gray-500'}`} style={{ color: milestone.status === 'current' || milestone.status === 'completed' ? '#0df280' : undefined }}>{milestone.date}</span>
            <span className={`text-[9px] font-bold mt-0.5 ${milestone.status === 'current' ? 'text-white drop-shadow-md' : milestone.status === 'completed' ? 'text-white' : 'text-gray-500'}`}>{milestone.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== TREND CARD ====================
const TrendCard = () => {
  return (
    <div className="bg-[#151f19] rounded-2xl p-4 border border-white/5 relative overflow-hidden shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" style={{ background: 'linear-gradient(to bottom right, rgba(13, 242, 128, 0.05), transparent)' }}></div>
      <div className="flex flex-col h-full justify-between relative z-10">
        <div>
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Score Trend</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">85</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(13, 242, 128, 0.1)', color: '#0df280' }}>↑ 4%</span>
          </div>
        </div>
        <div className="h-10 w-full mt-2 relative">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
            <defs>
              <linearGradient id="trendGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0df280', stopOpacity: 0.3 }}></stop>
                <stop offset="100%" style={{ stopColor: '#0df280', stopOpacity: 0 }}></stop>
              </linearGradient>
            </defs>
            <path d="M0,35 Q20,30 40,25 T80,15 T100,5" fill="none" stroke="#0df280" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
            <path d="M0,35 Q20,30 40,25 T80,15 T100,5 V40 H0 Z" fill="url(#trendGrad)" stroke="none"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

// ==================== WEARABLE CARD ====================
const WearableCard = () => {
  return (
    <div className="bg-[#151f19] rounded-2xl p-4 border border-white/5 relative overflow-hidden flex flex-col justify-between shadow-lg">
      <div className="flex justify-between items-start relative z-10">
        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Wearable</span>
        <div className="size-1.5 rounded-full animate-pulse" style={{ background: '#0df280', boxShadow: '0 0 20px rgba(13, 242, 128, 0.3)' }}></div>
      </div>
      <div className="flex flex-col gap-2 mt-2 relative z-10">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white shrink-0">
            <span className="material-symbols-outlined text-[18px]">watch</span>
          </div>
          <div>
            <div className="text-xs font-bold text-white leading-tight">Oura Ring</div>
            <div className="text-[9px]" style={{ color: 'rgba(13, 242, 128, 0.8)' }}>Synced 2m ago</div>
          </div>
        </div>
      </div>
      <div className="absolute -right-4 -bottom-4 size-20 rounded-full blur-xl" style={{ background: 'rgba(13, 242, 128, 0.05)' }}></div>
    </div>
  );
};

// ==================== ZOOMER DETAIL VIEW ====================
const ZoomerDetailView = ({ zoomer, onBack }) => {
  const [activeTab, setActiveTab] = useState('latest');
  const [wearableEnabled, setWearableEnabled] = useState(false);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Optimal': case 'Normal': return { bg: 'rgba(13, 242, 128, 0.1)', color: '#0df280' };
      case 'High': return { bg: 'rgba(255, 92, 0, 0.1)', color: '#ff5c00' };
      case 'Low': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      default: return { bg: 'rgba(13, 242, 128, 0.1)', color: '#0df280' };
    }
  };

  const getBarColor = (status) => {
    switch (status) {
      case 'Optimal': case 'Normal': return '#0df280';
      case 'High': return '#ff5c00';
      case 'Low': return '#ef4444';
      default: return '#0df280';
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: '#102219' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300" style={{ background: 'rgba(16, 34, 25, 0.9)', borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="flex items-center justify-between px-4 h-16 max-w-4xl mx-auto w-full">
          <button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors text-white">
            <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
          </button>
          <h1 className="text-lg font-bold tracking-tight text-white">Gut Zoomer Profile</h1>
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors text-white">
            <span className="material-symbols-outlined text-[24px]">ios_share</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col px-4 pt-6 pb-28 space-y-6 overflow-y-auto">
        {/* Warning Banner */}
        <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: 'rgba(255, 92, 0, 0.1)', border: '1px solid rgba(255, 92, 0, 0.2)' }}>
          <span className="material-symbols-outlined shrink-0 mt-0.5" style={{ color: '#ff5c00' }}>history</span>
          <div className="flex-1">
            <h3 className="text-sm font-bold" style={{ color: '#ff5c00' }}>Result data is 6 months old</h3>
            <p className="text-xs text-gray-300 mt-1 mb-2">Your microbiome changes over time. Retest to track your progress accurately.</p>
            <button className="text-xs text-white px-3 py-1.5 rounded-lg font-semibold hover:brightness-110 transition-colors shadow-sm" style={{ background: '#ff5c00' }}>
              Order New Kit
            </button>
          </div>
        </div>

        {/* North Star Metric */}
        <section className="flex flex-col items-center justify-center space-y-4 py-2">
          <div className="relative w-56 h-56 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full blur-2xl transform scale-90" style={{ background: 'rgba(13, 242, 128, 0.1)' }}></div>
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle className="text-white/5" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeWidth="6"></circle>
              <circle style={{ color: '#0df280' }} cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeDasharray="263.89" strokeDashoffset="47.5" strokeLinecap="round" strokeWidth="6"></circle>
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Resilience</span>
              <span className="text-6xl font-extrabold text-white tracking-tighter leading-none">82</span>
              <div className="flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full" style={{ background: 'rgba(13, 242, 128, 0.2)' }}>
                <span className="material-symbols-outlined text-[14px]" style={{ color: '#0df280' }}>trending_up</span>
                <span className="text-xs font-bold" style={{ color: '#0df280' }}>+3 pts</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-white font-bold text-xl">Gut Resilience Score</h2>
            <p className="text-gray-400 text-xs mt-1">High resilience against dietary stress.</p>
          </div>
        </section>

        {/* Health Scores */}
        <section className="grid grid-cols-3 gap-3">
          {[
            { label: 'Diversity', value: '9.4', status: 'High', icon: 'arrow_upward' },
            { label: 'Inflammation', value: 'Low', status: 'Optimal', icon: 'check' },
            { label: 'Phyla', value: '88%', status: 'Fair', icon: 'remove', warning: true },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-3 border shadow-sm flex flex-col items-center text-center space-y-1" style={{ background: '#1a2c24', borderColor: 'rgba(255,255,255,0.05)' }}>
              <span className="text-xs text-gray-400 font-medium">{item.label}</span>
              <span className="text-xl font-bold text-white">{item.value}</span>
              <div className="flex items-center text-[10px] font-bold gap-0.5" style={{ color: item.warning ? '#ff5c00' : '#0df280' }}>
                <span className="material-symbols-outlined text-[12px]">{item.icon}</span>
                <span>{item.status}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Tab Toggle */}
        <section className="flex flex-col gap-4">
          <div className="flex p-1 rounded-lg" style={{ background: '#1a2c24' }}>
            {['latest', 'trends'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 text-xs font-semibold text-center rounded-md transition-all duration-200 ${activeTab === tab ? 'bg-[#2A3F35] text-white shadow-sm' : 'text-gray-400'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Wearable Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl border" style={{ background: '#1a2c24', borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <span className="material-symbols-outlined text-lg">watch</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Wearable Insights</p>
                <p className="text-[10px] text-gray-400">Overlay activity & sleep data</p>
              </div>
            </div>
            <button
              onClick={() => setWearableEnabled(!wearableEnabled)}
              className={`relative w-11 h-6 rounded-full transition-colors ${wearableEnabled ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              <div className={`absolute top-[2px] w-5 h-5 bg-white rounded-full transition-transform ${wearableEnabled ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}></div>
            </button>
          </div>
        </section>

        {/* Detailed Metrics */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Detailed Metrics</h3>
            <button className="text-xs font-bold flex items-center gap-1" style={{ color: '#0df280' }}>
              <span>Sort by Status</span>
              <span className="material-symbols-outlined text-base">sort</span>
            </button>
          </div>
          <div className="space-y-3">
            {gutMetrics.map((metric, i) => {
              const statusStyles = getStatusStyles(metric.status);
              return (
                <div key={i} className="rounded-xl p-4 shadow-sm border" style={{ background: '#1a2c24', borderColor: 'rgba(255,255,255,0.05)' }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-white text-sm">{metric.name}</h4>
                      <p className="text-xs text-gray-400">{metric.category}</p>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-white">{metric.value} {metric.unit && <span className="text-[10px] font-normal text-gray-500">{metric.unit}</span>}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: statusStyles.bg, color: statusStyles.color }}>{metric.status}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-[1fr_60px] gap-3 items-center">
                    <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="absolute left-0 top-0 bottom-0 rounded-full transition-all duration-500" style={{ width: `${metric.barWidth}%`, background: getBarColor(metric.status) }}></div>
                    </div>
                    <div className="h-6 w-full">
                      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 60 20">
                        <path 
                          d={metric.trend === 'up' ? "M0,15 L10,12 L20,16 L30,8 L40,10 L50,5 L60,8" : metric.trend === 'down' ? "M0,5 L10,8 L20,10 L30,12 L40,15 L50,15 L60,18" : "M0,10 L60,10"}
                          fill="none" 
                          stroke={getBarColor(metric.status)} 
                          strokeLinecap="round" 
                          strokeWidth="1.5"
                          strokeDasharray={metric.trend === 'stable' ? "4 2" : "none"}
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full py-3 text-sm font-medium hover:text-white transition-colors" style={{ color: '#0df280' }}>
            View All 24 Markers
          </button>
        </section>
      </main>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-40" style={{ background: 'linear-gradient(to top, #102219, rgba(16, 34, 25, 0.9), transparent)' }}>
        <div className="max-w-4xl mx-auto flex gap-3">
          <button className="flex-1 border text-white font-bold py-4 rounded-xl shadow-lg hover:bg-neutral-800 transition-all flex items-center justify-center gap-2" style={{ background: '#1a2c24', borderColor: 'rgba(255,255,255,0.1)' }}>
            <span className="material-symbols-outlined">calendar_month</span>
            <span>Consult</span>
          </button>
          <button className="flex-[2] font-bold py-4 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2" style={{ background: '#0df280', color: '#102219', boxShadow: '0 10px 25px -5px rgba(13, 242, 128, 0.3)' }}>
            <span className="material-symbols-outlined">download</span>
            <span>Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== DAILY CHECK-IN ====================
const DailyCheckIn = ({ onBack }) => {
  const [tasks, setTasks] = useState(dailyTasks);
  const [streak] = useState(7);

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = Math.round((completedCount / tasks.length) * 100);

  const completeTask = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: true } : t));
  };

  const getTaskColors = (color) => {
    switch (color) {
      case 'green': return { bg: 'rgba(74, 222, 128, 0.2)', border: 'rgba(74, 222, 128, 0.3)', text: '#4ade80', gradient: 'from-green-500/20 to-emerald-600/20' };
      case 'yellow': return { bg: 'rgba(251, 191, 36, 0.2)', border: 'rgba(251, 191, 36, 0.3)', text: '#fbbf24', gradient: 'from-yellow-400 to-amber-500' };
      case 'orange': return { bg: 'rgba(251, 146, 60, 0.2)', border: 'rgba(251, 146, 60, 0.3)', text: '#fb923c', gradient: 'from-orange-400 to-orange-600' };
      default: return { bg: 'rgba(140, 43, 238, 0.2)', border: 'rgba(140, 43, 238, 0.3)', text: '#8c2bee', gradient: 'from-purple-500 to-purple-700' };
    }
  };

  return (
    <div className="relative mx-auto w-full min-h-screen overflow-hidden flex flex-col" style={{ background: theme.colors.checkInBgDark }}>
      {/* Header Gradient */}
      <div className="relative z-10 w-full rounded-b-3xl pb-8 pt-12" style={{ background: 'linear-gradient(to bottom right, #8c2bee, #6366f1, #3b82f6)', boxShadow: '0 20px 50px -12px rgba(140,43,238,0.4)' }}>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay rounded-b-3xl"></div>
        
        <div className="relative px-6 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="size-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-white">arrow_back</span>
            </button>
            <div className="flex flex-col">
              <span className="text-white/80 text-sm font-medium">Hello,</span>
              <h2 className="text-white text-xl font-bold leading-tight">Alex!</h2>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 border border-white/10 shadow-sm">
            <span className="text-lg">🔥</span>
            <span className="text-white text-sm font-bold">{streak} Day Streak</span>
          </div>
        </div>

        <div className="relative px-6">
          <h1 className="text-white text-4xl font-extrabold tracking-tight mb-1 drop-shadow-sm">Oct 24</h1>
          <p className="text-white/80 text-lg font-medium">Tuesday Check-in</p>
        </div>
      </div>

      {/* Task Cards */}
      <div className="flex-1 px-5 -mt-6 relative z-20 pb-32 flex flex-col gap-5 overflow-y-auto">
        {tasks.map((task) => {
          const colors = getTaskColors(task.color);
          return (
            <div
              key={task.id}
              className={`group relative overflow-hidden rounded-3xl p-5 transition-all duration-300 shadow-lg ${task.completed ? 'border' : ''}`}
              style={{
                background: task.completed ? theme.colors.checkInSurface : 'rgba(45, 36, 56, 0.4)',
                backdropFilter: 'blur(12px)',
                border: task.completed ? `1px solid ${colors.border}` : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: task.completed ? `0 0 30px ${colors.bg}` : undefined
              }}
            >
              {/* Confetti for completed */}
              {task.completed && (
                <div className="absolute inset-0 z-0 overflow-hidden opacity-100 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                  <div className="absolute top-1/3 right-1/4 h-3 w-1 bg-yellow-300 rotate-45"></div>
                  <div className="absolute bottom-1/3 left-1/3 h-2 w-2 bg-blue-400 rounded-full"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent to-transparent"></div>
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md" style={{ background: `${colors.bg}`, border: `1px solid ${colors.border}`, color: colors.text }}>
                    Goal: {task.goal}
                  </span>
                  <span className="text-xs font-bold flex items-center gap-1" style={{ color: colors.text }}>
                    <span className="material-symbols-outlined text-sm">stars</span> +{task.xp} XP
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border"
                    style={{ 
                      background: `${colors.bg}`, 
                      borderColor: colors.border,
                      color: colors.text,
                      boxShadow: `0 0 15px ${colors.bg}`
                    }}
                  >
                    <span className="material-symbols-outlined text-3xl">{task.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold" style={{ color: task.completed ? colors.text : 'white' }}>{task.title}</h3>
                    <p className="text-xs font-medium" style={{ color: task.completed ? `${colors.text}80` : 'rgba(255,255,255,0.4)' }}>{task.description}</p>
                  </div>
                </div>

                {task.completed ? (
                  <div className="w-full h-12 rounded-2xl border flex items-center justify-center gap-2 relative overflow-hidden" style={{ background: `linear-gradient(to right, ${colors.bg}, ${colors.bg})`, borderColor: colors.border }}>
                    <span className="material-symbols-outlined" style={{ color: colors.text }}>celebration</span>
                    <span className="font-bold text-sm tracking-wide" style={{ color: colors.text }}>Excellent Job!</span>
                  </div>
                ) : (
                  <div 
                    className="relative h-14 w-full rounded-full border p-1.5 shadow-inner cursor-pointer"
                    style={{ background: 'rgba(26, 20, 37, 0.6)', borderColor: 'rgba(255,255,255,0.1)' }}
                    onClick={() => completeTask(task.id)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-40">
                      <span className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase">Swipe to Complete »</span>
                    </div>
                    <div 
                      className="h-full w-14 rounded-full flex items-center justify-center text-white cursor-pointer z-10 transition-all hover:translate-x-2"
                      style={{ background: `linear-gradient(to right, ${colors.text}, ${colors.text}dd)`, boxShadow: `0 0 15px ${colors.bg}` }}
                    >
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[400px]">
        <div className="flex h-16 w-full items-center justify-between rounded-full px-6 shadow-xl" style={{ background: 'rgba(45, 36, 56, 0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: theme.colors.checkInPrimary }}>Daily Progress</span>
            <span className="text-white font-bold text-sm">{completedCount} of {tasks.length} tasks complete</span>
          </div>
          <div className="relative h-10 w-10 shrink-0">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              <path className="text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
              <path style={{ color: theme.colors.checkInPrimary, filter: 'drop-shadow(0 0 8px rgba(140,43,238,0.8))' }} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${progress}, 100`} strokeLinecap="round" strokeWidth="3"></path>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">{progress}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN DASHBOARD ====================
const MainDashboard = ({ onZoomerClick, onCheckInClick }) => {
  return (
    <div 
      className="text-white h-screen w-full flex flex-col relative overflow-y-auto"
      style={{ 
        background: theme.colors.backgroundDark,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: 'rgba(13, 242, 128, 0.05)' }}></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: 'rgba(59, 130, 246, 0.05)' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 md:px-6 py-4 bg-transparent shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10" style={{ color: '#0df280', boxShadow: '0 0 20px rgba(13, 242, 128, 0.3)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>hexagon</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Wellness Map</h1>
        </div>
        <button className="size-10 rounded-full overflow-hidden border border-white/10">
          <img 
            alt="Profile" 
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG3Qovmsn0SQwnsAkws-_RPagJuDV67YPGlu7kBx3MCaaxNNHZ6YaH1kr9GC8bc9WMCWJVzoBHWUm6LwHrNvPloo6_AQEaXfpbjLdb01c7OW44XK5ZAqOijSweD4GWYZ6Y1Hb5HEeqgCOosXDD3pKA4IoYhhZjYjTx3Uwlybh2fnNQLxdIqxT_ZKVgeCy81xYlZCQKVBnAijr3LtKlT2zli_14bfW6lokAy9UbKa5M6azNpOFuG7aNWa1g-_TMjpIvv_Y8RMmuHYk"
          />
        </button>
      </header>

      {/* Health Journey Timeline */}
      <div className="relative z-20 w-full pt-1 pb-1 pl-4 shrink-0">
        <div className="flex items-center justify-between pr-6 mb-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Health Journey</span>
        </div>
        <HealthJourneyTimeline />
      </div>

      {/* Wellness Map with Floating Notification */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full min-h-0 overflow-visible">
        {/* Floating Notification Badge - centered above the map */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 animate-float">
          <div className="flex items-center gap-3 pl-2 pr-4 py-2 backdrop-blur-md border rounded-full shadow-lg" style={{ background: 'rgba(27, 39, 33, 0.9)', borderColor: 'rgba(13, 242, 128, 0.2)' }}>
            <div className="size-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(13, 242, 128, 0.2)', color: '#0df280' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>medical_services</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">New Result</span>
              <span className="text-xs font-medium text-white">Genetics profile unlocked</span>
            </div>
          </div>
        </div>
        
        {/* Centered map container - use padding to account for overflow */}
        <div className="flex items-center justify-center w-full mt-8 px-8">
          <WellnessMap onZoomerClick={onZoomerClick} />
        </div>
      </main>

      {/* Bottom Sheet */}
      <div 
        className="relative z-20 w-full rounded-t-3xl border-t pb-8"
        style={{ 
          background: 'rgba(27, 39, 33, 0.8)',
          backdropFilter: 'blur(24px)',
          borderColor: 'rgba(255,255,255,0.05)',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.5)'
        }}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-12 rounded-full bg-white/10"></div>
        </div>
        <div className="px-4 md:px-6 pt-2 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Trend & Activity</h2>
            <span className="text-xs font-medium text-white/40">Today, 24 Oct</span>
          </div>
          
          {/* Cards Grid - Responsive */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <TrendCard />
            <WearableCard />
            {/* Extra cards for larger screens */}
            <div className="hidden md:block bg-[#151f19] rounded-2xl p-4 border border-white/5 relative overflow-hidden shadow-lg">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-2">Daily Check-in</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <span className="text-lg font-bold text-white">7 Day</span>
              </div>
              <span className="text-xs text-gray-400">Streak</span>
            </div>
            <div className="hidden md:block bg-[#151f19] rounded-2xl p-4 border border-white/5 relative overflow-hidden shadow-lg">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-2">Next Appointment</span>
              <span className="text-sm font-bold text-white block">Dr. Chen</span>
              <span className="text-xs text-gray-400">Nov 12, 10:00 AM</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onCheckInClick}
              className="flex-1 h-14 rounded-xl flex items-center justify-center gap-2 font-bold text-base transition-colors active:scale-95 duration-200"
              style={{ background: '#0df280', color: '#111814', boxShadow: '0 0 20px rgba(13, 242, 128, 0.3)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>qr_code_scanner</span>
              Daily Goals
            </button>
            <button className="size-14 rounded-xl flex items-center justify-center hover:bg-[#324239] transition-colors" style={{ background: '#27352d' }}>
              <span className="material-symbols-outlined text-white" style={{ fontSize: '24px' }}>history</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN APP ====================
export default function VibrantDashboard() {
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, zoomer-detail, check-in, locked-learn-more
  const [selectedZoomer, setSelectedZoomer] = useState(null);
  const [lockedModalZoomer, setLockedModalZoomer] = useState(null);

  const handleZoomerClick = useCallback((zoomer) => {
    if (zoomerData[zoomer].status === 'locked') {
      // Show locked zoomer modal
      setLockedModalZoomer(zoomer);
      return;
    }
    setSelectedZoomer(zoomer);
    setCurrentView('zoomer-detail');
  }, []);

  const handleBack = useCallback(() => {
    setCurrentView('dashboard');
    setSelectedZoomer(null);
    setLockedModalZoomer(null);
  }, []);

  const handleCheckInClick = useCallback(() => {
    setCurrentView('check-in');
  }, []);

  const handleCloseLockedModal = useCallback(() => {
    setLockedModalZoomer(null);
  }, []);

  const handleLearnMore = useCallback(() => {
    setSelectedZoomer(lockedModalZoomer);
    setLockedModalZoomer(null);
    setCurrentView('locked-learn-more');
  }, [lockedModalZoomer]);

  return (
    <div className="w-full min-h-screen bg-black" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.98); }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      {/* Responsive Container */}
      <div className="w-full min-h-screen">
        {currentView === 'dashboard' && (
          <MainDashboard 
            onZoomerClick={handleZoomerClick} 
            onCheckInClick={handleCheckInClick}
          />
        )}
        {currentView === 'zoomer-detail' && (
          <FoundationZoomerDetail
            zoomer={selectedZoomer}
            onBack={handleBack}
          />
        )}
        {currentView === 'check-in' && (
          <DailyCheckIn onBack={handleBack} />
        )}
        {currentView === 'locked-learn-more' && (
          <LockedZoomerLearnMore 
            zoomer={selectedZoomer} 
            onBack={handleBack}
          />
        )}
      </div>

      {/* Locked Zoomer Modal - renders on top of dashboard */}
      {lockedModalZoomer && (
        <LockedZoomerModal 
          zoomer={lockedModalZoomer}
          onClose={handleCloseLockedModal}
          onLearnMore={handleLearnMore}
        />
      )}
    </div>
  );
}
