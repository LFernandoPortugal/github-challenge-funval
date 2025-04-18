import { useState, useEffect } from 'react';
import axios from 'axios';

const useGitHub = (username) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [rateLimit, setRateLimit] = useState(null);

  const handleRateLimit = (headers) => {
    if (headers['x-ratelimit-remaining'] === '0') {
      const resetTime = new Date(headers['x-ratelimit-reset'] * 1000);
      const now = new Date();
      const minutesToWait = Math.ceil((resetTime - now) / 60000);
      
      setRateLimit({
        remaining: 0,
        reset: resetTime,
        minutesToWait
      });
      
      console.log(`Rate limit exceeded. Try again in ${minutesToWait} minutes.`);
      return true;
    }
    return false;
  };

  const searchUsers = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${query}&per_page=5`
      );
      
      if (handleRateLimit(response.headers)) return;
      
      setSuggestions(response.data.items);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403 && err.response.headers['x-ratelimit-remaining'] === '0') {
          handleRateLimit(err.response.headers);
        }
      }
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
      
      if (handleRateLimit(profileRes.headers)) return;
      if (handleRateLimit(reposRes.headers)) return;
      
      setProfile(profileRes.data);
      setRepos(reposRes.data);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403 && err.response.headers['x-ratelimit-remaining'] === '0') {
          handleRateLimit(err.response.headers);
        }
      }
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

  return { profile, repos, loading, error, suggestions, searchUsers, rateLimit };
};

export default useGitHub;