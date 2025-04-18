import Header from '../components/Header';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Header onSearch={handleSearch} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Search for a GitHub user</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Enter a GitHub username to view their profile, repositories, and activity.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;