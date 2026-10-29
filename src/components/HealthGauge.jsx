import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

export default function HealthGauge({ score, riskLevel, radarMetrics = [] }) {
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#10b981'; // emerald
  if (score < 50) {
    strokeColor = '#ef4444'; // red
  } else if (score < 75) {
    strokeColor = '#f59e0b'; // amber
  } else if (score >= 85) {
    strokeColor = '#6366f1'; // indigo
  }

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-full relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
          Biznes Salomatlik Indeksi
        </span>
        <span className="text-[10px] font-mono text-slate-500">0–100 Shkala</span>
      </div>

      <div className="flex flex-col items-center justify-center my-2">
        <div className="relative flex items-center justify-center">
          <svg className="w-36 h-36 transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="currentColor"
              strokeWidth="11"
              fill="transparent"
              className="text-slate-800/90"
            />
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke={strokeColor}
              strokeWidth="11"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-extrabold text-white tracking-tight font-mono">
              {score}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Ball
            </span>
          </div>
        </div>

        {/* Risk Level Badge */}
        <div className="mt-3 text-center">
          <div className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border ${riskLevel.bg}`}>
            {score < 50 ? (
              <ShieldAlert className="w-3.5 h-3.5" />
            ) : score < 75 ? (
              <AlertTriangle className="w-3.5 h-3.5" />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5" />
            )}
            <span>{riskLevel.badge}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            {riskLevel.summary}
          </p>
        </div>
      </div>

      {/* Mini Radar Progress Bars */}
      {radarMetrics.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
          {radarMetrics.slice(0, 4).map((m) => (
            <div key={m.id} className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-400 truncate">{m.label}</span>
                <span className="font-mono font-bold text-slate-200">{m.score}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    m.score < 45 ? 'bg-red-500' : m.score < 70 ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${m.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
