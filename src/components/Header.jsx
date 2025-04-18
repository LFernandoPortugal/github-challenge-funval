import SearchBar from './SearchBar';

const Header = ({ onSearch }) => {
  return (
    <header className="relative h-64 bg-gray-800 overflow-hidden">
      <img 
        src="/hero-image-github-profile.jpg" 
        alt="GitHub profile header"
        className="w-full h-full object-cover"
      />
      
      {/* Barra de búsqueda */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-6/7 w-full max-w-2xl px-4">
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;