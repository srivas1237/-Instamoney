'use client'

import { useEffect, useState } from 'react'
import { User, Phone, Mail, MapPin, Save, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function UserProfilePage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pan: '',
    aadhaar: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('insta_user')
    if (user) {
      const userData = JSON.parse(user)
      setCurrentUser(userData)
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        pan: userData.pan || '',
        aadhaar: userData.aadhaar || '',
      })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('insta_user')
    router.push('/')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) return

    // Update in both places: insta_user and insta_users array
    const updatedUser = { ...currentUser, ...formData }
    localStorage.setItem('insta_user', JSON.stringify(updatedUser))
    setCurrentUser(updatedUser)

    // Update in users array
    const users = JSON.parse(localStorage.getItem('insta_users') || '[]')
    const updatedUsers = users.map((u: any) =>
      u.id === currentUser.id ? { ...u, ...formData } : u
    )
    localStorage.setItem('insta_users', JSON.stringify(updatedUsers))

    setIsEditing(false)
    setSuccessMessage('Profile updated successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account details</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-[#0052ff] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#003ecf] transition-all"
          >
            Edit Profile
          </button>
        )}
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <Save className="h-5 w-5" />
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="h-24 w-24 bg-[#0052ff] rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentUser?.name}
            </h2>
            <p className="text-gray-600 mt-1">{currentUser?.email}</p>
            
            <button
              onClick={handleLogout}
              className="mt-6 flex items-center gap-2 mx-auto text-red-600 hover:text-red-700 font-medium"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isEditing
                        ? 'border-gray-300 focus:border-[#0052ff] focus:ring-2 focus:ring-[#0052ff] focus:outline-none'
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 cursor-not-allowed"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isEditing
                        ? 'border-gray-300 focus:border-[#0052ff] focus:ring-2 focus:ring-[#0052ff] focus:outline-none'
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your address"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isEditing
                        ? 'border-gray-300 focus:border-[#0052ff] focus:ring-2 focus:ring-[#0052ff] focus:outline-none'
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 pt-4">
                KYC Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="ABCDE1234F"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isEditing
                        ? 'border-gray-300 focus:border-[#0052ff] focus:ring-2 focus:ring-[#0052ff] focus:outline-none'
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    name="aadhaar"
                    value={formData.aadhaar}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="1234 5678 9012"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isEditing
                        ? 'border-gray-300 focus:border-[#0052ff] focus:ring-2 focus:ring-[#0052ff] focus:outline-none'
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#0052ff] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#003ecf] transition-all"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setFormData({
                        name: currentUser?.name || '',
                        email: currentUser?.email || '',
                        phone: currentUser?.phone || '',
                        address: currentUser?.address || '',
                        pan: currentUser?.pan || '',
                        aadhaar: currentUser?.aadhaar || '',
                      })
                    }}
                    className="px-8 py-3 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}