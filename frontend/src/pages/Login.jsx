import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api'
import { loginSchema } from '../validation/schemas'

export default function Login({ setToken }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setFieldErrors({})
    
    // Validate with Zod
    const result = loginSchema.safeParse({ username, password })
    if (!result.success) {
      const errors = {}
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message
      })
      setFieldErrors(errors)
      return
    }
    
    try {
      const data = await api.login(username, password)
      setToken(data.token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Login</h2>
        {error && <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setFieldErrors(prev => ({ ...prev, username: undefined }))
              }}
              className={`w-full px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white ${
                fieldErrors.username ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {fieldErrors.username && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.username}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setFieldErrors(prev => ({ ...prev, password: undefined }))
              }}
              className={`w-full px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white ${
                fieldErrors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
            )}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Don't have an account? <Link to="/register" className="text-blue-500 dark:text-blue-400">Register</Link>
        </p>
      </div>
    </div>
  )
}
