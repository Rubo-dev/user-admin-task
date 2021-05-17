import React from 'react'

const Dislikes = (props) => {
    return (
        <div className = "user-item Dislikes">
           <button onClick={props.handleDislike} className="like-btn btn btn-danger" value={props.value}>
                Dislike {props.dislike}
            </button>
        </div>
    )
}

export default Dislikes;
