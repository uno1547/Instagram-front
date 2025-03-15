import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// import { UserProvider } from "../../context/UserContext"
import { UserContext } from "../../context/UserContext"


import UserInfo from "../../components/Profile/UserInfo"
import UserPosts from "../../components/Profile/UserPosts"
import Skeleton from "../../components/Skeleton/Skeleton"
import style from './ProfilePage.module.css'
import NotFoundPage from "../NotFound/NotFoundPage"


const ProfilePage = () => {
  /*
    params로 넘어온 userId에 대해서 정보가 필요함 1) 존재하는 사용자인지아닌지 2) 존재하는 사용자면 본인인지 제3자인지 3) 제3자면 팔로우가 되있는사람인지 아닌사람인지 4)숫자와 소개글
    서버에게 물어보자 존재하는지안하는지 res {status : 400, message : 존재하지않는 사용자} 처럼
    본인인지 제3자인지, 음 이거는 토큰껴서 물어보면 응답해줄수있겠는데, 모든 요청에 토큰을 껴서 보낸다?


    최초 랜더링 > 스켈레톤 > effect > 데이터패칭시작(isLoading > false, userData > datas)
    isLoading false > 리랜더링 > 1. userData있으면 표시, userPosts패칭시작
    isLoading false > 리랜더링 > 2. userData없으면 NotFound페이지 표시
  */
  const {userID} = useParams()
  const [isLoading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)

  const getProfileInfos = async () => {
    try {
      // const sleep = await new Promise((res, rej) => {
      //   setTimeout(() => {
      //     res()
      //   }, 1000)
      // })
      
      const response = await fetch(`http://localhost:8080/api/users/${userID}/profile`, {
        headers : {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      })

      if(!response.ok) {
        /*오류코드 생기면 처리*/
        alert("닉네임 불러오는데 오류생김!")
        return
      }
      
      const data = await response.json() //data 준비완료
      setUserData(data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfileInfos()
  }, [])

  return(
    isLoading ? // 로딩중일때 스켈레톤 표신
    <div className={style.inner}>
      <div className={style["flex-container"]}>
        <div className={style["image-wrapper"]}>
          <Skeleton type = {"image"}/>
        </div>
        <div className={style["lines-wrapper"]}>
          <Skeleton type = {"article"}/>
          <Skeleton type = {"article"} width="340px"/>
          <Skeleton type = {"article"} height="100px"/>
        </div>
      </div>
    </div> : // 로딩완료시 userData에 따라 랜더링
    userData ? ( // 얘 간결하게 할수있을듯? 이게 간결이구나 ㅋㅋㅋㅋ

      <UserContext.Provider value={{userID}}>
        <div className={style.inner}>
          <UserInfo datas={userData}/>
        </div>
      </UserContext.Provider>
      // <UserProvider userID={userId}>
      //   <div className={style.inner}>
      //     <UserInfo datas={userData} userID = {userId}/>
      // {/* <UserInfo datas={{
      //   isYou : false,
      //   isFollowee : true,
      //   postNums : 10,
      //   followers : 290,
      //   followees : 246,
      //   article : "유용준 스물다섯"
      // }} userID = "dydwns6837"/>
      // <UserInfo datas={{
      //   isYou : false,
      //   isFollowee : true,
      //   postNums : 89,
      //   followers : "110.9만",
      //   followees : 1,
      //   article : `이주은 LEE JUEUN`
      // }} userID = "0724.32"/>
      // <UserInfo datas={{
      //   isYou : false,
      //   isFollowee : false,
      //   postNums : 224,
      //   followers : "2392만",
      //   followees : 4,
      //   article : "KARINA aespa"
      // }} userID = "katarinabluu"/>
      // <UserPosts /> */}
      //   </div>
      // </UserProvider>

    ) : (
      <NotFoundPage/>
    )
  )
}

export default ProfilePage