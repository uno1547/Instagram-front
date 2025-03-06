import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

import Sidebar from './components/Sidebar/Sidebar'
import HomePage from "./pages/HomePage";
import SearchPage from './pages/SearchPage';
import CreatePage from './pages/CreatePage';
import ProfilePage from './pages/ProfilePage'

import LoginForm from "./components/LoginForm/LoginForm"
import SignupForm from './components/SignupForm/SignupForm'

import Test from './components/Test/Test'

function App() {
  console.log('App랜더링');
  
  const tokenAtClient = () => {
    return localStorage.getItem("access_token")
    // 이게 서버에 요청보내고 응답 받는거라면?
  }
  const [isAuth, setIsAuth] = useState(tokenAtClient())

  // const [userID, setUserID] = useState(null)
  
  // console.log(userID);
  // const getUserID = async () => {
  //   console.log('getUserID호출');
  //   const token = localStorage.getItem("access_token")
  //   if (!token) {
  //     console.log('토큰없음');
  //     return
  //   }

  //   try {
  //     const response = await fetch("http://localhost:4000/api/user", {
  //       headers : { Authorization : `Bearer ${token}`}
  //     })
  //     const data = await response.json()
  //     console.log(data);
  //     const userID = data.userID
  //     console.log(userID, "로 setState");
  //     setUserID(userID)
  //     // return userID
  //   } catch(err) {
  //     console.log(err);
  //     setUserID(null)
  //   }    
  // }

  // useEffect(() => {
  //   console.log('effect');
  //   getUserID()
  // }, [])

  return (
    <Router>
      {isAuth ? (
        // 인증된 유저들라우팅
        <>
          <Sidebar/>
          <Routes>
            <Route path='/' element = {<HomePage/>}></Route>
            <Route path='/search' element = {<SearchPage/>}></Route>
            <Route path='/create' element = {<CreatePage/>}></Route>
            <Route path='/:userId' element = {<ProfilePage/>}></Route>
            {/* 만약 /create 이면 ㅋㅋㅋㅋ 이게 검색페이지 라우팅인지 닉네임이 create인 유저의 ProfilePage인지 어캐 구분함 */}
            <Route path='test' element = {<Test/>}></Route>
            <Route path='*' element = {<Navigate to="/"/>}></Route> 
          </Routes>
        </>        
      ) : (
        // 로그인 안돼어있을때 라우팅 이러면 처음에 잠깐 Sidebar안보였다가 보이는셈인가
        <Routes>
          {/* <Route path='/' element = {<LoginForm setAuth = {setIsAuth}/>}></Route> */}
          <Route path='/' element = {<LoginForm/>}></Route>
          <Route path='/signup' element = {<SignupForm/>}></Route> 
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>  
  )
}

export default App
