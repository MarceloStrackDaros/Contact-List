import '../../reset.css'
import style from './style.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useFetch from '../hooks/useFetch'

export default function Login() {

  const { loading, request } = useFetch()
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleClickCadastro = () => {
    const options = {
      method: "POST",
      body: JSON.stringify({ email: user, senha: password })
    }

    request("user", options)
    // navigate("/main")
  }

  const handleClickLogin = () => {
    const options = {
      method: "POST",
      body: JSON.stringify({ email: user, senha: password })
    }

    request("auth", options)
    // navigate("/main")
  }

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
          </fieldset>09874
          <section className={style.buttonWrapper}>
            <button className={style.button} onClick={() => {
              (user !== "" && password !== "") ? handleClickLogin() : alert("Favor preencha todos os campos!")
            }}>Logar</button>
            <button className={style.button}>Cadastrar</button>
          </section>
        </form>
      </div>
    </div>
  )
}