/**
 * Data Normalization and Canonicalization Engine
 * Normalizes districts, sub-districts, project names, statuses, and numeric metrics.
 */

import { Initiative } from '../types';
import { parseNum, getCanonicalDistrictName } from '../utils/numberAndDistrictUtils';

export function normalizeDistrict(raw: any): string {
  if (!raw) return 'مديرية ذي السفال';
  let d = String(raw).replace(/[\uFFFD\u0000-\u001F]/g, '').trim();
  if (d.includes('الرضمة')) return 'مديرية الرضمة';
  if (d.includes('السبرة')) return 'مديرية السبرة';
  if (d.includes('السدة')) return 'مديرية السدة';
  if (d.includes('السياني')) return 'مديرية السياني';
  if (d.includes('الشع')) return 'مديرية الشعر';
  if (d.includes('حزم')) return 'مديرية حزم العدين';
  if (d.includes('فرع')) return 'مديرية فرع العدين';
  if (d.includes('العدين')) return 'مديرية العدين';
  if (d.includes('القفر')) return 'مديرية القفر';
  if (d.includes('المخادر')) return 'مديرية المخادر';
  if (d.includes('الندر') || d.includes('النادر')) return 'مديرية النادرة';
  if (d.includes('بعدان')) return 'مديرية بعدان';
  if (d.includes('جبلة')) return 'مديرية جبلة';
  if (d.includes('حبيش')) return 'مديرية حبيش';
  if (d.includes('ذي السفال')) return 'مديرية ذي السفال';
  if (d.includes('ريف')) return 'مديرية ريف إب';
  if (d.includes('مذيخرة')) return 'مديرية مذيخرة';
  if (d.includes('يرم') || d.includes('يريم')) return 'مديرية يريم';
  if (d.includes('الظهار')) return 'مديرية الظهار';
  if (d.includes('المشنة')) return 'مديرية المشنة';
  return getCanonicalDistrictName(d);
}

export function normalizeSubDistrict(raw: any, defaultSub: string = 'العزلة الرئيسية'): string {
  if (!raw) return defaultSub;
  let s = String(raw).trim();
  if (!s || s === '-' || s === 'null') return defaultSub;
  if (!s.startsWith('عزلة') && !s.startsWith('عزله')) {
    return `عزلة ${s}`;
  }
  return s;
}

export function normalizeName(name: string): string {
  if (!name) return '';
  let str = String(name).trim().toLowerCase();
  str = str.replace(/^(مشروع|مبادرة|مبادره)\s+/g, '');
  str = str.replace(/^(مسح\s+وتوسعة\s+ورصف|مسح\s+وتوسعه\s+ورصف|مسح\s+ورصف|شق\s+وتوسعة\s+ورصف|شق\s+ورصف|توسعة\s+ورصف|رصف)\s+/g, '');
  str = str.replace(/^(طريق|طرق)\s+/g, '');
  str = str.replace(/[أإآٱ]/g, 'ا');
  str = str.replace(/ى/g, 'ي');
  str = str.replace(/ة/g, 'ه');
  str = str.replace(/[\u064B-\u0652]/g, '');
  str = str.replace(/[^\u0600-\u06FF0-9a-zA-Z\s]/g, ' ');
  return str.replace(/\s+/g, ' ').trim();
}

export function cleanNumericValue(val: any, fallback: number = 0): number {
  const parsed = parseNum(val);
  return isNaN(parsed) ? fallback : Math.max(0, parsed);
}

/**
 * Standardizes any raw initiative object to ensure all required fields,
 * valid arrays, and normalized string formats are maintained.
 */
export function canonicalizeInitiativeRecord(raw: any, fallbackIndex: number = 1): Initiative {
  if (!raw) {
    return {
      id: `init_fallback_${fallbackIndex}`,
      initiativeNumber: `IM-${1000 + fallbackIndex}`,
      name: 'مبادرة تنموية',
      district: 'مديرية ذي السفال',
      governorate: 'محافظة إب',
      sector: 'طرق واعمال انشائية',
      subDistrict: 'عزلة عامة',
      village: 'القرية الرئيسية',
      coordinates: '13.840000, 44.090000',
      startDate: '٢٠٢٦-٠١-٠١',
      endDate: '٢٠٢٦-١٢-٣١',
      cost: 0,
      communityContribution: 0,
      unitContribution: 0,
      completionRate: 0,
      status: 'ongoing',
      ownerConfirmed: true,
      pathways: [],
      contributions: [],
      materials: [],
      committee: [],
      reports: [],
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-07-24T00:00:00Z'
    };
  }

  const id = String(raw.id || `init_sheet_${fallbackIndex}`);
  const initiativeNumber = String(raw.initiativeNumber || (raw.id ? `IM-${raw.id.replace(/\D/g, '') || fallbackIndex}` : `IM-${1000 + fallbackIndex}`));
  const name = String(raw.name || raw.title || 'مبادرة تنموية').trim();
  const district = normalizeDistrict(raw.district);
  const cost = cleanNumericValue(raw.cost, 0);
  const communityContribution = cleanNumericValue(raw.communityContribution, 0);
  let unitContribution = cleanNumericValue(raw.unitContribution, 0);
  if (!unitContribution && cost > communityContribution) {
    unitContribution = cost - communityContribution;
  }

  const completionRate = Math.min(100, Math.max(0, cleanNumericValue(raw.completionRate, 0)));

  let status: Initiative['status'] = raw.status || 'ongoing';
  if (completionRate >= 100) {
    status = 'completed';
  } else if (!raw.status && completionRate > 0) {
    status = 'ongoing';
  } else if (!['pending', 'ongoing', 'stagnant', 'completed', 'stopped'].includes(status)) {
    status = 'ongoing';
  }

  return {
    ...raw,
    id,
    initiativeNumber,
    name,
    district,
    governorate: raw.governorate || 'محافظة إب',
    sector: raw.sector || 'طرق واعمال انشائية',
    subDistrict: raw.subDistrict || 'عزلة عامة',
    village: raw.village || 'القرية الرئيسية',
    coordinates: raw.coordinates || '13.840000, 44.090000',
    startDate: raw.startDate || '٢٠٢٦-٠١-٠١',
    endDate: raw.endDate || '٢٠٢٦-١٢-٣١',
    cost,
    communityContribution,
    unitContribution,
    executionCostCompleted: cleanNumericValue(raw.executionCostCompleted, 0),
    deliveredUnitContribution: cleanNumericValue(raw.deliveredUnitContribution, 0),
    completionRate,
    status,
    ownerConfirmed: raw.ownerConfirmed !== false,
    stagnationReason: raw.stagnationReason || ((status === 'stagnant' || status === 'stopped') ? (raw.notes || 'بانتظار المعالجة') : undefined),
    notes: raw.notes || '',
    materials: Array.isArray(raw.materials) ? raw.materials : [],
    pathways: Array.isArray(raw.pathways) ? raw.pathways : [],
    contributions: Array.isArray(raw.contributions) ? raw.contributions : [],
    committee: Array.isArray(raw.committee) ? raw.committee : [],
    reports: Array.isArray(raw.reports) ? raw.reports : [],
    materialsApproved: raw.materialsApproved || (raw.cementApproved ? `${raw.cementApproved} كيس` : 'بانتظار الصرف'),
    materialsDisbursed: raw.materialsDisbursed || '0 كيس',
    materialsRemaining: raw.materialsRemaining || '0 كيس',
    materialsUsed: raw.materialsUsed || '0 كيس',
    dieselApproved: raw.dieselApproved || 'بانتظار الصرف',
    dieselDisbursed: raw.dieselDisbursed || '0 لتر',
    dieselRemaining: raw.dieselRemaining || '0 لتر',
    dieselUsed: raw.dieselUsed || '0 لتر',
    beneficiaries: cleanNumericValue(raw.beneficiaries, 1500),
    createdAt: raw.createdAt || '2026-01-01T00:00:00Z',
    updatedAt: raw.updatedAt || '2026-07-24T00:00:00Z'
  };
}
