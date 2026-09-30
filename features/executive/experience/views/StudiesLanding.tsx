/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Initiative } from '../../../../types';
import { SmartWelcome } from '../WelcomeHeader';
import { MyTasks } from '../MyTasks';
import { Brain, CheckCircle2, BarChart, FileText, Activity } from 'lucide-react';

export interface ViewProps {
  initiatives: Initiative[];
  onNavigateTab: (tab: string) => void;
  onSelectInitiative?: (id: string) => void;
}

export const StudiesLanding: React.FC<ViewProps> = ({ initiatives, onNavigateTab }) => {
  return (
    <div className="space-y-6 animate-fadeIn" id="studies-landing">
      {/* Smart Welcome Banner */}
      <SmartWelcome customTitle="مركز التحليل التنموي والدراسات الهندسية" />

      {/* Header Bar */}
      <div className="bg-gradient-to-r from-violet-950 via-slate-900 to-violet-900 text-white rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md border border-violet-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-violet-500/20 rounded-xl text-violet-300">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white">مركز التحليل التنموي والدراسات الفنية • Development Studies Center</h2>
            <p className="text-xs text-violet-200/80 font-medium">دراسات الجدوى التنموية، الفرز المكتبي، وتحليل أولويات الاحتياج للمبادرات</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('matching_results')}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-black rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>نتائج الفرز المكتبي والمطابقة 📑</span>
          </button>
          <button
            onClick={() => onNavigateTab('decision_center')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold rounded-xl transition-all border border-slate-700 flex items-center gap-1.5"
          >
            <Brain className="w-4 h-4 text-violet-400" />
            <span>مركز القرارات التنموية</span>
          </button>
        </div>
      </div>

      {/* My Studies Tasks */}
      <MyTasks initiatives={initiatives} onNavigateTab={onNavigateTab} />

      {/* Analytics Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">مطابقة الفرز المكتبي</span>
            <CheckCircle2 className="w-5 h-5 text-violet-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">48 <span className="text-xs font-normal text-slate-500">دراسة فنية</span></p>
          <button
            onClick={() => onNavigateTab('matching_results')}
            className="text-xs font-bold text-violet-700 hover:underline block pt-1"
          >
            سجل المطابقة المكتبي ←
          </button>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">الرسوم والمخططات التحليلية</span>
            <BarChart className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-indigo-900">تفاعلية بالكامل</p>
          <button
            onClick={() => onNavigateTab('interactive_charts')}
            className="text-xs font-bold text-indigo-700 hover:underline block pt-1"
          >
            استعراض المخططات البيانية ←
          </button>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">المستشار الهندسي الذكي AI</span>
            <Brain className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-800">مساعد فني 24/7</p>
          <button
            onClick={() => onNavigateTab('advisor')}
            className="text-xs font-bold text-emerald-700 hover:underline block pt-1"
          >
            استشارة المستشار التنموي ←
          </button>
        </div>
      </div>
    </div>
  );
};
