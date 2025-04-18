import SearchBar from './SearchBar';

const Header = ({ onSearch, suggestions, onSuggestionSelect, onInputChange }) => {
  return (
    <header className="relative h-64 bg-gray-800 overflow-hidden">
      <img 
        src="/hero-image-github-profile.jpg" 
        alt="GitHub profile header"
        className="w-full h-full object-cover"
      />
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-6/7 w-full max-w-2xl px-4">
        <SearchBar 
          onSearch={onSearch}
          suggestions={suggestions}
          onSuggestionSelect={onSuggestionSelect}
          onInputChange={onInputChange}
        />
      </div>
    </header>
  );
};

export default Header;