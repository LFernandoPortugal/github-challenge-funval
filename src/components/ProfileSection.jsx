import StarIcon from '../assets/Star.svg';
import NestingIcon from '../assets/Nesting.svg';
import ShieldIcon from '../assets/Shield.svg';

const ProfileSection = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="relative mb-12 px-5">
      <div className="flex items-start gap-8">
        {/* Avatar */}
        <div className="absolute -top-25 left-5 z-10 bg-black border-10 border-gray-800 rounded-2xl">
        <img
          src={profile.avatar_url}
          alt={`${profile.login}'s avatar`}
          className="w-32 h-32 rounded-full border-4 border-gray-900"
        />
      </div>
        
        {/* Detalles del perfil */}
        <div className="flex-1 mt-16 md:mt-0">
          
          {/* Stats */}
          <div className="flex gap-4 mb-6 flex-wrap md:ml-40">
            {/* <div className="bg-gray-800 rounded-lg p-4 flex-1">
              <p className="text-2xl font-bold">{profile.public_repos}</p>
              <p className="text-gray-400 text-sm">Repositories</p>
            </div> */}
            <div className="bg-gray-900 rounded-lg py-2 px-4 flex items-center gap-4 h-14 justify-evenly">
              <p className="text-gray-200 text-md">Followers</p>
              <span className='border-l border-gray-600 h-full'></span>
              <p className="text-2xl">{profile.followers}</p>
            </div>
            <div className="bg-gray-900 rounded-lg py-2 px-4 flex items-center gap-4 h-14 justify-evenly">
              <p className="text-gray-200 text-md">Following</p>
              <span className='border-l border-gray-600 h-full'></span>
              <p className="text-2xl">{profile.following}</p>
            </div>
            {profile.location && (<div className="text-gray-200 bg-gray-900 rounded-lg py-2 px-4 flex items-center gap-4 h-14 justify-evenly">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg><span>Location</span> 
              <span className='border-l border-gray-600 h-full'></span>
              {profile.location}
            </div>)}
          </div>
          

          {/* Nombre */}
          <div className="flex justify-between items-start mb-4 mt-8">
            <div>
              <h2 className="text-2xl font-bold text-white">{profile.name || profile.login}</h2>
              <p className="text-gray-400">@{profile.login}</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-300 mb-6">{profile.bio || 'No bio available'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;