import { z } from 'zod';

// Authentication Schemas
export const loginSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username cannot exceed 50 characters'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password cannot exceed 100 characters')
});

export const registerSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username cannot exceed 50 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, hyphens, and underscores'),
  email: z.string()
    .email('Invalid email address')
    .max(100, 'Email cannot exceed 100 characters'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password cannot exceed 100 characters')
    .regex(/[A-Za-z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
});

// Task Schemas
export const taskSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title cannot exceed 200 characters')
    .trim(),
  description: z.string()
    .max(1000, 'Description cannot exceed 1000 characters')
    .optional()
    .or(z.literal('')),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'], {
    errorMap: () => ({ message: 'Invalid priority level' })
  }),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], {
    errorMap: () => ({ message: 'Invalid status' })
  }),
  dueDate: z.string()
    .optional()
    .or(z.literal(''))
    .refine((date) => {
      if (!date || date === '') return true;
      const parsed = new Date(date);
      return !isNaN(parsed.getTime());
    }, 'Invalid date format'),
  category: z.string()
    .max(100, 'Category cannot exceed 100 characters')
    .optional()
    .or(z.literal('')),
  tags: z.string()
    .max(500, 'Tags cannot exceed 500 characters')
    .optional()
    .or(z.literal(''))
});

// Profile Schema
export const profileSchema = z.object({
  firstName: z.string()
    .max(50, 'First name cannot exceed 50 characters')
    .optional()
    .or(z.literal('')),
  lastName: z.string()
    .max(50, 'Last name cannot exceed 50 characters')
    .optional()
    .or(z.literal('')),
  email: z.string()
    .email('Invalid email address')
    .max(100, 'Email cannot exceed 100 characters')
});

// Search Filter Schema
export const searchFilterSchema = z.object({
  query: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  category: z.string().optional()
});

// Helper function to format Zod errors
export const formatZodErrors = (error) => {
  const errors = {};
  error.issues.forEach((issue) => {
    const path = issue.path[0];
    if (path && !errors[path]) {
      errors[path] = issue.message;
    }
  });
  return errors;
};
