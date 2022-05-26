import { useLocation } from 'react-router-dom';
import style from './style.module.css'
import useFetch from './components/hooks/useFetch';

function App() {

  const { loading, request } = useFetch()
  const location = useLocation()
  const { email, foto, id, nome } = location.state.response

  const handleClickBuscarContatos = async () => {
    const options = {
      method: "GET",
      body: JSON.stringify()
    }

    const response = await request("contact", options)
  }

  return (
    <div className={style.siteContainer}>
      <header className={style.siteHeader}>Bem Vindo(a) { nome }!</header>
    </div>
  );
}

export default App;
