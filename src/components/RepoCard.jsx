import StarIcon from '../assets/Star.svg';
import NestingIcon from '../assets/Nesting.svg';

const RepoCard = ({ repo }) => {
  return (
    <a 
      href={repo.html_url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-gradient-to-r from-[#111729] to-[#1d1b48] rounded-xl p-6 text-white hover:opacity-90 transition-opacity h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold truncate">{repo.name}</h3>
        <span className="text-xs bg-gray-700 px-2 py-1 rounded-full flex-shrink-0">
          {repo.private ? 'Private' : 'Public'}
        </span>
      </div>
      
      <p className="text-gray-400 text-sm mb-6 line-clamp-2">{repo.description || 'No description available'}</p>
      
      <div className="flex flex-wrap gap-4">
        {repo.language && (
          <span className="flex items-center text-gray-400 text-sm">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
            {repo.language}
          </span>
        )}
        <span className="flex items-center text-gray-400 text-sm">
          <img src={StarIcon} alt="Stars" className="w-4 h-4 mr-1" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center text-gray-400 text-sm">
          <img src={NestingIcon} alt="Forks" className="w-4 h-4 mr-1" />
          {repo.forks_count}
        </span>
        <span className="flex items-center text-gray-400 text-sm">
          Updated {formatDate(repo.updated_at)}
        </span>
      </div>
    </a>
  );
};

// Función auxiliar para formatear fecha
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default RepoCard;