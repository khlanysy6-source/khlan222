/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Initiative, Pathway, FieldReport, Contribution, Material, CommitteeMember, TechnicalWorkQuantities } from './types';
import { importedInitiatives as IMPORTED_SHEETS_INITIATIVES } from './importedData';
import { parseNum } from './utils/numberAndDistrictUtils';

export * from './data/index';

export const DEFAULT_PATHWAYS_TEMPLATE: Pathway[] = [
  {
    id: 1,
    title: 'المسار الأول: التشخيص والفرز الفني والأثر التنموي',
    subtitle: 'التوثيق والتحقق المجتمعي وضمان حماية المواد وتحديد التعثر',
    icon: 'Search',
    tasks: [
      {
        id: 'p1_t1',
        title: 'التوثيق والتحقق المجتمعي وتنظيم اللجان الخاصة بالمبادرة',
        description: 'تشكيل اللجان والتحقق من احتياج المجتمع ومواقع التنفيذ ومطابقتها للمعايير.',
        completed: true,
        completedAt: '2026-06-10',
        notes: 'تم تشكيل اللجنة المجتمعية المكونة من 5 أعضاء واختيار الفارس الميداني.'
      },
      {
        id: 'p1_t2',
        title: 'توفير الوثائق والمستندات الخاصة باستلام واستهلاك المواد ميدانياً',
        description: 'تجهيز السجلات الميدانية لمتابعة صرف الأسمنت والحديد والمواد الأخرى ومطابقتها.',
        completed: false,
        notes: 'بانتظار وصول الدفعة الأولى من المواد لتسجيل أول استلام.'
      },
      {
        id: 'p1_t3',
        title: 'مرافقة فريق الوحدة والشركاء عند النزول وتوضيح أسباب التعثر إن وجدت',
        description: 'التواجد الميداني لشرح التحديات الجغرافية أو المجتمعية التي قد تؤخر التنفيذ.',
        completed: true,
        completedAt: '2026-06-12',
        notes: 'تمت مرافقة وفد وحدة التدخلات المركزية وشرح تحدي وعورة تضاريس الموقع.'
      },
      {
        id: 'p1_t4',
        title: 'إثبات ملكية المجتمع للمبادرة وضمان حماية المواد المخزنة',
        description: 'الحصول على تنازلات الأراضي وتوقيعات المجتمع والتزامهم بحراسة مخازن المواد.',
        completed: true,
        completedAt: '2026-06-11',
        notes: 'تم توقيع وثيقة إثبات ملكية المجتمع والتنازل عن الأرض وتخصيص مستودع آمن.'
      }
    ]
  },
  {
    id: 2,
    title: 'المسار الثاني: التفعيل التنموي وإدارة الشركاء',
    subtitle: 'الإدارة للميدان والتحفيز عبر الفرسان وجمع المساهمات',
    icon: 'Users',
    tasks: [
      {
        id: 'p2_t1',
        title: 'تولي إدارة المبادرة عملياً (تنظيماً وإشرافاً)',
        description: 'متابعة سير الأعمال اليومية، وتوزيع المهام بين المتطوعين، وضمان معايير السلامة والجودة.',
        completed: false,
        notes: 'تتم المتابعة اليومية من قبل الفارس المجتمعي بشكل دوري.'
      },
      {
        id: 'p2_t2',
        title: 'متابعة المساهمات المجتمعية وتوثيقها (نقدية وعينية)',
        description: 'تسجيل مساهمات المواطنين وتصنيفها نقدية أو عينية (مواد، عمالة، معدات).',
        completed: false
      },
      {
        id: 'p2_t3',
        title: 'التواصل الدائم مع المجتمع لضمان استمرارية العمل وتجاوز العراقيل',
        description: 'عقد لقاءات دورية لتبديد الشبهات أو حل أي نزاعات مجتمعية حول مسار المبادرة.',
        completed: true,
        completedAt: '2026-06-15',
        notes: 'تم عقد لقاء مع وجهاء المنطقة لضمان عدم توقف توريد المياه أثناء رصف الطريق.'
      }
    ]
  },
  {
    id: 3,
    title: 'المسار الثالث: الدعم والمعالجات والمناقلات وإدارة المواد المرتبطة بالمبادرة',
    subtitle: 'إدارة الدعم الفني والمالي والمناقلات وتأمين حماية واستلام المواد ميدانياً عبر الجمعية',
    icon: 'Truck',
    tasks: [
      {
        id: 'p3_t1',
        title: 'المساعدة في توفير وسائل النقل أو العمالة اللازمة لعملية النقل',
        description: 'توفير سيارات نقل مجتمعية لترحيل المواد والمناقلات بين مخازن الجمعية والموقع الجديد.',
        completed: false
      },
      {
        id: 'p3_t2',
        title: 'استلام المواد في الموقع الجديد والالتزام بجدول زمني للتنفيذ',
        description: 'توثيق عملية التوريد ومطابقتها مع بوالص الشحن والالتزام ببدء العمل مباشرة وفق المخطط الفني.',
        completed: false
      },
      {
        id: 'p3_t3',
        title: 'ضمان تخزين المواد في ظروف آمنة وفنية سليمة',
        description: 'حماية الإسمنت من الرطوبة، والحديد من الصدأ، ووقايتها من التلف الميداني أو العبث.',
        completed: true,
        completedAt: '2026-06-14',
        notes: 'تم تغطية مستودع الإسمنت بصفائح الزنك العازلة ورفعها عن الأرض بخشب سميك.'
      }
    ]
  },
  {
    id: 4,
    title: 'المسار الرابع: الإعلام التنموي والتحشيد المجتمعي',
    subtitle: 'التحشيد والتوثيق ونشر النماذج والقدوة المجتمعية المتميزة',
    icon: 'Megaphone',
    tasks: [
      {
        id: 'p4_t1',
        title: 'دعوة المجتمع للمشاركة في التوثيق وإظهار روح المبادرة والعمل الجماعي',
        description: 'حث المواطنين على تصوير بهجة العمل التشاركي ونشرها كرمز للعطاء الذاتي.',
        completed: false
      },
      {
        id: 'p4_t2',
        title: 'استخدام وسائل التواصل الاجتماعي لنشر أخبار إنجازات المبادرة والجمعية',
        description: 'كتابة ونشر تقارير مصورة وفيديوهات قصيرة على واتساب وفيسبوك لتعريف الداعمين بسير العمل.',
        completed: false
      },
      {
        id: 'p4_t3',
        title: 'إبراز دور المساهمات الذاتية للمواطنين ليكونوا قدوة لغيرهم من المديريات',
        description: 'إجراء لقاءات مع المبادرين الذين قدموا مساهمات سخية لإشعال حماس المناطق المجاورة.',
        completed: false
      }
    ]
  },
  {
    id: 5,
    title: 'المسار الخامس: الرقابة والتقييم ومطابقة الإنجاز بالنتائج',
    subtitle: 'الفرز والتحقق ومطابقة التقارير مع صور الإنجاز ومحاضر الاستلام',
    icon: 'ClipboardCheck',
    tasks: [
      {
        id: 'p5_t1',
        title: 'مطابقة التقارير الميدانية المرفوعة مع صور الإنجاز والفرز المكتبي المسبق',
        description: 'التحقق الإداري من تطابق الطول، العرض، المساحة، أو الكميات المستهلكة في الواقع مع البيانات المرفوعة من الممثل.',
        completed: false
      },
      {
        id: 'p5_t2',
        title: 'استخدام وسائل التواصل الخاصة بالجمعية لنشر الأنشطة والتدقيق المستمر لمخرجات المبادرات',
        description: 'نشر أرقام المصروفات والمنجزات السنوية لتعزيز مبدأ الشفافية والمكاشفة المالية والمجتمعية.',
        completed: false
      },
      {
        id: 'p5_t3',
        title: 'تنظيم وتنشيط اللجان المجتمعية في هذه الجمعيات لتقييم الأثر النهائي',
        description: 'تأهيل وتدريب اللجان لتقييم الأثر التنموي الفعلي وعدد الأسر المستفيدة بعد اكتمال المبادرة.',
        completed: false
      }
    ]
  }
];

const INITIATIVE_NAMES_LIST = [
  'مشروع رصف طريق الجشاعة بمحافظة إب',
  'مبادرة تأهيل وشق طريق وادي ضباء التاريخي',
  'مبادرة رصف وتوسعة طريق عقبة الصفة الجبلية',
  'مبادرة رصف وتثبيت جدران طريق قرية حبير الأثرية',
  'مبادرة رصف طريق الجعاشن - ذي شراق الرئيسي',
  'مبادرة رصف عقبة وادي خنوة الوعرة بمحافظة إب',
  'مبادرة تأهيل وصيانة طريق قرية الرونة والملعب الميداني',
  'مبادرة شق ورصف طريق عقبة الرامك التنموي',
  'مبادرة رصف طريق قرية عريب الأقمار بمحافظة إب',
  'مبادرة رصف وتوسعة طريق الرباط ومحيط المركز الصحي',
  'مبادرة شق ورصف طريق عقبة قحزة التشاركي',
  'مبادرة رصف طريق قرية وادي الجسر وتوسعة المنعطفات',
  'مبادرة رصف وتوسعة عقبة ذي عسل الوعرة بمحافظة إب',
  'مبادرة رصف وتأهيل طريق قرية الأكام السكنية الممتدة',
  'مبادرة رصف عقبة الكود بمحلة العشاش بمحافظة إب',
  'مبادرة شق ورصف طريق قرية الدخلة الزراعي لتأمين المحاصيل',
  'مبادرة رصف طريق جبل حجاج التنموي بمساهمة مجتمعية',
  'مبادرة رصف عقبة الجرين الوعرة بمحافظة إب القديمة',
  'مبادرة شق وتأهيل طريق وادي وراف الأوسط بمحافظة إب',
  'مبادرة رصف طريق قرية السيف والرباط الممتد',
  'مبادرة صيانة ورصف طريق قرية قبع الجبلية الوعرة',
  'مبادرة شق وتأهيل طريق عقبة الحبلة لفك الحصار عن الأهالي',
  'مبادرة رصف وتأهيل طريق المطبابة الأعلى والمنفذ الشمالي',
  'مبادرة رصف طريق وادي صرادة لربط القرى المعزولة بالمدينة',
  'مبادرة رصف وتوسعة طريق عقبة رماضة التنموي التكاملي',
  'مبادرة رصف عقبة حرد لتأمين وصول العائلات والخدمات',
  'مبادرة تأهيل وصيانة طريق القفلة الرابط بمحافظة إب الغربي',
  'مبادرة رصف طريق شعب البير ومصرف السيول لحماية المنازل',
  'مبادرة شق ورصف طريق بني عواض بالمحافظة لتسهيل النقل',
  'مبادرة رصف عقبة الجوازع وتثبيت الأكتاف الجانبية للطريق',
  'مبادرة شق وتأهيل طريق الخرابة والقرية الأثرية القديمة',
  'مبادرة رصف طريق عقبة الدعامة الميداني الرابط',
  'مبادرة رصف وتوسعة طريق قرية المعاين بمحافظة إب',
  'مبادرة رصف طريق عقبة ذي عقيب الجبلية وتأهيل ممرات المياه',
  'مبادرة رصف طريق وادي شراق الغربي لتسهيل وصول المزارعين',
  'مبادرة رصف طريق قرية ذي شراق القديمة ومقبرة البلدة',
  'مبادرة رصف وتثبيت جدران طريق محلة الجبيل والوادي',
  'مبادرة تأهيل ورصف طريق عقبة الخرابة الوعرة بمحافظة إب',
  'مبادرة رصف عقبة شعب الملح بمحافظة إب الحيوية',
  'مبادرة شق ورصف طريق الكسارة الرابط بمدينة القاعدة',
  'مبادرة رصف وتأهيل طريق قرية الرحبة لتسهيل مرور الشاحنات',
  'مبادرة شق ورصف طريق جبل الصفة الغربي والقرى النائية',
  'مبادرة رصف طريق عقبة حبير الشرقية لتأمين المرور الآمن',
  'مبادرة رصف وتوسعة طريق وادي الغول بمحافظة إب والقرى المجاورة',
  'مبادرة رصف طريق محلة الأكمة ووادي الجسر بمحافظة إب',
  'مبادرة رصف عقبة ذي أشرق وتأهيل مجاري مياه السيول',
  'مبادرة شق وتأهيل طريق جبل عريب الزراعي لخدمة الفلاحين',
  'مبادرة رصف طريق عقبة وادي السلام لتأمين حركة وسائل النقل'
];

const LOCAL_LEADERS = [
  'الشيخ منصور الجعاشني',
  'الحاج عبد القوي السفياني',
  'الشيخ يحيى حبير',
  'المستشار عادل السفياني',
  'المهندس أمين ضباء',
  'الشيخ طه غانم ذي شراق',
  'الشيخ صلاح عريب',
  'الحاج أحمد عبد الله الرباط',
  'الأستاذ مطهر الصفة',
  'الشيخ خالد خنوة',
  'المهندس صادق الرونة',
  'الحاج محمد عبده شقح'
];

const LOCAL_KNIGHTS = [
  'الفارس التنموي عبده صالح السفياني',
  'الفارس التنموي صادق الحبيشي',
  'الفارس التنموي عمار الرونة',
  'الفارس التنموي وسيم ذي شراق',
  'الفارس التنموي نجيب عريب',
  'الفارس التنموي زكريا الرباط',
  'الفارس التنموي محمد الصفة',
  'الفارس التنموي أنور خنوة',
  'الفارس التنموي جمال حبير',
  'الفارس التنموي رياض الجعاشني',
  'الفارس التنموي منير ضباء',
  'الفارس التنموي فؤاد شقح'
];

// Sub-districts and villages in Dhi As-Sufal for highly realistic seeding
const SUB_DISTRICTS_AND_VILLAGES = [
  { sub: 'حبير', village: 'قرية حبير العليا' },
  { sub: 'الجعاشن', village: 'قرية الجشاعة والوديان' },
  { sub: 'ضباء', village: 'قرية وادي ضباء التاريخية' },
  { sub: 'شراق', village: 'قرية ذي شراق القديمة' },
  { sub: 'خنوة', village: 'قرية خنوة العليا' },
  { sub: 'الرباط', village: 'قرية الرباط ومحلة الأكمة' },
  { sub: 'الصفة', village: 'قرية الصفة الجبلية' },
  { sub: 'الأشراف', village: 'محلة الأشراف السفلى' },
  { sub: 'الدخال', village: 'قرية الدخلة الزراعية' },
  { sub: 'ذي الحود', village: 'محلة ذي عسل وعقبة الرامك' }
];

// Helper to generate exactly 48 initiatives with highly realistic details for Ibb / Dhi As-Sufal
function generate48Initiatives(): Initiative[] {
  const generated: Initiative[] = [];

  for (let i = 0; i < 48; i++) {
    const id = `init_ibb_${i + 1}`;
    const initiativeNumber = `MUB-${(i + 1).toString().padStart(2, '0')}`;
    const locationData = SUB_DISTRICTS_AND_VILLAGES[i % SUB_DISTRICTS_AND_VILLAGES.length];
    
    // Distribute statuses according to user request:
    // 9 Completed, 14 Pending (Not started), 4 Stagnant (Impacted), and 21 Stopped (rest of 48 total)
    let status: Initiative['status'] = 'stopped';
    let ownerConfirmed = true;
    let stagnationReason: string | undefined = undefined;
    let completionRate = 0;

    if (i < 9) {
      status = 'completed';
      completionRate = 100;
    } else if (i >= 9 && i < 23) {
      status = 'pending';
      completionRate = 0;
      ownerConfirmed = i % 2 === 0; // some unconfirmed for pending
    } else if (i >= 23 && i < 27) {
      status = 'stagnant'; // متعثرة/متأثرة
      completionRate = 20 + (i % 15); // 20% to 35%
      stagnationReason = i === 23 
        ? 'نقص كميات الإسمنت المعتمدة للرصف، وحاجة لتوفير مساهمة مجتمعية إضافية لنقل الأحجار من القاعدة.'
        : i === 24
        ? 'تأخر وصول الدفعة الثانية من الأسمنت المقاوم للرطوبة نتيجة انقطاع طريق الإمداد الجبلي المؤقت.'
        : i === 25
        ? 'صعوبة وتضاريس جبلية قاسية للغاية تتطلب معدات شق وتوسعة المسار بحسب دراسة الفرز الفني.'
        : 'نزاع مجتمعي طفيف ومؤقت على مسار توسعة المنعطف وجاري حله بمساعي لجنة الوساطة والجمعية.';
    } else {
      status = 'stopped'; // متوقفة لأسباب تعثر المجتمع
      completionRate = 5 + (i % 10); // 5% to 15%
      // Generate realistic community stagnation reasons for the 21 stopped initiatives
      const reasonsList = [
        'توقف العمل بسبب تعثر جمع المساهمات النقدية المتفق عليها من الأهالي لتغطية تكاليف نقل الأحجار.',
        'توقف مؤقت لعدم توفر متطوعين من المجتمع المحلي بسبب انشغال الأهالي بموسم جني المحاصيل الزراعية.',
        'توقف العمل نتيجة صعوبة تأمين الالتزام المجتمعي لحراسة وحماية الأسمنت والمواد الموردة في موقع العمل الوعر.',
        'تعثر في توفير المياه اللازمة لخلط الخرسانة بسبب شح المياه المؤقت واعتذار أصحاب آبار المجتمع عن التوريد المجاني.',
        'توقف بسبب خلاف مجتمعي بين أهالي محلتين متجاورتين حول أولوية ومسار الرصف وجاري احتواء الخلاف من الجمعية.',
        'توقف العمل بسبب الحاجة لإصلاح وتوسعة العبارة المائية السفلية وحشد النواقص العينية من الحجارة البيضاء.'
      ];
      stagnationReason = reasonsList[(i - 27) % reasonsList.length];
    }

    // Set start & end dates
    const startDay = (1 + (i % 28)).toString().padStart(2, '0');
    const startDate = `2026-02-${startDay}`;
    const endDate = status === 'completed' ? `2026-05-${startDay}` : 'مستمر (غير مكتمل)';

    // Financial Values
    const communityContribution = 4000000 + (i * 450000) % 12000000; // 4 to 16 Million YER
    const unitContribution = 3000000 + (i * 350000) % 8000000; // 3 to 11 Million YER
    const cost = communityContribution + unitContribution; // Total Cost

    // Geographical coordinates (around Ibb, Dhi As-Sufal: Lat 13.8, Lng 44.1)
    const latOffset = (i * 0.0027 - 0.06).toFixed(4);
    const lngOffset = (i * 0.0031 - 0.05).toFixed(4);
    const coordinates = `13.${8245 + Math.round(parseFloat(latOffset) * 10000)}, 44.${1345 + Math.round(parseFloat(lngOffset) * 10000)}`;

    const name = INITIATIVE_NAMES_LIST[i] || `مبادرة رصف طريق بالمديرية رقم ${i + 1}`;

    // Set creation date
    const day = (10 + (i % 20)).toString().padStart(2, '0');
    const createdAt = `2026-05-${day}`;

    // Setup pathways based on status
    const pathways: Pathway[] = JSON.parse(JSON.stringify(DEFAULT_PATHWAYS_TEMPLATE));
    
    if (status === 'completed') {
      // Mark all tasks completed
      pathways.forEach(p => {
        p.tasks.forEach(t => {
          t.completed = true;
          t.completedAt = `2026-06-15`;
          t.notes = 'تم الإنجاز والتحقق الفني والمجتمعي بنجاح تام.';
        });
      });
    } else if ((status as string) === 'ongoing') {
      // Pathway 1 fully done, Pathway 2 partially, Pathway 3 partially, Pathway 4 & 5 pending
      pathways[0].tasks.forEach(t => {
        t.completed = true;
        t.completedAt = `2026-06-10`;
      });
      pathways[1].tasks[0].completed = true;
      pathways[1].tasks[0].notes = 'الفارس الميداني يتابع الحضور والمشاركة اليومية للمجتمع بنشاط كبير.';
      pathways[2].tasks[2].completed = true; // safe storage confirmed
    } else if (status === 'stagnant' || status === 'stopped') {
      // Pathway 1 done, Pathway 2 stalled
      pathways[0].tasks[0].completed = true;
      pathways[0].tasks[2].completed = true;
      pathways[1].tasks.forEach(t => {
        t.completed = false;
        t.notes = status === 'stopped'
          ? 'متوقف مؤقتاً بسبب الظروف الطبيعية أو الموسمية أو الإجراءات التنظيمية.'
          : 'متوقف حالياً بانتظار معالجة مشكلة التمويل والمواد.';
      });
    } else {
      // Pending: all false
      pathways.forEach(p => {
        p.tasks.forEach(t => {
          t.completed = false;
          t.completedAt = undefined;
          t.notes = 'قيد المراجعة وإجراء النزول الفني الأولي للتحقق.';
        });
      });
    }

    // Setup local committee
    const leaderName = LOCAL_LEADERS[i % LOCAL_LEADERS.length];
    const knightName = LOCAL_KNIGHTS[i % LOCAL_KNIGHTS.length];
    const committee: CommitteeMember[] = [
      {
        id: `com_${id}_1`,
        name: leaderName,
        role: 'leader',
        phone: `77${(1000000 + i * 12345) % 10000000}`,
        tasksAssigned: status === 'completed' ? 5 : 3
      },
      {
        id: `com_${id}_2`,
        name: knightName,
        role: 'knight',
        phone: `73${(2000000 + i * 54321) % 10000000}`,
        tasksAssigned: status === 'completed' ? 7 : 5
      },
      {
        id: `com_${id}_3`,
        name: `أمين سر اللجنة المجتمعية ${i + 1}`,
        role: 'auditor',
        phone: `71${(3000000 + i * 98765) % 10000000}`,
        tasksAssigned: 2
      }
    ];

    // Setup materials based on status
    const materials: Material[] = [];
    if (status !== 'pending') {
      materials.push({
        id: `mat_${id}_1`,
        name: 'أسمنت مقاوم للأملاح والبرطوبة (تسميد الخرسانة)',
        quantity: status === 'completed' ? 350 : 150,
        unit: 'كيس',
        status: status === 'stagnant' ? 'at_risk' : 'safe',
        storageLocation: `مخزن الوحدة بجوار مسجد قرية ${locationData.village}`,
        updatedAt: `2026-06-20`,
        notes: status === 'stagnant' ? 'الأسمنت مهدد بالرطوبة بسبب توقف الرصف وتأخر التغطية المناسبة.' : 'مخزن ومرفوع بشكل فني ممتاز.'
      });
      materials.push({
        id: `mat_${id}_2`,
        name: 'أحجار رصف جبلية صلبة ومجهة يدوياً',
        quantity: status === 'completed' ? 1200 : 450,
        unit: 'متر مربع',
        status: 'safe',
        storageLocation: 'موقع المبادرة مباشرة على جانبي الطريق الجاري رصفه',
        updatedAt: `2026-06-21`,
        notes: 'تم تجميع الأحجار بمساهمة عينية كاملة من أبناء المنطقة والمبادرين.'
      });
    }

    // Setup contributions based on status
    const contributions: Contribution[] = [];
    if (status !== 'pending') {
      contributions.push({
        id: `cont_${id}_1`,
        donorName: `مغتربو وأهالي المنطقة بمحلة ${locationData.village}`,
        type: 'cash',
        description: 'مساهمات نقدية لشراء أدوات الرصف، والديزل للمعدات، وتغذية العمال الميدانيين اليومية.',
        value: communityContribution * 0.4,
        date: `2026-05-${(12 + (i % 10)).toString().padStart(2, '0')}`
      });

      contributions.push({
        id: `cont_${id}_2`,
        donorName: 'فرسان الميدان ومتطوعو اللجنة المجتمعية',
        type: 'inkind_labor',
        description: 'مساهمة عينية بالعمل اليدوي ونقل المواد ورسم وقص الجبال لتسهيل حركة الرصف اليومية.',
        value: communityContribution * 0.6,
        date: `2026-05-${(15 + (i % 10)).toString().padStart(2, '0')}`
      });
    }

    // Setup field reports
    const reports: FieldReport[] = [];
    if (status === 'completed' || (status as string) === 'ongoing') {
      reports.push({
        id: `rep_${id}_1`,
        title: 'تقرير الفرز الفني والتحقق من المساهمة والأثر الميداني',
        date: `2026-06-15`,
        description: `تم النزول والتحقق الميداني من المبادرة. تم التأكد من رصف أجزاء حيوية من طريق عقبة ${locationData.village} بطول يتناسب مع المخطط الهندسي المعتمد للوحدة. هناك حماس مجتمعي منقطع النظير وتقدير كبير لدور الفرسان الميدانيين ومتابعة وحدة التدخلات بمحافظة إب.`,
        isMatchedWithDeskReview: true,
        status: status === 'completed' ? 'approved' : 'submitted',
        achievements: [
          'إتمام الفرز المكتبي والميداني ومطابقة الأبعاد والكميات بنسبة 100%.',
          'إثبات حيازة المواد وحمايتها في مخازن آمنة.'
        ],
        challenges: [
          'وعورة جغرافية وارتفاع حاد في منحدر الطريق يتطلب رصفاً مدعماً بكتل خرسانية جانبية.'
        ],
        imagePlaceholder: 'road_paving'
      });
    }

    generated.push({
      id,
      initiativeNumber,
      name,
      sector: 'الطرق',
      subDistrict: locationData.sub,
      village: locationData.village,
      coordinates,
      startDate,
      endDate,
      cost,
      communityContribution,
      unitContribution,
      completionRate,
      district: [
        'مديرية ذي السفال', 
        'مديرية السياني', 
        'مديرية جبلة', 
        'مديرية بعدان', 
        'مديرية السدة', 
        'مديرية يريم', 
        'مديرية حبيش', 
        'مديرية العدين', 
        'مديرية المخادر'
      ][i % 9],
      governorate: 'محافظة إب',
      status,
      stagnationReason,
      ownerConfirmed,
      createdAt,
      pathways,
      contributions,
      materials,
      committee,
      reports
    });
  }

  return generated;
}

function normalizeInitiativeQuantities(init: Initiative, idx: number): Initiative {
  if (
    init.materialsApproved !== undefined &&
    init.materialsDisbursed !== undefined &&
    init.dieselApproved !== undefined &&
    init.executionCostCompleted !== undefined &&
    init.cost !== undefined
  ) {
    // Preserve exact imported values from Google Sheets master dataset
    const totalDistance = init.totalDistance || parseFloat(((init.executedWorkQuantities?.lengthCompleted || 1000) / 1000).toFixed(2));
    const beneficiaries = init.beneficiaries || 1500;
    return {
      ...init,
      totalDistance,
      beneficiaries
    };
  }

  const parseVal = (v: any) => parseNum(v);
  const completionRate = typeof init.completionRate === 'number' ? init.completionRate : 0;
  const exec = init.executedWorkQuantities || {};
  const appr = init.approvedStudyQuantities || {};

  // Executed quantities from field
  const lengthCompleted = parseVal(exec.lengthCompleted) || (completionRate > 0 ? Math.round((init.cost || 5000000) / 12000) : 0);
  const avgWidth = parseVal(exec.avgWidth) || 6;
  const stonePavingExecuted = parseVal(exec.stonePaving) || (lengthCompleted > 0 ? lengthCompleted * avgWidth : 0);
  const concretePavingExecuted = parseVal(exec.concretePaving);
  const stoneMasonryExecuted = parseVal(exec.stoneMasonry);
  const excavationCutExecuted = parseVal(exec.excavationCut);
  const expansionExecuted = parseVal(exec.expansion);
  const gradingLevellingExecuted = parseVal(exec.gradingLevelling) || (lengthCompleted * avgWidth);

  // Compute Approved Study Quantities (Length in Meters)
  let approvedLength: number;
  if (appr.lengthCompleted && parseVal(appr.lengthCompleted) > 0) {
    approvedLength = parseVal(appr.lengthCompleted);
  } else if (init.totalDistance && init.totalDistance > 0) {
    approvedLength = init.totalDistance > 50 ? Math.round(init.totalDistance) : Math.round(init.totalDistance * 1000);
  } else if (lengthCompleted > 0) {
    approvedLength = completionRate > 0 && completionRate < 100 
      ? Math.max(lengthCompleted, Math.round(lengthCompleted / (completionRate / 100)))
      : lengthCompleted;
  } else {
    approvedLength = Math.round((init.cost || 6000000) / 7500) || 800;
  }

  const approvedWidth = parseVal(appr.avgWidth) || avgWidth;
  const approvedStonePaving = parseVal(appr.stonePaving) || (approvedLength * approvedWidth);
  const approvedConcretePaving = parseVal(appr.concretePaving) || (concretePavingExecuted > 0 ? Math.round(concretePavingExecuted / Math.max(0.1, completionRate / 100)) : 0);
  const approvedStoneMasonry = parseVal(appr.stoneMasonry) || (stoneMasonryExecuted > 0 ? Math.round(stoneMasonryExecuted / Math.max(0.1, completionRate / 100)) : Math.round(approvedLength * 0.15));
  const approvedExcavationCut = parseVal(appr.excavationCut) || (excavationCutExecuted > 0 ? Math.round(excavationCutExecuted / Math.max(0.1, completionRate / 100)) : Math.round(approvedLength * 1.2));
  const approvedExpansion = parseVal(appr.expansion) || (expansionExecuted > 0 ? Math.round(expansionExecuted / Math.max(0.1, completionRate / 100)) : 0);
  const approvedGradingLevelling = parseVal(appr.gradingLevelling) || (approvedLength * approvedWidth * 1.1);

  const approvedStudyQuantities: TechnicalWorkQuantities = {
    avgWidth: approvedWidth,
    lengthCompleted: approvedLength,
    stonePaving: approvedStonePaving,
    concretePaving: approvedConcretePaving,
    stoneMasonry: approvedStoneMasonry,
    excavationCut: approvedExcavationCut,
    expansion: approvedExpansion,
    gradingLevelling: approvedGradingLevelling
  };

  const executedWorkQuantities: TechnicalWorkQuantities = {
    avgWidth,
    lengthCompleted,
    stonePaving: stonePavingExecuted,
    concretePaving: concretePavingExecuted,
    stoneMasonry: stoneMasonryExecuted,
    excavationCut: excavationCutExecuted,
    expansion: expansionExecuted,
    gradingLevelling: gradingLevellingExecuted
  };

  // Distance in Km
  const totalDistance = parseFloat((approvedLength / 1000).toFixed(2));

  // Beneficiaries / Population
  const beneficiaries = init.beneficiaries && init.beneficiaries > 0 
    ? init.beneficiaries 
    : Math.round(1200 + (idx % 10) * 450 + Math.min(5000, Math.floor((init.cost || 5000000) / 300000)));

  // Cost comparison
  const cost = init.cost || init.estimatedCost || 5000000;
  let executionCostCompleted = init.executionCostCompleted;
  if (!executionCostCompleted || executionCostCompleted === cost) {
    if (completionRate === 100) {
      executionCostCompleted = cost;
    } else if (completionRate > 0) {
      executionCostCompleted = Math.round(cost * (completionRate / 100));
    } else {
      executionCostCompleted = 0;
    }
  }

  // CEMENT (materials): Approved vs Disbursed vs Used vs Remaining (Disbursed - Used)
  const cementApprNum = parseVal(init.materialsApproved) || Math.max(100, Math.round((approvedStonePaving || approvedLength * approvedWidth || 1000) / 3.5));
  let cementDisbursedNum = parseVal(init.materialsDisbursed);
  if (cementDisbursedNum <= 0) {
    if (completionRate === 100) cementDisbursedNum = cementApprNum;
    else if (completionRate > 0) cementDisbursedNum = Math.min(cementApprNum, Math.round(cementApprNum * Math.max(0.4, (completionRate + 25) / 100)));
    else cementDisbursedNum = Math.round(cementApprNum * 0.3);
  }
  let cementUsedNum = parseVal(init.materialsUsed);
  if (cementUsedNum <= 0) {
    cementUsedNum = Math.min(cementDisbursedNum, Math.round(cementApprNum * (completionRate / 100)));
  } else {
    cementUsedNum = Math.min(cementDisbursedNum, cementUsedNum);
  }

  const cementRemainingNum = Math.max(0, cementDisbursedNum - cementUsedNum);

  const materialsApproved = `${cementApprNum} كيس`;
  const materialsDisbursed = `${cementDisbursedNum} كيس`;
  const materialsUsed = `${cementUsedNum} كيس`;
  const materialsRemaining = `${cementRemainingNum} كيس`;

  // DIESEL: Approved vs Disbursed vs Used vs Remaining (Disbursed - Used)
  const dieselApprNum = parseVal(init.dieselApproved) || Math.max(200, Math.round(approvedLength * 2.5));
  let dieselDisbursedNum = parseVal(init.dieselDisbursed);
  if (dieselDisbursedNum <= 0) {
    if (completionRate === 100) dieselDisbursedNum = dieselApprNum;
    else if (completionRate > 0) dieselDisbursedNum = Math.min(dieselApprNum, Math.round(dieselApprNum * Math.max(0.4, (completionRate + 25) / 100)));
    else dieselDisbursedNum = Math.round(dieselApprNum * 0.3);
  }
  let dieselUsedNum = parseVal(init.dieselUsed);
  if (dieselUsedNum <= 0) {
    dieselUsedNum = Math.min(dieselDisbursedNum, Math.round(dieselApprNum * (completionRate / 100)));
  } else {
    dieselUsedNum = Math.min(dieselDisbursedNum, dieselUsedNum);
  }

  const dieselRemainingNum = Math.max(0, dieselDisbursedNum - dieselUsedNum);

  const dieselApproved = `${dieselApprNum} لتر`;
  const dieselDisbursed = `${dieselDisbursedNum} لتر`;
  const dieselUsed = `${dieselUsedNum} لتر`;
  const dieselRemaining = `${dieselRemainingNum} لتر`;

  return {
    ...init,
    cost,
    totalDistance,
    beneficiaries,
    executionCostCompleted,
    approvedStudyQuantities,
    executedWorkQuantities,
    materialsApproved,
    materialsDisbursed,
    materialsUsed,
    materialsRemaining,
    dieselApproved,
    dieselDisbursed,
    dieselUsed,
    dieselRemaining
  };
}

export function generateExpandedInitiatives(baseList: Initiative[]): Initiative[] {
  return baseList.map((item, idx) => normalizeInitiativeQuantities(item, idx));
}

/*
function _legacyDataGenerator() {
  const districts = [
    'مديرية السياني',
    'مديرية جبلة',
    'مديرية بعدان',
    'مديرية السدة',
    'مديرية يريم',
    'مديرية المخادر',
    'مديرية حبيش',
    'مديرية حزم العدين',
    'مديرية الرضمة',
    'مديرية القفر',
    'مديرية العدين'
  ];

  const subDistrictsMap: Record<string, string[]> = {
    'مديرية ذي السفال': ['شوائط', 'الجعاشن', 'بلاد الشعيبي', 'الصفة', 'الجول', 'خنوة', 'وادي ضباء'],
    'مديرية السياني': ['بلاد المليكي', 'حاضر', 'عرقان', 'الهادس', 'الأوعار'],
    'مديرية جبلة': ['جبلة', 'المعشار', 'الربع', 'وراف', 'بني شهاب'],
    'مديرية بعدان': ['بني منصور', 'بلاد الجماعي', 'دلال', 'العنسيين', 'الشعر'],
    'مديرية السدة': ['السدة', 'ظفار', 'بني الحارث', 'جبل عصام', 'التويتي'],
    'مديرية يريم': ['كحلان', 'عبيدة', 'الرضائي', 'يريّم المدينة', 'بلاد يريم'],
    'مديرية المخادر': ['المخادر', 'بني سرحة', 'الشرف', 'السحول', 'بني مبارز'],
    'مديرية حبيش': ['حبيش', 'بني شبيب', 'الظهار', 'سطح', 'بني معين'],
    'مديرية حزم العدين': ['حزم العدين', 'بني سليمان', 'الاسلوم', 'جبل خضراء', 'الأبعون'],
    'مديرية الرضمة': ['الرضمة', 'كحلان الرضمة', 'بني قيس', 'شيزر', 'شيزر العليا'],
    'مديرية القفر': ['بني سيف', 'مخلاف القفر', 'بني مسلم', 'رباط القفر', 'بني سبأ'],
    'مديرية العدين': ['العدين', 'بني زهير', 'قصع حليمة', 'شلف', 'بني عبدالله']
  };

  const villageNames = [
    'حمرة', 'بيت احمد منصور', 'الجفيين', 'عرامة', 'بحرانة', 'الشاهد', 'قبنة', 'ممسى الفاش',
    'حاضر', 'العداني', 'بني عبدالله', 'ريد', 'الكباب', 'شعب المعموق', 'جرانع', 'المنزل',
    'خرابة', 'سوق الأحد', 'المحلات', 'القبع', 'وادي الملح', 'المعاين', 'المحواش', 'الحضيرة',
    'الزبور', 'الصفى', 'الجاهلي', 'المصنعة', 'القلعة', 'الحصن', 'الجبجبي', 'شعب الماء'
  ];

  const roadProjectTemplates = [
    'رصف طريق عقبة {village}',
    'شق وتوسعة طريق قرية {village} الرابط',
    'بناء جدران ساندة لحماية طريق عقبة {village}',
    'استكمال رصف طريق عقبة {village} المرحلة الثانية',
    'رصف وتأهيل عقبة {village} لتفادي انزلاق المركبات',
    'مسح وشق طريق محلة {village} الوعر',
    'رصف طريق عقبة {village} الرئيسية',
    'بناء قنوات تصريف المياه وحماية طريق {village}'
  ];

  const leaders = [
    'الشيخ سفيان عبد القوي', 'الأستاذ عبده صالح', 'الحاج منصور الشرفي', 
    'المهندس أمين حبير', 'المستشار عادل الرونة', 'الشيخ حميد عبدالوهاب', 
    'الأستاذ عبدالملك الجعاشني', 'الحاج علي منصور القادري'
  ];

  const knights = [
    'عمار الرونة', 'رياض الصفة', 'صادق خنوة', 'وسيم شراق', 
    'نجيب الجعاشني', 'م. عيسى القادري', 'عبدالرحمن حبير', 'جميل القادري'
  ];

  let idx = result.length;
  while (result.length < TARGET_COUNT) {
    const district = districts[idx % districts.length];
    const subs = subDistrictsMap[district] || ['العزلة العامة'];
    const subDistrict = subs[idx % subs.length];
    const village = villageNames[(idx + 13) % villageNames.length];
    const leaderName = leaders[idx % leaders.length];
    const knightName = knights[idx % knights.length];
    
    // Status distribution: ~45% completed, ~35% ongoing, ~12% stagnant, ~4% stopped, ~4% pending
    let status: 'completed' | 'ongoing' | 'stagnant' | 'stopped' | 'pending' = 'ongoing';
    const rand = (idx * 17 + 31) % 100;
    if (rand < 45) {
      status = 'completed';
    } else if (rand < 80) {
      status = 'ongoing';
    } else if (rand < 92) {
      status = 'stagnant';
    } else if (rand < 96) {
      status = 'stopped';
    } else {
      status = 'pending';
    }

    let completionRate = 0;
    if (status === 'completed') completionRate = 100;
    else if (status === 'ongoing') completionRate = 20 + ((idx * 7) % 75);
    else if (status === 'stagnant') completionRate = 5 + ((idx * 3) % 35);
    else if (status === 'stopped') completionRate = 10 + ((idx * 9) % 40);

    const cost = 12000000 + ((idx * 154321) % 48000000);
    const unitContribution = Math.round(cost * (0.4 + ((idx * 3) % 15) / 100));
    const communityContribution = cost - unitContribution;

    const coordinates = `${(13.8 + (idx % 150) * 0.0015).toFixed(6)}, ${(44.0 + (idx % 120) * 0.0018).toFixed(6)}`;
    
    const nameTemplate = roadProjectTemplates[idx % roadProjectTemplates.length];
    const name = nameTemplate.replace('{village}', village);

    const mVal = `${idx + 1}`;

    const materials: Material[] = [
      {
        id: `mat_sheet_${mVal}_cement`,
        name: 'أسمنت مقاوم للأملاح والبرطوبة (تسميد الخرسانة)',
        quantity: Math.round(unitContribution / 7200) || 120,
        unit: 'كيس',
        status: status === 'stagnant' ? 'at_risk' : 'safe',
        storageLocation: `مخزن مبادرة ${village} بعزلة ${subDistrict}`,
        updatedAt: '٢٠٢٦-٠٦-٣٠',
        notes: status === 'stagnant' ? 'الأسمنت مهدد بالرطوبة بسبب التوقف المؤقت للعمل.' : 'مخزن بطريقة فنية سليمة.'
      }
    ];

    const committee: CommitteeMember[] = [
      { id: `com_sheet_${mVal}_1`, name: leaderName, role: 'leader', phone: `77${Math.floor(1000000 + idx * 45213) % 10000000}`, tasksAssigned: status === 'completed' ? 5 : 3 },
      { id: `com_sheet_${mVal}_2`, name: knightName, role: 'knight', phone: `73${Math.floor(2000000 + idx * 85412) % 10000000}`, tasksAssigned: status === 'completed' ? 7 : 5 },
      { id: `com_sheet_${mVal}_3`, name: `أمين الصندوق قرية ${village}`, role: 'member', phone: `71${Math.floor(3000000 + idx * 12345) % 10000000}`, tasksAssigned: 2 }
    ];

    const contributions: Contribution[] = [
      {
        id: `cont_sheet_${mVal}_1`,
        donorName: 'أهالي المنطقة والمغتربين الأوفياء',
        type: 'cash',
        description: 'مساهمات مالية مجتمعية لشراء أحجار ومياه ومستلزمات خرسانية.',
        value: communityContribution,
        date: '٢٠٢٦-٠٥-١٠'
      }
    ];

    const pathways: Pathway[] = [
      {
        id: 1,
        title: 'المسار الأول: التشخيص والفرز الفني والأثر التنموي',
        subtitle: 'التوثيق والتحقق المجتمعي وضمان حماية المواد وتحديد التعثر',
        icon: 'Search',
        tasks: [
          {
            id: `p1_t1_${mVal}`,
            title: 'التوثيق والتحقق المجتمعي وتنظيم اللجان الخاصة بالمبادرة',
            description: 'تشكيل اللجان والتحقق من احتياج المجتمع ومواقع التنفيذ ومطابقتها للمعايير.',
            completed: status !== 'pending',
            completedAt: status !== 'pending' ? '٢٠٢٦-٠٤-١٠' : undefined,
            notes: 'تم التحقق وتوقيع محاضر النزول الفني بنجاح.'
          },
          {
            id: `p1_t2_${mVal}`,
            title: 'توفير الوثائق والمستندات الخاصة باستلام واستهلاك المواد ميدانياً',
            description: 'تجهيز السجلات الميدانية لمتابعة صرف الأسمنت والحديد والمواد الأخرى ومطابقتها.',
            completed: status === 'completed' || status === 'ongoing',
            notes: status === 'completed' || status === 'ongoing' ? `تم استلام وتوثيق المواد بسجل الفرسان.` : 'في انتظار توريد الدفعة الأولى.'
          }
        ]
      },
      {
        id: 2,
        title: 'المسار الثاني: التفعيل التنموي وإدارة الشركاء',
        subtitle: 'الإدارة للميدان والتحفيز عبر الفرسان وجمع المساهمات',
        icon: 'Users',
        tasks: [
          {
            id: `p2_t1_${mVal}`,
            title: 'تولي إدارة المبادرة عملياً (تنظيماً وإشرافاً)',
            description: 'متابعة سير الأعمال اليومية، وتوزيع المهام بين المتطوعين، وضمان معايير السلامة والجودة.',
            completed: status === 'completed' || status === 'ongoing',
            notes: 'اللجنة المجتمعية تباشر أعمال الإشراف اليومي والميداني.'
          },
          {
            id: `p2_t2_${mVal}`,
            title: 'متابعة المساهمات المجتمعية وتوثيقها (نقدية وعينية)',
            description: 'تسجيل مساهمات المواطنين وتصنيفها نقدية أو عينية.',
            completed: true,
            notes: `تم رصد مساهمات الأهالي والمغتربين المقدرة بـ ${communityContribution.toLocaleString()} ريال بنجاح.`
          }
        ]
      }
    ];

    const reports: FieldReport[] = [];
    if (status === 'completed' || status === 'ongoing') {
      reports.push({
        id: `rep_sheet_${mVal}_1`,
        title: 'تقرير التحقق والفرز الفني والميداني المعتمد',
        date: '٢٠٢٦-٠٦-٢٠',
        description: `تم النزول الميداني والتحقق الفني والمكتبي لمبادرة (${name}) بعزلة ${subDistrict}. تم التحقق من سلامة تنفيذ الأعمال الفنية الخرسانية بالأبعاد والكميات المطابقة للشروط الهندسية لوحدة التدخلات، ونشيد بروح المبادرة للأهالي والفرسان.`,
        isMatchedWithDeskReview: true,
        status: status === 'completed' ? 'approved' : 'submitted',
        achievements: [
          'مطابقة الأطوال والأعمال المنفذة على أرض الواقع بنسبة ١٠٠%.',
          'التحقق من سلامة مخازن ومستودعات المواد وحمايتها من الرطوبة والسيول.'
        ],
        challenges: [
          'الانحدار الشديد للعقبات الجبلية الذي يتطلب جدراناً ساندة خرسانية لتفادي انزلاق الأحجار.'
        ],
        imagePlaceholder: 'road_paving'
      });
    }

    result.push({
      id: `sheet-${mVal}`,
      initiativeNumber: mVal,
      name,
      sector: 'الطرق',
      subDistrict,
      village,
      coordinates,
      startDate: '٢٠٢٦-٠١-٠١',
      endDate: status === 'completed' ? '٢٠٢٦-٥-١٥' : 'مستمر (غير مكتمل)',
      cost,
      communityContribution,
      unitContribution,
      completionRate,
      district,
      governorate: 'محافظة إب',
      status,
      stagnationReason: status === 'stagnant' ? 'توقف العمل مؤقتاً بانتظار استكمال جمع المساهمات لنقل الأحجار وتأمين أجرة العمال والمعدات.' : undefined,
      ownerConfirmed: true,
      pathways,
      contributions,
      materials,
      committee,
      reports,
      createdAt: '٢٠٢٦-٠٥-٠١'
    });
    idx++;
  }

  return [];
}
*/

export const INITIAL_INITIATIVES: Initiative[] = generateExpandedInitiatives(IMPORTED_SHEETS_INITIATIVES);

export const DISTRICTS_LIST = [
  'مديرية ذي السفال',
  'مديرية السياني',
  'مديرية جبلة',
  'مديرية بعدان',
  'مديرية السدة',
  'مديرية يريم',
  'مديرية المخادر',
  'مديرية حبيش',
  'مديرية حزم العدين',
  'مديرية الرضمة',
  'مديرية القفر',
  'مديرية العدين',
  'مديرية ريف إب',
  'مديرية الظهار',
  'مديرية المشنة',
  'مديرية السبرة',
  'مديرية الشعر',
  'مديرية النادرة',
  'مديرية فرع العدين',
  'مديرية مذيخرة'
];

export const GOVERNORATES_LIST = [
  'محافظة إب'
];
