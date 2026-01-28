import React, { useState } from 'react';

/**
 * WearableConnection - Device connection screen for onboarding
 *
 * Displays a grid of available wearable devices that users can connect to
 * sync their biometric data with the platform.
 */

const devices = [
  {
    id: 'apple-health',
    name: 'Apple Health',
    description: 'Steps, Sleep, HR',
    icon: 'favorite',
    iconColor: 'text-red-500',
    bgClass: 'bg-white',
    connected: false
  },
  {
    id: 'oura-ring',
    name: 'Oura Ring',
    description: 'Sleep, Readiness',
    icon: 'circle',
    iconType: 'ring',
    bgClass: 'bg-black border border-white/10',
    connected: true
  },
  {
    id: 'whoop',
    name: 'Whoop',
    description: 'Strain, Recovery',
    iconType: 'text-w',
    textLabel: 'W',
    bgClass: 'bg-gray-900 border border-white/10',
    connected: false
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    description: 'Activity, Sleep',
    icon: 'graphic_eq',
    iconColor: 'text-white',
    bgClass: 'bg-[#00B0B9]',
    connected: false
  },
  {
    id: 'garmin',
    name: 'Garmin',
    description: 'GPS, Running, HR',
    iconType: 'triangle',
    bgClass: 'bg-white',
    connected: false
  },
  {
    id: 'other',
    name: 'Other Device',
    icon: 'add',
    isOther: true,
    connected: false
  }
];

const dataSyncItems = [
  { icon: 'bedtime', label: 'Sleep Analysis', connected: true },
  { icon: 'monitor_heart', label: 'Heart Rate Variability', connected: true },
  { icon: 'local_fire_department', label: 'Activity & Calories', connected: true }
];

const WearableConnection = ({ onBack, onNext }) => {
  const [connectedDevices, setConnectedDevices] = useState(new Set(['oura-ring']));

  const toggleDevice = (deviceId) => {
    if (deviceId === 'other') return;
    setConnectedDevices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(deviceId)) {
        newSet.delete(deviceId);
      } else {
        newSet.add(deviceId);
      }
      return newSet;
    });
  };

  const isDeviceConnected = (deviceId) => connectedDevices.has(deviceId);

  return (
    <>
      {/* Google Fonts for Material Symbols */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <div className="flex flex-col h-screen overflow-hidden bg-[#0a110e] text-white relative bg-grid-pattern">
      {/* Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0df280]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#1b2721]/40 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center px-6 py-6 bg-transparent shrink-0">
        <button
          onClick={onBack}
          className="flex items-center justify-center size-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
            arrow_back
          </span>
        </button>
        <h1 className="text-xl font-bold tracking-tight text-gray-200 ml-4">Connect Your Devices</h1>
        <div className="ml-auto">
          <div className="size-10 rounded-full bg-[#0df280]/10 border border-[#0df280]/20 flex items-center justify-center text-[#0df280]">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
              watch
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col w-full px-6 min-h-0 overflow-y-auto no-scrollbar pb-32">
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          Select a wearable device to sync your biometric data. This allows us to build your comprehensive wellness profile.
        </p>

        {/* Device Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {devices.map((device) => (
            <div
              key={device.id}
              onClick={() => toggleDevice(device.id)}
              className={`rounded-2xl p-4 flex flex-col items-center gap-3 relative group overflow-hidden transition-all duration-300 ${
                device.isOther
                  ? 'glass-card cursor-pointer border-dashed border-white/20 hover:border-white/40'
                  : 'glass-card cursor-pointer hover:bg-white/5'
              } ${isDeviceConnected(device.id) ? 'border-[#0df280]/50 shadow-[0_0_20px_rgba(13,242,128,0.3)]' : ''}`}
              style={{ background: 'rgba(27, 39, 33, 0.6)', backdropFilter: 'blur(12px)', border: isDeviceConnected(device.id) ? '1px solid rgba(13, 242, 128, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              {!device.isOther && isDeviceConnected(device.id) && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0df280]/10 to-transparent"></div>
                  <div className="absolute top-2 right-2 text-[#0df280]">
                    <span className="material-symbols-outlined text-[16px] fill-1">check_circle</span>
                  </div>
                </>
              )}
              {!device.isOther && (
                <div className={`size-14 rounded-xl ${device.bgClass} flex items-center justify-center shadow-lg relative z-10`}>
                  {device.iconType === 'ring' ? (
                    <div className="size-8 rounded-full border-[3px] border-white"></div>
                  ) : device.iconType === 'text-w' ? (
                    <span className="text-white font-black text-xl italic tracking-tighter">{device.textLabel}</span>
                  ) : device.iconType === 'triangle' ? (
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px] border-b-black"></div>
                  ) : (
                    <span className={`material-symbols-outlined ${device.iconColor || 'text-white'}`} style={{ fontSize: '32px' }}>
                      {device.icon}
                    </span>
                  )}
                </div>
              )}
              {device.isOther && (
                <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '32px' }}>
                  {device.icon}
                </span>
              )}
              {!device.isOther && (
                <div className="text-center relative z-10">
                  <h3 className="font-bold text-white text-sm">{device.name}</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">{device.description}</p>
                </div>
              )}
              {device.isOther && (
                <h3 className="font-medium text-gray-400 text-xs">{device.name}</h3>
              )}
              {!device.isOther && (
                <button
                  className={`w-full py-2 rounded-lg text-xs font-bold mt-1 transition-colors ${
                    isDeviceConnected(device.id)
                      ? 'bg-[#0df280] text-black shadow-lg shadow-[#0df280]/20'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  {isDeviceConnected(device.id) ? 'Connected' : 'Connect'}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Data Sync Preview Card */}
        <div className="animate-float">
          <div
            className="rounded-2xl p-5 shadow-lg relative overflow-hidden"
            style={{ background: 'rgba(27, 39, 33, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0df280]/5 rounded-full blur-2xl -mr-10 -mt-10"></div>

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div
                  className="size-8 rounded-full flex items-center justify-center border"
                  style={{ background: 'rgba(13, 242, 128, 0.2)', borderColor: 'rgba(13, 242, 128, 0.3)', color: '#0df280' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    sync
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Data Sync Preview</h3>
                  <p className="text-[10px] text-gray-400">Importing from Oura Ring</p>
                </div>
              </div>
              <div className="px-2 py-1 bg-green-500/10 rounded border border-green-500/20 text-[10px] font-bold text-green-400">
                Active
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              {dataSyncItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '20px' }}>
                      {item.icon}
                    </span>
                    <span className="text-xs font-medium text-gray-200">{item.label}</span>
                  </div>
                  <span className="material-symbols-outlined text-[#0df280]" style={{ fontSize: '18px' }}>
                    check
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a110e] via-[#0a110e]/95 to-transparent z-50">
        <button
          onClick={onNext}
          className="w-full h-14 bg-[#0df280] text-[#1b2721] border border-[#0df280] rounded-xl flex items-center justify-center gap-2 font-bold text-base hover:bg-[#0df280]/90 transition-colors active:scale-95 duration-200 shadow-[0_0_20px_rgba(13,242,128,0.3)]"
        >
          Finish Setup
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            arrow_forward
          </span>
        </button>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
    </>
  );
};

export default WearableConnection;
