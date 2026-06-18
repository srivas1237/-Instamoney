# Kashless Backend

A Node.js + Express + MongoDB backend for the Kashless loan marketplace application.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## Project Structure

```
Backend/
├── models/
│   ├── User.js           # Regular user model
│   ├── AdminUser.js      # Admin user model
│   ├── Lead.js           # Loan lead/application model
│   └── Case.js           # Case/compliance model
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── leads.js          # Leads management routes
│   ├── admin.js          # Admin dashboard and cases routes
│   └── users.js          # User management routes
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── .env                  # Environment variables
├── server.js             # Entry point
└── package.json
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or later)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Local Development

1. **Navigate to the backend directory:**
   ```bash
   cd Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the Backend directory (already created):
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/Kashless
   JWT_SECRET=your-secret-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   - If using local MongoDB, make sure it's running
   - Or use MongoDB Atlas and update the MONGODB_URI

5. **Initialize default admin users (one-time setup):**
   Send a POST request to `/api/auth/admin/init` or use the frontend to initialize.

6. **Start the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

The server will be running at `http://localhost:5000`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-token-here>
```

---

## Authentication Endpoints

### User Signup
**Endpoint:** `POST /api/auth/user/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
}
```

---

### User Login
**Endpoint:** `POST /api/auth/user/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
}
```

---

### Admin Login
**Endpoint:** `POST /api/auth/admin/login`

**Request Body:**
```json
{
  "username": "superadmin",
  "password": "superadmin"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "60d21b4667d0d8992e610c85",
    "username": "superadmin",
    "name": "Super Admin",
    "email": "superadmin@Kashless.com",
    "phone": "9876543210",
    "employeeId": "EMP001",
    "band": "A",
    "role": "super_admin",
    "permissions": ["view_leads", "edit_leads", "delete_leads", "manage_users", "view_reports"]
  }
}
```

---

### Initialize Default Admin Users
**Endpoint:** `POST /api/auth/admin/init`

**Description:** Creates default admin users (one-time setup)

**Response (201):**
```json
{
  "message": "Default admin users created successfully"
}
```

---

## Leads Endpoints

### Create Lead
**Endpoint:** `POST /api/leads`

**Description:** Create a new loan lead/application (public endpoint, no auth required)

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "loanType": "personal-loan",
  "amount": "500000",
  "status": "new",
  "notes": "City: Mumbai, Monthly Income: 50000-100000, Employment: Salaried",
  "userId": "60d21b4667d0d8992e610c85"
}
```

**Response (201):**
```json
{
  "_id": "60d21b4667d0d8992e610c86",
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "loanType": "personal-loan",
  "amount": "500000",
  "status": "new",
  "notes": "City: Mumbai, Monthly Income: 50000-100000, Employment: Salaried",
  "userId": "60d21b4667d0d8992e610c85",
  "createdAt": "2023-06-18T10:30:00.000Z",
  "updatedAt": "2023-06-18T10:30:00.000Z"
}
```

---

### Get All Leads
**Endpoint:** `GET /api/leads`

**Authentication:** Required (Admin only)

**Response (200):**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c86",
    "name": "John Doe",
    "phone": "9876543210",
    "email": "john@example.com",
    "loanType": "personal-loan",
    "amount": "500000",
    "status": "new",
    "userId": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2023-06-18T10:30:00.000Z"
  }
]
```

---

### Get User's Leads
**Endpoint:** `GET /api/leads/user/:userId`

**Authentication:** Required

**Parameters:**
- `userId` (path) - User's MongoDB ID

**Response (200):**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c86",
    "name": "John Doe",
    "loanType": "personal-loan",
    "amount": "500000",
    "status": "in_progress",
    "createdAt": "2023-06-18T10:30:00.000Z"
  }
]
```

---

### Update Lead
**Endpoint:** `PUT /api/leads/:id`

**Authentication:** Required

**Parameters:**
- `id` (path) - Lead's MongoDB ID

**Request Body:**
```json
{
  "status": "in_progress",
  "notes": "Verified documents",
  "assignedTo": "60d21b4667d0d8992e610c87"
}
```

**Response (200):**
```json
{
  "_id": "60d21b4667d0d8992e610c86",
  "status": "in_progress",
  "notes": "Verified documents",
  "assignedTo": {
    "_id": "60d21b4667d0d8992e610c87",
    "name": "Agent User"
  },
  "updatedAt": "2023-06-18T11:00:00.000Z"
}
```

---

### Delete Lead
**Endpoint:** `DELETE /api/leads/:id`

**Authentication:** Required

**Parameters:**
- `id` (path) - Lead's MongoDB ID

**Response (200):**
```json
{
  "message": "Lead deleted successfully"
}
```

---

## Admin Endpoints

### Get Dashboard Statistics
**Endpoint:** `GET /api/admin/dashboard`

**Authentication:** Required

**Response (200):**
```json
{
  "totalLeads": 150,
  "newLeads": 25,
  "inProgressLeads": 45,
  "approvedLeads": 60,
  "totalCases": 20,
  "openCases": 8,
  "recentLeads": [
    {
      "_id": "60d21b4667d0d8992e610c86",
      "name": "John Doe",
      "loanType": "personal-loan",
      "status": "new",
      "createdAt": "2023-06-18T10:30:00.000Z"
    }
  ]
}
```

---

### Get All Cases
**Endpoint:** `GET /api/admin/cases`

**Authentication:** Required

**Response (200):**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c88",
    "title": "Document Verification",
    "description": "Need to verify customer documents",
    "type": "compliance",
    "status": "open",
    "assignedTo": {
      "_id": "60d21b4667d0d8992e610c87",
      "name": "Agent User",
      "email": "agent@Kashless.com"
    },
    "assignedBy": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "Super Admin"
    },
    "createdAt": "2023-06-18T10:00:00.000Z"
  }
]
```

---

### Create Case
**Endpoint:** `POST /api/admin/cases`

**Authentication:** Required

**Request Body:**
```json
{
  "title": "Document Verification",
  "description": "Need to verify customer documents",
  "type": "compliance",
  "status": "open",
  "assignedTo": "60d21b4667d0d8992e610c87"
}
```

**Response (201):**
```json
{
  "_id": "60d21b4667d0d8992e610c88",
  "title": "Document Verification",
  "description": "Need to verify customer documents",
  "type": "compliance",
  "status": "open",
  "assignedTo": "60d21b4667d0d8992e610c87",
  "assignedBy": "60d21b4667d0d8992e610c85",
  "createdAt": "2023-06-18T10:00:00.000Z"
}
```

---

### Update Case
**Endpoint:** `PUT /api/admin/cases/:id`

**Authentication:** Required

**Parameters:**
- `id` (path) - Case's MongoDB ID

**Request Body:**
```json
{
  "status": "resolved",
  "resolution": "Documents verified successfully"
}
```

**Response (200):**
```json
{
  "_id": "60d21b4667d0d8992e610c88",
  "status": "resolved",
  "resolution": "Documents verified successfully",
  "updatedAt": "2023-06-18T11:30:00.000Z"
}
```

---

### Get Reports
**Endpoint:** `GET /api/admin/reports`

**Authentication:** Required

**Response (200):**
```json
{
  "leadsByStatus": [
    { "_id": "new", "count": 25 },
    { "_id": "in_progress", "count": 45 },
    { "_id": "approved", "count": 60 },
    { "_id": "rejected", "count": 15 },
    { "_id": "disbursed", "count": 5 }
  ],
  "leadsByType": [
    { "_id": "personal-loan", "count": 70 },
    { "_id": "home-loan", "count": 40 },
    { "_id": "car-loan", "count": 25 },
    { "_id": "business-loan", "count": 15 }
  ],
  "casesByStatus": [
    { "_id": "open", "count": 8 },
    { "_id": "in_progress", "count": 5 },
    { "_id": "resolved", "count": 5 },
    { "_id": "closed", "count": 2 }
  ]
}
```

---

## Users Endpoints

### Get All Admin Users
**Endpoint:** `GET /api/users/admin`

**Authentication:** Required

**Response (200):**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c85",
    "username": "superadmin",
    "name": "Super Admin",
    "email": "superadmin@Kashless.com",
    "phone": "9876543210",
    "employeeId": "EMP001",
    "band": "A",
    "role": "super_admin",
    "permissions": ["view_leads", "edit_leads", "delete_leads", "manage_users", "view_reports"],
    "createdAt": "2023-06-18T09:00:00.000Z"
  }
]
```

---

### Create Admin User
**Endpoint:** `POST /api/users/admin`

**Authentication:** Required

**Request Body:**
```json
{
  "username": "newagent",
  "name": "New Agent",
  "email": "newagent@Kashless.com",
  "phone": "9876543211",
  "employeeId": "EMP004",
  "band": "C",
  "role": "agent",
  "permissions": ["view_leads", "edit_leads"],
  "password": "password123"
}
```

**Response (201):**
```json
{
  "_id": "60d21b4667d0d8992e610c89",
  "username": "newagent",
  "name": "New Agent",
  "email": "newagent@Kashless.com",
  "phone": "9876543211",
  "employeeId": "EMP004",
  "band": "C",
  "role": "agent",
  "permissions": ["view_leads", "edit_leads"],
  "createdAt": "2023-06-18T12:00:00.000Z"
}
```

---

### Update Admin User
**Endpoint:** `PUT /api/users/admin/:id`

**Authentication:** Required

**Parameters:**
- `id` (path) - Admin user's MongoDB ID

**Request Body:**
```json
{
  "name": "Updated Name",
  "phone": "9876543212",
  "band": "B",
  "permissions": ["view_leads", "edit_leads", "view_reports"]
}
```

**Response (200):**
```json
{
  "_id": "60d21b4667d0d8992e610c89",
  "name": "Updated Name",
  "phone": "9876543212",
  "band": "B",
  "permissions": ["view_leads", "edit_leads", "view_reports"],
  "updatedAt": "2023-06-18T12:30:00.000Z"
}
```

---

### Delete Admin User
**Endpoint:** `DELETE /api/users/admin/:id`

**Authentication:** Required

**Parameters:**
- `id` (path) - Admin user's MongoDB ID

**Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

---

### Get Current Admin Profile
**Endpoint:** `GET /api/users/admin/profile`

**Authentication:** Required

**Response (200):**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "username": "superadmin",
  "name": "Super Admin",
  "email": "superadmin@Kashless.com",
  "phone": "9876543210",
  "employeeId": "EMP001",
  "band": "A",
  "role": "super_admin",
  "permissions": ["view_leads", "edit_leads", "delete_leads", "manage_users", "view_reports"]
}
```

---

### Update Admin Profile
**Endpoint:** `PUT /api/users/admin/profile`

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Updated Admin Name",
  "phone": "9876543213",
  "password": "newpassword123"
}
```

**Response (200):**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "name": "Updated Admin Name",
  "phone": "9876543213",
  "updatedAt": "2023-06-18T13:00:00.000Z"
}
```

---

### Get Current User Profile
**Endpoint:** `GET /api/users/profile`

**Authentication:** Required (Regular user)

**Response (200):**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "pan": "ABCDE1234F",
  "aadhaar": "123456789012",
  "address": "Mumbai, Maharashtra",
  "createdAt": "2023-06-18T10:00:00.000Z"
}
```

---

### Update User Profile
**Endpoint:** `PUT /api/users/profile`

**Authentication:** Required (Regular user)

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "phone": "9876543211",
  "pan": "ABCDE1234F",
  "aadhaar": "123456789012",
  "address": "Mumbai, Maharashtra",
  "password": "newpassword123"
}
```

**Response (200):**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "name": "John Doe Updated",
  "phone": "9876543211",
  "pan": "ABCDE1234F",
  "aadhaar": "123456789012",
  "address": "Mumbai, Maharashtra",
  "updatedAt": "2023-06-18T13:30:00.000Z"
}
```

---

## Data Models & Enums

### Lead Status Enum
- `new` - New lead
- `in_progress` - Lead being processed
- `approved` - Lead approved
- `rejected` - Lead rejected
- `disbursed` - Loan disbursed

### Case Type Enum
- `compliance` - Compliance-related case
- `case` - General case

### Case Status Enum
- `open` - Case is open
- `in_progress` - Case being worked on
- `resolved` - Case resolved
- `closed` - Case closed

### Admin Role Enum
- `super_admin` - Full access
- `admin` - Limited admin access
- `agent` - Agent access

### Default Permissions by Role
- `super_admin`: `view_leads`, `edit_leads`, `delete_leads`, `manage_users`, `view_reports`
- `admin`: `view_leads`, `edit_leads`, `view_reports`
- `agent`: `view_leads`, `edit_leads`

---

## Error Responses

All endpoints may return these error responses:

**400 Bad Request:**
```json
{
  "message": "Invalid input data"
}
```

**401 Unauthorized:**
```json
{
  "message": "No token, authorization denied"
}
```

**404 Not Found:**
```json
{
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Something went wrong"
}
```

## Default Credentials

After initialization, these default admin users are available:

| Role | Username | Password |
|------|----------|----------|
| Super Admin | superadmin | superadmin |
| Admin | admin | admin |
| Agent | agent | agent |

**Important:** Change these passwords immediately in production!

## Deployment on AWS

### Option 1: AWS Elastic Beanstalk

1. **Install the EB CLI:**
   ```bash
   pip install awsebcli
   ```

2. **Initialize your EB application:**
   ```bash
   eb init
   ```

3. **Create an environment:**
   ```bash
   eb create Kashless-backend
   ```

4. **Set environment variables in AWS Console:**
   - Go to Elastic Beanstalk → Configuration → Software
   - Add environment variables: PORT, MONGODB_URI, JWT_SECRET, NODE_ENV

5. **Deploy:**
   ```bash
   eb deploy
   ```

### Option 2: AWS EC2

1. **Launch an EC2 instance** (Ubuntu recommended)
2. **SSH into your instance**
3. **Install Node.js, npm, and MongoDB**
4. **Clone your repository**
5. **Install dependencies and start the server**
6. **Use PM2 for process management:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name Kashless-backend
   pm2 startup
   pm2 save
   ```

### MongoDB Setup on AWS

**Option 1: MongoDB Atlas (Recommended)**
- Create a free cluster at https://www.mongodb.com/cloud/atlas
- Update your MONGODB_URI in .env

**Option 2: Self-hosted on EC2**
- Install MongoDB on EC2
- Configure security groups to allow access
- Update connection string accordingly

## Frontend Integration

Update your frontend `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production, replace with your AWS backend URL.

## Security Notes

1. **Always change default passwords** in production
2. **Use HTTPS** in production
3. **Set strong JWT_SECRET**
4. **Configure CORS properly** for production domains
5. **Use environment variables** for all sensitive data
6. **Implement rate limiting** for production APIs
7. **Add input validation** for all endpoints
8. **Set up logging and monitoring**

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT

