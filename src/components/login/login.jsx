import '../../reset.css'
import style from './style.module.css'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import UserInputsScreen from '../userInputsScreen/UserInputsScreen'
import { useUser } from '../contexts/user'
import { useState } from 'react'

export default function Login() {

  const userContext = useUser()
  const {name, setName, user, setUser, picture, setPicture, setUserID, setToken } = userContext
  
  const navigate = useNavigate()
  const { loading, request } = useFetch()
  const [ registration, setRegistration ] = useState(false)
  const [pageTitle, setPageTitle] = useState("Faça seu Login!")

  const handleClickRegistration = async (user, password, name, picture) => {
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
      const { id, email,  nome, foto } = response.json.data
      setUserID(id)
      setUser(email)
      setName(nome)
      setPicture(foto)
      navigate("/main")
    }
  }

  const handleClickLogin = async (user, password) => {
    const options = {
      method: "POST",
      body: JSON.stringify({ email: user, senha: password })
    }
    const response = await request("auth", options)

    if (response.json.status === 401) {
      alert("Usuário e/ou senha incorreta.")
    }
    else {
      const { id, email,  nome, foto, token } = response.json.data
      setUserID(id)
      setUser(email)
      setName(nome)
      setPicture(foto)
      setToken(token)
      navigate("/main")
    }
  }

  const changeRegistrationMode = () => {
    if (registration) {
      setPageTitle("Faça seu Login!")
      setRegistration(false)
    }
    else {
      setPageTitle("Faça seu Cadastro!")
      setRegistration(true)
    }
   }

  return (
    <div className={style.app}>
      <UserInputsScreen 
        pageTitle={pageTitle}
        isRegistration={registration}
        changeRegistrationMode={changeRegistrationMode}
        handleClickLogin={handleClickLogin}
        handleClickRegistration={handleClickRegistration}
        btnLabel={"Cadastrar"}
      />
    </div>
  )
}