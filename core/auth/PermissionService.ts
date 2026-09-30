/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Initiative, UserRole, RolePermissions } from '../../types';
import { EnterpriseRole, DataScope } from './types';
import { RoleService } from './RoleService';
import { hasTabAccess, hasActionPermission, TabId } from '../../permissions';
import { InstitutionalPermissionMatrixService, InstitutionalModule, InstitutionalAction } from './InstitutionalPermissionMatrix';
import { AuthorizationService } from './AuthorizationService';

export class PermissionService {
  /**
   * Check if a role has access to a specific UI Tab
   */
  static hasTabAccess(role: EnterpriseRole | UserRole, tabId: string): boolean {
    const uiRole = RoleService.toUIRole(role);
    return hasTabAccess(uiRole, tabId as TabId);
  }

  /**
   * Check functional permission for UI presentation
   */
  static hasPermission(role: EnterpriseRole | UserRole, permissionKey: keyof RolePermissions): boolean {
    const uiRole = RoleService.toUIRole(role);
    return hasActionPermission(uiRole, permissionKey);
  }

  /**
   * Check institutional matrix permission
   */
  static checkInstitutionalPermission(
    role: EnterpriseRole | UserRole,
    module: InstitutionalModule,
    action: InstitutionalAction
  ) {
    const eRole = RoleService.toEnterpriseRole(role);
    return InstitutionalPermissionMatrixService.checkPermission(eRole, module, action);
  }

  /**
   * Checks if user can edit a specific initiative based on Role + Scope
   */
  static canEditInitiative(
    role: EnterpriseRole | UserRole,
    scope: DataScope,
    initiative?: Initiative
  ): boolean {
    const eRole = RoleService.toEnterpriseRole(role);
    if (eRole === 'VISITOR') return false;

    // Check Institutional Permission Matrix first
    const permRule = InstitutionalPermissionMatrixService.checkPermission(eRole, 'initiatives', 'update');
    if (!permRule.allowed) return false;

    if (!initiative) return true;

    // Scope verification
    return AuthorizationService.isInitiativeInScope(initiative, scope);
  }

  /**
   * Checks if user can approve a specific initiative based on Role + Scope
   */
  static canApproveInitiative(
    role: EnterpriseRole | UserRole,
    scope: DataScope,
    initiative?: Initiative
  ): boolean {
    const eRole = RoleService.toEnterpriseRole(role);
    if (eRole === 'VISITOR') return false;

    const permRule = InstitutionalPermissionMatrixService.checkPermission(eRole, 'initiatives', 'approve');
    if (!permRule.allowed) return false;

    if (!initiative) return true;

    return AuthorizationService.isInitiativeInScope(initiative, scope);
  }
}
