import React from 'react'

const Likes = (props) => {
   
    return (
        <div className = "likes">
            <button onClick={props.handleLikes} className="like-btn" value={props.value}>
                Like {props.like}
            </button>
        </div>
    )
}

export default Likes;
