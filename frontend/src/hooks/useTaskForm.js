import { useState } from 'react';
import { taskSchema } from '../validation/schemas';

export function useTaskForm(initialState = {}) {
  const [title, setTitle] = useState(initialState.title || '');
  const [description, setDescription] = useState(initialState.description || '');
  const [priority, setPriority] = useState(initialState.priority || 'MEDIUM');
  const [status, setStatus] = useState(initialState.status || 'PENDING');
  const [dueDate, setDueDate] = useState(initialState.dueDate || '');
  const [category, setCategory] = useState(initialState.category || '');
  const [tags, setTags] = useState(initialState.tags || '');
  const [fieldErrors, setFieldErrors] = useState({});

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('MEDIUM');
    setStatus('PENDING');
    setDueDate('');
    setCategory('');
    setTags('');
    setFieldErrors({});
  };

  const loadTask = (task) => {
    setTitle(task.title);
    setDescription(task.description || '');
    setPriority(task.priority);
    setStatus(task.status);
    setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
    setCategory(task.category || '');
    setTags(task.tags || '');
  };

  const validateForm = () => {
    const taskData = {
      title,
      description,
      priority,
      status,
      dueDate: dueDate || '',
      category: category || '',
      tags: tags || ''
    };

    const result = taskSchema.safeParse(taskData);
    if (!result.success) {
      const errors = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      setFieldErrors(errors);
      return null;
    }

    setFieldErrors({});
    return {
      ...taskData,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      category: category || null,
      tags: tags || null
    };
  };

  const clearFieldError = (field) => {
    setFieldErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return {
    formData: { title, description, priority, status, dueDate, category, tags },
    setters: { setTitle, setDescription, setPriority, setStatus, setDueDate, setCategory, setTags },
    fieldErrors,
    resetForm,
    loadTask,
    validateForm,
    clearFieldError
  };
}
