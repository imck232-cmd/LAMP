import React, { useMemo } from 'react';
import { Lightbulb } from 'lucide-react';
import { LightStatus } from '../types';

interface BulbProps {
  current: number;
  maxCurrent: number;
  status: LightStatus;
}

const Bulb: React.FC<BulbProps> = ({ current, maxCurrent, status }) => {
  // Calculate brightness ratio (0 to 1)
  const brightness = Math.min(Math.max(current / maxCurrent, 0), 1);
  
  // Visual calculations
  const opacity = Math.max(0.1, brightness);
  const glowSize = brightness * 60; // Spread of the shadow
  const coreColor = brightness > 0.8 ? '#ffffff' : '#facc15'; // Core turns white when very hot

  // Dynamic Styles
  const bulbStyle = useMemo(() => ({
    color: coreColor,
    opacity: opacity,
    filter: `drop-shadow(0 0 ${glowSize}px rgba(250, 204, 21, ${brightness})) drop-shadow(0 0 ${glowSize / 2}px rgba(250, 204, 21, 0.8))`,
    transition: 'all 0.2s ease-out',
    transform: `scale(${1 + (brightness * 0.05)})` // Slight pulse/grow effect
  }), [brightness, glowSize, coreColor]);

  return (
    <div className="relative flex flex-col items-center justify-center h-64 w-full bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-20" 
           style={{ 
             backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }} 
      />

      {/* The Light Source */}
      <div className="z-10 relative">
        <Lightbulb 
          size={120} 
          strokeWidth={1}
          style={bulbStyle}
          className="text-yellow-500"
        />
        
        {/* Filament details (simulated by the icon, but enhanced by glow) */}
        {brightness === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-slate-700 font-mono text-xs mt-8">OFF</span>
            </div>
        )}
      </div>

      {/* Reflection/Floor Glow */}
      <div 
        className="absolute bottom-0 w-32 h-8 bg-yellow-500 rounded-[100%] blur-xl transition-all duration-200"
        style={{ opacity: brightness * 0.4 }}
      />

      {/* Status Badge */}
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono font-medium text-slate-300 shadow-lg">
        Status: <span className={`${brightness > 0.5 ? 'text-yellow-400' : 'text-slate-400'}`}>{status}</span>
      </div>
    </div>
  );
};

export default Bulb;