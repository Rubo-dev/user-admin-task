import './App.css';
import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import Likes from './components/Likes';
import Dislikes from './components/Dislikes';
import { Link, Redirect } from 'react-router-dom';
const App = () => {
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState(0);
  const getData = () => {
    setUsers(null)
    fetch(`https://jsonplaceholder.typicode.com/users?_start=${query}&_limit=5`)
      .then(response => response.json())
      .then(json => setTimeout(() => {
        if (!localStorage.getItem('likesInit1') || !localStorage.getItem('likesInit2')) {
          json.forEach(element => {
            element.like = 5 + element.id + 7
            element.dislike = 5 + element.id
          })
        }
        if (query === 0 && !localStorage.getItem('likesInit1')) {
          localStorage.setItem('likesInit1', true)
          localStorage.setItem(`users${query}`, JSON.stringify(json))
        }
        if (query === 5 && !localStorage.getItem('likesInit2')) {
          localStorage.setItem('likesInit2', true)
          localStorage.setItem(`users${query}`, JSON.stringify(json))
        }
        setUsers(JSON.parse(localStorage.getItem(`users${query}`)))
      }, 700))
  }
  const handleLikes = (e) => {

    setUsers(users.filter((user, i, arr) => {
      if (+user.id === +JSON.parse(e.target.value).id) {
        arr[i].like++
      }
      return (arr)
    }))
    localStorage.setItem(`users${query}`, JSON.stringify(users))
  }
  const handleDislike = (e) => {
    setUsers(users.filter((user, i, arr) => {
      if (+user.id === +JSON.parse(e.target.value).id) {
        arr[i].dislike++
      }
      return (arr)
    }))
    localStorage.setItem(`users${query}`, JSON.stringify(users))
  }
  useEffect(() => {
    getData()
  }, [query])

  return (
    <div className="App">
      <Redirect to={`/page-1`} />
      <Navigation />
      <div className = "container my-4">
        <h4>
          Active users(5)
        </h4>
      </div>
      <div className="table-grid mt-1 container">
        <div className="title-grid">
          <div className = "font-weight-bold">Image</div>
          <div className = "font-weight-bold">Full Name</div>
          <div className = "font-weight-bold">Phone</div>
          <div className = "font-weight-bold">Email</div>
          <div className = "font-weight-bold">Likes</div>
          <div className = "font-weight-bold">Dislikes</div>
        </div>
        {users ? users.map((user, index) =>
          <div key={user.name} className="users-grid">
            <div className ="user-image font-weight-normal">
              {user.name.split(' ')[0].slice(0,1).toUpperCase()}
              {user.name.split(' ')[1].slice(0,1).toUpperCase()}
              </div>
            <div className = "user user-name font-weight-normal">{user.name}</div>
            <div className = "font-weight-normal">{user.phone}</div>
            <div className = "font-weight-normal">{user.email}</div>
              <Likes handleLikes={handleLikes} className="like-btn" value={JSON.stringify(user)} like={user.like} />
              <Dislikes handleDislike={handleDislike} className="like-btn" value={JSON.stringify(user)} dislike={user.dislike} />
          </div>
        ) : <Loader />}
      </div>
      <div className="pagination mt-5">
        {[{ name: '1', value: 0 }, { name: '2', value: 5 }].map(page =>
         <Link to={`/page-${page.name}`}>
           <div className={(query === page.value ? 'active ' : '') + `pagination-item`} onClick={() => { setQuery(page.value) }} key={`/page-${page.name}`}>
             {page.name}
            </div>
          </Link>)}
      </div>

    </div>
  );
}

export default App;