import { useState, useEffect, useRef } from 'react';
import SearchIcon from '../assets/Search.svg';

const SearchBar = ({ onSearch, suggestions, onSuggestionSelect, onInputChange }) => {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    onInputChange(value);
    setShowSuggestions(value.length > 1);
  };

  const handleSuggestionClick = (username) => {
    setInput(username);
    onSuggestionSelect(username);
    setShowSuggestions(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onFocus={() => input.length > 1 && setShowSuggestions(true)}
          placeholder="Search GitHub username..."
          className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <img 
          src={SearchIcon} 
          alt="Search" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {suggestions.map((user) => (
            <div
              key={user.id}
              className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center"
              onClick={() => handleSuggestionClick(user.login)}
            >
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-8 h-8 rounded-full mr-3"
              />
              <span className="text-white">{user.login}</span>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;