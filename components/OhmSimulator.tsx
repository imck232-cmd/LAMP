import React, { useState, useEffect } from 'react';
import Bulb from './Bulb';
import Calculations from './Calculations';
import ResultsChart from './ResultsChart';
import { SimulationState, CalculationResult, LightStatus } from '../types';
import { Battery, Gauge, Sliders } from 'lucide-react';

const OhmSimulator: React.FC = () => {
  // Initial State: Voltage is now adjustable, defaulting to 12V
  const [state, setState] = useState<SimulationState>({
    voltage: 12,
    resistance: 50,
  });

  const [results, setResults] = useState<CalculationResult>({
    current: 0,
    power: 0
  });

  // Effect to calculate physics whenever state changes
  useEffect(() => {
    const resistance = Math.max(0.1, state.resistance); // Prevent division by zero
    const current = state.voltage / resistance;
    const power = state.voltage * current;
    setResults({ current, power });
  }, [state]);

  // Handler for resistance change
  const handleResistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, resistance: parseFloat(e.target.value) }));
  };

  // Handler for voltage change
  const handleVoltageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, voltage: parseFloat(e.target.value) }));
  };

  // Determine Text Status based on current
  // Assuming max current at 1 Ohm is around 12A for normal brightness scaling, 
  // but can go higher with higher voltage.
  const getStatus = (current: number): LightStatus => {
    if (current < 0.1) return LightStatus.OFF;
    if (current < 1.0) return LightStatus.DIM;
    if (current < 4.0) return LightStatus.MODERATE;
    if (current < 8.0) return LightStatus.BRIGHT;
    return LightStatus.BLINDING;
  };

  const status = getStatus(results.current);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* LEFT COLUMN: Controls & Visuals (8 cols) */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* Visual Container */}
        <div className="bg-slate-900/50 p-1 rounded-3xl border border-slate-800 backdrop-blur-sm">
          <Bulb 
            current={results.current} 
            maxCurrent={12} // Normalized max current for visualization
            status={status}
          />
        </div>

        {/* Controls Container */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <Sliders className="text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Circuit Controls</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Voltage Control (Now Enabled) */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-blue-400 flex items-center gap-2">
                  <Battery size={16} /> Voltage (V)
                </label>
                <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded text-sm border border-slate-700 min-w-[60px] text-center">
                  {state.voltage.toFixed(1)} V
                </span>
              </div>
              
              <input
                type="range"
                min="1"
                max="24"
                step="0.5"
                value={state.voltage}
                onChange={handleVoltageChange}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>1 V</span>
                <span>12 V</span>
                <span>24 V</span>
              </div>
            </div>

            {/* Resistance Control */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-red-400 flex items-center gap-2">
                  <Gauge size={16} /> Resistance (R)
                </label>
                <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded text-sm border border-slate-700 min-w-[60px] text-center">
                  {state.resistance.toFixed(1)} Ω
                </span>
              </div>
              
              <input
                type="range"
                min="1"
                max="100"
                step="0.5"
                value={state.resistance}
                onChange={handleResistanceChange}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              />
              
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>1 Ω</span>
                <span>50 Ω</span>
                <span>100 Ω</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
           <h3 className="text-sm font-semibold text-slate-300 mb-2">Current vs. Resistance Curve</h3>
           <ResultsChart 
             voltage={state.voltage}
             currentResistance={state.resistance}
             currentAmps={results.current}
           />
        </div>
      </div>

      {/* RIGHT COLUMN: Data & Math (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        
        {/* Big Number Display */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-6 flex flex-col items-center justify-center text-center shadow-inner">
           <span className="text-slate-400 text-sm uppercase tracking-widest mb-2 font-semibold">Measured Current</span>
           <div className="flex items-baseline gap-1">
             <span className={`text-5xl font-mono font-bold ${status === LightStatus.BLINDING ? 'text-red-500' : 'text-green-400'}`}>
               {results.current.toFixed(2)}
             </span>
             <span className="text-xl text-slate-500 font-medium">A</span>
           </div>
        </div>

        {/* Calculations Details */}
        <Calculations state={state} results={results} />

        {/* Info Card */}
        <div className="bg-blue-900/20 rounded-xl border border-blue-800/30 p-4">
            <h4 className="text-blue-400 font-medium text-sm mb-2">Did you know?</h4>
            <p className="text-xs text-slate-400">
              If resistance drops too low (near 0), current spikes towards infinity. This is called a <span className="text-white font-semibold">Short Circuit</span>, which is dangerous in real life!
            </p>
        </div>
      </div>
    </div>
  );
};

export default OhmSimulator;