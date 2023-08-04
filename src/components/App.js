import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreatePost from './CreatePost';
import Header from './Header';
import PostList from './PostList';
import Login from './Login';
import Search from './Search';
import NoMatch from './NoMatch';
import PostDetails from './PostDetails';

const App = () => {
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
