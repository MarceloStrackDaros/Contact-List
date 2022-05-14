import './reset.css'
import style from './style.module.css'

export default function Login() {
  return (
    <div className={style.app}>
      <div className={style.formWrapper}>
        <form className={style.form}>
          <h1 className={style.loginTitle}>Faça seu Login!</h1>
          <fieldset className={style.fieldset}>
            <label htmlFor="user" className={style.label}>Usuário:</label>
            <input id="user" className={style.input} type="text" required/>
          </fieldset>
          <fieldset className={style.fieldset}>
            <label htmlFor="password" className={style.label}>Senha:</label>
            <input id="password" className={style.input} type="text" required/>
          </fieldset>
          <nav>
            {/* <Link></Link> */}
          </nav>
          <button className={style.button}>Logar</button>
        </form>
      </div>
    </div>
  )
}