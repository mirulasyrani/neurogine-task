import { PRIORITY_COLORS, STATUS_COLORS, isOverdue } from '../utils/taskConstants';

export default function TaskList({ tasks, loading, onEdit, onDelete, onMarkComplete }) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center text-gray-500 dark:text-gray-400">
        No tasks found. Create your first task above!
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map(task => (
        <div
          key={task.id}
          className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${
            isOverdue(task.dueDate, task.status) ? 'border-l-4 border-red-500' : ''
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h4 className="text-xl font-semibold mb-2 dark:text-white">{task.title}</h4>
              {task.description && (
                <p className="text-gray-600 dark:text-gray-400 mb-3">{task.description}</p>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              {task.status !== 'COMPLETED' && (
                <button
                  onClick={() => onMarkComplete(task.id)}
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium"
                >
                  ✓ Complete
                </button>
              )}
              <button
                onClick={() => onEdit(task)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[task.status]}`}>
              {task.status.replace('_', ' ')}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${PRIORITY_COLORS[task.priority]}`}>
              {task.priority}
            </span>
            {task.category && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                {task.category}
              </span>
            )}
            {task.dueDate && (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isOverdue(task.dueDate, task.status) ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>

          {task.tags && (
            <div className="flex flex-wrap gap-1">
              {task.tags.split(',').map((tag, i) => (
                <span key={i} className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
