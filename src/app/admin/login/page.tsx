'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminLogin, getCurrentAdminUser } from '@/lib/storage'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const existingAdmin = getCurrentAdminUser()
    if (existingAdmin) {
      router.push('/admin')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await adminLogin({ username, password })
      router.push('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <img 
            src="/instamoney-logo.png" 
            alt="InstaMoney Logo" 
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter password"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo credentials:</p>
          <p className="mt-1">superadmin / SuperAdmin@123</p>
          <p>admin / Admin@123</p>
          <p>agent / Agent@123</p>
        </div>
      </div>
    </div>
  )
}
