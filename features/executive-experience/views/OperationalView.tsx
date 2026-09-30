import React from 'react';
import { ExecutiveOverview, PriorityIssue } from '../types';
import { ExecutiveSelectors } from '../selectors/executiveSelectors';
import { HardHat, Truck, Wrench, AlertTriangle, CheckCircle, FileCheck, Layers } from 'lucide-react';

interface Props {
  overview: ExecutiveOverview;
  onOpenLedger: (issue: PriorityIssue) => void;
}

export const OperationalView: React.FC<Props> = ({ overview, onOpenLedger }) => {
  const opData = ExecutiveSelectors.getOperationalData(overview);

  return (
    <div className="space-y-6">
      {/* Operational Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 font-bold text-xs rounded border border-amber-500/30 flex items-center gap-1">
              <HardHat className="w-3.5 h-3.5" />
              الرؤية الميدانية التشغيلية (Operational View)
            </span>
            <span className="text-slate-400 text-xs">• للمدراء الميدانيين والمشرفين</span>
          </div>
          <h2 className="text-white font-black text-xl">متابعة الميدان واحتياجات التوريد والرفع الهيكلي</h2>
          <p className="text-slate-300 text-xs">
            إشراف مباشر على المبادرات الجاري تنفيذها والمتعثرة وتأمين المواد الهندسية والمعدات
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-center">
            <span className="text-slate-400 text-[10px] block">المبادرات النشطة</span>
            <span className="text-xl font-bold font-mono text-blue-400">{opData.activeInitiativesCount}</span>
          </div>
          <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-center">
            <span className="text-slate-400 text-[10px] block">تتطلب مواد ومعدات</span>
            <span className="text-xl font-bold font-mono text-amber-400">{opData.delayedInitiativesCount}</span>
          </div>
        </div>
      </div>

      {/* Required Supplies Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-base pb-2 border-b border-slate-800">
          <Truck className="w-5 h-5" />
          <span>الاحتياجات اللوجستية ومواد البناء المطلوبة للميدان</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {opData.materialSuppliesNeeded.map((sup, idx) => (
            <div key={idx} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-xs">{sup.item}</span>
                <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded">
                  أولوية {sup.priority}
                </span>
              </div>
              <div className="text-xl font-black font-mono text-emerald-400">{sup.quantity}</div>
              <p className="text-slate-400 text-[11px]">موزعة على المقاطع الوعرة المحددة بقوائم الفرسان</p>
            </div>
          ))}
        </div>
      </div>

      {/* Field Issues List */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Wrench className="w-5 h-5" />
            <span>البلاغات الميدانية الحالية وتح نفق المعالجة</span>
          </div>
          <span className="text-xs text-slate-400">{opData.fieldIssues.length} بلاغ ميداني</span>
        </div>

        <div className="space-y-3">
          {opData.fieldIssues.slice(0, 5).map((iss) => (
            <div key={iss.id} className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-xs">{iss.title} ({iss.district})</span>
                  <span className="text-amber-400 text-[11px] font-mono">تأخير: {iss.delayDays} يوم</span>
                </div>
                <p className="text-slate-300 text-xs">{iss.reason}</p>
                <p className="text-emerald-400 text-xs">التوصية الميدانية: {iss.recommendation}</p>
              </div>

              <button
                onClick={() => onOpenLedger(iss)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-colors"
              >
                فتح سجل التتبع الميداني
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
