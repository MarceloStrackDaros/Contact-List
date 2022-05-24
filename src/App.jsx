import { useParams } from 'react-router-dom';
import style from './style.module.css'

function App() {

  const params = useParams()
  console.log(params)

  return (
    <div className={style.siteContainer}>
      <header className={style.siteHeader}>Bem Vindo(a)!</header>
    </div>
  );
}

export default App;
