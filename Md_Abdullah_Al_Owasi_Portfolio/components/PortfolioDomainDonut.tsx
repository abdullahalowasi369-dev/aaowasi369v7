"use client";

/**
 * PORTFOLIO DOMAIN MIX
 * ====================
 * Ten-system distribution derived directly from data/portfolio.ts:
 * 4 assurance/GRC, 3 AI governance, 3 TPRM/risk.
 */

import { portfolioDomainMix } from "@/data/portfolio";

const total = portfolioDomainMix.reduce((sum, item) => sum + item.value, 0);
const circumference = 2 * Math.PI * 42;

export default function PortfolioDomainDonut() {
  let offset = 0;
  const dash = portfolioDomainMix.map((item) => {
    const length = (item.value / total) * circumference;
    const record = { ...item, length, offset };
    offset += length;
    return record;
  });

  const strokes = ["#6ee7b7", "#67e8f9", "#94a3b8"];

  return (
    <div className="rounded-[1.75rem] border border-white/[0.08] bg-black/25 p-5 sm:p-6">
      <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="relative mx-auto h-44 w-44 sm:mx-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" role="img" aria-label="Portfolio mix: 4 assurance/GRC systems, 3 AI governance systems, 3 TPRM/risk systems">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="9" />
            {dash.map((item, index) => (
              <circle
                key={item.label}
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={strokes[index]}
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={`${Math.max(0, item.length - 3)} ${circumference}`}
                strokeDashoffset={-item.offset}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="type-data text-4xl font-semibold tracking-[-0.05em] text-white">10</span>
            <span className="type-label text-[9px] text-slate-500">systems</span>
          </div>
        </div>
        <div>
          <p className="type-label text-[10px] text-emerald-300">Portfolio topology</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Depth across three governance surfaces.</h3>
          <div className="mt-4 space-y-3">
            {portfolioDomainMix.map((item, index) => (
              <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
                <span className="flex items-center gap-2 text-slate-400"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: strokes[index] }} />{item.label}</span>
                <span className="type-data font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
