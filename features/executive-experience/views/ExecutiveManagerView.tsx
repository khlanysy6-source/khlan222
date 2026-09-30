import React from 'react';
import { ExecutiveOverview, PriorityIssue } from '../types';
import { ExecutiveSelectors } from '../selectors/executiveSelectors';
import { ExecutiveMetricsBar } from '../components/ExecutiveMetricsBar';
import { CriticalIssuesSection } from '../components/CriticalIssuesSection';
import { DecisionsRequiredSection } from '../components/DecisionsRequiredSection';
import { PeriodChangesSection } from '../components/PeriodChangesSection';
import { InsightsCard } from '../components/InsightsCard';

interface Props {
  overview: ExecutiveOverview;
  onOpenLedger: (issue: PriorityIssue) => void;
}

export const ExecutiveManagerView: React.FC<Props> = ({ overview, onOpenLedger }) => {
  const data = ExecutiveSelectors.getExecutiveManagerData(overview);

  return (
    <div className="space-y-6">
      {/* 1. الوضع الحالي */}
      <ExecutiveMetricsBar summary={data.summary} healthStatus={data.healthStatus} />

      {/* 2. القضايا الحرجة */}
      <CriticalIssuesSection issues={data.criticalIssues} onOpenLedger={onOpenLedger} />

      {/* 3. القرارات المطلوبة */}
      <DecisionsRequiredSection decisions={data.decisionsRequired} />

      {/* 4. التغير منذ آخر فترة والتوصيات */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <PeriodChangesSection changes={data.recentChanges} />
        </div>
        <div className="lg:col-span-2">
          <InsightsCard insights={data.insights} />
        </div>
      </div>
    </div>
  );
};
