import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { db } from './firebase.js'



function App() {
   const [ posts, setPosts ] = useState([]);

  //useEffect->runs a piece of code based on specific condition
  useEffect(() => {
    //this is where the code runs, the condition will be in the array
    //onSnapshot is a listener that will run avery time the db changes
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map( doc =>  ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])
  
  console.log(posts);

  return (
    <div className="app">
      <header className="app__header">
        <img 
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt='logo'
        />
      </header>
      {
        posts.map( ({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

    </div>
  );
}

export default App;
