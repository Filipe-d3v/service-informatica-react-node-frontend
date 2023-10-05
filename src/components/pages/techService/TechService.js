import React, { useEffect, useState } from "react";
import styles from './techService.module.css';
import api from "../../../utils/api";
import { useSnackbar } from "notistack";
import { Button, Divider} from "@mui/material";
import { ButtonStyled, TextFieldStyled } from "./styleds";

export default function TechService() {
  const { enqueueSnackbar } = useSnackbar();
  const [techServ, setTechServ] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');
  const [techServices, setTechServices] = useState([] || '');


  const handleChange = (e) => {
    setTechServ({ ...techServ, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('techservices/create', techServ, {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
      }).then((response) => {
        enqueueSnackbar(response.data.message, { variant: 'success' })
        return response.data
      })

    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
  }

  function viewForm() {
    document.getElementById('formView').style.height = '100%';
    document.getElementById('inputs').style.visibility = 'visible';
  }
  function hiddenForm() {
    document.getElementById('formView').style.height = '0px';
    document.getElementById('inputs').style.visibility = 'hidden';;
  }

  useEffect(() => {
    api.get('/techservices', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setTechServices(response.data.techServices)
    })
  }, [token])

  console.log(techServices.status)

  return (
    <>
      <h3>Ordens de Serviços</h3>
      <div>
        <Button
          variant="contained"
          color="success"
          onClick={viewForm}>
          criar ordem de serviço
        </Button>
        <Button
          variant="contained"
          color="info">
          ver ordens de serviços
        </Button>
      </div>
      <div id="formView" className={styles.view_create}>
        <form id="inputs" onSubmit={handleSubmit} className={styles.formulario}>
          <TextFieldStyled
            type="text"
            name="clientName"
            label="Nome do Cliente"
            size="small"
            value={techServ.clientName}
            onChange={handleChange}
          />
          <TextFieldStyled
            type="tel"
            name="clientPhone"
            label="Telefone do Cliente"
            size="small"
            value={techServ.clientPhone}
            onChange={handleChange}
          />
          <TextFieldStyled
            type="text"
            name="clientAdress"
            label="Endereço do Cliente"
            size="small"
            value={techServ.clientAdress}
            onChange={handleChange}
          />
          <TextFieldStyled
            type="text"
            name="description"
            label="Descrição do problema"
            size="small"
            value={techServ.description}
            onChange={handleChange}
          />
          <TextFieldStyled
            type="text"
            name="status"
            label="Status"
            size="small"
            value={techServ.status}
            onChange={handleChange}
          />
          <div className={styles.buttons}>
          <ButtonStyled
          variant="contained"
          color="success"
          onClick={handleSubmit}
          
          >
          Salvar
        </ButtonStyled>
        <ButtonStyled
          variant="contained"
          color="error"
          onClick={hiddenForm}
          sx={{right: 0}}
          >
          Ccancelar
        </ButtonStyled>
          </div>
        </form>
        
      </div>
      <div>
        {techServices.map((techService) => (
          <div className={styles.techServ} key={techService._id}>
            <div className={styles.info_client}>
              <h4>Cliente:</h4> <h5>{techService.clientName}</h5>

              <h4>Telefone:</h4> <h5>{techService.clientPhone}</h5>

              <h4>Endereço:</h4> <h5>{techService.clientAdress}</h5>
            </div>
            <div className={styles.desc}>
              <h4>Descrição</h4>
              <Divider />
              <p>{techService.description}</p>
            </div>
            <div className={styles.status}>
              <h3>{}
                 
                 
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}