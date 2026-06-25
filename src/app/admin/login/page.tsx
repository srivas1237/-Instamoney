'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminLogin, getCurrentAdminUser } from '@/lib/storage'
import BrandMark from '@/components/BrandMark'

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
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="tp-card w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="mb-4 flex justify-center">
            <BrandMark />
          </div>
          <h1 className="text-2xl font-semibold tracking-[-0.03em] text-white">Operator Portal</h1>
          <p className="text-[#737780]">Sign in to review applications, cases, and reports</p>
        </div>
        
        {error && (
          <div className="mb-4 rounded-lg border border-[#ff825c]/35 bg-[#ff825c]/10 p-3 text-sm text-[#ff825c]">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="tp-input px-4 py-3"
              placeholder="Enter username"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="tp-input px-4 py-3"
              placeholder="Enter password"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="tp-button-primary w-full py-3"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
