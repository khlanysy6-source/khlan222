import React from 'react';
import { PriorityIssue } from '../types';
import { ShieldAlert, AlertCircle, MapPin, ArrowLeftRight, CheckCircle, ChevronLeft } from 'lucide-react';

interface Props {
  issues: PriorityIssue[];
  onOpenLedger?: (issue: PriorityIssue) => void;
}

export const CriticalIssuesSection: React.FC<Props> = ({ issues, onOpenLedger }) => {
  if (!issues || issues.length === 0) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl text-center">
        <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
        <h4 className="text-white font-bold text-sm">لا توجد قضايا حرجة حالياً</h4>
        <p className="text-slate-400 text-xs mt-1">جميع المبادرات تسير وفق الخطة الزمنية المحددة</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base">القضايا الحرجة الآن (تحتاج تدخل)</h3>
            <p className="text-slate-400 text-xs">مصنفة حسب محرك الأولويات (Criticality Score)</p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-md text-xs font-mono font-bold">
          {issues.length} قضية حاسمة
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-slate-950/80 border border-rose-500/30 rounded-xl p-4 hover:border-rose-500/60 transition-all space-y-3 relative overflow-hidden group"
          >
            {/* Criticality Badge Top Left */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <h4 className="text-white font-bold text-sm leading-snug">{issue.title}</h4>
              </div>
              <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 font-mono text-[11px] font-bold rounded border border-rose-500/30 shrink-0">
                درجة الخطورة: {issue.criticalityScore}/100
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{issue.district}</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 font-medium">{issue.status}</span>
              <span className="text-slate-600">•</span>
              <span>تأخير {issue.delayDays} يوماً</span>
            </div>

            {/* Detailed Key-Value Structured Card */}
            <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800 text-xs space-y-2">
              <div className="grid grid-cols-[60px_1fr] gap-2">
                <span className="text-slate-400 font-medium">السبب:</span>
                <span className="text-slate-200">{issue.reason}</span>
              </div>
              <div className="grid grid-cols-[60px_1fr] gap-2">
                <span className="text-slate-400 font-medium">الأثر:</span>
                <span className="text-rose-300 font-medium">{issue.impact}</span>
              </div>
              <div className="grid grid-cols-[60px_1fr] gap-2">
                <span className="text-slate-400 font-medium">التوصية:</span>
                <span className="text-emerald-300 font-medium">{issue.recommendation}</span>
              </div>
              <div className="grid grid-cols-[60px_1fr] gap-2 pt-1 border-t border-slate-800">
                <span className="text-slate-400 font-medium">المطلوب:</span>
                <span className="text-amber-300 font-bold">{issue.requiredAction}</span>
              </div>
            </div>

            {/* Footer Traceability Action */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500">المسؤول: {issue.responsibleParty}</span>
              {onOpenLedger && (
                <button
                  onClick={() => onOpenLedger(issue)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>سجل القرار والتتبع</span>
                  <ChevronLeft className="w-3 h-3 text-slate-400" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
