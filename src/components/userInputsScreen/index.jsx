import style from './style.module.css'
import usePictureInput from '../hooks/usePictureInput'
import { useState } from 'react'

export default function UserInputsScreen(props) {

  const { pageTitle, isRegistration, changeRegistrationMode, handleClickLogin, handleClickRegistration, btnLabel } = props

  const [ name, setName ] = useState("")
  const [ user, setUser ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ picture, setPicture ] = useState("")
  
  const compressPicture = usePictureInput()
  const handleClickPicture = async (event) => {
    setPicture(await compressPicture(event))
  }

  return (
    <div className={style.formWrapper}>
      <form className={style.form} onSubmit={(event) => {event.preventDefault()}}>
        <h1 className={style.loginTitle}>{ pageTitle }</h1>
        { isRegistration &&
          <fieldset className={style.fieldset}>
            <label htmlFor="name" className={style.label}>Nome completo:</label>
            <input id="name" className={style.input} type="text" onChange={(event) => {setName(event.target.value)}}/>
          </fieldset>
        }
        <fieldset className={style.fieldset}>
          <label htmlFor="user" className={style.label}>Usuário/E-mail:</label>
          <input id="user" className={style.input} type="text" onChange={(event) => {setUser(event.target.value)}}/>
        </fieldset>
        <fieldset className={style.fieldset}>
          <label htmlFor="password" className={style.label}>Senha:</label>
          <input id="password" className={style.input} type="password" onChange={(event) => {setPassword(event.target.value)}}/>
        </fieldset>
        { isRegistration &&
          <fieldset className={style.fieldset}>
            <label htmlFor="picture" className={style.labelPicture}>Foto:</label>
            <input id="picture" className={style.inputFile} type="file" accept="image/png, image/jpeg" onInput={(event) => {handleClickPicture(event)}}/>
          </fieldset>
        }
        { !isRegistration && 
          <>
            <button className={style.buttonClickRegistration} onClick={changeRegistrationMode}>Não possui usuário? <u>Cadastre-se!</u></button>
            <button className={style.buttonLogin} onClick={() => {
              (user !== "" && password !== "") ? handleClickLogin(user, password) : alert("Favor preencha todos os campos!")
            }}>Logar</button>
          </>
        }
        { isRegistration && 
          <div className={style.btnWrapper}>
            <button className={style.buttonRegister} onClick={() => {
              if (btnLabel === "Cadastrar") {
                (user !== "" && password !== "" && name !== "") ? handleClickRegistration(user, password, name, picture) : alert("Favor preencha todos os campos!")
              }
              else {
                (user !== "" || password !== "" || name !== "" || picture !== "") ? handleClickRegistration(user, password, name, picture) : alert("Favor edite pelo menos um campo!")
              }
            }}>{ btnLabel }</button>
            <button className={style.buttonRegister} onClick={changeRegistrationMode}>Cancelar</button>
          </div>
        }
      </form>
    </div>
  )
}