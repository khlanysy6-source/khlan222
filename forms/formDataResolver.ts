import { Initiative } from '../types';
import { materialLedgerTransactions } from '../data/materialLedgers';
const n=(v:any)=>v===undefined||v===null?'':String(v);
const num=(v:any)=>typeof v==='number'?v:(v?Number(String(v).replace(/,/g,''))||0:0);
export function resolveFormData(init: Initiative){
 const tx=materialLedgerTransactions.filter(t=>t.initiativeId===init.id);
 const cementTx=tx.filter(t=>t.kind==='cement'); const dieselTx=tx.filter(t=>t.kind==='diesel');
 const sum=(xs:any[],k:string)=>xs.reduce((a,x)=>a+(Number(x[k])||0),0);
 const ledger={transactions:tx,cement:{rows:cementTx.length,incoming:sum(cementTx,'incomingQty'),outgoing:sum(cementTx,'outgoingQty'),lastBalance:cementTx.length?Number(cementTx[cementTx.length-1].balanceQty)||0:0},diesel:{rows:dieselTx.length,incoming:sum(dieselTx,'incomingQty'),outgoing:sum(dieselTx,'outgoingQty'),lastBalance:dieselTx.length?Number(dieselTx[dieselTx.length-1].balanceQty)||0:0}};

 const coordinateParts=n(init.coordinates).split(',').map(v=>v.trim());
 const northing=coordinateParts[0]||'';
 const easting=coordinateParts[1]||'';
 const q=init.approvedStudyQuantities||{}; const e=init.executedWorkQuantities||{};
 return {
  number:n(init.initiativeNumber), name:n(init.name), governorate:n(init.governorate||'إب'), district:n(init.district), subDistrict:n(init.subDistrict), village:n(init.village), coordinates:n(init.coordinates), northing, easting,
  status:n(init.status), completion:num(init.completionRate), cost:num(init.cost), community:num(init.communityContribution), unit:num(init.unitContribution), delivered:num(init.deliveredUnitContribution),
  beneficiaries:num(init.beneficiaries), startDate:n(init.startDate), endDate:n(init.endDate), notes:n(init.notes||init.stagnationReason),
  ownerConfirmed:init.ownerConfirmed?'نعم':'غير موثق', materialsApproved:n(init.materialsApproved), materialsDisbursed:n(init.materialsDisbursed), materialsUsed:n(init.materialsUsed), materialsRemaining:n(init.materialsRemaining),
  dieselApproved:n(init.dieselApproved), dieselDisbursed:n(init.dieselDisbursed), dieselUsed:n(init.dieselUsed), dieselRemaining:n(init.dieselRemaining),
  approved:q, executed:e, updatedAt:n(init.updatedAt||init.createdAt),
  approvedLength:num(q.lengthCompleted), approvedExcavation:num(q.excavationCut), approvedExpansion:num(q.expansion), approvedGrading:num(q.gradingLevelling), approvedStonePaving:num(q.stonePaving), approvedConcretePaving:num(q.concretePaving), approvedStoneMasonry:num(q.stoneMasonry),
  executedLength:num(e.lengthCompleted), executedExcavation:num(e.excavationCut), executedExpansion:num(e.expansion), executedGrading:num(e.gradingLevelling), executedStonePaving:num(e.stonePaving), executedConcretePaving:num(e.concretePaving), executedStoneMasonry:num(e.stoneMasonry),
  materialsList:Array.isArray(init.materials)?init.materials:[], reports:Array.isArray(init.reports)?init.reports:[], monitoring:Array.isArray(init.monitoringTimeline)?init.monitoringTimeline:[], evaluation:init.evaluation||null, decision:init.executiveDecision||null, ledger
 };
}
