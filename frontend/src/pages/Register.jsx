import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api/client'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api('/api/auth/register', { method: 'POST', body: { username, email, password } })
      navigate('/login')
    } catch (err) {
      setError('Registration failed')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold">Register</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <input className="w-full border p-2 rounded" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Register</button>
        <div className="text-sm">Have an account? <Link to="/login" className="text-blue-600">Login</Link></div>
      </form>
    </div>
  )
}
