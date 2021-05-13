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
      <div className="table-grid">
        {users ? users.map((user, index) =>
          <div key={user.name} className="users-grid">
            <div>{user.id}</div>
            <div>{user.name}</div>
            <div>{user.phone}</div>
            <div>{user.email}</div>
            <div>
              {/* <button handleLikes={handleLikes} className="like-btn" value={JSON.stringify(user)} like={user.like}>
              </button> */}
              <Likes handleLikes={handleLikes} className="like-btn" value={JSON.stringify(user)} like={user.like} />
            </div>
            <div>
              {/* <button handleDislike={handleDislike} className="like-btn" value={JSON.stringify(user)} dislike={user.like}>
              </button> */}
              <Dislikes handleDislike={handleDislike} className="like-btn" value={JSON.stringify(user)} dislike={user.dislike} />
            </div>
            <button className="like-btn">
              Edit user
          </button>
          </div>
        ) : <Loader />}
      </div>
      <div className="pagination mt-5">
        {[{ name: '1', value: 0 }, { name: '2', value: 5 }].map(page => <Link to={`/page-${page.name}`}><div
          className={(query === page ? 'active ' : '') + `pagination-item`}
          onClick={() => { setQuery(page.value) }} key={page.name}>{page.name}</div></Link>)}
      </div>

    </div>
  );
}

export default App;