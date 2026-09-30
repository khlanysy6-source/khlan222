/**
 * EXECUTION-03 — Owner Resolver
 * Resolves the precise entity responsible for executing interventions.
 * Avoids inventing non-existent agencies; reports OWNER_UNRESOLVED when ambiguous.
 */

import { Initiative } from '../types';
import { RootCause, Intervention, Owner, OwnerType } from './types';

export function resolveOwner(initiative: Initiative, rootCause: RootCause, intervention: Intervention): Owner {
  const districtName = initiative.district || 'المديرية';
  const causeCat = rootCause.category;
  const interventionType = intervention.type;

  let type: OwnerType = 'OWNER_UNRESOLVED';
  let name = 'غير محدد';
  let scope = districtName;
  let reason = 'لا توجد بيانات كافية لتحديد الجهة المسؤولة بحسم.';

  if (interventionType === 'SUPPLY_INTERVENTION') {
    type = 'CENTRAL_UNIT';
    name = 'الوحدة المركزية لمبادرات الطرق والأسمنت';
    scope = 'المحافظة والمركز';
    reason = 'مسؤولة عن توزيع حصص الأسمنت والديزل والدعم المركزي لمبادرات الطرق.';
  } else if (interventionType === 'TECHNICAL_ASSESSMENT') {
    type = 'ENGINEERING_COMMITTEE';
    name = `المكتب الهندسي واللجنة الفنية بـ${districtName}`;
    scope = districtName;
    reason = 'جهة الاختصاص الفني في إعداد الدراسات والهندسة الميدانية بالجدران والطرق.';
  } else if (interventionType === 'COMMUNITY_MEDIATION') {
    type = 'DISTRICT_DIRECTORATE';
    name = `السلطة المحلية بـ${districtName} والجمعية المجتمعية`;
    scope = districtName;
    reason = 'صاحبة الصلاحية المحلية والمجتمعية لحسم النزاعات التوافقية بين الأهالي.';
  } else if (interventionType === 'DOCUMENTATION_CLOSURE') {
    type = 'GOVERNORATE_LEADERSHIP';
    name = 'إدارة المبادرات بفرع المحافظة';
    scope = 'محافظة إب';
    reason = 'الجهة المختصة بالاعتماد النهائي لمحاضر الإغلاق والتوثيق المستندي.';
  } else if (interventionType === 'FINANCIAL_ALLOCATION') {
    type = 'GOVERNORATE_LEADERSHIP';
    name = 'الشؤون المالية بالوحدة التنفيذية بالمحافظة';
    scope = 'محافظة إب';
    reason = 'الجهة المسؤولة عن الميزانية المالية والتخصيصات المعتمدة.';
  } else if (interventionType === 'FIELD_EVALUATION') {
    type = 'DISTRICT_DIRECTORATE';
    name = `فريق الرصد والمتابعة بـ${districtName}`;
    scope = districtName;
    reason = 'مكلف بالنزول التفقدي وإعادة تقييم الموقع رفع البيانات الفعالة.';
  } else if (interventionType === 'NONE_REQUIRED') {
    type = 'COMMUNITY_ASSOCIATION';
    name = (initiative as any).cooperativeSociety || (initiative as any).cooperativeName || `لجنة المبادرة بـ${districtName}`;
    scope = districtName;
    reason = 'الجهة الميدانية القائمة بالتنفيذ الذاتي والمتابعة اليومية.';
  }

  return {
    type,
    name,
    scope,
    reason,
  };
}
