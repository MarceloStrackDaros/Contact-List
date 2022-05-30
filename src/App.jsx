import style from './style.module.css'
import useFetch from './components/hooks/useFetch';
import { useUser } from './components/contexts/user';

function App() {

  const { loading, request } = useFetch()
  const userContext = useUser()
  const {name, setName, user, setUser, password, setPassword, picture, setPicture, userID, setUserID, token, setToken } = userContext

  const handleClickBuscarContatos = async () => {
    const options = {
      method: "GET",
      body: JSON.stringify()
    }

    const response = await request("contact", options)
  }
  console.log(picture)

  return (
    <div className={style.siteContainer}>
      <header className={style.siteHeader}>Bem Vindo(a) { name }!</header>
      <main className={style.siteContent}>
        <section className={style.personalData}>
          <h2 className={style.sectionTitle}>Seus Dados:</h2>
          <div className={style.dataWrapper}>
            <img src={picture} alt={"profile"} />
            <div className="nameWrapper">
              <p>Nome: {name}</p>
              <p>Usuário: {user}</p>
            </div>
          </div>
        </section>
        <form className={style.addContactForm}>
          <h2 className={style.sectionTitle}>Inserir novo contato:</h2>
          <fieldset>
            <label htmlFor="name">Nome: </label>
            <input type="text" name="name" required/>
          </fieldset>
          <fieldset>
            <label htmlFor="surname">Apelido: </label>
            <input type="text" name="surname" />
          </fieldset>
          <fieldset>
            <label htmlFor="telephone">Telefones: </label>
            <input type="tel" name="telephone" />
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" />
          </fieldset>
          <fieldset>
            <label htmlFor="address">Endereço: </label>
            <input type="text" name="address" />
          </fieldset>
          <fieldset>
            <label htmlFor="notes">Notas: </label>
            <input type="text" name="notes" />
          </fieldset>
          <fieldset>
            <label htmlFor="picture">Foto: </label>
            <input type="file" name="picture" />
          </fieldset>
        </form>
      </main>

      <form className={style.form}>
      </form>
    </div>
  );
}

export default App;
