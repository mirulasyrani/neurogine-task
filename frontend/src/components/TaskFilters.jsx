import { PRIORITIES, STATUSES } from '../utils/taskConstants';

export default function TaskFilters({ 
  searchQuery, 
  setSearchQuery, 
  filterStatus, 
  setFilterStatus, 
  filterPriority, 
  setFilterPriority, 
  filterCategory, 
  setFilterCategory, 
  categories, 
  onSearch, 
  onReset 
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-bold mb-4 dark:text-white">Search & Filter</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Priorities</option>
          {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <div className="flex gap-2">
          <button
            onClick={onSearch}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
          <button
            onClick={onReset}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
