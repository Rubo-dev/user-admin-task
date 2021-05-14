import React from 'react'

const Likes = (props) => {
   
    return (
        <div className = "likes">
            <button onClick={props.handleLikes} className="like-btn btn btn-primary" value={props.value}>
                Like {props.like}
            </button>
        </div>
    )
}

export default Likes;
