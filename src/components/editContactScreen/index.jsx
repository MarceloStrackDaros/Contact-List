import style from './style.module.css'
import ContactForm from '../contactForm';

export default function EditContactScreen(props) {

  const {editContactData} = props
  console.log(editContactData)

  return (
    <section className={style.background}>
      <div className={style.formWrapper}>
        <ContactForm 
          pageTitle={"Editar dados do contato:"}
          btnLabel={"Editar"}
          editData={props}
        />
      </div>
    </section>
  )
}