import style from './style.module.css'

export default function DeleteUserScreen(props) {

  const { handleClickChangeDeleteState, handleClickDeleteUser } = props

  return (
    <div className={style.deletionScreenWrapper}>
      <section className={style.sectionWrapper}>
        <h1 className={style.title}>Confirmação</h1>
        <p className={style.text}>Por favor confirme se deseja deletar seu usuário. Essa ação é irreversível, todas as informações e os contatos do seu usuário serão apagados e você será redirecionado para a tela de login/cadastro.</p>
        <div className={style.btnWrapper}>
          <button className={style.btnConfirmation} onClick={handleClickDeleteUser}>Confirmar</button>
          <button className={style.btnCancelation} onClick={handleClickChangeDeleteState}>Cancelar</button>
        </div>
      </section>
    </div>
  )
}