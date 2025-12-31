import { useState } from 'react'

export default function TaskForm({ initial = {}, onSave }) {
  const [title, setTitle] = useState(initial.title || '')
  const [description, setDescription] = useState(initial.description || '')
  const [status, setStatus] = useState(initial.status || 'PENDING')
  const [dueDate, setDueDate] = useState(initial.dueDate || '')

  const submit = (e) => {
    e.preventDefault()
    onSave({ title, description, status, dueDate: dueDate || null })
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <input className="w-full border p-2 rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="w-full border p-2 rounded" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <select className="w-full border p-2 rounded" value={status} onChange={e=>setStatus(e.target.value)}>
        <option>PENDING</option>
        <option>IN_PROGRESS</option>
        <option>DONE</option>
      </select>
      <input className="w-full border p-2 rounded" type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
      <button className="bg-green-600 text-white px-3 py-2 rounded">Save</button>
    </form>
  )
}
