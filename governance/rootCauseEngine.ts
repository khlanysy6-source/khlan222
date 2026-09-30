/**
 * EXECUTION-03 — Root Cause Engine
 * Identifies root causes strictly from extracted evidence & primary cause. Does NOT invent missing reasons.
 */

import { Initiative } from '../types';
import { ExecutiveDecisionProfile } from '../intelligence/types';
import { RootCause, RootCauseCategory } from './types';

export function deriveRootCause(initiative: Initiative, execProfile: ExecutiveDecisionProfile): RootCause {
  const primaryCause = (execProfile?.derived?.primaryCause || '').toLowerCase();
  const notesText = (initiative?.notes || '').toLowerCase();

  const rawEv = execProfile?.decisionTrace?.evidence;
  const evidenceList: string[] = Array.isArray(rawEv)
    ? rawEv.map((item) => (typeof item === 'string' ? item : String(item)))
    : [];

  const combinedText = `${primaryCause} ${notesText} ${evidenceList.join(' ')}`;

  let category: RootCauseCategory = 'Unknown';
  let description = 'السبب غير محدد من البيانات الحالية.';
  let isDefinite = false;

  if (primaryCause.includes('مسح') || primaryCause.includes('مساح') || primaryCause.includes('رفع')) {
    category = 'Technical';
    description = 'احتياج إلى مسح الفرز الميداني والرفع المساحي وتحديد المعالم الفنية بالمنطقة.';
    isDefinite = true;
  } else if (
    primaryCause.includes('أسمنت') ||
    primaryCause.includes('اسمنت') ||
    primaryCause.includes('ديزل') ||
    primaryCause.includes('توريد')
  ) {
    category = 'Supply';
    description = 'تعثر في سلاسل توريد وتوفير الأسمنت والديزل أو وجود مخزون مهدد بالتلف.';
    isDefinite = true;
  } else if (primaryCause.includes('وثائق') || primaryCause.includes('محضر') || primaryCause.includes('استلام')) {
    category = 'Documentation';
    description = 'تأخر استكمال وثائق الاستلام النهائي ومحضر الإغلاق الميداني.';
    isDefinite = true;
  } else if (initiative.status === 'completed' || primaryCause.includes('استكمال جميع الأعمال')) {
    category = 'Other';
    description = 'المبادرة مكتملة وتم إنجاز جميع الأعمال الفنية والخرسانية.';
    isDefinite = true;
  } else if (
    combinedText.includes('تمويل') ||
    combinedText.includes('ميزانية') ||
    combinedText.includes('سيولة') ||
    combinedText.includes('دعم مال') ||
    combinedText.includes('مساهمة')
  ) {
    category = 'Funding';
    description = 'نقص الموازنة المالية أو تأخر تحويل المساهمة المركزية والمحلية.';
    isDefinite = true;
  } else if (
    combinedText.includes('خلاف') ||
    combinedText.includes('نزاع') ||
    combinedText.includes('اهالي') ||
    combinedText.includes('أهالي') ||
    combinedText.includes('مجتمع')
  ) {
    category = 'Community';
    description = 'وجود ملاحظات أو نزاعات مجتمعية حول المسار أو أولوية المرور.';
    isDefinite = true;
  } else if (combinedText.includes('أرض') || combinedText.includes('ارض') || combinedText.includes('ملكية')) {
    category = 'Land';
    description = 'اعتراضات تتعلق بملكية الأراضي أو حرم الطريق.';
    isDefinite = true;
  } else if (combinedText.includes('سيول') || combinedText.includes('أمطار') || combinedText.includes('امطار')) {
    category = 'Weather';
    description = 'تأثير الأحوال الجوية وانجرافات السيول على استمرارية العمل.';
    isDefinite = true;
  } else if (combinedText.includes('مقاول') || combinedText.includes('معدات')) {
    category = 'Contractor';
    description = 'تعثر أداء المقاول أو نقص المعدات الثقيلة في الموقع.';
    isDefinite = true;
  } else if (combinedText.includes('إداري') || combinedText.includes('اداري') || combinedText.includes('قرار')) {
    category = 'Administrative';
    description = 'تأخر صدور التوجيهات الإدارية وتحديد الصلاحيات التنفيذية.';
    isDefinite = true;
  } else {
    category = 'Unknown';
    description = 'السبب غير محدد من البيانات الحالية ويدعو لنزول تقييم ميداني.';
    isDefinite = false;
  }

  return {
    category,
    description,
    evidence: evidenceList,
    isDefinite,
  };
}
