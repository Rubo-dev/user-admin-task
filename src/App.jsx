import './App.css';
import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import Likes from './components/Likes';
import Dislikes from './components/Dislikes';
import { Link, Redirect } from 'react-router-dom';
import EditModal from './components/Modal';
import edit from './assets/images/edit.png'

const App = () => {
  const [users, setUsers] = useState(null);
  const [modalChanges, setModalChanges] = useState(null);
  const [query, setQuery] = useState(0);
  const [show, setShow] = useState(false);
  const [modalDataName, setModalDataName] = useState()
  const [modalDataEmail, setModalDataEmail] = useState()
  const [modalDataPhone, setModalDataPhone] = useState()
  const [modalDataId, setModalDataId] = useState()
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
  const onClose = (e) =>{
    setShow(false)
    setUsers(JSON.parse(localStorage.getItem(`users${query}`)))
    setModalChanges(JSON.parse(localStorage.getItem(`users${query}`)))
  }
  const openModal = (e) => {
    setShow(true)
    setModalChanges(users)
    setModalDataId(JSON.parse(e.target.value).id)
    setModalDataName(JSON.parse(e.target.value).name)
    setModalDataEmail(JSON.parse(e.target.value).email)
    setModalDataPhone(JSON.parse(e.target.value).phone)
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

  const handleName = (e) => {
    setModalChanges(users.filter((user, i, arr) => {
      if (+user.id === +e.target.id) {
        setModalDataName(e.target.value)
        arr[i].name = e.target.value;
      }
      return (arr)
    }))
  }
  const handleEmail = (e) => {
    setModalChanges(users.filter((user, i, arr) => {
      if (+user.id === +e.target.id) {
        setModalDataEmail(e.target.value)
        arr[i].email = e.target.value;
      }
      return (arr)
    }))

  }

  const handlePhone = (e) => {
    setModalChanges(users.filter((user, i, arr) => {
      if (+user.id === +e.target.id) {
        setModalDataPhone(e.target.value)
        arr[i].phone = e.target.value;
      }
      return (arr)
    }))
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

  const saveData = () => {
    localStorage.setItem(`users${query}`, JSON.stringify(modalChanges))
      setShow(false)
  }
  
  useEffect(() => {
    getData()
  }, [query])

  return (
    <div className="App">
      <Redirect to={`/page-1`} />
      <Navigation />
      <div className="container my-4">
        <h4>
          Active users(5)
        </h4>
      </div>
      <div className="table-grid mt-1 container">
        <div className="title-grid">
          <div className="font-weight-bold">Image</div>
          <div className="font-weight-bold">Full Name</div>
          <div className="font-weight-bold">Email</div>
          <div className="font-weight-bold">Phone</div>
          <div className="font-weight-bold">Likes</div>
          <div className="font-weight-bold">Dislikes</div>
          <div className="font-weight-bold">Edit</div>
        </div>
        {users ? users.map((user, index) =>
          <div key={user.name} className="users-grid">
            <div className="user-item user-image font-weight-normal">
              {user.name.includes(' ') ? user.name.split(' ')[0].slice(0, 1).toUpperCase() : user.name.slice(0,1).toUpperCase()} 
              {user.name.includes(' ') ? user.name.split(' ')[1].slice(0, 1).toUpperCase() : ''}
            </div>
            <div className="user-item user user-name font-weight-normal">{user.name}</div>
            <div className="user-item font-weight-normal">{user.email}</div>
            <div className="user-item font-weight-normal">{user.phone}</div>
            <Likes handleLikes={handleLikes} className="like-btn" value={JSON.stringify(user)} like={user.like} />
            <Dislikes handleDislike={handleDislike} className="like-btn" value={JSON.stringify(user)} dislike={user.dislike} />
            <button className="edit-btn" id={user.id} value={JSON.stringify(user)} onClick={openModal} >
              <img src={edit} alt="" style={{pointerEvents: 'none'}}/>
            </button>
            <EditModal
              userIndex = {modalDataId}
              userName={modalDataName}
              userEmail={modalDataEmail}
              userPhone={modalDataPhone}
              onClose={onClose}
              show={show}
              handleName={handleName}
              handleEmail={handleEmail}
              handlePhone={handlePhone}
              saveData={saveData}
            />
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