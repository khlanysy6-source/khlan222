/**
 * Validation Engine for Ibb Community Road Initiatives
 * Institutional Rules & Invariants Enforcement
 */

import { Initiative } from '../types';

export interface ValidationReport {
  isValid: boolean;
  totalRecords: number;
  expectedRecords: number;
  errors: string[];
  warnings: string[];
  stats: {
    completed: number;
    ongoing: number;
    stagnant: number;
    stopped: number;
    pending: number;
    totalCost: number;
    totalCommunity: number;
    totalUnit: number;
  };
}

export const VALID_STATUSES: Array<Initiative['status']> = [
  'pending',
  'ongoing',
  'stagnant',
  'completed',
  'stopped'
];

export const REQUIRED_FIELDS: Array<keyof Initiative> = [
  'id',
  'initiativeNumber',
  'name',
  'district',
  'subDistrict',
  'village',
  'governorate',
  'status',
  'completionRate',
  'cost',
  'communityContribution',
  'unitContribution',
  'ownerConfirmed',
  'pathways',
  'contributions',
  'committee',
  'reports',
  'materials',
  'createdAt',
  'updatedAt'
];

/**
 * Validates an array of initiatives against institutional standards.
 */
export function validateInitiativesDataset(
  dataset: Initiative[],
  expectedCount: number = 725
): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  const stats = {
    completed: 0,
    ongoing: 0,
    stagnant: 0,
    stopped: 0,
    pending: 0,
    totalCost: 0,
    totalCommunity: 0,
    totalUnit: 0
  };

  if (!Array.isArray(dataset)) {
    return {
      isValid: false,
      totalRecords: 0,
      expectedRecords: expectedCount,
      errors: ['Dataset is not a valid array.'],
      warnings: [],
      stats
    };
  }

  const totalRecords = dataset.length;

  if (totalRecords !== expectedCount) {
    errors.push(
      `حجم السجلات (${totalRecords}) لا يطابق العدد الرسمي المطلوب (${expectedCount} مبادرة).`
    );
  }

  const seenIds = new Set<string>();
  const seenNumbers = new Set<string>();

  dataset.forEach((item, index) => {
    const rowNum = index + 1;
    if (!item) {
      errors.push(`السجل رقم ${rowNum} فارغ أو غير معرف.`);
      return;
    }

    // 1. Check ID uniqueness
    if (!item.id) {
      errors.push(`السجل رقم ${rowNum} يفتقد للمعرف الفريد (id).`);
    } else if (seenIds.has(item.id)) {
      errors.push(`المعرف الفريد ${item.id} مكرر في السجل رقم ${rowNum}.`);
    } else {
      seenIds.add(item.id);
    }

    // 2. Check Initiative Number uniqueness
    if (!item.initiativeNumber) {
      errors.push(`السجل رقم ${rowNum} (${item.name || item.id}) يفتقد لرقم المبادرة (initiativeNumber).`);
    } else if (seenNumbers.has(String(item.initiativeNumber))) {
      warnings.push(`رقم المبادرة ${item.initiativeNumber} مكرر في السجل رقم ${rowNum}.`);
    } else {
      seenNumbers.add(String(item.initiativeNumber));
    }

    // 3. Check Required Fields
    for (const field of REQUIRED_FIELDS) {
      if (item[field] === undefined || item[field] === null) {
        errors.push(`السجل رقم ${rowNum} (${item.id}) يفتقد للحقل الإلزامي '${String(field)}'.`);
      }
    }

    // 4. Status validation
    if (!VALID_STATUSES.includes(item.status)) {
      errors.push(`السجل رقم ${rowNum} (${item.id}) يحمل حالة غير صالحة: '${item.status}'.`);
    } else {
      stats[item.status]++;
    }

    // 5. Completion Rate validation
    if (typeof item.completionRate !== 'number' || isNaN(item.completionRate)) {
      errors.push(`السجل رقم ${rowNum} (${item.id}) يحمل نسبة إنجاز غير رقمية.`);
    } else if (item.completionRate < 0 || item.completionRate > 100) {
      errors.push(`السجل رقم ${rowNum} (${item.id}) نسبة الإنجاز خارج النطاق (0-100%): ${item.completionRate}%.`);
    }

    // 6. Non-negative Financials
    if (item.cost < 0) {
      errors.push(`السجل رقم ${rowNum} (${item.id}) التكلفة الإجمالية سالبة: ${item.cost}.`);
    } else {
      stats.totalCost += item.cost || 0;
    }

    if (item.communityContribution < 0) {
      errors.push(`السجل رقم ${rowNum} (${item.id}) المساهمة المجتمعية سالبة: ${item.communityContribution}.`);
    } else {
      stats.totalCommunity += item.communityContribution || 0;
    }

    if (item.unitContribution < 0) {
      errors.push(`السجل رقم ${rowNum} (${item.id}) مساهمة الوحدة سالبة: ${item.unitContribution}.`);
    } else {
      stats.totalUnit += item.unitContribution || 0;
    }

    // 7. Arrays validation
    if (!Array.isArray(item.pathways)) errors.push(`السجل رقم ${rowNum} (${item.id}) pathways ليست مصفوفة.`);
    if (!Array.isArray(item.contributions)) errors.push(`السجل رقم ${rowNum} (${item.id}) contributions ليست مصفوفة.`);
    if (!Array.isArray(item.materials)) errors.push(`السجل رقم ${rowNum} (${item.id}) materials ليست مصفوفة.`);
    if (!Array.isArray(item.committee)) errors.push(`السجل رقم ${rowNum} (${item.id}) committee ليست مصفوفة.`);
    if (!Array.isArray(item.reports)) errors.push(`السجل رقم ${rowNum} (${item.id}) reports ليست مصفوفة.`);

    // 8. Coordinates validation
    if (item.coordinates && typeof item.coordinates === 'string') {
      const parts = item.coordinates.split(',').map(s => s.trim());
      if (parts.length === 2) {
        const lat = parseFloat(parts[0]);
        const lng = parseFloat(parts[1]);
        if (isNaN(lat) || isNaN(lng)) {
          warnings.push(`السجل رقم ${rowNum} (${item.id}) الإحداثيات تحتوي على قيم غير رقمية: ${item.coordinates}`);
        }
      }
    }
  });

  return {
    isValid: errors.length === 0,
    totalRecords,
    expectedRecords: expectedCount,
    errors,
    warnings,
    stats
  };
}
