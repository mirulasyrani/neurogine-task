import { PRIORITIES, STATUSES } from '../utils/taskConstants';

export default function TaskForm({ 
  formData, 
  setters, 
  fieldErrors, 
  clearFieldError, 
  categories, 
  loading, 
  editingId, 
  onSubmit, 
  onCancel 
}) {
  const { title, description, priority, status, dueDate, category, tags } = formData;
  const { setTitle, setDescription, setPriority, setStatus, setDueDate, setCategory, setTags } = setters;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        {editingId ? 'Edit Task' : 'Create New Task'}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                clearFieldError('title');
              }}
              className={`w-full px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white ${
                fieldErrors.title ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {fieldErrors.title && <p className="text-red-500 text-sm mt-1">{fieldErrors.title}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                clearFieldError('category');
              }}
              list="categories"
              className={`w-full px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white ${
                fieldErrors.category ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
              placeholder="e.g., Work, Personal"
            />
            <datalist id="categories">
              {categories.map(cat => <option key={cat} value={cat} />)}
            </datalist>
            {fieldErrors.category && <p className="text-red-500 text-sm mt-1">{fieldErrors.category}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 dark:text-gray-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              clearFieldError('description');
            }}
            className={`w-full px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white ${
              fieldErrors.description ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            rows="3"
          />
          {fieldErrors.description && <p className="text-red-500 text-sm mt-1">{fieldErrors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="tag1, tag2"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Task' : 'Create Task'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
