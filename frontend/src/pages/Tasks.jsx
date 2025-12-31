import { useState, useEffect } from 'react'
import { api } from '../api'

export default function Tasks({ token, logout }) {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      const data = await api.getTasks(token)
      setTasks(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await api.updateTask(token, editingId, { title, description, status: 'PENDING' })
        setEditingId(null)
      } else {
        await api.createTask(token, { title, description, status: 'PENDING' })
      }
      setTitle('')
      setDescription('')
      loadTasks()
    } catch (err) {
      console.error(err)
    }
  }

  const handleEdit = (task) => {
    setTitle(task.title)
    setDescription(task.description)
    setEditingId(task.id)
  }

  const handleDelete = async (id) => {
    try {
      await api.deleteTask(token, id)
      loadTasks()
    } catch (err) {
      console.error(err)
    }
  }

  const updateStatus = async (task, newStatus) => {
    try {
      await api.updateTask(token, task.id, { ...task, status: newStatus })
      loadTasks()
    } catch (err) {
      console.error(err)
    }
  }

  const filteredTasks = filter === 'ALL' 
    ? tasks 
    : tasks.filter(t => t.status === filter)

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 mb-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Task' : 'Add New Task'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                {editingId ? 'Update' : 'Add'} Task
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setTitle('')
                    setDescription('')
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded ${filter === 'ALL' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('PENDING')}
            className={`px-4 py-2 rounded ${filter === 'PENDING' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('IN_PROGRESS')}
            className={`px-4 py-2 rounded ${filter === 'IN_PROGRESS' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter('DONE')}
            className={`px-4 py-2 rounded ${filter === 'DONE' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            Done
          </button>
        </div>

        <div className="space-y-4">
          {filteredTasks.map(task => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                  <div className="mt-2">
                    <select
                      value={task.status}
                      onChange={(e) => updateStatus(task, e.target.value)}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="DONE">Done</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
