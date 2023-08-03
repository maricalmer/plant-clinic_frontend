import React from 'react';
import CreatePost from './CreatePost';
import Header from './Header';
import PostList from './PostList';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Search from './Search';
import NoMatch from './NoMatch';
import PostDetails from './PostDetails';
import { Bus } from '../utils/bus';

const App = () => {
  window.flash = () => Bus.emit('flash');
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/posts/:slug" element={<PostDetails />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
