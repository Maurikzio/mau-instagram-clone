import React, { useState } from 'react';
import './App.css';

import Post from './components/Post';



function App() {
  const [ posts, setPosts ] = useState([
    {
      username: 'aaaaa',
      caption: 'I am aaaaa',
      imageUrl: 'https://reactjs.org/logo-og.png'
    },
    {
      username: 'eeeee',
      caption: 'I am eeeee',
      imageUrl: 'https://reactjs.org/logo-og.png'
    },
  ]);
  return (
    <div className="app">
      <header className="app__header">
        <img 
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt='logo'
        />
      </header>
      {
        posts.map( (post, index) => (
          <Post key="index" username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

    </div>
  );
}

export default App;
