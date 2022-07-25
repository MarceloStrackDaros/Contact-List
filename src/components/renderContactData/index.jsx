import React from 'react'
import style from './style.module.css'
import { useState } from 'react';
import EditContactScreen from '../editContactScreen';

export default function RenderContactData(props) {

  const { id, nome, apelido, telefone, email, endereco, notas, foto } = props.contactData
  const { cep, cidade, estado, logradouro, pais } = endereco
  const [ editContactData, setEditContactData ] = useState(false)

  const handleClickChangeEditState = () => {
    editContactData ? setEditContactData(false) : setEditContactData(true)
  }

  return (
    <section className={style.contactWrapper}>
      <p>{id}</p>
      <p>{nome}</p>
      {apelido &&
        <p>{apelido}</p>
      }
      {telefone &&
        <p>{telefone}</p>
      }
      {email &&
        <p>{email}</p>
      }
      {endereco &&
        <>
          <li key={'zipCode'}>{cep}</li>
          <li key={'street'}>{logradouro}</li>
          <li key={'city'}>{cidade}</li>
          <li key={'state'}>{estado}</li>
          <li key={'country'}>{pais}</li>
        </>
      }
      {notas &&
        <p>{notas}</p>
      }
      {foto &&
        <img src={`data:image/png;base64,${foto}`} alt={nome} />
      }
      <button className={style.editContactBtn} onClick={handleClickChangeEditState}>Editar contato</button>
      { editContactData &&
        <EditContactScreen
          id={id}
          nome={nome}
          apelido={apelido}
          telefone={telefone}
          email={email}
          cep={cep}
          logradouro={logradouro}
          cidade={cidade}
          estado={estado}
          pais={pais}
          notas={notas}
          foto={foto}
          editContactData={editContactData}
          changeEditState={handleClickChangeEditState}
        />
      }
    </section>
  )
}