'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, setCurrentUser } from '@/lib/storage'

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <div>
          <div className="mx-auto h-20 w-20">
            <Link href="/">
              <img src="/kashless.png" alt="Kashless" className="h-20 w-auto mx-auto" />
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-[#0052ff] hover:text-[#003ecf] underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
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
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
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
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
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
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
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
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052ff] focus:border-transparent"
              placeholder="Password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-full text-white bg-[#0052ff] hover:bg-[#003ecf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052ff]"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
