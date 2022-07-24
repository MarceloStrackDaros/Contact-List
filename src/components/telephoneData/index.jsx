import style from './style.module.css'

export default function TelephoneData(props) {

  const { setTelType, setContactTelephone, addTelephoneData } = props

  return (
    <>
      <label htmlFor="telephone">Telefone: </label>
      <select name='telType' onChange={(event) => {setTelType(event.target.value)}}>
        <option value="None"></option>
        <option value="casa">Casa</option>
        <option value="celular">Celular</option>
        <option value="trabalho">Trabalho</option>
      </select>
      <input type="text" name="telephone" onChange={(event) => {setContactTelephone(event.target.value)}} />
      <button onClick={addTelephoneData}>+</button>
    </>
  )
}