import React from 'react';
import { CalculationResult, SimulationState } from '../types';

interface CalculationsProps {
  state: SimulationState;
  results: CalculationResult;
}

const Calculations: React.FC<CalculationsProps> = ({ state, results }) => {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
          The Physics
        </h3>
        
        <div className="space-y-6">
            {/* Formula 1 */}
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <div className="text-sm text-slate-400 mb-1 font-mono">Ohm's Law</div>
                <div className="flex items-center gap-3 text-xl sm:text-2xl font-serif italic text-slate-200">
                    I = <span className="text-blue-400">V</span> / <span className="text-red-400">R</span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-700 font-mono text-sm text-slate-300">
                    {results.current.toFixed(3)} A = <span className="text-blue-400">{state.voltage}V</span> / <span className="text-red-400">{state.resistance.toFixed(1)}Ω</span>
                </div>
            </div>

            {/* Formula 2 */}
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <div className="text-sm text-slate-400 mb-1 font-mono">Power Dissipated</div>
                <div className="flex items-center gap-3 text-xl sm:text-2xl font-serif italic text-slate-200">
                    P = <span className="text-blue-400">V</span> × <span className="text-green-400">I</span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-700 font-mono text-sm text-slate-300">
                    {results.power.toFixed(2)} W = <span className="text-blue-400">{state.voltage}V</span> × <span className="text-green-400">{results.current.toFixed(3)}A</span>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-slate-500 leading-relaxed">
        As resistance (<span className="text-red-400">R</span>) increases, the flow of electrons (Current <span className="text-green-400">I</span>) is impeded. 
        Lower resistance allows more current to flow, causing the filament to heat up and glow brighter (Power <span className="text-yellow-500">P</span>).
      </div>
    </div>
  );
};

export default Calculations;