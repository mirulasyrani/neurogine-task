export default function ProfileView({ profile, onEdit }) {
  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
          {profile.firstName?.[0] || profile.username[0].toUpperCase()}
        </div>
        <div className="ml-6">
          <h2 className="text-2xl font-bold dark:text-white">
            {profile.firstName && profile.lastName
              ? `${profile.firstName} ${profile.lastName}`
              : profile.username}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">@{profile.username}</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Email</label>
          <p className="text-lg dark:text-white">{profile.email}</p>
        </div>
        
        {profile.firstName && (
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">First Name</label>
            <p className="text-lg dark:text-white">{profile.firstName}</p>
          </div>
        )}
        
        {profile.lastName && (
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Last Name</label>
            <p className="text-lg dark:text-white">{profile.lastName}</p>
          </div>
        )}
      </div>

      <button
        onClick={onEdit}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Edit Profile
      </button>
    </div>
  );
}
