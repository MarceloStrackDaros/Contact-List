import '../../reset.css'
import style from './style.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import Compress from 'compress.js'

export default function Login() {

  const { loading, request } = useFetch()
  const [name, setName] = useState("")
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [picture, setPicture] = useState("")
  const [registration, setRegistration] = useState(false)
  const [pageTitle, setPageTitle] = useState("Faça seu Login!")
  const navigate = useNavigate()

  const handleClickCadastro = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({ email: user, senha: password, nome: name, foto: picture })
    }
    const response = await request("user", options)

    if (response.json.status === 409) {
      alert("E-mail já cadastrado!")
    }
    else if (response.json.status === 400) {
      alert("Favor preencha todos os campos!")
    }
    else {
      navigate("/main", {
        state: {
          response: response.json.data
        }
      })
    }
  }

  const handleClickLogin = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({ email: user, senha: password })
    }
    const response = await request("auth", options)

    if (response.json.status === 401) {
      alert("Usuário e/ou senha incorreta.")
    }
    else (
      navigate("/main", {
        state: {
          data: response.json.data
        }
      })
    )
  }

  const handleFileInput = (event) => {
    const compress = new Compress()

    const files = [...event.target.files]
    compress.compress(files, {
      size: 4, // the max size in MB, defaults to 2MB
      quality: .75, // the quality of the image, max is 1,
      maxWidth: 300, // the max width of the output image, defaults to 1920px
      maxHeight: 300, // the max height of the output image, defaults to 1920px
      resize: true, // defaults to true, set false if you do not want to resize the image width and height
      rotate: false, // See the rotation section below
    }).then((result) => {
      setPicture(result[0].data)
    })
  }

  const changeToRegistration = () => {
    setPageTitle("Faça seu Cadastro!")
    setRegistration(true)
   }

  return (
    <div className={style.app}>
      <div className={style.formWrapper}>
        <form className={style.form} onSubmit={(event) => {event.preventDefault()}}>
          <h1 className={style.loginTitle}>{pageTitle}</h1>
          { registration &&
          <fieldset className={style.fieldset}>
            <label htmlFor="name" className={style.label}>Nome completo:</label>
            <input id="name" className={style.input} type="text" onBlur={(event) => {setName(event.target.value)}}/>
          </fieldset>}
          <fieldset className={style.fieldset}>
            <label htmlFor="user" className={style.label}>Usuário/E-mail:</label>
            <input id="user" className={style.input} type="text" onBlur={(event) => {setUser(event.target.value)}}/>
          </fieldset>
          <fieldset className={style.fieldset}>
            <label htmlFor="password" className={style.label}>Senha:</label>
            <input id="password" className={style.input} type="password" onBlur={(event) => {setPassword(event.target.value)}}/>
          </fieldset>
          { registration &&
          <fieldset className={style.fieldset}>
            <label htmlFor="picture" className={style.labelPicture}>Foto:</label>
            <input id="picture" className={style.inputFile} type="file" accept="image/png, image/jpeg" onBlur={(event) => {handleFileInput(event)}}/>
          </fieldset>}
          { !registration && 
          <>
            <button className={style.buttonClickRegistration} onClick={changeToRegistration}>Não possui usuário? <u>Cadastre-se!</u></button>
            <button className={style.buttonLogin} onClick={() => {
              (user !== "" && password !== "") ? handleClickLogin() : alert("Favor preencha todos os campos!")
            }}>Logar</button>
          </>}
          { registration &&
          <button className={style.buttonRegister} onClick={() => {
            (user !== "" && password !== "" && name !== "") ? handleClickCadastro() : alert("Favor preencha todos os campos!")}}>Cadastrar</button>}
        </form>
      </div>
    </div>
  )
}