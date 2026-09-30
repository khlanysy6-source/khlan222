export type FormSource = 'master' | 'derived' | 'manual';
export type FormDef = {
  id: string;
  number: string;
  title: string;
  sheet: string;
  stage: string;
  source: FormSource;
  description: string;
  roles: string[];
  autoFill: boolean;
};

const OPERATIONAL_ROLES = ['central_unit','admin','engineer_inspector','district_director','cooperative_association'];

export const FORM_REGISTRY: FormDef[] = [
  {id:'diagnosis',number:'1',title:'استمارة التشخيص',sheet:'استمارة التشخيص',stage:'التشخيص',source:'master',autoFill:true,description:'التشخيص الفني والوضع الراهن وجرد العهدة العينية.',roles:OPERATIONAL_ROLES},
  {id:'readiness',number:'2',title:'استمارة فحص الجاهزية',sheet:'استمارة فحص الجاهزية',stage:'فحص الجاهزية',source:'master',autoFill:true,description:'فحص الجاهزية والموانع والاحتياج العيني قبل الصرف.',roles:OPERATIONAL_ROLES},
  {id:'completion',number:'3',title:'استمارة تقرير الإنجاز النهائي',sheet:'استمارة تقرير الانجاز النهائي',stage:'الإنجاز',source:'derived',autoFill:true,description:'مطابقة الإنجاز الفني وتصفية الدعم العيني وإغلاق الملف.',roles:['central_unit','admin','engineer_inspector']},
  {id:'transfer',number:'4',title:'محضر مناقلة واستلام',sheet:'محضر مناقلة واستلام',stage:'الاستلام والمناقلة',source:'master',autoFill:true,description:'توثيق مناقلة العهدة العينية بين مبادرة وأخرى.',roles:['central_unit','admin','district_director']},
  {id:'notice',number:'5',title:'إخطار وإشعار اللجنة المجتمعية',sheet:'إخطار وإشعار اللجنة المجتمعية ',stage:'القرار والإخطار',source:'derived',autoFill:true,description:'إخطار اللجنة بمخرج القرار والمهلة والإجراء المطلوب.',roles:['central_unit','admin','district_director']},
  {id:'daily',number:'6',title:'التقرير اليومي للممثل والشركاء',sheet:'التقرير اليومي للممثل والشركاء',stage:'المتابعة الميدانية',source:'derived',autoFill:true,description:'تجميع النزولات والإجراءات والمخرجات اليومية.',roles:OPERATIONAL_ROLES},
  {id:'launch_governorate',number:'7',title:'محضر تدشين العمل — المحافظة',sheet:'محضر تدشين العمل محافظة',stage:'التدشين',source:'master',autoFill:true,description:'القالب المؤسسي لمحضر التدشين على مستوى المحافظة.',roles:['central_unit','admin']},
  {id:'launch_district',number:'8',title:'محضر تدشين العمل — المديرية',sheet:'محضر تدشين العمل مديرية',stage:'التدشين',source:'master',autoFill:true,description:'القالب المؤسسي لمحضر التدشين ومسارات التحرك في المديرية.',roles:['central_unit','admin','district_director']},
  {id:'logistics',number:'9',title:'خطة الاحتياج والدعم اللوجستي الفوري',sheet:'الاحتياج والدعم اللوجستي الفوري',stage:'الاحتياج والدعم',source:'derived',autoFill:true,description:'تجميع الاحتياج من الديزل والإسمنت وفق السجل المعتمد.',roles:['central_unit','admin','engineer_inspector']},
  {id:'weekly',number:'10',title:'التقرير التجميعي الأسبوعي للمنسق',sheet:'التقرير التجميعي الاسبوعي للمنس',stage:'التقارير',source:'derived',autoFill:true,description:'رفع أسبوعي تجميعي من نتائج المتابعة الميدانية.',roles:['central_unit','admin']},
  {id:'daily_coordinator',number:'11',title:'التقرير اليومي للممثل والمنسق',sheet:'التقرير اليومي للممثل والمنسق ',stage:'التقارير',source:'derived',autoFill:true,description:'تقرير داخلي للممثل والمنسق وفريق المتابعة.',roles:['central_unit','admin','district_director']},
];

export const FORM_LIFECYCLE = ['السجل الأساسي','التشخيص','فحص الجاهزية','القرار','الاحتياج والدعم','التنفيذ والمتابعة','الإنجاز','الاستلام','الأرشيف','التقارير'];

export function getRecommendedFormIds(status: string): string[] {
  switch (status) {
    case 'stagnant': case 'stopped': return ['diagnosis','notice','transfer','readiness','logistics'];
    case 'pending': return ['diagnosis','readiness'];
    case 'ongoing': return ['daily','readiness','logistics'];
    case 'completed': return ['completion','daily'];
    default: return ['diagnosis','readiness','daily'];
  }
}
