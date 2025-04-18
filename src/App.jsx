import { Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Profile from './pages/Profile';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
  );
};

export default App;