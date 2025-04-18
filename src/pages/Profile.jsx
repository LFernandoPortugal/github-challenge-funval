import { useParams, Link } from 'react-router';
import { useNavigate } from 'react-router';
import useGitHub from '../hooks/useGitHub';
import Header from '../components/Header';
import ProfileSection from '../components/ProfileSection';
import ReposGrid from '../components/ReposGrid';
import RateLimitAlert from '../components/RateLimitAlert';


const Profile = () => {
  const { username } = useParams();
  const { profile, repos, loading, error, searchUsers, suggestions, rateLimit } = useGitHub(username);
  const navigate = useNavigate();

  const handleSearch = (newUsername) => {
    navigate(`/profile/${newUsername}`);
  };

  const handleSuggestionSelect = (newUsername) => {
    navigate(`/profile/${newUsername}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header onSearch={handleSearch}
          suggestions={suggestions}
          onSuggestionSelect={handleSuggestionSelect}
          onInputChange={searchUsers}/>
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Go back to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Header onSearch={handleSearch}
          suggestions={suggestions}
          onSuggestionSelect={handleSuggestionSelect}
          onInputChange={searchUsers}/>
      
      <RateLimitAlert rateLimit={rateLimit} />

      <main className="container mx-auto px-4 py-8 md:mx-5 md:max-w-4xl lg:mx-auto">
        
        
        <ProfileSection profile={profile} />
        
        {/* <h2 className="text-2xl font-bold mb-6">Repositories</h2> */}
        <ReposGrid repos={repos} />
      </main>
      <Link to="/" className="inline-flex items-center text-blue-500 hover:underline mb-6">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to search
        </Link>
    </div>
  );
};

export default Profile;