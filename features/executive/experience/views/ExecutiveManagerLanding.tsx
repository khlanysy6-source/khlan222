/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Initiative } from '../../../../types';
import { SmartWelcome } from '../WelcomeHeader';
import { MyTasks } from '../MyTasks';
import { RisksWidget, DecisionsWidget } from '../ExecutiveWidgets';
import { Activity, AlertCircle, FileText, CheckCircle2, Clock, Users, ArrowRight, ShieldAlert } from 'lucide-react';

export interface ViewProps {
  initiatives: Initiative[];
  onNavigateTab: (tab: string) => void;
  onSelectInitiative?: (id: string) => void;
}

export const ExecutiveManagerLanding: React.FC<ViewProps> = ({ initiatives, onNavigateTab, onSelectInitiative }) => {
  const criticalInits = initiatives.filter(i => i.status === 'stagnant' || i.status === 'stopped');
  const ongoingInits = initiatives.filter(i => i.status === 'ongoing');

  return (
    <div className="space-y-6 animate-fadeIn" id="executive-manager-landing">
      {/* Smart Welcome Banner */}
      <SmartWelcome customTitle="المدير التنفيذي - غرفة العمليات والتدخل العاجل" />

      {/* Operations Room Bar */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md border border-indigo-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 rounded-xl text-indigo-300">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white">غرفة العمليات التنفيذية • Operations Control Room</h2>
            <p className="text-xs text-indigo-200/80 font-medium">متابعة دقيقة للمبادرات الحرجة، فرق الإشراف الفني، وتدفق القرارات الميدانية</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('initiatives')}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl transition-all shadow-sm"
          >
            متابعة المبادرات الحرجة ({criticalInits.length}) 🚨
          </button>
          <button
            onClick={() => onNavigateTab('engineers_portal')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold rounded-xl transition-all border border-slate-700"
          >
            تقارير الإشراف الفني 👷‍♂️
          </button>
        </div>
      </div>

      {/* My Executive Tasks */}
      <MyTasks initiatives={initiatives} onNavigateTab={onNavigateTab} />

      {/* Critical Initiatives & Intervention Watch */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-100 text-rose-800 rounded-xl">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">
                الحالات الميدانية المحتاجة لتدخل عاجل • Emergency Interventions
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                متابعة المبادرات المتعثرة وطلبات إمداد الأسمنت والديزل بالمحافظة
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('initiatives')}
            className="text-xs font-bold text-rose-700 hover:underline flex items-center gap-1"
          >
            سجل المبادرات بالكامل ←
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {criticalInits.map((init) => (
            <div key={init.id} className="bg-rose-50/40 border border-rose-200 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 truncate">{init.name}</span>
                <span className="text-[10px] font-extrabold bg-rose-100 text-rose-900 px-2.5 py-0.5 rounded-full">
                  {init.district}
                </span>
              </div>

              <div className="text-xs space-y-1 text-slate-700">
                <div className="flex items-center justify-between text-[11px]">
                  <span>نسبة الإنجاز:</span>
                  <span className="font-bold text-rose-700">{init.completionRate}%</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {init.notes || 'بحاجة لمساندة عاجلة وتوفير كميات أكياس الأسمنت والديزل'}
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('decision_center')}
                className="w-full py-1.5 bg-rose-900 hover:bg-rose-950 text-white text-xs font-bold rounded-xl transition-all"
              >
                توليد إشعار تدخل وتوجيه 🚨
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Decisions & Timeline Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DecisionsWidget initiatives={initiatives} onNavigateTab={onNavigateTab} />
        <RisksWidget initiatives={initiatives} onNavigateTab={onNavigateTab} />
      </div>
    </div>
  );
};
