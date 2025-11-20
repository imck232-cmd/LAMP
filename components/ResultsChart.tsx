import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Label } from 'recharts';

interface ResultsChartProps {
  voltage: number;
  currentResistance: number;
  currentAmps: number;
}

const ResultsChart: React.FC<ResultsChartProps> = ({ voltage, currentResistance, currentAmps }) => {
  // Generate data points for the curve based on fixed voltage
  const data = React.useMemo(() => {
    const points = [];
    // Generate points from 1 to 100 Ohms
    for (let r = 1; r <= 100; r += 2) {
      points.push({
        resistance: r,
        current: voltage / r
      });
    }
    return points;
  }, [voltage]);

  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="resistance" 
            stroke="#94a3b8" 
            tick={{fontSize: 12}}
            type="number"
            domain={[0, 100]}
            tickCount={6}
          >
            <Label value="Resistance (Ω)" offset={0} position="insideBottom" fill="#94a3b8" style={{fontSize: 12}} />
          </XAxis>
          <YAxis 
            stroke="#94a3b8" 
            tick={{fontSize: 12}}
            domain={[0, 'auto']}
          >
             <Label value="Current (A)" angle={-90} position="insideLeft" fill="#94a3b8" style={{fontSize: 12}} />
          </YAxis>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
            itemStyle={{ color: '#38bdf8' }}
            labelStyle={{ color: '#94a3b8' }}
            formatter={(value: number) => [`${value.toFixed(2)} A`, 'Current']}
            labelFormatter={(label) => `Resistance: ${label} Ω`}
          />
          <Line 
            type="monotone" 
            dataKey="current" 
            stroke="#38bdf8" 
            strokeWidth={2} 
            dot={false} 
            activeDot={false}
            animationDuration={300}
          />
          {/* The moving dot representing current state */}
          <ReferenceDot 
            x={currentResistance} 
            y={currentAmps} 
            r={6} 
            fill="#facc15" 
            stroke="#fff"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsChart;