import { useEffect } from 'react';

const RateLimitAlert = ({ rateLimit }) => {
  useEffect(() => {
    if (rateLimit && rateLimit.remaining === 0) {
      const alertMessage = `You have exceeded GitHub API rate limit. 
        Please wait ${rateLimit.minutesToWait} minutes before trying again.`;
      
      alert(alertMessage);
    }
  }, [rateLimit]);

  return null;
};

export default RateLimitAlert;