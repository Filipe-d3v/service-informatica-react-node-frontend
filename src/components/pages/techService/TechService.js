import React, { useEffect, useState } from "react";
import styles from './techService.module.css';
import api from "../../../utils/api";
import { useSnackbar } from "notistack";
import { Button, Divider, TextField } from "@mui/material";

export default function TechService() {
  const { enqueueSnackbar } = useSnackbar();
  const [techServ, setTechServ] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');
  const [techServices, setTechServices] = useState([] || '')


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
    document.getElementById('formView').style.transition = '0.8s';
  }
  function hiddenForm() {
    document.getElementById('formView').style.height = '0px';
    document.getElementById('inputs').style.visibility = 'hidden';
    document.getElementById('inputs').style.transition = '0.8s';
  }

  useEffect(() => {
    api.get('/techServices').then((response) => {
      setTechServices(response.data.techServices)
    })
  }, [])

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
          <TextField
            type="text"
            name="clientName"
            label="Nome do Cliente"
            size="small"
            value={techServ.clientName}
            onChange={handleChange}
          />
          <TextField
            type="tel"
            name="clientPhone"
            label="Telefone do Cliente"
            size="small"
            value={techServ.clientPhone}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="clientAdress"
            label="Endereço do Cliente"
            size="small"
            value={techServ.clientAdress}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="description"
            label="Descrição do problema"
            size="small"
            value={techServ.description}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="status"
            label="Status"
            size="small"
            value={techServ.status}
            onChange={handleChange}
          />
          <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}>
          Salvar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={hiddenForm}>
          Ccancelar
        </Button>
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
              <h3>{techService.status}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}