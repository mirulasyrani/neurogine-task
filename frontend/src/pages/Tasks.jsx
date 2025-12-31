import { useEffect, useMemo, useState } from 'react'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import TaskForm from '../components/TaskForm'

export default function Tasks() {
  const { token, logout } = useAuth()
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [editing, setEditing] = useState(null)

  const filtered = useMemo(() => {
    return items.filter(i =>
      (!q || i.title.toLowerCase().includes(q.toLowerCase())) &&
      (!status || i.status === status)
    )
  }, [items, q, status])

  const load = async () => {
    const res = await api('/api/tasks?page=0&size=100', { token })
    setItems(res.content)
  }

  useEffect(() => { load() }, [])

  const create = async (data) => {
    const t = await api('/api/tasks', { method: 'POST', body: data, token })
    setItems(prev => [t, ...prev])
    setEditing(null)
  }

  const update = async (id, data) => {
    const t = await api(`/api/tasks/${id}`, { method: 'PUT', body: data, token })
    setItems(prev => prev.map(x => x.id === id ? t : x))
    setEditing(null)
  }

  const del = async (id) => {
    await api(`/api/tasks/${id}`, { method: 'DELETE', token })
    setItems(prev => prev.filter(x => x.id !== id))
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <button className="text-sm text-red-600" onClick={logout}>Logout</button>
      </header>

      <div className="grid grid-cols-3 gap-2">
        <input className="border p-2 rounded" placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} />
        <select className="border p-2 rounded" value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="">All</option>
          <option>PENDING</option>
          <option>IN_PROGRESS</option>
          <option>DONE</option>
        </select>
        <button className="bg-blue-600 text-white rounded" onClick={()=>setEditing({})}>New Task</button>
      </div>

      {editing && (
        <div className="p-4 border rounded">
          <TaskForm initial={editing} onSave={data => editing.id ? update(editing.id, data) : create(data)} />
        </div>
      )}

      <ul className="space-y-2">
        {filtered.map(t => (
          <li key={t.id} className="border rounded p-3">
            <div className="font-semibold">{t.title}</div>
            <div className="text-sm text-gray-600">{t.description}</div>
            <div className="text-xs">Status: {t.status} | Due: {t.dueDate || '-'}</div>
            <div className="space-x-2 mt-2">
              <button className="text-blue-600" onClick={()=>setEditing(t)}>Edit</button>
              <button className="text-red-600" onClick={()=>del(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
