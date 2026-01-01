import { useState, useEffect } from 'react';
import { api } from '../api';
import { toast } from 'react-toastify';
import { profileSchema } from '../validation/schemas';
import ProfileView from '../components/ProfileView';
import ProfileEdit from '../components/ProfileEdit';

export default function Profile({ token }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProfile = async () => {
    try {
      const data = await api.getProfile(token);
      setProfile(data);
      setFirstName(data.firstName || '');
      setLastName(data.lastName || '');
      setEmail(data.email);
    } catch (error) {
      toast.error('Failed to load profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearFieldError = (field) => {
    setFieldErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    
    const profileData = { firstName, lastName, email };
    
    const result = profileSchema.safeParse(profileData);
    if (!result.success) {
      const errors = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      setFieldErrors(errors);
      toast.error('Please fix validation errors');
      return;
    }
    
    setLoading(true);
    
    try {
      const updated = await api.updateProfile(token, profileData);
      setProfile(updated);
      setEditing(false);
      setFieldErrors({});
      toast.success('Profile updated successfully!');
    } catch (_error) {
      toast.error('Failed to update profile');
      console.error(_error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setFirstName(profile.firstName || '');
    setLastName(profile.lastName || '');
    setEmail(profile.email);
    setFieldErrors({});
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Profile</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {!editing ? (
          <ProfileView 
            profile={profile} 
            onEdit={() => setEditing(true)} 
          />
        ) : (
          <ProfileEdit
            firstName={firstName}
            lastName={lastName}
            email={email}
            fieldErrors={fieldErrors}
            loading={loading}
            onFirstNameChange={(e) => {
              setFirstName(e.target.value);
              clearFieldError('firstName');
            }}
            onLastNameChange={(e) => {
              setLastName(e.target.value);
              clearFieldError('lastName');
            }}
            onEmailChange={(e) => {
              setEmail(e.target.value);
              clearFieldError('email');
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
