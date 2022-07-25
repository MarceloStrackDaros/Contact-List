import style from './style.module.css';
// import Parser from 'html-react-parser'
import { useState } from 'react';
import { useUser } from './components/contexts/user';
import { useNavigate } from 'react-router-dom'
import useFetch from './components/hooks/useFetch';
import UserInputsScreen from './components/userInputsScreen';
import DeleteUserScreen from './components/deleteUserScreen';
import RenderContactData from './components/renderContactData';
import ContactForm from './components/contactForm';

function App() {
  
  const navigate = useNavigate()
  const userContext = useUser()
  const { loading, request } = useFetch()
  const { name, setName, user, setUser, picture, setPicture, userID, setUserID, token, setToken } = userContext
  const [ editUserData, setEditUserData ] = useState(false)
  const [ deleteUser, setDeleteUser ] = useState(false)
  const [ contacts, setContacts ] = useState([])

  const handleClickEditUserData = async (user, password, name, picture) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify({ email: user, senha: password, nome: name, foto: picture })
    }
    const response = await request("user", options, token)

    if (response.json.status === 404) {
      alert("Usuário não encontrado!")
    }
    else {
      const { id, email, nome, foto } = response.json.data
      setUserID(id)
      setName(nome)
      setUser(email)
      setPicture(foto)
      setEditUserData(false)
    }
  }

  const handleClickDeleteUser = async () => {
    const options = {
      method: "DELETE",
      body: JSON.stringify({ idUsuario: userID })
    }
    const response = await request("user", options, token)

    if (response.json.status === 400) {
      alert("Autenticação inválida!")
    }
    else {
      navigate("/")
    }
  }

  const handleClickFetchContacts = async () => {
    const options = {
      method: "GET",
    }

    const response = await request("contact", options, token)
    let newContacts = []
    response.json.data.forEach((contact) => newContacts.push(contact))
    setContacts(newContacts)
    console.log(contacts)
  }

  const handleClickChangeEditState = () => {
    editUserData ? setEditUserData(false) : setEditUserData(true)
  }

  const handleClickChangeDeleteState = () => {
    deleteUser ? setDeleteUser(false) : setDeleteUser(true)
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
                <button onClick={handleClickChangeEditState}>Editar Informações</button>
                <button onClick={handleClickChangeDeleteState}>Excluir Usuário</button>
              </div>
            </div>
          </div>
        </section>
        { editUserData &&
          <UserInputsScreen
            pageTitle={"Edite suas Informações:"}
            isRegistration={true}
            changeRegistrationMode={handleClickChangeEditState}
            handleClickRegistration={handleClickEditUserData}
            btnLabel={"Editar"}
          />
        }
        { deleteUser &&
          <DeleteUserScreen
            handleClickChangeDeleteState={handleClickChangeDeleteState}
            handleClickDeleteUser={handleClickDeleteUser}
          />
        }
        <ContactForm 
          pageTitle={"Adicionar Contato:"}
          btnLabel={"Adicionar"}
        />

        <section className={style.fetchContacts}>
          <button onClick={handleClickFetchContacts}>Buscar Contatos</button>
          {contacts &&
            contacts.map((contato) => {
              return (
                console.log(contato),
                <RenderContactData
                  contactData={contato}
                />
              )
            })
          }
        </section>

      </main>
    </div>
  );
}

export default App;