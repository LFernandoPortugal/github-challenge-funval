import { useState, useEffect } from 'react';
import axios from 'axios';

const useGitHub = (username) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const searchUsers = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${query}&per_page=5`
      );
      setSuggestions(response.data.items);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setSuggestions([]);
    }
  };

  const fetchUserData = async (username) => {
    if (!username) return;

    setLoading(true);
    setError(null);
    setSuggestions([]);
    
    try {
      const [profileRes, reposRes] = await Promise.all([
        axios.get(`https://api.github.com/users/${username}`),
        axios.get(`https://api.github.com/users/${username}/repos`),
      ]);
      
      setProfile(profileRes.data);
      setRepos(reposRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching data');
      setProfile(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserData(username);
    }
  }, [username]);

  return { profile, repos, loading, error, suggestions, searchUsers };
};

export default useGitHub;