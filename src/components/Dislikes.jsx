import React from 'react'

const Dislikes = (props) => {
    return (
        <div className = "Dislikes">
           <button onClick={props.handleDislike} className="like-btn" value={props.value}>
                Dislike {props.dislike}
            </button>
        </div>
    )
}

export default Dislikes;
