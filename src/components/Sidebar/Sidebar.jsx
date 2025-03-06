import { Link, NavLink } from "react-router-dom"
import style from "./Sidebar.module.css"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useEffect, useState } from "react";

const getUserId = async () => {
  const response = await fetch("http://localhost:4000/api/user", {
    headers : { Authorization : `Bearer ${localStorage.getItem('access_token')}`}
  })
  const data = await response.json()
  console.log(data);  
} // jwt해독해서 userId를 얻고 navigateTo("/userId")하게 만드는게 목적인데 서버에게 요청하고 받는건 너무 과한거아닌가?? 다른 유저 정보 불러오는것도아니고

function Sidebar() {
  console.log('sidebar랜더링');
  // const userId = "peter" // 불러온 유저 닉네임이 들어가있어야함
  // 위의 peter를 어떻게 얻냐가 문제 1) 서버에 토큰보내서 userId 받아오기?? 2) 클라에서 decode해서 추출하기??
  const [userID, setUserID] = useState(null)

  const getUserId = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/user", {
        headers : { Authorization : `Bearer ${localStorage.getItem("access_token")}`}
      })
      const data = await response.json()
      console.log(data);
      const userID = data.userID
      setUserID(userID)
      // return userID
    } catch(err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUserId()
    // const {userID} = await getUserId()
    // setUserID(userID)
  }, [])
  return(
    <nav>
      <div className={style.logo}>
        <Link to="/">
        Instagram
        </Link>
      </div>
      <ul className={style.navs}>
        <li>
          <Link to="/">
            <HomeOutlinedIcon fontSize="large"/>홈
          </Link>
        </li>
        <li>
          <Link to="/search">
            <SearchSharpIcon fontSize="large"/>검색
          </Link>
        </li>
        <li>
          <Link to="/create">
            <AddCircleOutlineOutlinedIcon fontSize="large"/>만들기
          </Link>
        </li>
        <li>
          <Link to= {`/${userID}`} state={{auth : true}}>
          <PersonOutlinedIcon fontSize="large"/>프로필
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar