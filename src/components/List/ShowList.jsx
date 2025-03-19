import { useState, useEffect, useContext } from 'react'
import { createPortal } from 'react-dom'

import style from './ShowList.module.css'
import FollowListModal from '../Modal/FollowListModal'


const ShowList = ({ text, nums }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toFind = text === "팔로워" ? "followers" : "followings"

  const handler = () => {
    setIsOpen(prev => !prev)
  }
  return (
    <>
      <span className={style.tag} onClick={handler}>{text}</span>
      <span className={style.num} onClick={handler}>{nums}</span>
      {isOpen ? createPortal(<FollowListModal handler = {handler} toFind = {toFind}/>, document.body) : null}
    </>
  )
}

export default ShowList