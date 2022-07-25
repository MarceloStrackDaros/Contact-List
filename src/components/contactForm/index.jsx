import style from './style.module.css'
import { useState } from 'react';
import { useUser } from '../contexts/user';
import useFetch from '../hooks/useFetch';
import TelephoneData from '../telephoneData'
import usePictureInput from '../hooks/usePictureInput'

export default function ContactForm(props) {

  const userContext = useUser()
  const { loading, request } = useFetch()
  const compressPicture = usePictureInput()
  const { pageTitle, btnLabel, editData } = props

  // const { editContactData, changeEditState } = editData
  
  const token = userContext
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
//const [ address, setContactAddress ] = useState()
  const [ notes, setContactNotes ] = useState()
  const [ contactPicture, setContactPicture ] = useState()

  console.log(pageTitle, btnLabel)

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

  const handleClickPicture = async (event) => {
    setContactPicture(await compressPicture(event))
  }

  const addTelephoneData = () => {
    // const telephoneDataSection = document.querySelector("#telephoneData")
    // const data = document.createElement(
    //   <TelephoneData 
    //     setTelType={setTelType}
    //     setContactTelephone={setContactTelephone}
    //     addTelephoneData={addTelephoneData}
    //   />
    // )
    // telephoneDataSection.append(data)
    return (
      <TelephoneData 
        setTelType={setTelType}
        setContactTelephone={setContactTelephone}
        addTelephoneData={addTelephoneData}
      />
    )
  }

  return (
    <form className={style.contactForm} onSubmit={(event) => {event.preventDefault()}}>
      <h2 className={style.sectionTitle}>{ pageTitle }</h2>
      <fieldset>
        <label htmlFor="name">Nome: </label>
        <input type="text" name="name" onChange={(event) => {setContactName(event.target.value)}} required/>
      </fieldset>
      <fieldset>
        <label htmlFor="surname">Apelido: </label>
        <input type="text" name="surname" onChange={(event) => {setContactSurname(event.target.value)}} />
      </fieldset>
      <fieldset id="telephoneData">
        {addTelephoneData()}
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
      <button onClick={handleClickAddContact}>{ btnLabel }</button>
    </form>
  )
}