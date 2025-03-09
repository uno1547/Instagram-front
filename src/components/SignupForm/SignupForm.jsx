import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '../Input/Input'
import Button from '../Button/Button'

import styles from '../LoginForm/LoginForm.module.css' //로그인폼이랑 스타일 똑같으니 그대로사용
import { isValuesValid, isContactValid, isPasswordValid, isNickNameValid } from '../../functions/validation/checkValid'

const SignupForm = () => {
  const [contact, setContact] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [nickName, setNickName] = useState("")
  const [wrongValue, setWrongValue] = useState(null)
  
  const navigate = useNavigate()

  const contactInputHandler = (evt) => {
    const newContact = evt.target.value
    setContact(newContact)
  }

  const passwordInputHandler = (evt) => {
    const newPassword = evt.target.value
    setPassword(newPassword)
  }

  const nameInputHandler = (evt) => {
    const newName = evt.target.value
    setName(newName)
  }

  const nickNameInputHandler = (evt) => {
    const newNickName = evt.target.value
    setNickName(newNickName)
  }

  const submitHandler = async (evt) => {
    evt.preventDefault()
    const message = await isValuesValid({ contact, password, name, nickName })
    if(message != true) {
      setWrongValue(message)
      return
    }

    setWrongValue(null) // 경고메세지 제거
    // 모두 유효하다면 json으로 바꿔서 fetch post 요청 전송
    const form = evt.target
    const formData = new FormData(form)
    const entry = Object.fromEntries(formData)
    const json = JSON.stringify(entry)

    try {
      const response = await fetch("http://localhost:4000/api/users", {
        method : "POST",
        headers : {
          'Content-Type' : 'application/json'
        },
        body : json
      })      
      const { success, message } = await response.json()
      if(success == true) {
        alert("회원가입에 성공했습니다")
        navigate('/')
      }
    } catch (err) {
      alert("알수없는 오류가 발생했어요")
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Instagram</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={`${styles.field} ${styles.inputField}`}>
          <Input name = "contact"  placeholder={"전화번호 또는 이메일 주소"} handler={contactInputHandler} value={contact}/>
          <Input name = "password"  type="password" placeholder={"비밀번호"} handler={passwordInputHandler} value={password}/>
          <Input name = "name" type="text" placeholder={"성명"} handler={nameInputHandler} value={name}/>
          <Input name = "nickName" type="text" placeholder={"사용자 이름"} handler={nickNameInputHandler} value={nickName}/>
        </div>
        <div className={`${styles.field} ${styles.buttonField}`}>
          <Button text="회원가입" type="submit"/>
          <div className={styles.notice}>{wrongValue}</div>
        </div>
      </form>
    </div>      
  )
}

export default SignupForm