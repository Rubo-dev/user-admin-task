import './App.css';
import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import { Pagination } from 'react-bootstrap';
import Navigation from './components/Navigation';

function App() {

  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState(0);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  const getData = () => {
    setUsers(null)
    fetch(`https://jsonplaceholder.typicode.com/users?_start=${query}&_limit=6`)
      .then(response => response.json())
      .then(json => setTimeout(() => {
        createLikesData(json)
        setUsers(json)
      }, 700))
  }

  const createLikesData = (users) => {
    users.map(user => {
      likes.push({
        id: user.id,
        like: Math.floor(Math.random() * (100 - 0) + 0),
        dislike: Math.floor(Math.random() * (100 - 0) + 0)
      })
    })
  }

  const handleLikes = (event) => {
    likes.forEach((like) => {
      if (+like.id === +event.target.value) {
        like.like++
      }
    })
   return likes
  }
  const handleDislikes = (e) =>{
    likes.forEach((dislike) =>{
      if (+dislike.id === +e.target.value){
        dislike.dislike++
      }
    })
    return likes;
  }

  useEffect( () => {
    getData()
  }, [query])

  return (
    <div className="App">
      <Navigation />
      <div className="table-grid">
      {users ? users.map((user, index) =>
        <div key={user.name} className="users-grid">
          <div>{user.id}</div>
          <div>{user.name}</div>
          <div>{user.phone}</div>
          <div>{user.email}</div>
          <div>
            <button className = "like-btn" onClick={handleLikes} value={likes[index].id}>
              Like {likes[index].like}
            </button>
          </div>
          <div>
            <button className = "like-btn" onClick = {handleDislikes} value = {likes[index].id}>
              Dislike {likes[index].dislike}
            </button>
          </div>
          <button className = "like-btn">
            Edit user
          </button>
        </div>

      ) : <Loader />}
      </div>
      <div className="pagination mt-5">
        {[1, 2, 3].map(page => <div
         className={(query === page ? 'active ' : '') + `pagination-item`}
         onClick={() => { setQuery(page) }} key={page}>{page}</div>)}
      </div>
    </div>
  );
}

export default App;