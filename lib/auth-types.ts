// User role types
export const USER_ROLES = ["Admin", "Manager", "Investigator", "Analyst", "Viewer"] as const
export type UserRole = typeof USER_ROLES[number]

// Permission types
export const PERMISSIONS = {
  // Case permissions
  CREATE_CASE: "create_case",
  VIEW_CASE: "view_case",
  EDIT_CASE: "edit_case",
  DELETE_CASE: "delete_case",
  ASSIGN_CASE: "assign_case",
  CHANGE_CASE_STATUS: "change_case_status",
  
  // Team permissions
  CREATE_TEAM: "create_team",
  VIEW_TEAM: "view_team",
  EDIT_TEAM: "edit_team",
  DELETE_TEAM: "delete_team",
  MANAGE_TEAM_MEMBERS: "manage_team_members",
  
  // User permissions
  CREATE_USER: "create_user",
  VIEW_USER: "view_user",
  EDIT_USER: "edit_user",
  DELETE_USER: "delete_user",
  ASSIGN_USER_ROLE: "assign_user_role",
  
  // Search permissions
  PERFORM_SEARCH: "perform_search",
  VIEW_SEARCH_HISTORY: "view_search_history",
  
  // Audit permissions
  VIEW_AUDIT_LOGS: "view_audit_logs",
} as const

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS]

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  Admin: Object.values(PERMISSIONS),
  Manager: [
    PERMISSIONS.CREATE_CASE,
    PERMISSIONS.VIEW_CASE,
    PERMISSIONS.EDIT_CASE,
    PERMISSIONS.ASSIGN_CASE,
    PERMISSIONS.CHANGE_CASE_STATUS,
    PERMISSIONS.CREATE_TEAM,
    PERMISSIONS.VIEW_TEAM,
    PERMISSIONS.EDIT_TEAM,
    PERMISSIONS.MANAGE_TEAM_MEMBERS,
    PERMISSIONS.VIEW_USER,
    PERMISSIONS.PERFORM_SEARCH,
    PERMISSIONS.VIEW_SEARCH_HISTORY,
    PERMISSIONS.VIEW_AUDIT_LOGS,
  ],
  Investigator: [
    PERMISSIONS.CREATE_CASE,
    PERMISSIONS.VIEW_CASE,
    PERMISSIONS.EDIT_CASE,
    PERMISSIONS.CHANGE_CASE_STATUS,
    PERMISSIONS.VIEW_TEAM,
    PERMISSIONS.VIEW_USER,
    PERMISSIONS.PERFORM_SEARCH,
    PERMISSIONS.VIEW_SEARCH_HISTORY,
  ],
  Analyst: [
    PERMISSIONS.VIEW_CASE,
    PERMISSIONS.EDIT_CASE,
    PERMISSIONS.VIEW_TEAM,
    PERMISSIONS.VIEW_USER,
    PERMISSIONS.PERFORM_SEARCH,
    PERMISSIONS.VIEW_SEARCH_HISTORY,
  ],
  Viewer: [
    PERMISSIONS.VIEW_CASE,
    PERMISSIONS.VIEW_TEAM,
    PERMISSIONS.VIEW_USER,
    PERMISSIONS.VIEW_SEARCH_HISTORY,
  ],
}

// User type
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  teams: string[]
  avatar?: string
  lastActive?: string
}

// Check if a user has a specific permission
export function hasPermission(user: User, permission: Permission): boolean {
  const userRole = user.role
  return ROLE_PERMISSIONS[userRole].includes(permission)
}

// Check if a user has any of the specified permissions
export function hasAnyPermission(user: User, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(user, permission))
}

// Check if a user has all of the specified permissions
export function hasAllPermissions(user: User, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(user, permission))
} 