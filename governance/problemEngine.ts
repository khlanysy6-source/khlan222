/**
 * EXECUTION-03 — Problem Engine
 * Formulates Situation and Problem definitions based on evidence and DecisionProfile.
 */

import { Initiative } from '../types';
import { DecisionProfile } from '../intelligence/types';
import { Situation, Problem } from './types';

export function deriveSituationAndProblem(
  initiative: Initiative,
  decisionProfile: DecisionProfile
): { situation: Situation; problem: Problem } {
  const completion = initiative.completionRate ?? 0;
  const statusStr: string = (initiative.status as string) || 'unknown';
  const causeText = (decisionProfile as any).cause || decisionProfile.derived?.primaryCause || '';
  const evidenceList = (decisionProfile as any).evidenceList || decisionProfile.evidence?.fieldNotesText || [];
  const confidence = (decisionProfile as any).confidence || decisionProfile.derived?.confidence || 'MEDIUM';

  let situationDesc = '';
  let problemSummary = '';
  let category = 'عمومي';
  let hasClearDefinition = true;

  if (statusStr === 'stagnant' || statusStr === 'stopped') {
    if (causeText && causeText !== 'عائق غير محدد من البيانات الحالية' && !causeText.includes('بانتظار مسح')) {
      situationDesc = `المبادرة متوقفة عند نسبة إنجاز ${completion}%، وتشير الأدلة المتاحة إلى: ${causeText}.`;
      problemSummary = `تعثر التنفيذ الميداني نتيجة ${causeText}.`;
      category = 'تعثر توريد أو تشغيل';
    } else if (causeText.includes('مسح')) {
      situationDesc = `المبادرة في حالة توقف بنسبة إنجاز ${completion}%، وبانتظار مسح الفرز الميداني والرفع المساحي.`;
      problemSummary = `تأخر إجراءات الفرز المساحي والرفع الميداني الأولي.`;
      category = 'فرز وهندسة';
    } else {
      situationDesc = `المبادرة متوقفة عند نسبة إنجاز ${completion}%، لكن السبب غير محسوم بشكل كافٍ من البيانات الحالية.`;
      problemSummary = `توقف المبادرة بدون تشخيص كافٍ في الملاحظات الحالية.`;
      category = 'تشخيص مجهول';
      hasClearDefinition = false;
    }
  } else if (statusStr === 'ongoing') {
    if (completion >= 85) {
      situationDesc = `المبادرة في مرحلة التنفيذ المتقدمة بنسبة إنجاز ${completion}% وتأمل في الاستكمال النهائي.`;
      problemSummary = `الأعمال الميدانية متقدمة وتتطلب توثيق محضر الاستلام والإغلاق النهائي.`;
      category = 'إغلاق وتوثيق';
    } else {
      situationDesc = `المبادرة في مرحلة التنفيذ النشط بنسبة إنجاز ${completion}%، وتجري المتابعة الميدانية الروتينية.`;
      problemSummary = `متابعة واستدامة وتيرة العمل وتوريد الدفعات القادمة.`;
      category = 'متابعة تنفيذ';
    }
  } else if (statusStr === 'pending' || statusStr === 'not_started') {
    situationDesc = `المبادرة في طور التجهيز الأول أو لم تبدأ بعد بنسبة إنجاز ${completion}%.`;
    problemSummary = `عدم انطلاق العمل الميداني والاحتياج إلى التحقق المجتمعي والفرز الأولي.`;
    category = 'تجهيز وانطلاق';
  } else if (statusStr === 'completed') {
    situationDesc = `المبادرة منجزة بنسبة ${completion}% بحسب السجلات الرسمية.`;
    problemSummary = `التحقق الميداني النهائي وتأكيد الأثر التنموي للمستفيدين.`;
    category = 'إنجاز وأثر';
  } else {
    situationDesc = `المبادرة مسجلة بحالة (${statusStr}) ونسبة إنجاز ${completion}%.`;
    problemSummary = `مراجعة الحالة الميدانية وتحديث السجل الإداري.`;
    category = 'مراجعة إدارية';
  }

  const situation: Situation = {
    description: situationDesc,
    confidence: confidence,
    evidenceSummary: evidenceList,
  };

  const problem: Problem = {
    summary: problemSummary,
    category: category,
    confidence: hasClearDefinition ? confidence : 'LOW',
    hasClearDefinition,
  };

  return { situation, problem };
}
