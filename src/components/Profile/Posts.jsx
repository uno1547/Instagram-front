import { useEffect, useState } from "react"
import { createPortal } from 'react-dom'
import { useContext } from "react"
import { ModalContext } from "../../context/ModalContext"
import { PostModalContext } from "../../context/PostModalContext"

import style from "./Posts.module.css"
import modalStyle from "../Modal/OverLay.module.css"

// 이 위치에서 각 post의 id? 에 해당하는 정보를 요청하고 받아야함
const Article = () => {
  //  모달창 마운트 되고, 데이터 요청해서, 댓글과 좋아요 정보를 불러오고 표시한다.
  // 랜더링 > 마운트 >
  const [isLoading, setIsLoading] = useState(true)
  const [info, setInfo] = useState({})
  
  const {isOpen, modalHandler} = useContext(ModalContext)
  const {postID, userID} = useContext(PostModalContext)
  console.log(postID, userID, 'contetext');

  const getInfos = async () => {
    // const sleep = await new Promise((res, rej) => {
    //   setTimeout(() => {
    //     res("댓글과 좋아요 데이터!!")
    //   }, 1000);
    // })
    const response = await fetch(`http://localhost:8080/api/posts/${postID}`, {
      headers : {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
      }      
    })

    const responseData = await response.json()
    setInfo(responseData.data)
    setIsLoading(false)
  }

  useEffect(() => {
    console.log('article modal 마운트');
    console.log('댓글 및 좋아요 정보를 불러올게요');
    getInfos()
  }, [])

  // console.log(isOpen, modalHandler);
  return (
    <div className={modalStyle["modal-overlay"]} onClick={modalHandler}>
      <div className={modalStyle["post-modal"]}>
        {isLoading ? "로딩중" : 
        <>
          <div className={modalStyle["post-image"]}>{info.imageURL}

          </div>
          <div className={modalStyle["post-content"]}>
            <div className={`${modalStyle["display-row-container"]} .post-header`}>
              <div>프로필 사진</div>
              <div>{userID}</div>
              <div>...</div>
            </div>
            <div className={`${modalStyle["display-row-container"]} .post-body`}>
              <div>프로필 사진</div>
              <div>{userID}</div>
              <div>{info.context}</div>
            </div>
            <div className={`.post-comments`}>
              {info.comments.map(comment => {
              return (
                <div key={comment.commentID} className={`${modalStyle["display-row-container"]} .post-comment`}>
                  <div>프로필사진</div>
                  <div>{comment.user}</div>
                  <div>{comment.content}</div>
                </div>
              )
            })}
            </div>
            <div className="post-actions"></div>
            <div className="post-meta"></div>
            <div className="post-comment-form"></div>
          </div>
        </>

        }
      </div>
    </div>
  )
}

const Posts = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  const {id : postID, userID} = data
  // console.log(postID, userID);
  // (바둑판에 썸네일은 다 마운트 된 상태) 썸네일을 클릭시 게시글 모달창이 열리고, ^^

  const modalHandler = () => {
    setIsOpen(prev => !prev)
  }

  // console.log('post랜더링!');
  return (
    <PostModalContext.Provider value={{postID, userID}}>
      <ModalContext.Provider value={{isOpen, modalHandler}}>
        <div className={style.item} onClick={modalHandler}>{}</div>
        {isOpen ? createPortal(<Article/>, document.body) : null}
      </ModalContext.Provider>
    </PostModalContext.Provider>
    )
}

export default Posts