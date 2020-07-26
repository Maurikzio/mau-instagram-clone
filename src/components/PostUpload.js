import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { storage, db } from '../firebase';
import firebase from 'firebase';

const PostUpload = ({ username }) => {
    const [ caption, setCaption ] = useState('');
    // const [ url, setUrl ] = useState('');
    const [ progress, setProgress ] = useState(0);
    const [ image, setImage ] = useState(null);

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //error function
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete function
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //here we post the img inisde the db
                        db.collection('posts').add({
                            //using the same time for sorting posts
                          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                          caption: caption,
                          imageUrl: url,
                          username: username
                        });

                        setProgress(0);
                        setCaption('');
                        setImage(null);
                    })
            }
        )
    }

    return (
        <div>
            <progress value={progress} max='100'/>
            <input type='text' placeholder='Enter caption..' value={caption} onChange={(e) => setCaption(e.target.value)}/>
            <input type='file' onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default PostUpload;