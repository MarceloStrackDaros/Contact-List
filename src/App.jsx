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
      <section className={style.personalData}>
        <h1 className={style.basicInfo}>Seus Dados:</h1>
        <img src={picture} alt={"profile"} />
        <p>Nome: {name}</p>
        <p>Usuário: {user}</p>
      </section>
      <form className={style.form}>
      </form>
    </div>
  );
}

export default App;
