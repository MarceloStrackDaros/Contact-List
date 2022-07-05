import style from './style.module.css';
import { useState } from 'react';
import { useUser } from './components/contexts/user';
import { useNavigate } from 'react-router-dom'
import usePictureInput from './components/hooks/usePictureInput';
import useFetch from './components/hooks/useFetch';
import UserInputsScreen from './components/userInputsScreen/UserInputsScreen';
import DeleteUserScreen from './components/deleteUserScreen/DeleteUserScreen';
import RenderContactData from './components/renderContactData';

function App() {
  
  const navigate = useNavigate()
  const userContext = useUser()
  const compressPicture = usePictureInput()
  const { loading, request } = useFetch()
  const { name, setName, user, setUser, picture, setPicture, userID, setUserID, token, setToken } = userContext
  const [ contactName, setContactName ] = useState()
  const [ contactSurname, setContactSurname ] = useState()
  const [ contactTelephone, setContactTelephone ] = useState()
  const [ telType, setTelType ] = useState()
  const [ email, setContactEmail ] = useState()
  const [ street, setStreet ] = useState()
  const [ city, setCity ] = useState()
  const [ state, setState ] = useState()
  const [ zipCode, setZipCode ] = useState()
  const [ country, setCountry ] = useState()
  // const [ address, setContactAddress ] = useState()
  const [ notes, setContactNotes ] = useState()
  const [ contactPicture, setContactPicture ] = useState()
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

  const handleClickAddContact = async () => {

    const options = {
      method: "POST",
      body: JSON.stringify({ 
        nome: contactName,
        apelido: contactSurname,
        telefones: [{
          tipo: telType,
          numero: contactTelephone
        }],
        email: email,
        endereco: {
          logradouro: street,
          cidade: city,
          estado: state,
          cep: zipCode,
          pais: country
        },
        notas: notes,
        foto: contactPicture
      })
    }
    
    const response = await request("contact", options, token)
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

  const handleClickPicture = async (event) => {
    setContactPicture(await compressPicture(event))
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
            <label htmlFor="telephone">Telefone: </label>
            <select name='telType' onChange={(event) => {setTelType(event.target.value)}}>
              <option value="None"></option>
              <option value="casa">Casa</option>
              <option value="celular">Celular</option>
              <option value="trabalho">Trabalho</option>
            </select>
            <input type="text" name="telephone" onChange={(event) => {setContactTelephone(event.target.value)}} />
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" onChange={(event) => {setContactEmail(event.target.value)}}/>
          </fieldset>
          <fieldset className={style.address}>
            <label>Endereço: </label>
            <br />
            <label htmlFor="street">Logradouro: </label>
            <input type="text" name="street" onChange={(event) => {setStreet(event.target.value)}}/>
            <br />
            <label htmlFor="city">Cidade: </label>
            <input type="text" name="city" onChange={(event) => {setCity(event.target.value)}}/>
            <br />
            <label htmlFor="state">Estado: </label>
            <input type="text" name="state" onChange={(event) => {setState(event.target.value)}}/>
            <br />
            <label htmlFor="zipCode">CEP: </label>
            <input type="text" name="zipCode" onChange={(event) => {setZipCode(event.target.value)}}/>
            <br />
            <label htmlFor="country">País</label>
            <input type="text" name="country" onChange={(event) => {setCountry(event.target.value)}}/>
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