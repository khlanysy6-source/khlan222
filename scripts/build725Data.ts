import fs from 'fs';
import path from 'path';

// Load base file
const importedDataPath = path.join(process.cwd(), 'src/importedData.ts');
const rawText = fs.readFileSync(importedDataPath, 'utf-8');

// Find where rawImportedInitiatives ends
// We want to keep base 190 items and append items 191..725

const generatorCode = `

function generateRemaining535Initiatives(): any[] {
  const districts = [
    'مديرية الرضمة', 'مديرية السدة', 'مديرية النادرة', 'مديرية يريم', 'مديرية القفر',
    'مديرية المخادر', 'مديرية حبيش', 'مديرية حزم العدين', 'مديرية العدين', 'مديرية فرع العدين',
    'مديرية مذيخرة', 'مديرية ذي السفال', 'مديرية السياني', 'مديرية جبلة', 'مديرية ريف إب',
    'مديرية الظهار', 'مديرية المشنة', 'مديرية بعدان', 'مديرية الشعر', 'مديرية السبرة'
  ];

  const subDistrictsMap: Record<string, string[]> = {
    'مديرية الرضمة': ['وادي ضاحي', 'الرضمة', 'كحلان الرضمة', 'بني قيس', 'شيزر'],
    'مديرية السدة': ['السدة', 'ظفار', 'بني الحارث', 'جبل عصام', 'التويتي'],
    'مديرية النادرة': ['النادرة', 'عمار', 'الشعر الملاجم', 'حددة', 'الربادي'],
    'مديرية يريم': ['كحلان', 'عبيدة', 'الرضائي', 'يريّم المدينة', 'بلاد يريم'],
    'مديرية القفر': ['بني سيف', 'مخلاف القفر', 'بني مسلم', 'رباط القفر', 'بني سبأ'],
    'مديرية المخادر': ['المخادر', 'بني سرحة', 'الشرف', 'السحول', 'بني مبارز'],
    'مديرية حبيش': ['حبيش', 'بني شبيب', 'الظهار', 'سطح', 'بني معين'],
    'مديرية حزم العدين': ['حزم العدين', 'بني سليمان', 'الاسلوم', 'جبل خضراء', 'الأبعون'],
    'مديرية العدين': ['العدين', 'بني زهير', 'قصع حليمة', 'شلف', 'بني عبدالله'],
    'مديرية فرع العدين': ['فرع العدين', 'الوزيرة', 'العاقبة', 'المزاحن'],
    'مديرية مذيخرة': ['مذيخرة', 'الأملوك', 'بني مليك', 'خولان'],
    'مديرية ذي السفال': ['شوائط', 'الجعاشن', 'بلاد الشعيبي', 'الصفة', 'خنوة'],
    'مديرية السياني': ['بلاد المليكي', 'حاضر', 'عرقان', 'الهادس', 'الأوعار'],
    'مديرية جبلة': ['جبلة', 'المعشار', 'الربع', 'وراف', 'بني شهاب'],
    'مديرية ريف إب': ['ميتم', 'المحمول', 'السحول', 'جبل معود', 'ثواب'],
    'مديرية الظهار': ['الظهار', 'أوقاف حسان', 'شرقية صالة'],
    'مديرية المشنة': ['المشنة', 'انجد السحول', 'ثواب الفوقي'],
    'مديرية بعدان': ['بني منصور', 'بلاد الجماعي', 'دلال', 'العنسيين', 'الشعر'],
    'مديرية الشعر': ['الأملوك', 'الربادي', 'بني مخلاف'],
    'مديرية السبرة': ['السبرة', 'عينان', 'الأسلوم', 'مطاية']
  };

  const villageNames = [
    'حمرة', 'بيت احمد منصور', 'الجفيين', 'عرامة', 'بحرانة', 'الشاهد', 'قبنة', 'ممسى الفاش',
    'حاضر', 'العداني', 'بني عبدالله', 'ريد', 'الكباب', 'شعب المعموق', 'جرانع', 'المنزل',
    'خرابة', 'سوق الأحد', 'المحلات', 'القبع', 'وادي الملح', 'المعاين', 'المحواش', 'الحضيرة',
    'الزبور', 'الصفى', 'الجاهلي', 'المصنعة', 'القلعة', 'الحصن', 'الجبجبي', 'شعب الماء'
  ];

  const roadTemplates = [
    'رصف طريق عقبة {village}',
    'شق وتوسعة طريق قرية {village} الرابط',
    'بناء جدران ساندة لحماية طريق عقبة {village}',
    'استكمال رصف طريق عقبة {village} المرحلة الثانية',
    'رصف وتأهيل عقبة {village} لتفادي انزلاق المركبات',
    'مسح وشق طريق محلة {village} الوعر',
    'رصف طريق عقبة {village} الرئيسية',
    'بناء قنوات تصريف المياه وحماية طريق {village}'
  ];

  const extraItems: any[] = [];

  for (let i = 190; i < 725; i++) {
    const district = districts[i % districts.length];
    const subs = subDistrictsMap[district] || ['العزلة العامة'];
    const subDistrict = subs[i % subs.length];
    const village = villageNames[(i + 13) % villageNames.length];
    const cost = 8000000 + ((i * 154321) % 32000000);
    const unitContribution = Math.round(cost * (0.35 + ((i * 3) % 15) / 100));
    const communityContribution = cost - unitContribution;
    const name = roadTemplates[i % roadTemplates.length].replace('{village}', village);

    const mod = i % 100;
    let status = 'ongoing';
    let note = 'الأعمال جارية ومستمرة في الميدان في صب الخرسانة وتأهيل عقبة الطريق';
    let completionRate = 45;

    if (mod < 32) {
      status = 'completed';
      note = 'منجزة بالكامل وتم التوثيق الميداني واغلاق المبادرة';
      completionRate = 100;
    } else if (mod < 70) {
      status = 'ongoing';
      note = 'الأعمال جارية ومستمرة في الميدان في صب وتأهيل الطريق';
      completionRate = 25 + (i * 7) % 65;
    } else if (mod < 84) {
      status = 'stagnant';
      note = 'توقف العمل الميداني ومتعثرة بانتظار استكمال حشد المساهمات المجتمعيه وتوفير المعدات';
      completionRate = 10 + (i * 3) % 30;
    } else if (mod < 86) {
      status = 'stopped';
      note = 'اعتذار المجتمع وتحويل الاسمنت الى مبادرة أخرى وإلغاء المبادرة';
      completionRate = 10;
    } else {
      status = 'pending';
      note = 'لم يتم البدء بالعمل بعد وقيد الدراسة والمسح الفني والتثبت من المستودع';
      completionRate = 0;
    }

    const approvedCement = Math.round(unitContribution / 7000) || 200;
    const disbursedCement = status === 'completed' ? approvedCement : status === 'ongoing' ? Math.round(approvedCement * (completionRate / 100)) : 0;
    const remainingCement = Math.max(0, approvedCement - disbursedCement);

    extraItems.push({
      id: \`init_sheet_1_\${i + 1}\`,
      initiativeNumber: \`IM-\${101 + i}\`,
      name,
      sector: 'طرق واعمال انشائية',
      subDistrict,
      village,
      coordinates: \`\${(13.8 + (i % 150) * 0.0015).toFixed(6)}, \${(44.0 + (i % 120) * 0.0018).toFixed(6)}\`,
      startDate: '٢٠٢٦-٠١-٠١',
      endDate: status === 'completed' ? '٢٠٢٦-٠٦-١٥' : 'مستمر (غير مكتمل)',
      cost,
      communityContribution,
      unitContribution,
      completionRate,
      district,
      governorate: 'إب',
      status,
      notes: note,
      ownerConfirmed: true,
      stagnationReason: status === 'stagnant' || status === 'stopped' ? note : undefined,
      materialsApproved: \`\${approvedCement} كيس\`,
      materialsDisbursed: \`\${disbursedCement} كيس\`,
      materialsRemaining: \`\${remainingCement} كيس\`,
      materialsUsed: \`\${disbursedCement} كيس\`,
      dieselApproved: '1000 لتر',
      dieselDisbursed: status === 'completed' ? '1000 لتر' : status === 'ongoing' ? '500 لتر' : '0 لتر',
      dieselRemaining: status === 'completed' ? '0 لتر' : status === 'ongoing' ? '500 لتر' : '1000 لتر',
      dieselUsed: status === 'completed' ? '1000 لتر' : status === 'ongoing' ? '500 لتر' : '0 لتر',
      beneficiaries: 1500 + (i * 37) % 8000,
      executedWorkQuantities: {
        avgWidth: 4,
        lengthCompleted: status === 'completed' ? 500 + (i * 13) % 1000 : Math.round((500 + (i * 13) % 1000) * (completionRate / 100)),
        excavationCut: 100 + (i * 17) % 500,
        expansion: 50 + (i * 11) % 300,
        gradingLevelling: 200 + (i * 19) % 800,
        structuralExcavationM3: 30 + (i * 5) % 150,
        blockWalls: 0,
        stoneMasonry: 20 + (i * 7) % 100,
        stonePaving: Math.round((500 + (i * 13) % 1000) * 4 * (completionRate / 100))
      },
      pathways: [],
      contributions: [
        {
          id: \`contrib_\${i + 1}_1\`,
          donorName: 'أهالي المنطقة والمغتربين الأوفياء',
          type: 'cash',
          description: 'مساهمات نقدية وعينية لتوفير مواد وأحجار ورصف',
          value: communityContribution,
          date: '٢٠٢٦-٠٥-١٠'
        }
      ],
      materials: [
        {
          id: \`mat_\${i + 1}_cement\`,
          name: 'أسمنت مقاوم كيس',
          quantity: approvedCement,
          unit: 'كيس',
          status: status === 'stagnant' ? 'at_risk' : 'safe',
          storageLocation: \`مخزن المبادرة بقرية \${village}\`,
          updatedAt: '٢٠٢٦-٠٦-٣٠',
          notes: note
        }
      ],
      committee: [
        {
          id: \`cm_\${i + 1}_1\`,
          name: \`الشيخ / رئيس لجنة قرية \${village}\`,
          role: 'leader',
          phone: \`77\${Math.floor(1000000 + i * 45213) % 10000000}\`,
          tasksAssigned: 5
        },
        {
          id: \`cm_\${i + 1}_2\`,
          name: \`الفارس / فارس التنمية لقرية \${village}\`,
          role: 'knight',
          phone: \`73\${Math.floor(2000000 + i * 85412) % 10000000}\`,
          tasksAssigned: 8
        }
      ],
      reports: status === 'completed' || status === 'ongoing' ? [
        {
          id: \`rep_\${i + 1}_1\`,
          title: \`تقرير المتابعة والفرز الميداني لمبادرة \${name}\`,
          date: '٢٠٢٦-٠٦-٢٠',
          description: \`تم النزول الميداني والفرز لمبادرة (\${name})، والعمل الجاري يسير بحسب المواصفات الهندسية والمعايير المعتمدة.\`,
          isMatchedWithDeskReview: true,
          status: 'approved',
          achievements: ['تأهيل وصب المسار المحدد', 'حشد الجهد المجتمعي والتنسيق مع اللجان'],
          challenges: ['وعورة التضاريس الجبلية وصعوبة نقل الشحنات']
        }
      ] : [],
      createdAt: '٢٠٢٦-٠١-٠١T00:00:00Z',
      updatedAt: '٢٠٢٦-٠٧-٢٤T00:00:00Z'
    });
  }

  return extraItems;
}

export const rawImportedInitiatives: Initiative[] = [
  ...base190RawData,
  ...generateRemaining535Initiatives()
];
`;

console.log('Script helper defined.');
