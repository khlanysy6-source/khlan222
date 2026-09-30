import React from 'react';
import { PriorityIssue, DecisionLedgerItem } from '../types';
import { X, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, FileText, ArrowLeftRight } from 'lucide-react';

interface Props {
  issue?: PriorityIssue | null;
  ledgerItems: DecisionLedgerItem[];
  onClose: () => void;
}

export const DecisionLedgerModal: React.FC<Props> = ({ issue, ledgerItems, onClose }) => {
  // Find matching ledger item or build virtual chain from issue
  const matchingLedger = issue 
    ? ledgerItems.find(l => l.initiativeTitle === issue.title || l.district === issue.district)
    : ledgerItems[0];

  const problemText = issue?.title ? `${issue.title} (${issue.district})` : matchingLedger?.problem || 'توقف تنفيذ مقطع الطريق الجبلي الوعر';
  const evidenceList = matchingLedger?.evidence || [
    'تقرير المسح الميداني للفرسان والمهندسين المعتمد بالصور والجيوفينس',
    `تأخر الجداول الزمنية بـ ${issue?.delayDays || 25} يوماً متتالية`,
    `تأثر أكثر من ${(issue?.affectedBeneficiaries || 2000).toLocaleString('ar-YE')} مستفيد من الأهالي`
  ];
  const recommendation = issue?.recommendation || matchingLedger?.recommendation || 'صرف حصة تعزيزية عاجلة وتوجيه المعدات الثقيلة للموقع';
  const decisionText = matchingLedger?.decision || 'قرار مسؤول المحافظة: الموافقة على تحريك الجرافة وتوريد الأسمنت المباشر';
  const actionText = matchingLedger?.action || 'تم تحريك الجرافة وإرسال الناقلات بتاريخ اليوم';
  const impactText = matchingLedger?.impact || 'استئناف العمل ورصف المقاطع الوعرة المتبقية وحماية المبادرة من الانهيارات';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-0">
        {/* Header */}
        <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">سجل القرار وتتبع الأثر (Decision Ledger Trace)</h3>
              <p className="text-slate-400 text-xs">سلسلة التتبع الكاملة: القضية ← الدليل ← التوصية ← القرار ← الإجراء ← الأثر</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Flow */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Step 1: Problem */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-rose-500/30 space-y-1">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>1. القضية والمشكلة (Problem):</span>
            </div>
            <p className="text-white font-bold text-sm text-right pr-6">{problemText}</p>
            <p className="text-slate-400 text-xs pr-6">السبب: {issue?.reason || 'نقص الإمدادات والصعوبات الميدانية'}</p>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-slate-600 rotate-90" />
          </div>

          {/* Step 2: Evidence */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
              <FileText className="w-4 h-4" />
              <span>2. الأدلة الميدانية الموثقة (Evidence):</span>
            </div>
            <ul className="space-y-1 pr-6 text-xs text-slate-300">
              {evidenceList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-purple-400 font-mono">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-slate-600 rotate-90" />
          </div>

          {/* Step 3: Recommendation & Decision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/30 space-y-1">
              <span className="text-cyan-400 font-bold text-xs block">3. التوصية القيادية (Recommendation):</span>
              <p className="text-slate-200 text-xs font-medium leading-relaxed">{recommendation}</p>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-500/30 space-y-1">
              <span className="text-amber-400 font-bold text-xs block">4. القرار المتخذ (Decision):</span>
              <p className="text-white text-xs font-bold leading-relaxed">{decisionText}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-slate-600 rotate-90" />
          </div>

          {/* Step 4: Action & Impact */}
          <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>5. الإجراء والأثر الميداني المحقق (Action & Impact):</span>
              </span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold text-[10px] rounded">
                محقَّق وموثَّق
              </span>
            </div>
            <div className="text-xs space-y-1 pr-5">
              <p className="text-slate-300"><strong>الإجراء الميداني:</strong> {actionText}</p>
              <p className="text-emerald-300"><strong>الأثر التنموي:</strong> {impactText}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
          >
            إغلاق سجل التتبع
          </button>
        </div>
      </div>
    </div>
  );
};
