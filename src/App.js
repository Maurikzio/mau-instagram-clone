import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { db, auth } from './firebase.js'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import PostUpload from './components/PostUpload';
import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [ posts, setPosts ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const [ openSignIn, setOpenSignIn] = useState(false)
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ user, setUser ] = useState(null);
  const [ addPost, setAddPost ] = useState(false)

  useEffect(() => {
    //gonna listen any single time the authentication change happens(login or logout)
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        //user has logged in
        //it will survive the refresh
        // console.log(authUser);
        setUser(authUser);

        // if(authUser.displayName){
        //   //dont update username
        // }else{
        //   //if we just created someone, go to the authUser we login with and update the username
        //   return authUser.updateProfile({
        //     displayName: username
        //   })
        // }
      }else{
        //user has logged out
        setUser(null)
      }
    })

    return () => {
      //perfom some cleanup action
      unsubscribe();
    }
  }, [user, username]);

  //useEffect->runs a piece of code based on specific condition
  useEffect(() => {
    //this is where the code runs, the condition will be in the array
    //onSnapshot is a listener that will run avery time the db changes
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map( doc =>  ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, []);

  const onSignUp = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))

      setOpen(false)
  }

  const onSignIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error))

    setOpenSignIn(false);
    
  }


  return (
    <div className="app">

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img 
            src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
            alt='logo'
          />
          </center>

          <form className='app__signupForm'>
            <Input
                placeholder='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button type='submit' onClick={onSignUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      {/* login modal */}
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img 
            src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
            alt='logo'
          />
          </center>

          <form className='app__signupForm'>
            <Input
              placeholder='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button type='submit' onClick={onSignIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <Modal open={addPost} onClose={() => setAddPost(false)}>
        {/* {//optional chaining
            user?.displayName ? (
            <PostUpload username={user.displayName}/>
          ) : (
            <h3>Srry you need to log in to upload..</h3>
          )
        } */}
        <div style={modalStyle} className={classes.paper}>
          {//optional chaining
              user?.displayName ? (
              <PostUpload username={user.displayName}/>
            ) : (
              <h3>Srry you need to log in to upload..</h3>
            )
          } 
        </div>
      </Modal>

      <header className="app__header">
        <img 
          className='app__headerImage'
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt='logo'
        />
        <div className='app__headerAddPost'>
          <button className='app__addPostBtn' disabled={addPost} onClick={() => setAddPost(true)} >+</button>
        </div>
        <div className='app__headerAuthBtns'>
          {
            user ? (
              <Button onClick={() => auth.signOut()}>Log Out</Button>
            ) : (
              <div className="app__loginContainer">
                <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                <Button onClick={() => setOpen(true)}>Sign Up</Button>
              </div>
            )
          }
        </div>
      </header>
      
      <div className='app__posts'>
          <div className='app__postsLeft'>
            {
              posts.map( ({id, post}) => (
                <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
              ))
            }
          </div>
          <div className='app__postsRight'>
            <InstagramEmbed
              // url='https://instagr.am/p/Zw9o4/'
              url='https://www.instagr.am/p/ob0FolB1rI/'
              // url='https://www.instagram.com/p/ob0FolB1rIRQaqQu7bGyQr0Y8P7c_I-GBEU280/'
              maxWidth={320}
              hideCaption={false}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            />
          </div>
      </div>
    </div>
  );
}

export default App;
