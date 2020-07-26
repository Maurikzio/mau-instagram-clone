import React from 'react';
import './post-styles.css';
import Avatar from  '@material-ui/core/Avatar';

const Post = ({ username, caption, imageUrl}) => {
    return (
        <div className='post'>
            {/* heeader -> avatar + username */}
            <div className='post__header'>
                <Avatar
                    className='post__avatar'
                    alt='Maurikzio'
                    src='/static/images/avatar/1.jpg'
                />
                <h3>{username}</h3>
            </div>

            {/* image */}
            <img className='post__image' src={imageUrl}/>

            {/* username + caption */}
            <h4 className='post__text'> <strong>{username}:</strong> {caption}</h4>
        </div>
    )
}

export default Post;