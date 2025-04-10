import type { Database } from "@/integrations/supabase/types";
import type { UserRole } from "./auth.types";

export interface UserActivityProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  is_active: boolean;
  admin_override_active: boolean;
  profile_completed: boolean;
  last_login: string | null;
  last_forum_activity: string | null;
  user_roles: Array<{
    role: UserRole;
  }>;
}

export interface UseUserActivityOptions {
  enabled?: boolean;
  includeInactive?: boolean;
}

export interface UserActivityStats {
  totalUsers: number;
  activeUsers: number;
  completedProfiles: number;
  adminOverrides: number;
}

// Type for the database response
export type ProfileWithRoles = Database["public"]["Tables"]["profiles"]["Row"] & {
  user_roles: Array<{
    role: UserRole;
  }> | null;
};