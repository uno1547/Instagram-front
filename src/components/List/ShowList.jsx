import { useState } from 'react'
import { createPortal } from 'react-dom'

import style from './ShowList.module.css'
// import FollowerList from './FollowerList'
import FollowListModal from '../Modal/FollowListModal'

// import style from './OverLay.module.css'
// import style1 from './OverLay.module.css'

// const FollowListModal = ({ handler }) => {
//   return (
//     <div className={style["modal-overlay"]}onClick={handler}>
//       <FollowerList handler = {handler}/>
//     </div>
//   )
// }


const ShowList = ({ text }) => {
  // console.log('showlist');
  const toFind = text === "팔로워" ? "followers" : "followings"
  const [isOpen, setIsOpen] = useState(false)

  const handler = () => {
    setIsOpen(prev => !prev)
  }
  return (
    <>
      <span className={style.tag} onClick={handler}>{text}</span>
      {isOpen ? createPortal(<FollowListModal handler = {handler} toFind = {toFind}/>, document.body) : null}
    </>
  )
}

export default ShowList