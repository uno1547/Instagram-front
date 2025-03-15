import style from './ListItem.module.css'
import Button from '../Button/Button'
import Skeleton from '../Skeleton/Skeleton'

const ListItem = ({ member }) => {
  return (
    <div className={style.item}>
      <div className={style.profile}>
        <Skeleton type={"image"} width={"50px"} height={"50px"}/>
        <span>{member.userID}</span>
      </div>
      <Button text= "삭제"/>
    </div>
  )
}

export default ListItem