const jwt = require('jsonwebtoken');

// ==================== JWT AUTHENTICATION ====================
const auth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// ==================== ROLE & PERMISSION MIDDLEWARE ====================
const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    try {
      // First check if we have a user
      if (!req.user) {
        return res.status(401).json({ message: 'Authorization required' });
      }

      // If it's a super_admin, they have all permissions
      if (req.user.role === 'super_admin') {
        return next();
      }

      // For other roles, check specific permissions
      // Note: Permissions should be in the token or fetched from DB
      // For this implementation, we'll validate based on role
      const rolePermissions = {
        super_admin: ['view_leads', 'edit_leads', 'delete_leads', 'manage_users', 'view_reports'],
        admin: ['view_leads', 'edit_leads', 'view_reports'],
        agent: ['view_leads', 'edit_leads']
      };

      const userPermissions = rolePermissions[req.user.role] || [];
      
      if (!userPermissions.includes(requiredPermission)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error during authorization' });
    }
  };
};

module.exports = { auth, checkPermission };
