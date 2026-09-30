/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Officials Registry & Institutional Personnel Management System
 * سجل المسؤولين والقيادات التنفيذية وإدارة التكليفات والصلاحيات
 */

export interface OfficialProfile {
  id: string; // المعرف الفريد للمسؤول e.g. "off_777001001"
  fullName: string; // 1. الاسم الكامل للمسؤول
  phone: string; // 2. رقم الهاتف الأساسي المعتمد
  secondaryPhone?: string; // 3. رقم الهاتف الاحتياطي أو واتساب
  email?: string; // 4. البريد الإلكتروني الرسمي
  jobTitle: string; // 5. المسمى الوظيفي والصفة الرسمية
  organization: string; // 6. الجهة / المؤسسة التابع لها
  governorate: string; // 7. المحافظة (محافظة إب)
  district: string; // 8. المديرية
  subDistrict?: string; // 9. العزل والقرى التابعة للنطاق
  scope?: string; // 10. منطقة ونطاق الصلاحيات الجغرافية
  role: string; // 11. الدور المؤسسي والمسؤولية الميدانية
  permissionLevel: 'admin' | 'executive' | 'supervisory' | 'field' | 'viewer'; // 12. مستوى الصلاحية بالنظام
  accountStatus: 'linked_active' | 'unlinked' | 'pending' | 'suspended'; // 13. حالة الحساب والتوثيق
  assignmentType?: string; // 14. نوع التكليف والمهمة الميدانية (دائم / طارئ / إشراف موسمي)
  qualification?: string; // 15. المؤهل والتخصص المهني
  linkedAuthUid?: string; // معرّف حساب الدخول الموثق
  assignedInitiativeIds: string[]; // 16. معرفات وأرقام المبادرات المسندة
  assignedDecisionIds: string[]; // معرفات القرارات التنفيذية المسندة
  createdAt: string;
  updatedAt: string; // 17. تاريخ القيد والتحديث
  importedFromSheet?: string; // اسم الشيت أو مصدر البيانات
  notes?: string; // 18. ملاحظات وتوجيهات إدارية
}

export interface OfficialImportHistoryLog {
  id: string;
  timestamp: string;
  importedBy: string;
  fileName: string;
  totalRows: number;
  addedCount: number;
  updatedCount: number;
  rejectedCount: number;
  rejectionReasons: string[];
  dataVersion: string;
}

export interface ImportValidationReport {
  isValid: boolean;
  totalRows: number;
  newOfficials: OfficialProfile[];
  updatedOfficials: OfficialProfile[];
  rejectedRows: Array<{ row: number; data: any; reason: string }>;
  rejectionSummary: string[];
}

/**
 * Predefined Canonical Officials List
 */
export const INITIAL_OFFICIALS: OfficialProfile[] = [
  {
    id: 'off_001',
    fullName: 'الدكتور محمد حسن المداني',
    phone: '777888999',
    jobTitle: 'رئيس وحدة التدخلات المركزية التنموية الطارئة',
    organization: 'وحدة التدخلات المركزية التنموية الطارئة - القيادة العامة',
    governorate: 'إب',
    district: 'كامل المديريات',
    scope: 'القيادة التنفيذية العليا واعتماد المخصصات المركزية والمشاريع التنموية',
    role: 'وحدة مركزية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_002',
    fullName: 'المهندس شهاب أحمد الشامي',
    phone: '780806806',
    jobTitle: 'المدير التنفيذي لوحدة التدخلات المركزية التنموية الطارئة',
    organization: 'وحدة التدخلات المركزية التنموية الطارئة',
    governorate: 'إب',
    district: 'كامل المديريات',
    scope: 'الإدارة التنفيذية لبرامج التدخلات ومتابعة سلاسل الإمداد ومصفوفة الدعم',
    role: 'وحدة مركزية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_003',
    fullName: 'المهندس أحمد بن نايف ابولحوم',
    phone: '775050595',
    jobTitle: 'ممثل وحدة التدخلات المركزية التنموية الطارئة بمحافظة إب',
    organization: 'فرع وحدة التدخلات المركزية التنموية بمحافظة إب',
    governorate: 'إب',
    district: 'كامل المديريات',
    scope: 'التنسيق والتمثيل الميداني لوحدة التدخلات مع قيادة المحافظة والمديريات',
    role: 'وحدة مركزية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_004',
    fullName: 'اللواء عبدالواحد محمد صلاح',
    phone: '772151515',
    jobTitle: 'محافظ محافظة إب - رئيس المجلس المحلي',
    organization: 'قيادة السلطة المحلية والمجلس المحلي بمحافظة إب',
    governorate: 'إب',
    district: 'كامل المديريات',
    scope: 'القيادة العامة للسلطة المحلية وحشد المبادرات المجتمعية بالمحافظة',
    role: 'محلفظ المحافظة',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_005',
    fullName: 'المهندس مجدي المنتصر',
    phone: '774613037',
    jobTitle: 'مدير إدارة الاشراف والتقييم الهندسي بالوحدة',
    organization: 'وحدة التدخلات المركزية - إدارة الإشراف الهندسي',
    governorate: 'إب',
    district: 'كامل المديريات',
    scope: 'الإشراف الفني والتقييم الهندسي والمطابقة الميدانية لمشاريع المبادرات',
    role: 'مهندس/مشرف ميداني',
    permissionLevel: 'field',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_006',
    fullName: 'المهندس منصور عبدالرحمن الحميدي',
    phone: '772903067',
    jobTitle: 'مديرادارة الدراسات بالوحدة',
    organization: 'وحدة التدخلات المركزية - إدارة الدراسات',
    governorate: 'إب',
    district: 'كامل المديريات',
    scope: 'إعداد ومراجعة الدراسات الفنية وجداول الكميات والتصاميم الهندسية',
    role: 'وحدة مركزية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_007',
    fullName: 'المهندس عقيل حجر',
    phone: '772364342',
    jobTitle: 'مدير إدارة المساهمات العينية لمشاريع المبادرات مجال الطرق بالوحدة',
    organization: 'وحدة التدخلات المركزية - إدارة المساهمات العينية',
    governorate: 'إب',
    district: 'كامل المديريات',
    scope: 'إدارة وتخصيص المساهمات العينية لمشاريع الطرق (أسمنت، ديزل، مواد)',
    role: 'وحدة مركزية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_008',
    fullName: 'م. عيسى ناجي القادري',
    phone: '772730696',
    email: 'eesaalqadri25@gmail.com',
    jobTitle: 'مسؤول المتابعة والإشراف والتقييم بمحافظة إب ومختص المتابعة',
    organization: 'وحدة التدخلات المركزية التنموية الطارئة',
    governorate: 'إب',
    district: 'السبرة، السياني، ذي السفال',
    scope: 'المتابعة والإشراف والتقييم الميداني وإدارة مطابقة البيانات بمحافظة إب',
    role: 'مهندس/مشرف ميداني',
    permissionLevel: 'field',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_009',
    fullName: 'عميد علي النقيب السراجي',
    phone: '777138749',
    jobTitle: 'مدير مديرية ريف إب',
    organization: 'السلطة المحلية بمديرية ريف إب',
    governorate: 'إب',
    district: 'ريف إب',
    scope: 'نطاق مديرية ريف إب',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_010',
    fullName: 'عميد عبدالله الفرح',
    phone: '775064356',
    jobTitle: 'مدير مديرية الرضمة',
    organization: 'السلطة المحلية بمديرية الرضمة',
    governorate: 'إب',
    district: 'الرضمة',
    scope: 'نطاق مديرية الرضمة',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_011',
    fullName: 'محمد عبدالمغني',
    phone: '773977892',
    jobTitle: 'رئيس جمعية الرضمة التعاونية',
    organization: 'الجمعية التعاونية بمديرية الرضمة',
    governorate: 'إب',
    district: 'الرضمة',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية الرضمة',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_012',
    fullName: 'عميد محمد حمود الدرواني',
    phone: '775001003',
    jobTitle: 'مدير مديرية السدة',
    organization: 'السلطة المحلية بمديرية السدة',
    governorate: 'إب',
    district: 'السدة',
    scope: 'نطاق مديرية السدة',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_013',
    fullName: 'يحيى الشامي',
    phone: '780767707',
    jobTitle: 'رئيس جمعية السدة التعاونية',
    organization: 'الجمعية التعاونية بمديرية السدة',
    governorate: 'إب',
    district: 'السدة',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية السدة',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_014',
    fullName: 'عميد عبداللطيف الشبيبي',
    phone: '777755796',
    jobTitle: 'مدير مديرية النادرة',
    organization: 'السلطة المحلية بمديرية النادرة',
    governorate: 'إب',
    district: 'النادرة',
    scope: 'نطاق مديرية النادرة',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_015',
    fullName: 'زمام حمود الصعدي',
    phone: '782997799',
    jobTitle: 'رئيس جمعية النادرة التعاونية',
    organization: 'الجمعية التعاونية بمديرية النادرة',
    governorate: 'إب',
    district: 'النادرة',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية النادرة',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_016',
    fullName: 'عميد اشرف الصلاحي',
    phone: '771687407',
    jobTitle: 'مدير مديرية الشعر',
    organization: 'السلطة المحلية بمديرية الشعر',
    governorate: 'إب',
    district: 'الشعر',
    scope: 'نطاق مديرية الشعر',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_017',
    fullName: 'محمد عباس رويد',
    phone: '774975330',
    jobTitle: 'رئيس جمعية الشعر التعاونية',
    organization: 'الجمعية التعاونية بمديرية الشعر',
    governorate: 'إب',
    district: 'الشعر',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية الشعر',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_018',
    fullName: 'عميد مفضل صالح الجلال',
    phone: '777331981',
    jobTitle: 'مدير مديرية بعدان',
    organization: 'السلطة المحلية بمديرية بعدان',
    governorate: 'إب',
    district: 'بعدان',
    scope: 'نطاق مديرية بعدان',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_019',
    fullName: 'نبيل خشافة',
    phone: '777818862',
    jobTitle: 'رئيس جمعية بعدان التعاونية',
    organization: 'الجمعية التعاونية بمديرية بعدان',
    governorate: 'إب',
    district: 'بعدان',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية بعدان',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_020',
    fullName: 'أستاذ حارث المليكي',
    phone: '777666555',
    jobTitle: 'مدير مديرية المشنة',
    organization: 'السلطة المحلية بمديرية المشنة',
    governorate: 'إب',
    district: 'المشنة',
    scope: 'نطاق مديرية المشنة',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_021',
    fullName: 'أستاذ حميد المتوكل',
    phone: '775495123',
    jobTitle: 'مدير مديرية السبرة',
    organization: 'السلطة المحلية بمديرية السبرة',
    governorate: 'إب',
    district: 'السبرة',
    scope: 'نطاق مديرية السبرة',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_022',
    fullName: 'فارع بجاش',
    phone: '775464917',
    jobTitle: 'رئيس جمعية السبرة التعاونية',
    organization: 'الجمعية التعاونية بمديرية السبرة',
    governorate: 'إب',
    district: 'السبرة',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية السبرة',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_023',
    fullName: 'عميد علي محمد النوعة',
    phone: '771760421',
    jobTitle: 'مدير مديرية السياني',
    organization: 'السلطة المحلية بمديرية السياني',
    governorate: 'إب',
    district: 'السياني',
    scope: 'نطاق مديرية السياني',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_024',
    fullName: 'نواف علي محمد الرعوي',
    phone: '770410792',
    jobTitle: 'رئيس جمعية السياني التعاونية',
    organization: 'الجمعية التعاونية بمديرية السياني',
    governorate: 'إب',
    district: 'السياني',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية السياني',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_025',
    fullName: 'عميد عبدالرحمن احمد وجية الدين',
    phone: '772151633',
    jobTitle: 'مدير مديرية ذي السفال',
    organization: 'السلطة المحلية بمديرية ذي السفال',
    governorate: 'إب',
    district: 'ذي السفال',
    scope: 'نطاق مديرية ذي السفال',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_026',
    fullName: 'فيصل مقبل احمد منصور',
    phone: '772718555',
    jobTitle: 'رئيس جمعية ذي السفال التعاونية',
    organization: 'الجمعية التعاونية بمديرية ذي السفال',
    governorate: 'إب',
    district: 'ذي السفال',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية ذي السفال',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_027',
    fullName: 'عميد ميسرة النهاري',
    phone: '777788743',
    jobTitle: 'مدير مديرية مذيخرة',
    organization: 'السلطة المحلية بمديرية مذيخرة',
    governorate: 'إب',
    district: 'مذيخرة',
    scope: 'نطاق مديرية مذيخرة',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_028',
    fullName: 'احمد سعيد علي المغربي',
    phone: '772677633',
    jobTitle: 'رئيس جمعية مذيخرة التعاونية',
    organization: 'الجمعية التعاونية بمديرية مذيخرة',
    governorate: 'إب',
    district: 'مذيخرة',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية مذيخرة',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_029',
    fullName: 'عميد محمد  الخالد',
    phone: '774666613',
    jobTitle: 'مدير مديرية يريم',
    organization: 'السلطة المحلية بمديرية يريم',
    governorate: 'إب',
    district: 'يريم',
    scope: 'نطاق مديرية يريم',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_030',
    fullName: 'خالد الزبيدي',
    phone: '770430852',
    jobTitle: 'رئيس جمعية يريم التعاونية',
    organization: 'الجمعية التعاونية بمديرية يريم',
    governorate: 'إب',
    district: 'يريم',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية يريم',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_031',
    fullName: 'عميد سلطان الشاجع',
    phone: '770752565',
    jobTitle: 'مدير مديرية جبلة',
    organization: 'السلطة المحلية بمديرية جبلة',
    governorate: 'إب',
    district: 'جبلة',
    scope: 'نطاق مديرية جبلة',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_032',
    fullName: 'صادق علي مسعد المرادي',
    phone: '712557922',
    jobTitle: 'رئيس جمعية جبلة التعاونية',
    organization: 'الجمعية التعاونية بمديرية جبلة',
    governorate: 'إب',
    district: 'جبلة',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية جبلة',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_033',
    fullName: 'دكتور فضل زيد',
    phone: '774924600',
    jobTitle: 'مدير مديرية الظهار',
    organization: 'السلطة المحلية بمديرية الظهار',
    governorate: 'إب',
    district: 'الظهار',
    scope: 'نطاق مديرية الظهار',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_034',
    fullName: 'الشيخ يحيى منصور شائع',
    phone: '770032009',
    jobTitle: 'رئيس جمعية الظهار التعاونية',
    organization: 'الجمعية التعاونية بمديرية الظهار',
    governorate: 'إب',
    district: 'الظهار',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية الظهار',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_035',
    fullName: 'عميد شوفي التويتي',
    phone: '777115474',
    jobTitle: 'مدير مديرية حبيش',
    organization: 'السلطة المحلية بمديرية حبيش',
    governorate: 'إب',
    district: 'حبيش',
    scope: 'نطاق مديرية حبيش',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_036',
    fullName: 'علي عبدالله الشبيبي',
    phone: '782819459',
    jobTitle: 'رئيس جمعية حبيش التعاونية',
    organization: 'الجمعية التعاونية بمديرية حبيش',
    governorate: 'إب',
    district: 'حبيش',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية حبيش',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_037',
    fullName: 'عميد نبيل العواضي',
    phone: '733711543',
    jobTitle: 'مدير مديرية المخادر',
    organization: 'السلطة المحلية بمديرية المخادر',
    governorate: 'إب',
    district: 'المخادر',
    scope: 'نطاق مديرية المخادر',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_038',
    fullName: 'محمد احمد مرشد الصبري',
    phone: '777305092',
    jobTitle: 'رئيس جمعية المخادر التعاونية',
    organization: 'الجمعية التعاونية بمديرية المخادر',
    governorate: 'إب',
    district: 'المخادر',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية المخادر',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_039',
    fullName: 'عميد سنان ال سنان',
    phone: '777509712',
    jobTitle: 'مدير مديرية العدين',
    organization: 'السلطة المحلية بمديرية العدين',
    governorate: 'إب',
    district: 'العدين',
    scope: 'نطاق مديرية العدين',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_040',
    fullName: 'فيصل احمد عبدة الشميري',
    phone: '777266673',
    jobTitle: 'رئيس جمعية العدين التعاونية',
    organization: 'الجمعية التعاونية بمديرية العدين',
    governorate: 'إب',
    district: 'العدين',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية العدين',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_041',
    fullName: 'عميد جمال عبدالحميد المزحاني',
    phone: '770990500',
    jobTitle: 'مدير مديرية فرع العدين',
    organization: 'السلطة المحلية بمديرية فرع العدين',
    governorate: 'إب',
    district: 'فرع العدين',
    scope: 'نطاق مديرية فرع العدين',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_042',
    fullName: 'فيصل عقلان',
    phone: '777856005',
    jobTitle: 'رئيس جمعية فرع العدين التعاونية',
    organization: 'الجمعية التعاونية بمديرية فرع العدين',
    governorate: 'إب',
    district: 'فرع العدين',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية فرع العدين',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_043',
    fullName: 'عميد زكريا المساوى',
    phone: '777300767',
    jobTitle: 'مدير مديرية حزم العدين',
    organization: 'السلطة المحلية بمديرية حزم العدين',
    governorate: 'إب',
    district: 'حزم العدين',
    scope: 'نطاق مديرية حزم العدين',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_044',
    fullName: 'رشيد علي نعمان العواضي',
    phone: '777471195',
    jobTitle: 'رئيس جمعية حزم العدين التعاونية',
    organization: 'الجمعية التعاونية بمديرية حزم العدين',
    governorate: 'إب',
    district: 'حزم العدين',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية حزم العدين',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_045',
    fullName: 'عميد سليم عباس القحفه',
    phone: '772479112',
    jobTitle: 'مدير مديرية القفر',
    organization: 'السلطة المحلية بمديرية القفر',
    governorate: 'إب',
    district: 'القفر',
    scope: 'نطاق مديرية القفر',
    role: 'مدير المديرية',
    permissionLevel: 'executive',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_046',
    fullName: 'محمد عبدالملك عوضة',
    phone: '774793060',
    jobTitle: 'رئيس جمعية القفر التعاونية',
    organization: 'الجمعية التعاونية بمديرية القفر',
    governorate: 'إب',
    district: 'القفر',
    scope: 'حشد المشاركة المجتمعية بنطاق مديرية القفر',
    role: 'رئيس/مسؤول الجمعية التعاونية',
    permissionLevel: 'supervisory',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_047',
    fullName: 'م. زين العابدين علي النهمي',
    phone: '777865350',
    jobTitle: 'مسؤول الدراسات بمحافظة إب',
    organization: 'وحدة التدخلات المركزية - قطاع الدراسات',
    governorate: 'إب',
    district: 'كامل المديريات',
    scope: 'المتابعة الميدانية للدراسات الفنية وجداول الكميات بمحافظة إب',
    role: 'مهندس/مشرف ميداني',
    permissionLevel: 'field',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_048',
    fullName: 'م. قيس محمد مثنى',
    phone: '772997980',
    jobTitle: 'مختص المتابعة بوحدة التدخلات',
    organization: 'وحدة التدخلات المركزية التنموية الطارئة',
    governorate: 'إب',
    district: 'القفر، يريم، النادرة، الرضمة، السدة',
    scope: 'المتابعة الميدانية لمشاريع المبادرات بمديريات: القفر، يريم، النادرة، الرضمة، السدة',
    role: 'مهندس/مشرف ميداني',
    permissionLevel: 'field',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_049',
    fullName: 'م. شمسان قعشة',
    phone: '772162384',
    jobTitle: 'مختص المتابعة بوحدة التدخلات',
    organization: 'وحدة التدخلات المركزية التنموية الطارئة',
    governorate: 'إب',
    district: 'ريف إب، جبلة، بعدان، الشعر، حبيش',
    scope: 'المتابعة الميدانية لمشاريع المبادرات بمديريات: ريف إب، جبلة، بعدان، الشعر، حبيش',
    role: 'مهندس/مشرف ميداني',
    permissionLevel: 'field',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  },
  {
    id: 'off_050',
    fullName: 'م. محمد عدنان البرطي',
    phone: '773859254',
    jobTitle: 'مختص المتابعة بوحدة التدخلات',
    organization: 'وحدة التدخلات المركزية التنموية الطارئة',
    governorate: 'إب',
    district: 'العدين، حزم العدين، فرع العدين، مذيخرة، المخادر',
    scope: 'المتابعة الميدانية لمشاريع المبادرات بمديريات: العدين، حزم العدين، فرع العدين، مذيخرة، المخادر',
    role: 'مهندس/مشرف ميداني',
    permissionLevel: 'field',
    accountStatus: 'linked_active',
    assignedInitiativeIds: [],
    assignedDecisionIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z'
  }
];

const OFFICIALS_STORAGE_KEY = 'canonical_institutional_officials_v4';
const IMPORT_LOGS_STORAGE_KEY = 'institutional_officials_import_logs_v4';

export function getAllStoredOfficials(): OfficialProfile[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem(OFFICIALS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    }
  } catch (e) {
    console.warn('Failed to load stored officials:', e);
  }
  return INITIAL_OFFICIALS;
}

export function saveStoredOfficials(officials: OfficialProfile[]): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(OFFICIALS_STORAGE_KEY, JSON.stringify(officials));
    }
  } catch (e) {
    console.error('Failed to save officials:', e);
  }
}

export function getOfficialById(id: string): OfficialProfile | undefined {
  const all = getAllStoredOfficials();
  return all.find(o => o.id === id);
}

export function getOfficialsByDistrict(district: string): OfficialProfile[] {
  const all = getAllStoredOfficials();
  return all.filter(o => o.district?.includes(district) || o.district?.includes('كافة مديريات'));
}

export function getOfficialForInitiative(initiativeId: string): OfficialProfile | undefined {
  const all = getAllStoredOfficials();
  return all.find(o => o.assignedInitiativeIds?.includes(initiativeId));
}

export function getAllImportLogs(): OfficialImportHistoryLog[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem(IMPORT_LOGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load import logs:', e);
  }
  return [];
}

export function saveImportLog(log: OfficialImportHistoryLog): void {
  try {
    const current = getAllImportLogs();
    const updated = [log, ...current];
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(IMPORT_LOGS_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.error('Failed to save import log:', e);
  }
}

/**
 * ResponsibleImportValidator
 * طبقة التحقق الصارمة لاستيراد بيانات المسؤولين
 */
export class ResponsibleImportValidator {
  /**
   * Helper function to detect standard column key by synonyms
   */
  static getArabicFieldKey(header: string): string {
    const h = header.trim().toLowerCase();
    if (h.includes('اسم') || h.includes('المسؤول') || h.includes('الاسم الكامل') || h.includes('name')) return 'fullName';
    if (h.includes('احتياط') || h.includes('واتساب') || h.includes('ثانوي') || h.includes('جوال 2') || h.includes('هاتف 2') || h.includes('whatsapp') || h.includes('secondary')) return 'secondaryPhone';
    if (h.includes('هاتف') || h.includes('جوال') || h.includes('تلفون') || h.includes('موبايل') || h.includes('phone') || h.includes('mobile')) return 'phone';
    if (h.includes('عزل') || h.includes('قرى') || h.includes('عزلة') || h.includes('قرية') || h.includes('subdistrict')) return 'subDistrict';
    if (h.includes('صلاحية') || h.includes('نطاق') || h.includes('منطقة') || h.includes('اختصاص') || h.includes('scope')) return 'scope';
    if (h.includes('مديرية') || h.includes('district')) return 'district';
    if (h.includes('وظيفة') || h.includes('مسمى') || h.includes('منصب') || h.includes('صفة') || h.includes('title')) return 'jobTitle';
    if (h.includes('جهة') || h.includes('وحدة') || h.includes('مؤسسة') || h.includes('قطاع') || h.includes('org') || h.includes('department')) return 'organization';
    if (h.includes('تكليف') || h.includes('مهمة') || h.includes('نوع التكليف') || h.includes('assignment')) return 'assignmentType';
    if (h.includes('مؤهل') || h.includes('تخصص') || h.includes('شهادة') || h.includes('qualification')) return 'qualification';
    if (h.includes('دور') || h.includes('مسؤولية') || h.includes('role')) return 'role';
    if (h.includes('مستوى') || h.includes('صلاحيات') || h.includes('نفاذ') || h.includes('permission')) return 'permissionLevel';
    if (h.includes('حالة') || h.includes('توثيق') || h.includes('وضع الحساب') || h.includes('status')) return 'accountStatus';
    if (h.includes('بريد') || h.includes('إيميل') || h.includes('email') || h.includes('mail')) return 'email';
    if (h.includes('محافظة') || h.includes('governorate')) return 'governorate';
    if (h.includes('مبادرات') || h.includes('مشاريع') || h.includes('initiatives')) return 'assignedInitiativeIds';
    if (h.includes('ملاحظ') || h.includes('بيان') || h.includes('توجيه') || h.includes('notes')) return 'notes';
    return header;
  }

  /**
   * Parse Arabic Permission Level into typed union
   */
  static parsePermissionLevel(val: any): OfficialProfile['permissionLevel'] {
    if (!val) return 'field';
    const s = val.toString().trim().toLowerCase();
    if (s.includes('admin') || s.includes('مدير نظام') || s.includes('مسؤول نظام') || s.includes('إدارة عليا')) return 'admin';
    if (s.includes('exec') || s.includes('تنفيذي') || s.includes('قيادي') || s.includes('مدير عام') || s.includes('رئيس وحدة') || s.includes('محافظ') || s.includes('وكيل')) return 'executive';
    if (s.includes('super') || s.includes('إشراف') || s.includes('رقاب') || s.includes('مشرف')) return 'supervisory';
    if (s.includes('view') || s.includes('مشاهد') || s.includes('عرض') || s.includes('زائر') || s.includes('قراءة')) return 'viewer';
    return 'field'; // Default to field/operational
  }

  /**
   * Parse Arabic Account Status
   */
  static parseAccountStatus(val: any, hasEmail: boolean = false): OfficialProfile['accountStatus'] {
    if (!val) return hasEmail ? 'linked_active' : 'unlinked';
    const s = val.toString().trim().toLowerCase();
    if (s.includes('نشط') || s.includes('مفعل') || s.includes('موثق') || s.includes('مرتبط') || s.includes('linked') || s.includes('active')) return 'linked_active';
    if (s.includes('معلق') || s.includes('موقوف') || s.includes('محظور') || s.includes('suspended')) return 'suspended';
    if (s.includes('مراجعة') || s.includes('انتظار') || s.includes('pending')) return 'pending';
    return 'unlinked';
  }

  /**
   * Validates raw rows from CSV / Excel / Sheet before committing
   */
  static validateImportData(
    rawRows: any[],
    existingOfficials: OfficialProfile[],
    columnMapping: Record<string, string>
  ): ImportValidationReport {
    const newOfficials: OfficialProfile[] = [];
    const updatedOfficials: OfficialProfile[] = [];
    const rejectedRows: Array<{ row: number; data: any; reason: string }> = [];
    const rejectionSummary: string[] = [];

    const existingMapByPhone = new Map<string, OfficialProfile>();
    const existingMapByEmail = new Map<string, OfficialProfile>();

    existingOfficials.forEach(o => {
      if (o.phone) existingMapByPhone.set(o.phone.trim().replace(/[^\d+]/g, ''), o);
      if (o.email) existingMapByEmail.set(o.email.trim().toLowerCase(), o);
    });

    const seenPhonesInBatch = new Set<string>();
    const seenEmailsInBatch = new Set<string>();

    rawRows.forEach((row, index) => {
      const rowNum = index + 1;
      
      // Helper to look up a field by mapping or smart Arabic fallback
      const getVal = (fieldKey: string, arabicFallbacks: string[]) => {
        if (columnMapping[fieldKey] && row[columnMapping[fieldKey]] !== undefined && row[columnMapping[fieldKey]] !== null && String(row[columnMapping[fieldKey]]).trim() !== '') {
          return row[columnMapping[fieldKey]];
        }
        for (const k of arabicFallbacks) {
          if (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') return row[k];
        }
        // Check dynamic row keys that match synonym
        for (const rawKey of Object.keys(row)) {
          if (ResponsibleImportValidator.getArabicFieldKey(rawKey) === fieldKey && row[rawKey] !== undefined && row[rawKey] !== null) {
            return row[rawKey];
          }
        }
        return '';
      };

      const fullName = getVal('fullName', ['الاسم الكامل', 'اسم المسؤول', 'الاسم', 'الاسم الرباعي', 'المسؤول']).toString().trim();
      const phoneRaw = getVal('phone', ['رقم الهاتف', 'الهاتف', 'رقم الجوال', 'الجوال', 'رقم التواصل', 'رقم الهاتف الأساسي', 'تلفون']).toString().trim();
      const phone = phoneRaw.replace(/[^\d+]/g, '').trim();
      const secondaryPhoneRaw = getVal('secondaryPhone', ['رقم الهاتف الاحتياطي', 'هاتف احتياطي', 'واتساب', 'رقم الواتساب', 'جوال 2', 'رقم الهاتف الاحتياطي أو واتساب']).toString().trim();
      const secondaryPhone = secondaryPhoneRaw.replace(/[^\d+]/g, '').trim();
      const email = getVal('email', ['البريد الإلكتروني', 'البريد', 'الإيميل', 'البريد الإلكتروني المعتمد']).toString().trim().toLowerCase();
      const jobTitle = getVal('jobTitle', ['المسمى الوظيفي', 'الوظيفة', 'المنصب', 'الصفة', 'المسمى الوظيفي والصفة الرسمية']).toString().trim() || 'مسؤول تنفيذي ميداني';
      const organization = getVal('organization', ['الجهة التابع لها', 'الجهة', 'الوحدة', 'جهة العمل', 'المؤسسة', 'الجهة التابع لها / المؤسسة']).toString().trim() || 'وحدة التدخلات التنموية';
      const governorate = getVal('governorate', ['المحافظة', 'محافظة']).toString().trim() || 'محافظة إب';
      const district = getVal('district', ['المديرية', 'اسم المديرية', 'مديرية']).toString().trim() || 'مديرية ذي السفال';
      const subDistrict = getVal('subDistrict', ['العزل والقرى', 'العزل والقرى التابعة', 'العزل', 'القرى', 'العزلة']).toString().trim();
      const scope = getVal('scope', ['منطقة ونطاق الصلاحيات', 'منطقة الصلاحيات', 'نطاق الصلاحيات', 'منطقة ونطاق الصلاحيات الجغرافية', 'منطقة الاختصاص', 'النطاق الجغرافي', 'النطاق']).toString().trim() || (subDistrict ? `عزل: ${subDistrict} بـ${district}` : `نطاق مديرية ${district}`);
      const role = getVal('role', ['الدور المؤسسي', 'الدور التنظيمي', 'الدور والمهمة', 'الدور المؤسسي والمسؤولية الميدانية', 'الدور']).toString().trim() || jobTitle;
      const permissionRaw = getVal('permissionLevel', ['مستوى الصلاحية', 'الصلاحية', 'مستوى النفاذ', 'مستوى الصلاحية بالنظام']);
      const permLevel = ResponsibleImportValidator.parsePermissionLevel(permissionRaw);
      const statusRaw = getVal('accountStatus', ['حالة الحساب', 'الحالة', 'حالة الحساب والتوثيق']);
      const accountStatus = ResponsibleImportValidator.parseAccountStatus(statusRaw, Boolean(email));
      const assignmentType = getVal('assignmentType', ['نوع التكليف', 'نوع التكليف والمهمة', 'المهمة', 'صفة التكليف']).toString().trim() || 'دائم';
      const qualification = getVal('qualification', ['المؤهل والتخصص', 'المؤهل العلمي', 'التخصص', 'المؤهل']).toString().trim() || 'بكالوريوس / كفاءة إدارية وميدانية';
      const initiativesRaw = getVal('assignedInitiativeIds', ['المبادرات المسندة', 'المبادرات المكلف بها', 'أرقام المبادرات', 'المبادرات التنموية المسندة']).toString().trim();
      const assignedInitiativeIds = initiativesRaw
        ? initiativesRaw.split(/[,;\s]+/).map((s: string) => s.trim()).filter(Boolean)
        : [];
      const notes = getVal('notes', ['ملاحظات', 'الملاحظات', 'البيان', 'ملاحظات وتوجيهات إدارية']).toString().trim();

      // Validation 1: Required Name
      if (!fullName || fullName.length < 3) {
        rejectedRows.push({ row: rowNum, data: row, reason: 'الاسم الكامل مفقود أو غير مكتمل (يجب ألا يقل عن 3 أحرف).' });
        return;
      }

      // Validation 2: Required Phone or Email
      if (!phone && !email) {
        rejectedRows.push({ row: rowNum, data: row, reason: 'يجب توفر رقم هاتف جوال أو بريد إلكتروني صالح للتواصل والتحقق.' });
        return;
      }

      // Validation 3: Phone formatting if present
      if (phone && phone.length < 6) {
        rejectedRows.push({ row: rowNum, data: row, reason: `رقم الهاتف [${phoneRaw}] غير صالح (قصير جداً).` });
        return;
      }

      // Validation 4: Email format if present
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        rejectedRows.push({ row: rowNum, data: row, reason: `صيغة البريد الإلكتروني [${email}] غير صالحة.` });
        return;
      }

      // Validation 5: Duplicate check within the batch
      if (phone && seenPhonesInBatch.has(phone)) {
        rejectedRows.push({ row: rowNum, data: row, reason: `رقم الهاتف [${phone}] مكرر في أكثر من صف بنفس ملف الشيت.` });
        return;
      }
      if (email && seenEmailsInBatch.has(email)) {
        rejectedRows.push({ row: rowNum, data: row, reason: `البريد الإلكتروني [${email}] مكرر في أكثر من صف بنفس ملف الشيت.` });
        return;
      }

      if (phone) seenPhonesInBatch.add(phone);
      if (email) seenEmailsInBatch.add(email);

      // Check if existing official exists
      const existing = (phone && existingMapByPhone.get(phone)) || (email && existingMapByEmail.get(email));

      if (existing) {
        // Update record
        const updated: OfficialProfile = {
          ...existing,
          fullName: fullName || existing.fullName,
          phone: phone || existing.phone,
          secondaryPhone: secondaryPhone || existing.secondaryPhone,
          email: email || existing.email,
          jobTitle: jobTitle || existing.jobTitle,
          organization: organization || existing.organization,
          governorate: governorate || existing.governorate,
          district: district || existing.district,
          subDistrict: subDistrict || existing.subDistrict,
          scope: scope || existing.scope || `نطاق ${district}`,
          role: role || existing.role,
          permissionLevel: permLevel,
          accountStatus: accountStatus,
          assignmentType: assignmentType || existing.assignmentType,
          qualification: qualification || existing.qualification,
          assignedInitiativeIds: assignedInitiativeIds.length > 0 ? assignedInitiativeIds : existing.assignedInitiativeIds,
          updatedAt: new Date().toISOString(),
          importedFromSheet: 'استيراد شيت إكسل المعتمد',
          notes: notes || existing.notes
        };
        updatedOfficials.push(updated);
      } else {
        // New record
        const newId = `off_${phone || Date.now()}_${Date.now() % 1000}`;
        const created: OfficialProfile = {
          id: newId,
          fullName,
          phone,
          secondaryPhone: secondaryPhone || undefined,
          email: email || undefined,
          jobTitle,
          organization,
          governorate,
          district,
          subDistrict: subDistrict || undefined,
          scope: scope || `نطاق مديرية ${district}`,
          role,
          permissionLevel: permLevel,
          accountStatus,
          assignmentType: assignmentType || 'دائم',
          qualification: qualification || 'مؤهل تنموي وميداني',
          assignedInitiativeIds,
          assignedDecisionIds: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          importedFromSheet: 'استيراد شيت إكسل المعتمد',
          notes
        };
        newOfficials.push(created);
      }
    });

    if (rejectedRows.length > 0) {
      const summaryMap = new Map<string, number>();
      rejectedRows.forEach(r => {
        summaryMap.set(r.reason, (summaryMap.get(r.reason) || 0) + 1);
      });
      summaryMap.forEach((count, reason) => {
        rejectionSummary.push(`${reason} (${count} صفوف)`);
      });
    }

    return {
      isValid: rejectedRows.length === 0,
      totalRows: rawRows.length,
      newOfficials,
      updatedOfficials,
      rejectedRows,
      rejectionSummary
    };
  }
}

export function getDirectorySummary() {
  const officials = INITIAL_OFFICIALS.length;
  const coveredDistricts = new Set(INITIAL_OFFICIALS.map(o => o.district).filter(Boolean)).size;
  return {
    officials,
    coveredDistricts,
  };
}

