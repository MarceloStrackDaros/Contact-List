import style from './style.module.css';
import { useState } from 'react';
import usePictureInput from './components/hooks/usePictureInput';
import useFetch from './components/hooks/useFetch';
import UserInputsScreen from './components/userInputsScreen/userInputsScreen';
import { useUser } from './components/contexts/user';

function App() {
  
  const userContext = useUser()
  const compressPicture = usePictureInput()
  const { loading, request } = useFetch()
  const {name, setName, user, setUser, password, setPassword, picture, setPicture, userID, setUserID, token, setToken, editUserData, setEditUserData } = userContext
  const [ nome, setContactName ] = useState()
  const [ apelido, setContactSurname ] = useState()
  const [ telefones, setContactTelephone ] = useState()
  const [ email, setContactEmail ] = useState()
  const [ endereco, setContactAddress ] = useState()
  const [ notas, setContactNotes ] = useState()
  const [ foto, setContactPicture ] = useState()
  const [ contacts, setContacts ] = useState([])

  const handleClickFetchContacts = async () => {
    const options = {
      method: "GET",
      body: JSON.stringify({ token })
    }

    const response = await request("contact", options)
  }

  const handleClickAddContact = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({ nome, apelido, telefones, email, endereco, notas, foto })
    }

    const response = await request("contact", options, token)
  }

  const handleClickPicture = async (event) => {
    setContactPicture(await compressPicture(event))
  }

  const handleClickEditUserData = () => {
    setEditUserData(true)
  }

  return (
    <div className={style.siteContainer}>
      <header className={style.siteHeader}>Bem Vindo(a) { name }!</header>
      <main className={style.siteContent}>
        <section className={style.personalData}>
          <h2 className={style.sectionTitle}>Seus Dados:</h2>
          <div className={style.dataWrapper}>
            <img className={style.picture} src={`data:image/png;base64,${picture}`} alt={"teste"} />
            <div className={style.nameWrapper}>
              <p>Nome: {name}</p>
              <p>Usuário: {user}</p>
              <div className={style.btnWrapper}>
                <button onClick={() => {handleClickEditUserData()}}>Editar Informações</button>
                <button >Excluir Usuário</button>
              </div>
            </div>
          </div>
        </section>
        {editUserData &&
          <UserInputsScreen />
        }
        <form className={style.addContactForm} onSubmit={(event) => {event.preventDefault()}}>
          <h2 className={style.sectionTitle}>Inserir novo contato:</h2>
          <fieldset>
            <label htmlFor="name">Nome: </label>
            <input type="text" name="name" onChange={(event) => {setContactName(event.target.value)}} required/>
          </fieldset>
          <fieldset>
            <label htmlFor="surname">Apelido: </label>
            <input type="text" name="surname" onChange={(event) => {setContactSurname(event.target.value)}} />
          </fieldset>
          <fieldset>
            <label htmlFor="telephone">Telefones: </label>
            <input type="tel" name="telephone" onChange={(event) => {setContactTelephone(event.target.value)}}/>
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" onChange={(event) => {setContactEmail(event.target.value)}}/>
          </fieldset>
          <fieldset>
            <label htmlFor="address">Endereço: </label>
            <input type="text" name="address" onChange={(event) => {setContactAddress(event.target.value)}}/>
          </fieldset>
          <fieldset>
            <label htmlFor="notes">Notas: </label>
            <input type="text" name="notes" onChange={(event) => {setContactNotes(event.target.value)}}/>
          </fieldset>
          <fieldset>
            <label htmlFor="picture">Foto: </label>
            <input type="file" name="picture" accept="image/png, image/jpeg" onInput={(event) => {handleClickPicture(event)}}/>
          </fieldset>
          <button onClick={handleClickAddContact}>Adicionar</button>
        </form>
      </main>

      <form className={style.form}>
      </form>
    </div>
  );
}

export default App;