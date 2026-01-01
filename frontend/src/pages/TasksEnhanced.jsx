import { useState, useEffect } from 'react';
import { api } from '../api';
import { toast } from 'react-toastify';
import { useTaskForm } from '../hooks/useTaskForm';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';
import TaskList from '../components/TaskList';

export default function Tasks({ token }) {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const { formData, setters, fieldErrors, resetForm, loadTask, validateForm, clearFieldError } = useTaskForm();
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    loadTasks();
    loadCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await api.getTasks(token);
      setTasks(data);
    } catch (error) {
      toast.error('Failed to load tasks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await api.getCategories(token);
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchQuery) params.query = searchQuery;
      if (filterStatus) params.status = filterStatus;
      if (filterPriority) params.priority = filterPriority;
      if (filterCategory) params.category = filterCategory;
      
      const data = await api.searchTasks(token, params);
      setTasks(data);
    } catch (error) {
      toast.error('Search failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setFilterStatus('');
    setFilterPriority('');
    setFilterCategory('');
    loadTasks();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const taskData = validateForm();
    if (!taskData) {
      toast.error('Please fix validation errors');
      return;
    }

    setLoading(true);
    
    try {
      if (editingId) {
        await api.updateTask(token, editingId, taskData);
        toast.success('Task updated successfully!');
        setEditingId(null);
      } else {
        await api.createTask(token, taskData);
        toast.success('Task created successfully!');
      }
      resetForm();
      loadTasks();
      loadCategories();
    } catch (error) {
      toast.error(editingId ? 'Failed to update task' : 'Failed to create task');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    loadTask(task);
    setEditingId(task.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    setLoading(true);
    try {
      await api.deleteTask(token, id);
      toast.success('Task deleted successfully!');
      loadTasks();
    } catch (error) {
      toast.error('Failed to delete task');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (id) => {
    setLoading(true);
    try {
      await api.markTaskComplete(token, id);
      toast.success('Task marked as complete! 🎉');
      loadTasks();
    } catch (error) {
      toast.error('Failed to mark task as complete');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingId(null);
  };

  // Separate active and completed tasks
  const activeTasks = tasks.filter(task => task.status !== 'COMPLETED');
  const completedTasks = tasks.filter(task => task.status === 'COMPLETED');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <TaskForm
        formData={formData}
        setters={setters}
        fieldErrors={fieldErrors}
        clearFieldError={clearFieldError}
        categories={categories}
        loading={loading}
        editingId={editingId}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <TaskFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        categories={categories}
        onSearch={handleSearch}
        onReset={resetFilters}
      />

      {/* Active Tasks Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4 dark:text-white">
          Active Tasks ({activeTasks.length})
        </h3>
        <TaskList
          tasks={activeTasks}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMarkComplete={handleMarkComplete}
        />
      </div>

      {/* Completed Tasks Section */}
      {completedTasks.length > 0 && (
        <div className="mt-8 border-t-2 border-gray-300 dark:border-gray-700 pt-8">
          <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
            ✓ Completed Tasks ({completedTasks.length})
          </h3>
          <div className="opacity-75">
            <TaskList
              tasks={completedTasks}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onMarkComplete={handleMarkComplete}
            />
          </div>
        </div>
      )}
    </div>
  );
}
