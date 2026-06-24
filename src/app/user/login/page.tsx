'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, setCurrentUser } from '@/lib/storage'
import BrandMark from '@/components/BrandMark'

interface User {
  id: string
  name: string
  email: string
  phone: string
}

export default function UserLoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const existingUser = getCurrentUser()
    if (existingUser) {
      router.push('/user/dashboard')
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('insta_users') || '[]')
      const user = users.find(
        (u: any) => u.email === formData.email && u.password === formData.password
      )

      if (user) {
        // Omit password when storing in session
        const { password, ...userWithoutPassword } = user
        setCurrentUser(userWithoutPassword)
        router.push('/user/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } else {
      // Signup logic
      const users = JSON.parse(localStorage.getItem('insta_users') || '[]')
      
      // Check if user already exists
      const existingUser = users.find((u: any) => u.email === formData.email)
      if (existingUser) {
        setError('User with this email already exists!')
        return
      }

      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }

      localStorage.setItem('insta_users', JSON.stringify([...users, newUser]))
      
      // Auto login after signup
      const { password, ...userWithoutPassword } = newUser
      setCurrentUser(userWithoutPassword)
      router.push('/user/dashboard')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="tp-card w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <div className="mb-5 flex justify-center">
            <BrandMark />
          </div>
          <h2 className="text-center text-3xl font-semibold tracking-[-0.03em] text-white">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-center text-sm text-[#737780]">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-[#ff825c] underline hover:text-[#ff9473]"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-[#ff825c]/35 bg-[#ff825c]/10 px-4 py-3 text-sm text-[#ff825c]">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="tp-input block px-3 py-3"
                placeholder="Full Name"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
                className="tp-input block px-3 py-3"
              placeholder="Email address"
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="tp-input block px-3 py-3"
                placeholder="Phone Number"
              />
            </div>
          )}

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
                className="tp-input block px-3 py-3"
              placeholder="Password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="tp-button-primary w-full px-4 py-3 text-sm"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
