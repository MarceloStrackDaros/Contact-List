import '../../reset.css'
import style from './style.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {

  const navigate = useNavigate()
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")

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
          <section className={style.buttonWrapper}>
            <button className={style.button} onClick={() => {
              (user !== "" && password !== "") ? navigate("/main") : alert("Favor preencha todos os campos!")
            }}>Logar</button>
            <button className={style.button}>Cadastrar</button>
          </section>
        </form>
      </div>
    </div>
  )
}