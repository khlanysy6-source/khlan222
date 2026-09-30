/**
 * EXECUTION-03 — Closure Engine
 * State machine managing governance profile transitions and enforcing evidence-backed closure criteria.
 */

import { Initiative } from '../types';
import { GovernanceStatus, Intervention, ExpectedOutcome, Impact, RootCause } from './types';
import { PriorityLevel } from '../intelligence/types';

export function deriveGovernanceStatusAndEscalation(
  initiative: Initiative,
  priority: PriorityLevel,
  impact: Impact,
  rootCause: RootCause,
  intervention: Intervention,
  expectedOutcome: ExpectedOutcome
): {
  governanceStatus: GovernanceStatus;
  decisionRequired: boolean;
  escalationRequired: boolean;
  closureCondition: string;
} {
  const statusStr: string = (initiative.status as string) || 'unknown';
  const completion = initiative.completionRate ?? 0;
  const isStagnant = statusStr === 'stagnant' || statusStr === 'stopped';

  let decisionRequired = false;
  let escalationRequired = false;
  let governanceStatus: GovernanceStatus = 'OBSERVED';

  // Check escalation conditions
  if (isStagnant && (impact.level === 'CRITICAL' || rootCause.category === 'Supply' && completion > 0)) {
    escalationRequired = true;
  }

  if (statusStr === 'completed') {
    governanceStatus = 'CLOSED';
    decisionRequired = false;
    escalationRequired = false;
  } else if (isStagnant) {
    if (escalationRequired) {
      governanceStatus = 'ESCALATED';
      decisionRequired = true;
    } else {
      governanceStatus = 'DECISION_REQUIRED';
      decisionRequired = true;
    }
  } else if (statusStr === 'ongoing') {
    if (completion >= 85) {
      governanceStatus = 'DECISION_REQUIRED'; // Needs sign-off / completion closure
      decisionRequired = true;
    } else {
      governanceStatus = 'IN_PROGRESS';
      decisionRequired = false;
    }
  } else if (statusStr === 'pending' || statusStr === 'not_started') {
    governanceStatus = 'ASSESSED';
    decisionRequired = true;
  } else {
    governanceStatus = 'OBSERVED';
    decisionRequired = false;
  }

  const closureCondition = expectedOutcome.closureCriteria;

  return {
    governanceStatus,
    decisionRequired,
    escalationRequired,
    closureCondition,
  };
}
