import React from 'react';
import OhmSimulator from './components/OhmSimulator';
import { Zap } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Ohm's Law <span className="text-yellow-500">Simulator</span>
            </h1>
          </div>
          <div className="text-sm text-slate-400 hidden sm:block font-mono">
            v1.0.0 • Interactive Physics
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <OhmSimulator />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>Demonstrating V = I × R logic through React & TypeScript.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;