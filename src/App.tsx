import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
