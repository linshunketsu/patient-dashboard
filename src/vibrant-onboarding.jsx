import React, { useState, useEffect, useCallback } from 'react';
import VibrantDashboard from './vibrant-dashboard.jsx';
import WearableConnection from './components/WearableConnection.jsx';

// ==================== DESIGN TOKENS ====================
const theme = {
  colors: {
    primary: '#0df280',
    primaryDark: '#0bc168',
    backgroundDark: '#102219',
    backgroundLight: '#f5f8f7',
    surfaceDark: '#1b2721',
    surfaceBorder: '#3b5447',
    textMain: '#111814',
    textMuted: '#608a75',
    statusWarning: '#F2C94C',
    cardDark: '#1A2C23',
  },
  fonts: {
    display: "'Manrope', sans-serif",
  },
};

// ==================== STEP A: THE HOOK ====================
const StepHook = ({ onNext }) => {
  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden" style={{ background: theme.colors.backgroundDark }}>
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 select-none">
        <img 
          alt="Woman stretching outdoors during sunrise" 
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuWZ6nthCl0T32Ib4tOhDA0DYPnShSe2Sx4ZFNRhyG79d3Qozk5oAPaGDBjfzwqtiqXMjhSN-JoOSTJPE6gr9_09RzzUxnZ8XlgZ3SmV36eO2mgwgVvgDamVIQMZDVTw1volmIqzImfyDy_0N1NlRio5TePSccwsbVvCqJNU6L1PED4YPTsrK2LH_7YWciy0EO2DXCrleELHglyUA4HA_zEdhdJ53wxP4jWpUSRBiRJGjmTPA6lSHt3Pdx3L0FTISRL9IEnEHC7u0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-12 pb-4 w-full">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="material-symbols-outlined text-lg font-bold" style={{ color: theme.colors.primary }}>ecg_heart</span>
          </div>
          <span className="text-sm font-bold tracking-widest uppercase text-white/90">Vibrant</span>
        </div>
        <button className="text-xs font-semibold tracking-wide text-white/70 hover:text-white transition-colors uppercase">
          Skip
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full">
        <div 
          className="backdrop-blur-xl border-t border-white/10 rounded-t-[2.5rem] px-6 pt-8 pb-10"
          style={{ 
            background: 'rgba(16, 34, 25, 0.6)',
            boxShadow: '0 -10px 40px rgba(0,0,0,0.3)' 
          }}
        >
          {/* Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-1.5 w-6 rounded-full" style={{ background: theme.colors.primary, boxShadow: '0 0 10px rgba(13,242,128,0.5)' }}></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/20"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/20"></div>
          </div>

          {/* Text Content */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-white tracking-tight text-3xl md:text-4xl font-extrabold leading-tight">
              Medical Insights.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200" style={{ backgroundImage: `linear-gradient(to right, ${theme.colors.primary}, #a7f3d0)` }}>
                Social Speed.
              </span>
            </h1>
            <p className="text-gray-300 text-base font-medium leading-relaxed max-w-[90%] mx-auto">
              Get provider-guided health data delivered to your feed. No appointments, just clarity.
            </p>
          </div>

          {/* Primary Action */}
          <div className="flex flex-col gap-4">
            <button 
              onClick={onNext}
              className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 text-lg font-bold transition-all duration-300"
              style={{ 
                background: theme.colors.primary, 
                color: theme.colors.backgroundDark,
                boxShadow: '0 0 30px rgba(13,242,128,0.25)'
              }}
            >
              <span className="z-10 mr-2">Start Your Journey</span>
              <span className="material-symbols-outlined z-10 transition-transform group-hover:translate-x-1">arrow_forward</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </button>
            <button className="text-sm font-medium hover:text-white transition-colors text-center" style={{ color: '#9cbaab' }}>
              Already a member? <span className="underline underline-offset-4" style={{ color: theme.colors.primary, textDecorationColor: 'rgba(13,242,128,0.4)' }}>Log in</span>
            </button>
          </div>

          {/* iOS Home Indicator */}
          <div className="h-2 w-full mt-4 flex justify-center">
            <div className="w-1/3 h-1 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== STEP B: PROVIDER VALUE ====================
const StepProviderValue = ({ onNext, onBack }) => {
  return (
    <div 
      className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden text-white"
      style={{ 
        background: theme.colors.backgroundDark,
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(13, 242, 128, 0.15) 0%, rgba(16, 34, 25, 0) 70%)'
      }}
    >
      {/* Top App Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 backdrop-blur-md" style={{ background: 'rgba(16, 34, 25, 0.8)' }}>
        <button 
          onClick={onBack}
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 active:scale-95 transition-all text-white"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Provider Value</h2>
      </div>

      {/* Page Indicators */}
      <div className="flex w-full flex-row items-center justify-center gap-2 py-2">
        <div className="h-1.5 w-1.5 rounded-full" style={{ background: theme.colors.surfaceBorder }}></div>
        <div className="h-1.5 w-8 rounded-full bg-white"></div>
        <div className="h-1.5 w-1.5 rounded-full" style={{ background: theme.colors.surfaceBorder }}></div>
      </div>

      {/* Headline */}
      <div className="flex flex-col items-center px-6 pt-6 pb-2 text-center max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
        <h1 className="text-white tracking-tight text-3xl md:text-4xl font-extrabold leading-tight mb-3">
          Why Vibrant is{' '}
          <span className="relative inline-block" style={{ color: theme.colors.primary }}>
            Different
            <svg className="absolute -bottom-1 left-0 w-full h-2 opacity-50" style={{ color: theme.colors.primary }} preserveAspectRatio="none" viewBox="0 0 100 10">
              <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="2"></path>
            </svg>
          </span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg font-medium leading-relaxed max-w-[280px] md:max-w-md">
          Generic AI guesses based on data. <br/>Our providers verify with expertise.
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="flex-1 px-4 py-6 pb-32">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 max-w-2xl mx-auto">
          {/* Generic AI Card */}
          <div className="group relative flex flex-col gap-5 rounded-2xl border border-dashed p-6 transition-all" style={{ borderColor: theme.colors.surfaceBorder, background: 'rgba(27, 39, 33, 0.4)' }}>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '20px' }}>smart_toy</span>
                <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Generic AI</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-white text-3xl font-black leading-tight tracking-tighter opacity-70">Unregulated</span>
              </div>
              <span className="text-gray-400 text-sm font-semibold">Machine Learning</span>
            </div>
            <div className="h-px w-full" style={{ background: theme.colors.surfaceBorder }}></div>
            <div className="flex flex-col gap-3.5">
              <div className="text-sm font-medium leading-normal flex items-start gap-3 text-gray-400">
                <span className="material-symbols-outlined text-gray-400 shrink-0" style={{ fontSize: '20px' }}>data_object</span>
                <span>Data based only</span>
              </div>
              <div className="text-sm font-medium leading-normal flex items-start gap-3 text-gray-400">
                <span className="material-symbols-outlined text-gray-400 shrink-0" style={{ fontSize: '20px' }}>block</span>
                <span>Cannot Prescribe</span>
              </div>
              <div className="text-sm font-medium leading-normal flex items-start gap-3 text-gray-400">
                <span className="material-symbols-outlined text-gray-400 shrink-0" style={{ fontSize: '20px' }}>help_outline</span>
                <span>No Accountability</span>
              </div>
            </div>
          </div>

          {/* Vibrant Provider Card */}
          <div 
            className="relative flex flex-col gap-5 rounded-2xl border-2 p-6 transform md:scale-105 z-10"
            style={{ 
              borderColor: theme.colors.primary, 
              background: theme.colors.surfaceDark,
              boxShadow: '0 25px 50px -12px rgba(13, 242, 128, 0.1)',
              ring: `1px rgba(13, 242, 128, 0.2)`
            }}
          >
            {/* Recommended Badge */}
            <div 
              className="absolute -top-3 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase flex items-center gap-1 whitespace-nowrap"
              style={{ 
                background: theme.colors.primary, 
                color: theme.colors.backgroundDark,
                boxShadow: '0 10px 15px -3px rgba(13, 242, 128, 0.2)'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
              Recommended
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: theme.colors.primary, fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: theme.colors.primary }}>Vibrant Provider</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-white text-3xl font-black leading-tight tracking-tighter">Verified</span>
              </div>
              <span className="text-gray-300 text-sm font-semibold">Doctor-Led Care</span>
            </div>
            <div className="h-px w-full" style={{ background: 'rgba(13, 242, 128, 0.2)' }}></div>
            <div className="flex flex-col gap-3.5">
              <div className="text-sm font-bold leading-normal flex items-start gap-3 text-white">
                <span className="material-symbols-outlined shrink-0" style={{ fontSize: '20px', color: theme.colors.primary }}>verified_user</span>
                <span>Clinically Validated</span>
              </div>
              <div className="text-sm font-bold leading-normal flex items-start gap-3 text-white">
                <span className="material-symbols-outlined shrink-0" style={{ fontSize: '20px', color: theme.colors.primary }}>prescriptions</span>
                <span>Rx Authority</span>
              </div>
              <div className="text-sm font-bold leading-normal flex items-start gap-3 text-white">
                <span className="material-symbols-outlined shrink-0" style={{ fontSize: '20px', color: theme.colors.primary }}>neurology</span>
                <span>Board-Certified MDs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div
        className="fixed bottom-0 left-0 right-0 p-5 pb-8 z-40"
        style={{ background: `linear-gradient(to top, ${theme.colors.backgroundDark}, rgba(16, 34, 25, 0.95), transparent)` }}
      >
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
          <button
            onClick={onNext}
            className="group relative w-full overflow-hidden rounded-full p-4 transition-all hover:shadow-lg active:scale-[0.98]"
            style={{ background: theme.colors.primary }}
          >
            <div className="relative flex items-center justify-center gap-2" style={{ color: theme.colors.backgroundDark }}>
              <span className="text-lg font-bold">Get Verified Care</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1" style={{ fontWeight: 600 }}>arrow_forward</span>
            </div>
          </button>
          <p className="mt-4 text-center text-xs text-gray-500 font-medium">
            Vibrant protects your data with HIPAA compliance.
          </p>
        </div>
      </div>
    </div>
  );
};

// ==================== STEP C: ACCOUNT SETUP ====================
const StepAccountSetup = ({ onNext, onBack, formData, setFormData }) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email;

  return (
    <div 
      className="relative flex min-h-screen w-full flex-col overflow-x-hidden text-white"
      style={{ 
        background: theme.colors.backgroundDark,
        backgroundImage: `radial-gradient(circle at 10% 20%, rgba(13, 242, 128, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(13, 242, 128, 0.08) 0%, transparent 40%)`
      }}
    >
      {/* Top App Bar */}
      <div className="flex items-center p-4 pb-2 justify-between">
        <button onClick={onBack} className="text-white flex size-12 shrink-0 items-center cursor-pointer">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">Step 2 of 4</h2>
      </div>

      {/* Progress Indicators */}
      <div className="flex w-full flex-row items-center justify-center gap-3 py-4">
        <div className="h-1.5 w-12 rounded-full" style={{ background: theme.colors.primary }}></div>
        <div className="h-1.5 w-12 rounded-full" style={{ background: theme.colors.primary }}></div>
        <div className="h-1.5 w-12 rounded-full" style={{ background: theme.colors.surfaceDark }}></div>
        <div className="h-1.5 w-12 rounded-full" style={{ background: theme.colors.surfaceDark }}></div>
      </div>

      {/* Headline */}
      <div className="px-6 pt-8 max-w-md md:max-w-lg mx-auto w-full">
        <h1 className="text-white tracking-tight text-3xl font-bold leading-tight text-left pb-3">Create Your Account</h1>
        <p className="text-white/70 text-base font-normal leading-relaxed text-left max-w-sm">
          Tell us a bit about yourself to begin your personalized health journey.
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-5 px-6 pt-10 max-w-md md:max-w-lg mx-auto w-full">
        <label className="flex flex-col w-full">
          <p className="text-white/90 text-sm font-semibold leading-normal pb-2 ml-1">First Name</p>
          <input 
            className="flex w-full rounded-xl text-white focus:outline-0 focus:ring-2 h-14 px-5 text-base font-normal transition-all"
            style={{ 
              background: 'rgba(27, 39, 33, 0.4)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(59, 84, 71, 0.5)',
            }}
            placeholder="e.g. John" 
            type="text" 
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
          />
        </label>

        <label className="flex flex-col w-full">
          <p className="text-white/90 text-sm font-semibold leading-normal pb-2 ml-1">Last Name</p>
          <input 
            className="flex w-full rounded-xl text-white focus:outline-0 focus:ring-2 h-14 px-5 text-base font-normal transition-all"
            style={{ 
              background: 'rgba(27, 39, 33, 0.4)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(59, 84, 71, 0.5)',
            }}
            placeholder="e.g. Doe" 
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
          />
        </label>

        <label className="flex flex-col w-full">
          <p className="text-white/90 text-sm font-semibold leading-normal pb-2 ml-1">Email Address</p>
          <input 
            className="flex w-full rounded-xl text-white focus:outline-0 focus:ring-2 h-14 px-5 text-base font-normal transition-all"
            style={{ 
              background: 'rgba(27, 39, 33, 0.4)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(59, 84, 71, 0.5)',
            }}
            placeholder="name@example.com" 
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </label>
      </div>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Action Section */}
      <div className="px-6 pb-12 pt-10 max-w-md md:max-w-lg mx-auto w-full">
        <button 
          onClick={onNext}
          disabled={!isFormValid}
          className="w-full h-14 rounded-xl font-bold text-lg active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.primaryDark})`,
            color: theme.colors.backgroundDark,
            boxShadow: '0 10px 15px -3px rgba(13, 242, 128, 0.2)'
          }}
        >
          Continue
        </button>
        <p className="text-white/50 text-sm text-center pt-6">
          Already have an account? 
          <a className="font-semibold hover:underline ml-1" style={{ color: theme.colors.primary }} href="#">Sign In</a>
        </p>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute -z-10 bottom-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
        <div className="w-full h-full rounded-full blur-[100px]" style={{ background: 'rgba(13, 242, 128, 0.3)' }}></div>
      </div>
      <div className="absolute -z-10 top-20 -left-10 w-48 h-48 opacity-10 pointer-events-none">
        <div className="w-full h-full rounded-full blur-[80px]" style={{ background: 'rgba(13, 242, 128, 0.4)' }}></div>
      </div>
    </div>
  );
};

// ==================== STEP D: PROVIDER MATCHING ====================
const StepProviderMatching = ({ onNext, onBack, selectedProvider, setSelectedProvider }) => {
  const providers = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      specialty: 'Functional Medicine',
      rating: 4.9,
      distance: '0.8 mi',
      nextAvailable: 'Today, 2:30 PM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO6_b3Qa_c2DajSVCX3f0Lb8FjWlpjTHed2509XyPj89lqP3WpnBNUDcGg5KveDTrUNdfaVx4PCPpvsP-cc0Wks5rKFwDTbHr5YsswInZWpxQj_DoBglA34asufdhDhWZ93blAC6jlCpX_nyX3U9eHA_N1qfMl0fgfjTkCYitJ6ZIgwbNuawnZhcogT5_TutTZFGJVa-ZoZrfWxpFGAfP7yEsIS5BXHxef6qfFIeo4B-uXhmquOvacqpt0i_94MOpkPEtYAhnltws',
      highlighted: true,
    },
    {
      id: 2,
      name: 'Dr. Michael Ross',
      specialty: 'Cardiology',
      rating: 4.7,
      distance: '2.5 mi',
      nextAvailable: 'Tomorrow, 9:00 AM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4bR0BYLZ6pOfsdSZCuezVYlL4WlqdXOuHcfcC5azrhg_1tHsFceOUycXxAIg5-TXt7eo72-rhS0IwCNda03fUOiB_wkPod7vSHMLyRXYmHNUarmgpG6p_CsbcHuilKy0aCFJvs9IUCAosJ66WEuou8ttdamMbxCrisgfW-d2r6Li4b9Du5TRcf8uoxgXTAOoMJjUBiTA-dZct5Vocujk9FQxtgHBXuRNWg13DS8oMDli65VNaJImHQK8R75LD52p-_gqK--A9nhk',
      highlighted: false,
    },
    {
      id: 3,
      name: 'Dr. Emily Johnson',
      specialty: 'Dermatology',
      rating: 5.0,
      distance: '4.1 mi',
      nextAvailable: 'Oct 24, 11:15 AM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYotbCVL3gLQOgUfMzaE6xf1myYHrKl7lU9-GueooI0CMutc2w9oc2KbszZ3Ew186VgdGt0YjQIIGNb3N-YHRm5SK9F_Q36rUun-iMKCmJx0FQ4LHLUAzthZFnLthV6NXyc_1UqWsebrMwtUTMcj4pIiQnzwuDkVRO2YpfludVBOZHHEClnDofYUJ_5eNlqgxtrJ8P0-99vHy4jwmq4V1XK7jhSVwEaniMqS_20cFKnHLiwsZWPMdsWS44UhkWKaTnaC8SLCagNh8',
      highlighted: false,
    },
  ];

  const [viewMode, setViewMode] = useState('list');

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden" style={{ background: theme.colors.backgroundLight }}>
      {/* Header */}
      <div 
        className="flex items-center backdrop-blur-md p-4 pb-2 justify-between sticky top-0 z-30"
        style={{ background: 'rgba(245, 248, 247, 0.8)' }}
      >
        <button 
          onClick={onBack}
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          style={{ color: theme.colors.textMain }}
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="text-sm font-bold tracking-tight flex-1 text-center pr-10 uppercase opacity-60" style={{ color: theme.colors.textMain }}>
          Find Care Near You
        </h2>
      </div>

      {/* Progress Indicators */}
      <div className="flex w-full flex-row items-center justify-center gap-2 py-2">
        <div className="h-1 w-6 rounded-full" style={{ background: 'rgba(13, 242, 128, 0.2)' }}></div>
        <div className="h-1 w-6 rounded-full" style={{ background: 'rgba(13, 242, 128, 0.2)' }}></div>
        <div className="h-1 w-10 rounded-full" style={{ background: theme.colors.primary }}></div>
        <div className="h-1 w-6 rounded-full bg-gray-200"></div>
      </div>

      {/* Title */}
      <div className="px-5 pt-4 max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto w-full">
        <h1 className="tracking-tight text-3xl font-extrabold leading-tight mb-2" style={{ color: theme.colors.textMain }}>
          Nearby <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${theme.colors.primary}, #22c55e)` }}>Providers</span>
        </h1>
        <p className="text-sm font-medium" style={{ color: theme.colors.textMuted }}>
          Showing top-rated specialists within 10 miles of your current location.
        </p>
      </div>

      {/* Search Section */}
      <div className="px-5 py-4 space-y-3 max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto w-full">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-4" style={{ color: theme.colors.textMuted }}>location_on</span>
          <input 
            className="w-full h-14 pl-12 pr-4 border-none rounded-2xl shadow-sm ring-1 ring-black/5 focus:ring-2 transition-all"
            style={{ background: 'white', color: theme.colors.textMain }}
            placeholder="Enter zip or address..."
            type="text"
          />
        </div>
        <button 
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm shadow-sm active:scale-[0.98] transition-transform"
          style={{ 
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: theme.colors.primary
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>my_location</span>
          Use Current Location
        </button>
      </div>

      {/* View Toggle & Filters */}
      <div className="px-5 pb-4 max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode('list')}
              className="px-4 py-2 rounded-full text-xs font-bold shadow-md"
              style={{ 
                background: viewMode === 'list' ? theme.colors.textMain : 'white',
                color: viewMode === 'list' ? 'white' : theme.colors.textMain,
                border: viewMode === 'list' ? 'none' : '1px solid #e5e7eb'
              }}
            >
              List View
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className="px-4 py-2 rounded-full text-xs font-medium"
              style={{ 
                background: viewMode === 'map' ? theme.colors.textMain : 'white',
                color: viewMode === 'map' ? 'white' : theme.colors.textMain,
                border: viewMode === 'map' ? 'none' : '1px solid #e5e7eb'
              }}
            >
              Map View
            </button>
          </div>
          <button className="flex items-center gap-1 text-xs font-bold" style={{ color: theme.colors.primary }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>tune</span>
            Filters
          </button>
        </div>
      </div>

      {/* Provider Cards */}
      <div className="flex flex-col gap-4 px-5 pb-32 max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto w-full">
        {providers.map((provider) => (
          <div 
            key={provider.id}
            onClick={() => setSelectedProvider(provider)}
            className={`group relative flex flex-col rounded-3xl p-4 shadow-sm transition-all active:scale-[0.99] cursor-pointer ${selectedProvider?.id === provider.id ? 'ring-2' : ''}`}
            style={{ 
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              ringColor: selectedProvider?.id === provider.id ? theme.colors.primary : 'transparent'
            }}
          >
            <div className="flex gap-4">
              <div className="relative shrink-0">
                <div className="size-20 rounded-2xl overflow-hidden bg-gray-100 ring-2 ring-white/50">
                  <img alt={provider.name} className="h-full w-full object-cover" src={provider.image} />
                </div>
                <div 
                  className="absolute -bottom-1 -right-1 text-[10px] font-black px-1.5 py-0.5 rounded-lg shadow-lg"
                  style={{ 
                    background: provider.highlighted ? theme.colors.primary : 'white',
                    color: provider.highlighted ? theme.colors.textMain : theme.colors.textMuted,
                    border: provider.highlighted ? 'none' : '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  {provider.distance}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-extrabold text-base leading-tight" style={{ color: theme.colors.textMain }}>{provider.name}</h3>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: theme.colors.textMuted }}>{provider.specialty}</p>
                  </div>
                  <div 
                    className="flex items-center gap-1 px-2 py-1 rounded-lg"
                    style={{ background: provider.rating >= 4.9 ? 'rgba(251, 191, 36, 0.1)' : '#f3f4f6' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', color: provider.rating >= 4.9 ? '#eab308' : '#9ca3af', fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-[11px] font-black" style={{ color: provider.rating >= 4.9 ? '#a16207' : '#4b5563' }}>{provider.rating}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: theme.colors.textMuted }}>Next Available</span>
                    <span className="text-xs font-bold" style={{ color: theme.colors.textMain }}>{provider.nextAvailable}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedProvider(provider); }}
                    className="px-5 py-2.5 font-extrabold rounded-xl text-xs transition-all"
                    style={{ 
                      background: provider.highlighted || selectedProvider?.id === provider.id ? theme.colors.primary : 'rgba(255,255,255,0.1)',
                      color: provider.highlighted || selectedProvider?.id === provider.id ? theme.colors.textMain : theme.colors.textMain,
                      border: provider.highlighted || selectedProvider?.id === provider.id ? 'none' : '1px solid rgba(0,0,0,0.05)',
                      boxShadow: provider.highlighted || selectedProvider?.id === provider.id ? '0 10px 15px -3px rgba(13, 242, 128, 0.2)' : 'none'
                    }}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 p-6 border-t z-40"
        style={{
          background: 'rgba(245, 248, 247, 0.9)',
          backdropFilter: 'blur(12px)',
          borderColor: '#e5e7eb'
        }}
      >
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
          <button
            onClick={onNext}
            disabled={!selectedProvider}
            className="w-full h-14 font-black rounded-2xl text-base shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: theme.colors.textMain, color: 'white' }}
          >
            Continue to Health Audit
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
          <button className="w-full mt-4 text-center font-bold text-xs uppercase tracking-widest transition-colors" style={{ color: theme.colors.textMuted }}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== STEP E: SCHEDULE CONNECTION ====================
const StepScheduleConnection = ({ onNext, onBack, selectedProvider, selectedDate, setSelectedDate, selectedTime, setSelectedTime }) => {
  const provider = selectedProvider || {
    name: 'Dr. Sarah Chen',
    specialty: 'Senior Cardiologist',
    rating: 4.9,
    reviews: '120+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9Ov4k49C0nYktl1iMjaoCqIHfBtEHjt68yEHuRok-40Xq4O9pXZyvp7XNvYO1bc61WqEDltFt6Ejh4rurN-5WaNf3nE_TW7NjorNtauSPfit9LaHYsjUtuukrXSbNXD8NF4MRSH0AgOldXLsWBao406P4ooMouDKltquo8vVK6bGUsGDMNkuJq149BG4W6T8gGy48EyMvU5MJL2R-k3zzrlSEn0pJZSFkFtfpP9td_Kl3zEsgOtF1Q2ZBGZ67N0BnBWnFx8VKo40',
  };

  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 9)); // October 2023
  const timeSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '11:15 AM', '01:00 PM', '02:30 PM', '03:45 PM', '04:30 PM'];
  const unavailableSlots = ['02:30 PM'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div 
      className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24 text-white"
      style={{ background: '#101622' }}
    >
      {/* Header */}
      <header 
        className="sticky top-0 z-20 w-full backdrop-blur-md border-b"
        style={{ background: 'rgba(16, 22, 34, 0.8)', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={onBack}
            className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
          </button>
          <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Schedule Connection</h2>
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-2 pb-4">
          <div className="h-1.5 w-8 rounded-full" style={{ background: 'rgba(0, 230, 118, 0.3)' }}></div>
          <div className="h-1.5 w-8 rounded-full" style={{ background: 'rgba(0, 230, 118, 0.3)' }}></div>
          <div className="h-1.5 w-8 rounded-full" style={{ background: 'rgba(0, 230, 118, 0.3)' }}></div>
          <div className="h-1.5 w-8 rounded-full" style={{ background: '#00E676', boxShadow: '0 0 15px -2px rgba(0, 230, 118, 0.5)' }}></div>
          <div className="h-1.5 w-8 rounded-full bg-white/10"></div>
        </div>
      </header>

      <main className="flex flex-col gap-6 p-4 max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto w-full">
        {/* Provider Card */}
        <section 
          className="relative overflow-hidden rounded-2xl border p-4 shadow-sm backdrop-blur-md"
          style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl" style={{ background: 'rgba(0, 230, 118, 0.1)' }}></div>
          <div className="relative flex items-center gap-4">
            <div className="relative">
              <div 
                className="size-20 rounded-full bg-gray-700 bg-center bg-cover border-2 shadow-lg"
                style={{ 
                  backgroundImage: `url("${provider.image}")`,
                  borderColor: 'rgba(255,255,255,0.2)'
                }}
              ></div>
              <div 
                className="absolute bottom-0.5 right-0.5 size-4 rounded-full border-2"
                style={{ background: '#00E676', borderColor: '#1a1f2b', boxShadow: '0 0 15px -2px rgba(0, 230, 118, 0.5)' }}
              ></div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold leading-tight">{provider.name}</h3>
              <p className="font-bold text-sm" style={{ color: '#00E676', textShadow: '0 0 8px rgba(0, 230, 118, 0.4)' }}>{provider.specialty}</p>
              <div className="mt-2 flex items-center gap-2">
                <span 
                  className="inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ring-1 ring-inset"
                  style={{ background: 'rgba(0, 230, 118, 0.1)', color: '#00E676', ringColor: 'rgba(0, 230, 118, 0.3)' }}
                >
                  {provider.specialty?.split(' ')[0] || 'Cardiology'}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#eab308' }}>star</span>
                  {provider.rating} ({provider.reviews || '120+'})
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="flex flex-col gap-3">
          <h3 className="px-1 text-lg font-bold tracking-tight">Select Date</h3>
          <div 
            className="rounded-2xl border p-4 shadow-sm"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div className="mb-4 flex items-center justify-between">
              <button 
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="flex size-8 items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_left</span>
              </button>
              <p className="text-base font-bold">{monthName}</p>
              <button 
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="flex size-8 items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
              </button>
            </div>
            <div className="mb-2 grid grid-cols-7 text-center">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <span key={i} className="text-xs font-semibold text-gray-400">{day}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-2">
              {Array(firstDay).fill(null).map((_, i) => <span key={`empty-${i}`}></span>)}
              {Array(daysInMonth).fill(null).map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDate === day;
                const isPast = day < 5;
                return (
                  <button
                    key={day}
                    onClick={() => !isPast && setSelectedDate(day)}
                    disabled={isPast}
                    className={`flex size-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${isPast ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-white/10'}`}
                    style={isSelected ? { 
                      background: '#00E676', 
                      color: '#00381C',
                      fontWeight: 800,
                      boxShadow: '0 10px 15px -3px rgba(0, 230, 118, 0.4)'
                    } : {}}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Time Slots Section */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold tracking-tight">Available Time</h3>
            <span className="text-sm text-gray-400">Oct {selectedDate || 5}, 2023</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((time) => {
              const isUnavailable = unavailableSlots.includes(time);
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => !isUnavailable && setSelectedTime(time)}
                  disabled={isUnavailable}
                  className={`group relative overflow-hidden rounded-xl border py-3 text-sm font-semibold transition-all ${isUnavailable ? 'opacity-50 cursor-not-allowed' : 'hover:border-green-500/50 hover:bg-green-500/5'}`}
                  style={isSelected ? {
                    borderWidth: '2px',
                    borderColor: '#00E676',
                    background: '#00E676',
                    color: '#00381C',
                    fontWeight: 800,
                    boxShadow: '0 10px 15px -3px rgba(0, 230, 118, 0.3)'
                  } : {
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: 'rgba(255,255,255,0.1)'
                  }}
                >
                  <span className={`relative z-10 ${isUnavailable ? 'line-through text-gray-600' : ''} ${!isSelected && !isUnavailable ? 'group-hover:text-green-400' : ''}`}>
                    {time}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      {/* Bottom Action */}
      <div 
        className="fixed bottom-0 left-0 w-full border-t p-4 backdrop-blur-xl z-50"
        style={{ background: 'rgba(16, 22, 34, 0.9)', borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div className="mx-auto max-w-lg">
          <button 
            onClick={onNext}
            disabled={!selectedDate || !selectedTime}
            className="w-full rounded-xl py-4 text-center font-extrabold shadow-lg transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              background: '#00E676', 
              color: '#00381C',
              boxShadow: '0 10px 15px -3px rgba(0, 230, 118, 0.4)'
            }}
          >
            Confirm Appointment
          </button>
        </div>
        <div className="h-4 w-full"></div>
      </div>
    </div>
  );
};

// ==================== STEP F: SUCCESS ====================
const StepSuccess = ({ onNext, selectedProvider }) => {
  const provider = selectedProvider || { name: 'Dr. Sarah Chen' };

  return (
    <div 
      className="relative flex min-h-screen w-full flex-col overflow-hidden text-white"
      style={{ background: theme.colors.backgroundDark }}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-[60vh] pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(13, 242, 128, 0.1), rgba(13, 242, 128, 0.05), transparent)' }}></div>
      <div className="absolute top-[-10%] right-[-20%] w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none" style={{ background: 'rgba(13, 242, 128, 0.1)' }}></div>
      <div className="absolute bottom-[-10%] left-[-20%] w-[250px] h-[250px] rounded-full blur-[60px] pointer-events-none" style={{ background: 'rgba(13, 242, 128, 0.05)' }}></div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 py-12">
        {/* Hero Animation Container */}
        <div className="relative mb-10 group">
          <div className="absolute inset-0 rounded-full opacity-20 animate-ping" style={{ background: theme.colors.primary }}></div>
          <div className="absolute inset-[-12px] rounded-full border animate-pulse" style={{ borderColor: 'rgba(13, 242, 128, 0.3)' }}></div>
          <div 
            className="relative w-32 h-32 rounded-full border-4 flex items-center justify-center"
            style={{ 
              background: 'linear-gradient(to bottom right, #1a382a, #102219)',
              borderColor: theme.colors.primary,
              boxShadow: '0 0 40px rgba(13, 242, 128, 0.4)'
            }}
          >
            <span className="material-symbols-outlined text-6xl font-bold" style={{ color: theme.colors.primary }}>check_circle</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-white tracking-tight text-4xl font-extrabold leading-tight text-center mb-10 drop-shadow-sm">
          Connection <br/>
          <span style={{ color: theme.colors.primary }}>Confirmed!</span>
        </h1>

        {/* Doctor Connection Card */}
        <div className="flex flex-col items-center gap-5 w-full max-w-[320px]">
          <div className="relative">
            <div 
              className="w-[100px] h-[100px] rounded-full p-1"
              style={{ background: `linear-gradient(to top right, ${theme.colors.primary}, ${theme.colors.backgroundDark})` }}
            >
              <div 
                className="w-full h-full rounded-full bg-center bg-no-repeat bg-cover border-4"
                style={{ 
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDVIUwJzXQQI_Jgs7rTTX5yRHp_d43iHQ-2AHI_R-3ia3VDdwwGnQLLaw_5Weu6fDFXFkMXdDKVzEVyyVsqSSKcy21Vair4CJr_ykXU9MJUJlSlfCBxBf8KaYaM5qAfFXPJVaGX5AuwEOzS4cHMnnSZnjT4O-vep1mGOYWl35MojxStEBhDavhB-NiqbRAb4yHyD28b7EYvhoS1IusS535J-SKwQpej3SDatlolmksiA8IWOs433BREGSHmdOaOYdz5_OMfLnAJ65U")',
                  borderColor: theme.colors.backgroundDark
                }}
              ></div>
            </div>
            <div 
              className="absolute bottom-0 right-0 p-1.5 rounded-full border-[3px] flex items-center justify-center shadow-lg"
              style={{ background: theme.colors.primary, borderColor: theme.colors.backgroundDark }}
            >
              <span className="material-symbols-outlined text-lg font-bold" style={{ color: theme.colors.backgroundDark }}>link</span>
            </div>
          </div>

          <p className="text-gray-300 text-lg font-medium leading-relaxed text-center px-2">
            You are now connected with <br/>
            <span className="text-white font-bold text-xl">{provider.name}</span>.
          </p>
          <p className="text-gray-400 text-base font-normal text-center">
            Your health journey begins now.
          </p>
        </div>
      </div>

      {/* Footer / Action Button */}
      <div
        className="w-full px-6 pb-10 pt-4 relative z-20"
        style={{ background: `linear-gradient(to top, ${theme.colors.backgroundDark}, transparent)` }}
      >
        <div className="max-w-md md:max-w-lg mx-auto">
          <button
            onClick={onNext}
            className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 transition-colors duration-200 text-lg font-bold leading-normal tracking-wide"
            style={{
              background: theme.colors.primary,
              color: theme.colors.backgroundDark,
              boxShadow: '0 0 20px rgba(13, 242, 128, 0.2)'
            }}
          >
            <span className="mr-2">Go to My Dashboard</span>
            <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== STEP G: DASHBOARD (Waiting State) ====================
const StepDashboard = ({ selectedProvider, onActivateDemo, onSetupWearable }) => {
  const provider = selectedProvider || { name: 'Dr. Sarah Chen' };

  const zoomers = [
    { name: 'Neural', position: 'top-[calc(50%-110px)] left-1/2 -translate-x-1/2' },
    { name: 'Cardio', position: 'top-[calc(50%-55px)] left-[calc(50%+90px)] -translate-x-1/2' },
    { name: 'Gut', position: 'top-[calc(50%+55px)] left-[calc(50%+90px)] -translate-x-1/2' },
    { name: 'Hormone', position: 'top-[calc(50%+110px)] left-1/2 -translate-x-1/2' },
    { name: 'Immune', position: 'top-[calc(50%+55px)] left-[calc(50%-90px)] -translate-x-1/2' },
    { name: 'Toxin', position: 'top-[calc(50%-55px)] left-[calc(50%-90px)] -translate-x-1/2' },
  ];

  const satelliteZoomers = [
    { name: 'Nutrient', position: 'top-[calc(50%-205px)] left-1/2 -translate-x-1/2' },
    { name: 'Food', position: 'top-1/2 left-[calc(50%+165px)] -translate-x-1/2 -translate-y-1/2' },
    { name: 'Genetics', position: 'top-1/2 left-[calc(50%-165px)] -translate-x-1/2 -translate-y-1/2' },
  ];

  return (
    <div 
      className="text-white overflow-hidden h-screen w-full flex flex-col relative"
      style={{ 
        background: '#0a110e',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gray-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gray-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 bg-transparent shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>hexagon</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-200">Wellness Map</h1>
        </div>
        <button className="size-10 rounded-full overflow-hidden border border-white/10 opacity-80">
          <img 
            alt="Profile" 
            className="w-full h-full object-cover grayscale"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG3Qovmsn0SQwnsAkws-_RPagJuDV67YPGlu7kBx3MCaaxNNHZ6YaH1kr9GC8bc9WMCWJVzoBHWUm6LwHrNvPloo6_AQEaXfpbjLdb01c7OW44XK5ZAqOijSweD4GWYZ6Y1Hb5HEeqgCOosXDD3pKA4IoYhhZjYjTx3Uwlybh2fnNQLxdIqxT_ZKVgeCy81xYlZCQKVBnAijr3LtKlT2zli_14bfW6lokAy9UbKa5M6azNpOFuG7aNWa1g-_TMjpIvv_Y8RMmuHYk"
          />
        </button>
      </header>

      {/* Status Banner */}
      <div className="relative z-20 w-full px-4 mb-2 shrink-0">
        <div 
          className="w-full backdrop-blur-md border rounded-2xl p-4 flex gap-4 items-start shadow-lg relative overflow-hidden group"
          style={{ background: 'rgba(27, 39, 33, 0.6)', borderColor: 'rgba(242, 201, 76, 0.2)' }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-xl -mr-10 -mt-10" style={{ background: 'rgba(242, 201, 76, 0.05)' }}></div>
          <div 
            className="size-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(242, 201, 76, 0.1)', border: '1px solid rgba(242, 201, 76, 0.2)' }}
          >
            <span className="material-symbols-outlined animate-pulse" style={{ fontSize: '20px', color: '#F2C94C' }}>hourglass_top</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-white leading-tight mb-1">Waiting for Provider Approval</h3>
            <p className="text-[11px] font-medium text-gray-400 leading-relaxed">{provider.name} is reviewing your profile to unlock your first diagnostics.</p>
          </div>
        </div>
      </div>

      {/* Honeycomb Map */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-4 min-h-0 shrink-0">
        <div className="relative w-[380px] h-[420px] mt-4 scale-[0.85] sm:scale-100 opacity-80">
          {/* SVG Lines */}
          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-10" viewBox="0 0 380 420">
            <line stroke="#ffffff" strokeWidth="1" x1="190" x2="190" y1="210" y2="105"></line>
            <line stroke="#ffffff" strokeWidth="1" x1="190" x2="280" y1="210" y2="157"></line>
            <line stroke="#ffffff" strokeWidth="1" x1="190" x2="280" y1="210" y2="262"></line>
            <line stroke="#ffffff" strokeWidth="1" x1="190" x2="190" y1="210" y2="315"></line>
            <line stroke="#ffffff" strokeWidth="1" x1="190" x2="100" y1="210" y2="262"></line>
            <line stroke="#ffffff" strokeWidth="1" x1="190" x2="100" y1="210" y2="157"></line>
            <line stroke="white" strokeDasharray="4 2" strokeOpacity="0.1" x1="190" x2="190" y1="105" y2="20"></line>
            <line stroke="white" strokeDasharray="4 2" strokeOpacity="0.1" x1="280" x2="350" y1="157" y2="110"></line>
            <line stroke="white" strokeDasharray="4 2" strokeOpacity="0.1" x1="280" x2="350" y1="262" y2="310"></line>
          </svg>

          {/* Center - Foundation Zoomer (Pending) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-32 z-30 group">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gray-500/10 blur-xl rounded-full animate-pulse"></div>
              <div 
                className="absolute inset-0 p-[2px]"
                style={{ 
                  background: 'linear-gradient(to bottom right, #374151, #1f2937, #111827)',
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
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                  <span className="material-symbols-outlined text-gray-500 mb-1 animate-pulse" style={{ fontSize: '32px' }}>pending</span>
                  <span className="relative text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10 animate-pulse">Pending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Zoomers (Locked) */}
          {zoomers.map((zoomer) => (
            <div 
              key={zoomer.name}
              className={`absolute ${zoomer.position} -translate-y-1/2 w-24 h-28 z-20 group cursor-not-allowed opacity-50`}
            >
              <div className="relative w-full h-full">
                <div 
                  className="absolute inset-0 p-[1px]"
                  style={{ 
                    background: 'rgba(255,255,255,0.1)',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                  }}
                >
                  <div 
                    className="w-full h-full backdrop-blur-md flex flex-col items-center justify-center"
                    style={{ 
                      background: 'rgba(27, 39, 33, 0.8)',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                  >
                    <span className="material-symbols-outlined text-gray-500 mb-1" style={{ fontSize: '20px' }}>lock</span>
                    <span className="text-[10px] font-bold text-gray-500">{zoomer.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Satellite Zoomers (More faded) */}
          {satelliteZoomers.map((zoomer) => (
            <div 
              key={zoomer.name}
              className={`absolute ${zoomer.position} w-20 h-24 z-10 group cursor-not-allowed opacity-30`}
            >
              <div className="relative w-full h-full">
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
                    <span className="text-[9px] font-bold text-gray-500">{zoomer.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
        <div className="px-6 pt-2 max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">What to Expect</h2>
            <span className="text-xs font-medium text-white/40">Step 1 of 3</span>
          </div>
          <div className="flex flex-col gap-3 mb-6">
            {/* Step 1 - Active */}
            <div 
              className="flex items-center gap-4 p-3 rounded-2xl relative overflow-hidden"
              style={{ background: '#151f19', border: `1px solid rgba(13, 242, 128, 0.2)` }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: theme.colors.primary }}></div>
              <div 
                className="size-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(13, 242, 128, 0.1)', border: '1px solid rgba(13, 242, 128, 0.2)' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: theme.colors.primary }}>badge</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white">Provider Review</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Profile awaiting verification</p>
              </div>
              <div 
                className="px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider"
                style={{ background: 'rgba(13, 242, 128, 0.1)', color: theme.colors.primary }}
              >
                In Progress
              </div>
            </div>

            {/* Step 2 - Locked */}
            <div 
              className="flex items-center gap-4 p-3 rounded-2xl opacity-60"
              style={{ background: 'rgba(21, 31, 25, 0.4)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div 
                className="size-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <span className="material-symbols-outlined text-gray-500" style={{ fontSize: '20px' }}>biotech</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-300">First Diagnostics</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">At-home test kit shipping</p>
              </div>
              <span className="material-symbols-outlined text-gray-600" style={{ fontSize: '18px' }}>lock</span>
            </div>

            {/* Step 3 - Locked */}
            <div 
              className="flex items-center gap-4 p-3 rounded-2xl opacity-60"
              style={{ background: 'rgba(21, 31, 25, 0.4)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div 
                className="size-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <span className="material-symbols-outlined text-gray-500" style={{ fontSize: '20px' }}>description</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-300">Your Plan</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">Personalized wellness strategy</p>
              </div>
              <span className="material-symbols-outlined text-gray-600" style={{ fontSize: '18px' }}>lock</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={onSetupWearable}
              className="flex-1 h-14 text-white border rounded-xl flex items-center justify-center gap-2 font-bold text-base hover:bg-gray-700 transition-colors active:scale-95 duration-200"
              style={{ background: '#374151', borderColor: '#4b5563' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>watch</span>
              Setup Wearable
            </button>
            <button
              className="size-14 text-white/50 rounded-xl flex items-center justify-center border cursor-not-allowed"
              style={{ background: '#27352d', borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>history</span>
            </button>
          </div>

          {/* Demo Jump Button */}
          <button
            onClick={onActivateDemo}
            className="w-full mt-3 h-10 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all hover:brightness-110 active:scale-[0.98]"
            style={{ background: 'rgba(13, 242, 128, 0.15)', border: '1px dashed rgba(13, 242, 128, 0.4)', color: '#0df280' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>flash_on</span>
            DEMO: Jump to Full Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN APP ====================
export default function VibrantOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDemoDashboard, setShowDemoDashboard] = useState(false);
  const [showWearableSetup, setShowWearableSetup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@vibrant.com',
  });
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedDate, setSelectedDate] = useState(5);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  const steps = [
    { id: 'hook', component: StepHook },
    { id: 'provider-value', component: StepProviderValue },
    { id: 'account-setup', component: StepAccountSetup },
    { id: 'provider-matching', component: StepProviderMatching },
    { id: 'schedule', component: StepScheduleConnection },
    { id: 'success', component: StepSuccess },
    { id: 'dashboard', component: StepDashboard },
  ];

  const goNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const goBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const CurrentStepComponent = steps[currentStep].component;

  // Show demo dashboard when activated
  if (showDemoDashboard) {
    return (
      <div className="w-full h-screen overflow-hidden">
        <VibrantDashboard />
      </div>
    );
  }

  // Show wearable setup screen
  if (showWearableSetup) {
    return (
      <WearableConnection
        onBack={() => setShowWearableSetup(false)}
        onNext={() => setShowDemoDashboard(true)}
      />
    );
  }

  return (
    <div className="w-full h-screen bg-black overflow-hidden" style={{ fontFamily: theme.fonts.display }}>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <CurrentStepComponent
        onNext={goNext}
        onBack={goBack}
        formData={formData}
        setFormData={setFormData}
        selectedProvider={selectedProvider}
        setSelectedProvider={setSelectedProvider}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        onActivateDemo={() => setShowDemoDashboard(true)}
        onSetupWearable={() => setShowWearableSetup(true)}
      />
    </div>
  );
}
