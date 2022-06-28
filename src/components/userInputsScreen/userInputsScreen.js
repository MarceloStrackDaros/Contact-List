import style from './style.module.css'
import { useUser } from '../contexts/user'
import useFetch from '../hooks/useFetch'
import usePictureInput from '../hooks/usePictureInput'

export default function UserInputsScreen() {

  const userContext = useUser()
  const {name, setName, user, setUser, password, setPassword, picture, setPicture, setEditUserData, token } = userContext
  const compressPicture = usePictureInput()
  const { loading, request } = useFetch()

  const handleClickPicture = async (event) => {
    setPicture(await compressPicture(event))
  }

  const handleClickRegistration = async () => {
    const options = {
      method: "PATCH",
      body: JSON.stringify({ email: user, senha: password, nome: name, foto: picture })
    }

    const response = await request("user", options, token)
    setEditUserData(false)
  }

  console.log("chamou!")

  return (
    <div className={style.formWrapper}>
      <form className={style.form} onSubmit={(event) => {event.preventDefault()}}>
        <h1 className={style.loginTitle}>Edite suas informações:</h1>
        <fieldset className={style.fieldset}>
          <label htmlFor="name" className={style.label}>Nome completo:</label>
          <input id="name" className={style.input} type="text" onChange={(event) => {setName(event.target.value)}}/>
        </fieldset>
        <fieldset className={style.fieldset}>
          <label htmlFor="user" className={style.label}>Usuário/E-mail:</label>
          <input id="user" className={style.input} type="text" onChange={(event) => {setUser(event.target.value)}}/>
        </fieldset>
        <fieldset className={style.fieldset}>
          <label htmlFor="password" className={style.label}>Senha:</label>
          <input id="password" className={style.input} type="password" onChange={(event) => {setPassword(event.target.value)}}/>
        </fieldset>
        <fieldset className={style.fieldset}>
          <label htmlFor="picture" className={style.labelPicture}>Foto:</label>
          <input id="picture" className={style.inputFile} type="file" accept="image/png, image/jpeg" onInput={(event) => {handleClickPicture(event)}}/>
        </fieldset>
        <div className={style.btnWrapper}>
          <button className={style.buttonRegister} onClick={() => {
            (user !== "" && password !== "" && name !== "") ? handleClickRegistration() : alert("Favor preencha todos os campos!")}}>Cadastrar</button>
          <button className={style.buttonRegister} onClick={() => {setEditUserData(false)}}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}