import React, { useState } from 'react';
import { GeographicInsight } from '../types';
import { MapPin, Trophy, AlertTriangle, Building2, ChevronDown, CheckCircle2, ChevronUp } from 'lucide-react';

interface Props {
  insights: {
    topDistricts: GeographicInsight[];
    criticalDistricts: GeographicInsight[];
    activeDistrictsCount: number;
    governorateCentersCount: number;
    allDistricts: GeographicInsight[];
  };
}

export const GeographicAnalysisSection: React.FC<Props> = ({ insights }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base">التحليل الجغرافي والتغطية الميدانية للمحافظة</h3>
            <p className="text-slate-400 text-xs">
              موزعة على <strong className="text-cyan-400">20 مديرية</strong> ({insights.activeDistrictsCount} مديريات ذات مبادرات ميدانية نشطة + {insights.governorateCentersCount} مراكز المحافظة)
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAll(!showAll)}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
        >
          <span>{showAll ? 'طي جدول المديريات' : 'عرض كافة المديريات الـ 20'}</span>
          {showAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Performing Districts */}
        <div className="bg-slate-950/80 border border-emerald-500/20 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Trophy className="w-4 h-4" />
            <span>المديريات الأكثر إنجازاً وتقدماً</span>
          </div>
          <div className="space-y-2">
            {insights.topDistricts.slice(0, 4).map((d) => (
              <div key={d.districtName} className="flex items-center justify-between text-xs bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-white font-medium">{d.districtName}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">{d.completedCount} / {d.totalInitiatives} مبادرة</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 font-mono font-bold rounded">
                    {d.completionRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Districts Needing Support */}
        <div className="bg-slate-950/80 border border-amber-500/20 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>المناطق والمديريات الأكثر احتياجاً للتعزيز</span>
          </div>
          <div className="space-y-2">
            {insights.criticalDistricts.slice(0, 4).map((d) => (
              <div key={d.districtName} className="flex items-center justify-between text-xs bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-white font-medium">{d.districtName}</span>
                <div className="flex items-center gap-3">
                  <span className="text-amber-400 font-medium">{d.delayedCount} مبادرة متأخرة</span>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 font-mono font-bold rounded">
                    إجمالي: {d.totalInitiatives}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Table for all 20 Districts */}
      {showAll && (
        <div className="mt-4 border-t border-slate-800 pt-4 space-y-2">
          <h4 className="text-slate-300 font-bold text-xs">سجل المتابعة الجغرافية الشامل (20 مديرية)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            {insights.allDistricts.map((d, i) => (
              <div
                key={d.districtName}
                className={`p-2.5 rounded-lg border ${
                  d.isGovernorateCenter
                    ? 'bg-slate-950/40 border-slate-800 text-slate-500'
                    : 'bg-slate-950/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-white">
                  <span className="text-[11px] truncate">{i + 1}. {d.districtName}</span>
                  {d.isGovernorateCenter ? (
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  ) : (
                    <span className="text-emerald-400 font-mono text-[10px]">{d.completionRate}%</span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                  {d.isGovernorateCenter ? (
                    <span className="text-slate-500">مركز المحافظة الإداري</span>
                  ) : (
                    <>
                      <span>المكتمل: {d.completedCount}</span>
                      <span>الجاري: {d.activeCount}</span>
                      <span className="text-amber-400">المتأخر: {d.delayedCount}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
