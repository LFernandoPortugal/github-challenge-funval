import RepoCard from './RepoCard';

const ReposGrid = ({ repos }) => {
  if (!repos || repos.length === 0) {
    return <p className="text-gray-400 text-center py-8">No repositories found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

export default ReposGrid;