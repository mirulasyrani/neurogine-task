export const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
export const STATUSES = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

export const PRIORITY_COLORS = {
  LOW: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  HIGH: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  URGENT: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

export const STATUS_COLORS = {
  PENDING: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

export const isOverdue = (dueDate, status) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date() && status !== 'COMPLETED';
};
