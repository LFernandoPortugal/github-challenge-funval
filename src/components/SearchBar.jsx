import SearchIcon from '../assets/Search.svg';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search GitHub username..."
          className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <img 
          src={SearchIcon} 
          alt="Search" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
        />
      </div>
    </form>
  );
};

export default SearchBar;