import React,{useState} from 'react'

const Likes = () => {
    const [likes,setLikes] = useState(Math.floor(Math.random() * (100 - 0) + 0));
   
    return (
        <div className = "likes">
            <span>
                <button onClick = {() => setLikes(likes+1)}>Like</button>
                <span>{likes}</span>
            </span>
        </div>
    )
}

export default Likes;
