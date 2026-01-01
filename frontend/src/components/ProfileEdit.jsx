export default function ProfileEdit({ 
  firstName, 
  lastName, 
  email, 
  fieldErrors, 
  loading,
  onFirstNameChange, 
  onLastNameChange, 
  onEmailChange, 
  onSubmit, 
  onCancel 
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-300">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={onFirstNameChange}
            className={`w-full px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white ${
              fieldErrors.firstName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
          />
          {fieldErrors.firstName && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-300">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={onLastNameChange}
            className={`w-full px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white ${
              fieldErrors.lastName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
          />
          {fieldErrors.lastName && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            className={`w-full px-3 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white ${
              fieldErrors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
