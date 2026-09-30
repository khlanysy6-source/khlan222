/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Initiative } from '../../../../types';
import { useAuth } from '../../../../security/AuthContext';
import { RoleService } from '../../../../core/auth/RoleService';
import { SmartWelcome } from '../WelcomeHeader';
import { MyTasks } from '../MyTasks';
import { ShieldCheck, FileText, CheckCircle2, Building, Activity, Table } from 'lucide-react';

export interface ViewProps {
  initiatives: Initiative[];
  onNavigateTab: (tab: string) => void;
  onSelectInitiative?: (id: string) => void;
}

export const SupervisionLanding: React.FC<ViewProps> = ({ initiatives, onNavigateTab }) => {
  const { effectiveRole } = useAuth();
  const eRole = RoleService.toEnterpriseRole(effectiveRole);

  const isCentralManager = eRole === 'SUPERVISION_MANAGER';

  return (
    <div className="space-y-6 animate-fadeIn" id="supervision-landing">
      {/* Smart Welcome Banner */}
      <SmartWelcome customTitle={isCentralManager ? 'مدير الإشراف الفني العام' : 'مهندس الإشراف الفني الميداني'} />

      {/* Supervision Control Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md border border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-300">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white">مركز الإشراف الفني وضبط الجودة • Technical Supervision</h2>
            <p className="text-xs text-blue-200/80 font-medium">متابعة أداء فرق الإشراف، الفحص الميداني، واعتماد استمارات الصب والرصف</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('engineers_portal')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>استمارة تقارير المهندسين 👷‍♂️</span>
          </button>
          <button
            onClick={() => onNavigateTab('matching_results')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold rounded-xl transition-all border border-slate-700 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>مطابقة الفني والميداني</span>
          </button>
        </div>
      </div>

      {/* My Executive Supervision Tasks */}
      <MyTasks initiatives={initiatives} onNavigateTab={onNavigateTab} />

      {/* Quick Supervision Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">استمارات المعاينة الميدانية</span>
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">48 <span className="text-xs font-normal text-slate-500">استمارة موثقة</span></p>
          <button
            onClick={() => onNavigateTab('engineers_portal')}
            className="text-xs font-bold text-blue-700 hover:underline block pt-1"
          >
            تعبئة استمارة معاينة ←
          </button>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">جاهزية واستلام الخرسانة</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-800">مطابقة 100%</p>
          <p className="text-[11px] text-emerald-700 font-semibold">اختبارات الشد والضغط والرصف</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">كميات المواد بالموقع</span>
            <Table className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-indigo-900">مصفوفة دقيقة</p>
          <button
            onClick={() => onNavigateTab('matrix')}
            className="text-xs font-bold text-indigo-700 hover:underline block pt-1"
          >
            مصفوفة الأسمنت والكميات ←
          </button>
        </div>
      </div>
    </div>
  );
};
