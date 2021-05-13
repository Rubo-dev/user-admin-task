import React,{useState} from 'react'

const Dislikes = () => {

    const [dislikes,setDislikes] = useState(Math.floor(Math.random() * (100 - 0) + 0));

    return (
        <div className = "Dislikes">
            <span>
                <button onClick = {() => setDislikes(dislikes+1)}>Dislike</button>
                <span>{dislikes}</span>
            </span>
        </div>
    )
}

export default Dislikes;
