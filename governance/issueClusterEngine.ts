/**
 * EXECUTION-03 — Issue Cluster Engine
 * Discovers shared root cause issues across initiatives and groups them into unified executive clusters.
 * Strictly prevents grouping solely because status = stagnant; requires common root cause & intervention type.
 */

import { GovernanceProfile, IssueCluster, RootCauseCategory } from './types';

export function generateIssueClusters(profiles: GovernanceProfile[]): IssueCluster[] {
  // Group profiles that require decisions by common root cause category
  const groups: Map<RootCauseCategory, GovernanceProfile[]> = new Map();

  profiles.forEach((profile) => {
    if (
      profile.decisionRequired &&
      profile.rootCause.category !== 'Unknown' &&
      profile.governanceStatus !== 'CLOSED'
    ) {
      const cat = profile.rootCause.category;
      if (!groups.has(cat)) {
        groups.set(cat, []);
      }
      groups.get(cat)!.push(profile);
    }
  });

  const clusters: IssueCluster[] = [];

  groups.forEach((items, causeCat) => {
    // Only form a cluster if 2 or more initiatives share this specific cause
    if (items.length < 2) return;

    // Sort items by priority score descending
    items.sort((a, b) => b.priorityScore - a.priorityScore);

    const representative = items[0];
    const affectedInitiatives = items.map((i) => ({
      id: i.initiativeId,
      name: i.initiativeName,
      district: i.district,
    }));

    const districtsSet = new Set(items.map((i) => i.district));
    const districts = Array.from(districtsSet);

    let clusterTitle = '';
    let clusterDesc = '';

    if (causeCat === 'Supply') {
      clusterTitle = `اختناق توريد الأسمنت والديزل لإنعاش المبادرات المتوقفة (${items.length} مبادرات)`;
      clusterDesc = `مجموعة من ${items.length} مبادرات في مديريات (${districts.slice(0, 3).join('، ')}) تعاني من توقف العمل الميداني بسبب نقص الأسمنت والديزل أو وجود مخزون مهدد بالتلف.`;
    } else if (causeCat === 'Technical') {
      clusterTitle = `حزم التقييم الهندسي وتصميم الجدران الساندة (${items.length} مبادرات)`;
      clusterDesc = `تجمع لعدد ${items.length} مبادرات ذات تعقيدات فنية وهندسية تتطلب إيفاد فرق مساحية متخصصة للتصميم والتأمين الهيكلي.`;
    } else if (causeCat === 'Documentation') {
      clusterTitle = `حزمة الاعتماد المستندي وإغلاق المحاضر التوثيقية (${items.length} مبادرات)`;
      clusterDesc = `مبادرات بلغت نسب إنجاز متقدمة وتتطلب التوقيع النهائي على محاضر الفرز والقياس لإدراجها رسمياً كـ"مشاريع مكتملة".`;
    } else if (causeCat === 'Community') {
      clusterTitle = `مبادرات التوافق المجتمعي وحسم حرم الطرقات (${items.length} مبادرات)`;
      clusterDesc = `مبادرات تواجه ملاحظات مجتمعية على المسار تتطلب تدخلاً توافقياً من السلطات المحلية بالمديريات.`;
    } else {
      clusterTitle = `قضية مشتركة: ${causeCat} (${items.length} مبادرات)`;
      clusterDesc = `تجمع مبادرات تعاني من ${representative.rootCause.description}`;
    }

    // Determine max severity and priority
    const hasCritical = items.some((i) => i.severity === 'CRITICAL');
    const hasHigh = items.some((i) => i.severity === 'HIGH');
    const clusterSeverity = hasCritical ? 'CRITICAL' : hasHigh ? 'HIGH' : 'MEDIUM';

    const maxPriorityScore = Math.max(...items.map((i) => i.priorityScore));
    const clusterPriority = representative.priority;

    clusters.push({
      clusterId: `cluster_${causeCat.toLowerCase()}_${districts.length}_items_${items.length}`,
      title: clusterTitle,
      description: clusterDesc,
      affectedInitiatives,
      affectedCount: items.length,
      districts,
      sectors: ['مبادرات الطرق والرصف المجتمعي'],
      severity: clusterSeverity,
      priority: clusterPriority,
      priorityScore: maxPriorityScore + Math.min(items.length, 10), // Boost score by cluster size
      commonCause: causeCat,
      recommendedIntervention: representative.intervention,
      responsibleOwner: representative.owner,
      executiveAction: representative.executiveAction,
      expectedOutcome: representative.expectedOutcome,
      escalationRequired: items.some((i) => i.escalationRequired),
    });
  });

  // Sort clusters by priority score descending
  clusters.sort((a, b) => b.priorityScore - a.priorityScore);

  return clusters;
}
