export interface InstaUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  pan?: string;
  aadhaar?: string;
  address?: string;
}

export interface InstaAdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  band: 'A' | 'B' | 'C' | 'D';
  role: 'super_admin' | 'admin' | 'agent';
  permissions: string[];
  password: string;
}

export interface InstaLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  loanType: string;
  amount: string;
  status: 'new' | 'in_progress' | 'approved' | 'rejected' | 'disbursed';
  createdAt: string;
  notes?: string;
  assignedTo?: string;
  userId?: string;
}

export interface InstaCase {
  id: string;
  title: string;
  description: string;
  type: 'compliance' | 'case';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo: string;
  assignedBy: string;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
}

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  super_admin: ['view_leads', 'edit_leads', 'delete_leads', 'manage_users', 'view_reports'],
  admin: ['view_leads', 'edit_leads', 'view_reports'],
  agent: ['view_leads', 'edit_leads'],
}

export const getUsers = (): InstaUser[] => {
  return JSON.parse(localStorage.getItem('insta_users') || '[]');
};

export const setUsers = (users: InstaUser[]) => {
  localStorage.setItem('insta_users', JSON.stringify(users));
};

export const getCurrentUser = (): InstaUser | null => {
  const user = localStorage.getItem('insta_user');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: InstaUser | null) => {
  if (user) {
    localStorage.setItem('insta_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('insta_user');
  }
};

export const getAdminUsers = (): InstaAdminUser[] => {
  const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
  if (users.length === 0) {
    const defaultUsers: InstaAdminUser[] = [
      {
        id: '1',
        username: 'superadmin',
        name: 'Super Admin',
        email: 'superadmin@instamoney.com',
        phone: '9876543210',
        employeeId: 'EMP001',
        band: 'A',
        role: 'super_admin',
        permissions: ROLE_PERMISSIONS.super_admin,
        password: 'superadmin',
      },
      {
        id: '2',
        username: 'admin',
        name: 'Admin User',
        email: 'admin@instamoney.com',
        phone: '9876543211',
        employeeId: 'EMP002',
        band: 'B',
        role: 'admin',
        permissions: ROLE_PERMISSIONS.admin,
        password: 'admin',
      },
      {
        id: '3',
        username: 'agent',
        name: 'Agent User',
        email: 'agent@instamoney.com',
        phone: '9876543212',
        employeeId: 'EMP003',
        band: 'C',
        role: 'agent',
        permissions: ROLE_PERMISSIONS.agent,
        password: 'agent',
      },
    ];
    setAdminUsers(defaultUsers);
    return defaultUsers;
  }
  // Add permissions to existing users if missing (backward compatibility)
  const usersWithPermissions: InstaAdminUser[] = users.map((u: any) => ({
    ...u,
    permissions: u.permissions || ROLE_PERMISSIONS[u.role] || [],
  }));
  return usersWithPermissions;
};

export const setAdminUsers = (users: InstaAdminUser[]) => {
  localStorage.setItem('admin_users', JSON.stringify(users));
};

export const getCurrentAdminUser = (): InstaAdminUser | null => {
  const user = localStorage.getItem('admin_user');
  return user ? JSON.parse(user) : null;
};

export const setCurrentAdminUser = (user: InstaAdminUser | null) => {
  if (user) {
    localStorage.setItem('admin_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('admin_user');
  }
};

export const getLeads = (): InstaLead[] => {
  return JSON.parse(localStorage.getItem('insta_leads') || '[]');
};

export const setLeads = (leads: InstaLead[]) => {
  localStorage.setItem('insta_leads', JSON.stringify(leads));
};

export const getCases = (): InstaCase[] => {
  return JSON.parse(localStorage.getItem('insta_cases') || '[]');
};

export const setCases = (cases: InstaCase[]) => {
  localStorage.setItem('insta_cases', JSON.stringify(cases));
};
