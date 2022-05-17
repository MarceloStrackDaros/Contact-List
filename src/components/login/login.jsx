import '../../reset.css'
import style from './style.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {

  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState(null)

  return (
    <div className={style.app}>
      <div className={style.formWrapper}>
        <form className={style.form}>
          <h1 className={style.loginTitle}>Faça seu Login!</h1>
          <fieldset className={style.fieldset}>
            <label htmlFor="user" className={style.label}>Usuário:</label>
            <input id="user" className={style.input} type="text" onBlur={(event) => {setUser(event.target.value)}}/>
          </fieldset>
          <fieldset className={style.fieldset}>
            <label htmlFor="password" className={style.label}>Senha:</label>
            <input id="password" className={style.input} type="password" onBlur={(event) => {setPassword(event.target.value)}}/>
          </fieldset>
          <button className={style.button} onClick={() => {
            (user !== null && password !== null) ? navigate("/main") : alert("Favor preencha todos os campos!")
          }}>Logar</button>
        </form>
      </div>
    </div>
  )
}