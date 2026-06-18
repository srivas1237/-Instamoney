export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  pan?: string;
  aadhaar?: string;
  address?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  band: 'A' | 'B' | 'C' | 'D';
  role: 'super_admin' | 'admin' | 'agent';
  password: string;
}

export interface Lead {
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

export interface Case {
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

export const getUsers = (): User[] => {
  return JSON.parse(localStorage.getItem('insta_users') || '[]');
};

export const setUsers = (users: User[]) => {
  localStorage.setItem('insta_users', JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('insta_user');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('insta_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('insta_user');
  }
};

export const getAdminUsers = (): AdminUser[] => {
  const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
  if (users.length === 0) {
    const defaultUsers: AdminUser[] = [
      {
        id: '1',
        username: 'superadmin',
        name: 'Super Admin',
        email: 'superadmin@instamoney.com',
        phone: '9876543210',
        employeeId: 'EMP001',
        band: 'A',
        role: 'super_admin',
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
        password: 'agent',
      },
    ];
    setAdminUsers(defaultUsers);
    return defaultUsers;
  }
  return users;
};

export const setAdminUsers = (users: AdminUser[]) => {
  localStorage.setItem('admin_users', JSON.stringify(users));
};

export const getCurrentAdminUser = (): AdminUser | null => {
  const user = localStorage.getItem('admin_user');
  return user ? JSON.parse(user) : null;
};

export const setCurrentAdminUser = (user: AdminUser | null) => {
  if (user) {
    localStorage.setItem('admin_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('admin_user');
  }
};

export const getLeads = (): Lead[] => {
  return JSON.parse(localStorage.getItem('insta_leads') || '[]');
};

export const setLeads = (leads: Lead[]) => {
  localStorage.setItem('insta_leads', JSON.stringify(leads));
};

export const getCases = (): Case[] => {
  return JSON.parse(localStorage.getItem('insta_cases') || '[]');
};

export const setCases = (cases: Case[]) => {
  localStorage.setItem('insta_cases', JSON.stringify(cases));
};
