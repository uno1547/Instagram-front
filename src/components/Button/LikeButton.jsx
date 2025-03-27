import { useContext, useState } from "react"
import { PostModalContext } from "../../context/PostModalContext";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import style from "./LikeButton.module.css"

const LikeButton = ({info}) => {
  const [isLiked, setIsLiked] = useState(info.isLiked)
  const [likes, setLikes] = useState(info.likes)

  const {postID} = useContext(PostModalContext)

  const clickHandler = async (e) => {
    // console.log(e);
    console.log('좋아요');
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${postID}/like`, {
        method : "POST",
        headers : {
          'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      if (!response.ok) return
      const newLikes = isLiked ? likes - 1 : likes + 1
      setLikes(newLikes)
      setIsLiked(prev => !prev)
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <>
      <div className={style.likebutton} style={{cursor : "pointer"}}>
        <div onClick={clickHandler}>
          {isLiked ? <FavoriteRoundedIcon style={{color: "red"}}/> : <FavoriteBorderOutlinedIcon/>}
        </div>
        <span>{`${likes} 명이 좋아합니다.`}</span>
      </div>
      {/* <div className="meta"> */}
      {/* </div> */}
    </>
  )
}

export default LikeButton