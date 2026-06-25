import { api } from './api';
import { secureStorage, sanitizeInput } from './security';

export interface InstaUser {
  id: string;
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  pan?: string;
  aadhaar?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InstaAdminUser {
  id: string;
  _id?: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  band: 'A' | 'B' | 'C' | 'D';
  role: 'super_admin' | 'admin' | 'agent';
  permissions: string[];
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InstaLead {
  id: string;
  _id?: string;
  name: string;
  phone: string;
  email: string;
  loanType: string;
  amount: string;
  status: 'new' | 'in_progress' | 'approved' | 'rejected' | 'disbursed';
  createdAt: string;
  notes?: string;
  assignedTo?: string | any;
  userId?: string | any;
  updatedAt?: string;
}

export interface InstaCase {
  id: string;
  _id?: string;
  title: string;
  description: string;
  type: 'compliance' | 'case';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo: string | any;
  assignedBy: string | any;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
}

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  super_admin: ['view_leads', 'edit_leads', 'delete_leads', 'manage_users', 'view_reports'],
  admin: ['view_leads', 'edit_leads', 'view_reports'],
  agent: ['view_leads', 'edit_leads'],
};

export const LOAN_TYPE_OPTIONS = [
  { value: 'personal', label: 'Personal Loan' },
  { value: 'home', label: 'Home Loan' },
  { value: 'lap', label: 'Loan Against Property' },
  { value: 'short-term', label: 'Short Term Loan' },
  { value: 'payday', label: 'Payday Loan' },
  { value: 'car', label: 'Car Loan' },
  { value: 'two-wheeler', label: 'Two Wheeler Loan' },
  { value: 'advance-salary', label: 'Advance Salary' },
  { value: 'invoice-finance', label: 'Invoice Finance' },
  { value: 'merchant-working-capital', label: 'Merchant Loan - Working Capital' },
  { value: 'msme-secured', label: 'MSME Secured Loan (Up to 5L)' },
  { value: 'two-wheeler-merchant-program', label: 'Two Wheeler Merchant Program' },
  { value: 'electronics-partner-program', label: 'Electronics Partner Program' },
  { value: 'fmcg-distribution-program', label: 'FMCG Distribution Program' },
  { value: 'cement-dealer-program', label: 'Cement Dealer Program' },
  { value: 'paint-dealer-program', label: 'Paint Dealer Program' },
  { value: 'tyre-dealer-program', label: 'Tyre Dealer Program' },
] as const;

export const getLoanTypeLabel = (value: string) => {
  const normalized = (() => {
    if (!value) return value;
    if (value === 'personal-loan') return 'personal';
    if (value === 'home-loan') return 'home';
    if (value === 'loan-against-property') return 'lap';
    if (value === 'short-term-loan') return 'short-term';
    if (value === 'payday-loan') return 'payday';
    if (value === 'car-loan') return 'car';
    if (value === 'two-wheeler-loan') return 'two-wheeler';
    return value;
  })();
  const match = LOAN_TYPE_OPTIONS.find((opt) => opt.value === normalized);
  return match ? match.label : value;
};

const isMongoObjectId = (value: unknown): value is string => {
  return typeof value === 'string' && /^[a-f0-9]{24}$/i.test(value);
};

const getEntityId = (value: { id?: string; _id?: string }): string => {
  return value.id || value._id || '';
};

const emitLeadsUpdated = () => {
  if (typeof window === 'undefined') return;
  try {
    window.dispatchEvent(new Event('kashless:leads_updated'));
  } catch {}
  try {
    const bc = new BroadcastChannel('kashless');
    bc.postMessage({ type: 'leads_updated', ts: Date.now() });
    bc.close();
  } catch {}
};

// ==================== TOKEN & USER MANAGEMENT ====================

/**
 * Get current regular user from secure storage
 */
export const getCurrentUser = (): InstaUser | null => {
  const user = secureStorage.getItem('insta_user');
  return user ? (user as InstaUser) : null;
};

/**
 * Set current regular user in secure storage
 */
export const setCurrentUser = (user: InstaUser | null) => {
  if (user) {
    const userData = {
      ...user,
      id: getEntityId(user),
      // Never store password in storage
      password: undefined,
    };
    secureStorage.setItem('insta_user', userData);
  } else {
    secureStorage.removeItem('insta_user');
    secureStorage.removeItem('user_token');
    secureStorage.removeItem('token');
  }
};

/**
 * Get current admin user from secure storage
 */
export const getCurrentAdminUser = (): InstaAdminUser | null => {
  const user = secureStorage.getItem('admin_user');
  if (!user) return null;
  const parsedUser = user as InstaAdminUser;
  return {
    ...parsedUser,
    id: getEntityId(parsedUser),
    permissions: parsedUser.permissions || ROLE_PERMISSIONS[parsedUser.role] || [],
  };
};

/**
 * Set current admin user in secure storage
 */
export const setCurrentAdminUser = (user: InstaAdminUser | null) => {
  if (user) {
    const userData = {
      ...user,
      id: getEntityId(user),
      // Never store password in storage
      password: undefined,
    };
    secureStorage.setItem('admin_user', userData);
  } else {
    secureStorage.removeItem('admin_user');
    secureStorage.removeItem('admin_token');
    secureStorage.removeItem('token');
  }
};

// ==================== API FUNCTIONS ====================

/**
 * User signup with data sanitization
 */
export const userSignup = async (data: { name: string; email: string; phone: string; password: string }) => {
  const sanitizedData = {
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email),
    phone: sanitizeInput(data.phone),
    password: data.password, // Don't sanitize password to preserve complexity
  };
  
  const result = await api.post('/auth/user/signup', sanitizedData);
  secureStorage.setItem('user_token', result.token);
  setCurrentUser(result.user);
  return result;
};

/**
 * User login with data sanitization
 */
export const userLogin = async (data: { email: string; password: string }) => {
  const sanitizedData = {
    email: sanitizeInput(data.email),
    password: data.password, // Don't sanitize password
  };
  
  const result = await api.post('/auth/user/login', sanitizedData);
  secureStorage.setItem('user_token', result.token);
  setCurrentUser(result.user);
  return result;
};

/**
 * Admin login with data sanitization
 */
export const adminLogin = async (data: { username: string; password: string }) => {
  const sanitizedData = {
    username: sanitizeInput(data.username),
    password: data.password, // Don't sanitize password
  };
  
  const traceId = `admin-login-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  const debugUrl = process.env.NEXT_PUBLIC_DEBUG_SERVER_URL || 'http://127.0.0.1:7778/event';
  const debugRunId = process.env.NEXT_PUBLIC_DEBUG_RUN_ID || 'pre-fix';
  // #region debug-point A:frontend-admin-login-request
  fetch(debugUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'admin-login-fails', runId: debugRunId, hypothesisId: 'A', traceId, location: 'src/lib/storage.ts:adminLogin', msg: '[DEBUG] Admin login request', data: { apiBaseUrl: (api as any)?.baseURL, endpoint: '/auth/admin/login', username: sanitizedData.username, passwordLen: typeof data.password === 'string' ? data.password.length : 0 }, ts: Date.now() }) }).catch(() => {});
  // #endregion
  try {
    const result = await api.post('/auth/admin/login', sanitizedData, { headers: { 'x-trace-id': traceId } });
    // #region debug-point E:frontend-admin-login-success
    fetch(debugUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'admin-login-fails', runId: debugRunId, hypothesisId: 'E', traceId, location: 'src/lib/storage.ts:adminLogin', msg: '[DEBUG] Admin login success', data: { hasToken: Boolean(result?.token), adminUsername: result?.admin?.username, adminRole: result?.admin?.role }, ts: Date.now() }) }).catch(() => {});
    // #endregion
    secureStorage.setItem('admin_token', result.token);
    setCurrentAdminUser(result.admin);
    return result;
  } catch (err) {
    // #region debug-point A:frontend-admin-login-error
    fetch(debugUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'admin-login-fails', runId: debugRunId, hypothesisId: 'A', traceId, location: 'src/lib/storage.ts:adminLogin', msg: '[DEBUG] Admin login failed', data: { error: err instanceof Error ? err.message : String(err) }, ts: Date.now() }) }).catch(() => {});
    // #endregion
    throw err;
  }
};

/**
 * Logout - clears all secure storage
 */
export const logout = () => {
  secureStorage.clear();
};

/**
 * Create lead with sanitized data
 */
export const createLead = async (data: any) => {
  const sanitizedData = {
    name: sanitizeInput(data.name),
    phone: sanitizeInput(data.phone),
    email: sanitizeInput(data.email),
    loanType: sanitizeInput(data.loanType),
    amount: sanitizeInput(data.amount),
    notes: data.notes ? sanitizeInput(data.notes) : undefined,
    userId: isMongoObjectId(data.userId) ? data.userId : undefined,
  };
  
  const result = await api.post('/leads', sanitizedData);
  emitLeadsUpdated();
  return result;
};

export const getLeads = async () => {
  return api.get('/leads', { tokenKey: 'admin_token' } as any);
};

export const updateLead = async (id: string, data: any) => {
  const sanitizedData = {
    ...data,
    notes: data.notes ? sanitizeInput(data.notes) : undefined,
  };
  
  const result = await api.put(`/leads/${id}`, sanitizedData, { tokenKey: 'admin_token' } as any);
  emitLeadsUpdated();
  return result;
};

export const deleteLead = async (id: string) => {
  const result = await api.delete(`/leads/${id}`, { tokenKey: 'admin_token' } as any);
  emitLeadsUpdated();
  return result;
};

export const getDashboardStats = async () => {
  return api.get('/admin/dashboard', { tokenKey: 'admin_token' } as any);
};

export const getCases = async () => {
  return api.get('/admin/cases', { tokenKey: 'admin_token' } as any);
};

export const createCase = async (data: any) => {
  const sanitizedData = {
    title: sanitizeInput(data.title),
    description: sanitizeInput(data.description),
    type: data.type,
    status: data.status,
    assignedTo: data.assignedTo,
  };
  
  return api.post('/admin/cases', sanitizedData, { tokenKey: 'admin_token' } as any);
};

export const updateCase = async (id: string, data: any) => {
  const sanitizedData = {
    ...data,
    title: data.title ? sanitizeInput(data.title) : undefined,
    description: data.description ? sanitizeInput(data.description) : undefined,
    resolution: data.resolution ? sanitizeInput(data.resolution) : undefined,
  };
  
  return api.put(`/admin/cases/${id}`, sanitizedData, { tokenKey: 'admin_token' } as any);
};

export const getReports = async () => {
  return api.get('/admin/reports', { tokenKey: 'admin_token' } as any);
};

export const getAdminUsers = async () => {
  return api.get('/users/admin', { tokenKey: 'admin_token' } as any);
};

export const createAdminUser = async (data: any) => {
  const sanitizedData = {
    username: sanitizeInput(data.username),
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email),
    phone: sanitizeInput(data.phone),
    employeeId: sanitizeInput(data.employeeId),
    band: data.band,
    role: data.role,
    permissions: data.permissions,
    password: data.password,
  };
  
  return api.post('/users/admin', sanitizedData, { tokenKey: 'admin_token' } as any);
};

export const updateAdminUser = async (id: string, data: any) => {
  const sanitizedData = {
    ...data,
    name: data.name ? sanitizeInput(data.name) : undefined,
    email: data.email ? sanitizeInput(data.email) : undefined,
    phone: data.phone ? sanitizeInput(data.phone) : undefined,
  };
  
  return api.put(`/users/admin/${id}`, sanitizedData, { tokenKey: 'admin_token' } as any);
};

export const deleteAdminUser = async (id: string) => {
  return api.delete(`/users/admin/${id}`, { tokenKey: 'admin_token' } as any);
};

export const getAdminProfile = async () => {
  return api.get('/users/admin/profile', { tokenKey: 'admin_token' } as any);
};

export const updateAdminProfile = async (data: any) => {
  const sanitizedData = {
    ...data,
    name: data.name ? sanitizeInput(data.name) : undefined,
    phone: data.phone ? sanitizeInput(data.phone) : undefined,
  };
  
  return api.put('/users/admin/profile', sanitizedData, { tokenKey: 'admin_token' } as any);
};

export const getUserProfile = async () => {
  return api.get('/users/profile', { tokenKey: 'user_token' } as any);
};

export const updateUserProfile = async (data: any) => {
  const sanitizedData = {
    ...data,
    name: data.name ? sanitizeInput(data.name) : undefined,
    phone: data.phone ? sanitizeInput(data.phone) : undefined,
    pan: data.pan ? sanitizeInput(data.pan) : undefined,
    aadhaar: data.aadhaar ? sanitizeInput(data.aadhaar) : undefined,
    address: data.address ? sanitizeInput(data.address) : undefined,
  };
  
  return api.put('/users/profile', sanitizedData, { tokenKey: 'user_token' } as any);
};

export const getUserLeads = async (userId: string) => {
  return api.get(`/leads/user/${userId}`, { tokenKey: 'user_token' } as any);
};

// Keep these for backward compatibility but mark as deprecated
export const getUsers = () => { console.warn('getUsers is deprecated, use API instead'); return []; };
export const setUsers = () => { console.warn('setUsers is deprecated, use API instead'); };
export const setLeads = () => { console.warn('setLeads is deprecated, use API instead'); };
export const setCases = () => { console.warn('setCases is deprecated, use API instead'); };
export const setAdminUsers = () => { console.warn('setAdminUsers is deprecated, use API instead'); };
