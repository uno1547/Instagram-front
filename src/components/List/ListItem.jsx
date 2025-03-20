import style from './ListItem.module.css'
import Button from '../Button/Button'
import Skeleton from '../Skeleton/Skeleton'
import { Link } from 'react-router-dom'
import { useState, useContext, use } from 'react'
import { UserContext } from '../../context/UserContext.js'

const ListItem = ({ member }) => {
  const {isYou} = useContext(UserContext)
  // console.log(isYou);
  const {userID} = member
  // console.log(userID);
  const [isUnfollowed, setIsUnfollowed] = useState(false)


  const unfollow = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/followers/${userID}`, {
        method : "DELETE",
        headers : {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      // 비정상일경우
      if(!response.ok) {
        alert('알수없는 오류가 생겼어요!')
        return 
      }
      // 성공일 경우
      setIsUnfollowed(true)
      
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={style.item}>
      <div className={style.profile}>
        <Skeleton type={"image"} width={"50px"} height={"50px"}/>
        <Link to= {`/${member.userID}`}>{member.userID}</Link>
      </div>
      {isYou ? <Button text= "삭제" handler={unfollow} disabled={isUnfollowed}/> : null}
    </div>
  )
}

export default ListItem