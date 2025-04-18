import { useState, useEffect } from 'react';
import axios from 'axios';
import { data } from 'react-router';

const useGitHub = (username) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
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

    fetchData();
  }, [username]);
  

  return { profile, repos, loading, error };
};

export default useGitHub;