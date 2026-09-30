/**
 * Schema and Type Definitions for Ibb Community Road Initiatives
 * Institutional Standards - Clean SSoT Model
 */

import {
  Initiative,
  Pathway,
  Task,
  Contribution,
  Material,
  CommitteeMember,
  FieldReport,
  TechnicalWorkQuantities,
  ExecutiveDecisionData,
  MonitoringLogEntry,
  InitiativeLifecycleStage,
  InitiativeDecisionCategory,
  InitiativeEvaluation
} from '../types';

export type DataSourceTag = 'source' | 'calculated' | 'default';

export interface FieldWithProvenance<T> {
  value: T;
  source: DataSourceTag;
  provenanceNote?: string;
}

export interface ValidatedInitiativeRecord extends Initiative {
  _dataSource?: DataSourceTag;
  _validatedAt?: string;
}

export type {
  Initiative,
  Pathway,
  Task,
  Contribution,
  Material,
  CommitteeMember,
  FieldReport,
  TechnicalWorkQuantities,
  ExecutiveDecisionData,
  MonitoringLogEntry,
  InitiativeLifecycleStage,
  InitiativeDecisionCategory,
  InitiativeEvaluation
};
