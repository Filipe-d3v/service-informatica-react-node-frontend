import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { Context } from "../../../context/UserContext";
import Styles from './login.module.css';

export default function Lgin() {
  const [user, setUser] = useState({})
  const { login } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    login(user)
  }
  return (
    <>
      <div className={Styles.login_container}>
        <div className={Styles.login_card}>
          <h1>Login</h1>
          <TextField
            data-input='input'
            variant="outlined"
            size="small"
            label="E-mail"
            type="email"
            name="email"
            placeholder="Digite o e-mail"
            onChange={handleChange} />
          <br />
          <br />
          <TextField
            data-input='input'
            variant="outlined"
            size="small"
            label="Senha"
            type="password"
            name="password"
            placeholder="Digite a senha"
            onChange={handleChange} />
          <br />
          <br />
          <Button onClick={handleSubmit} variant="contained" size="small" color='success'>entrar</Button>
        </div>
      </div>
    </>
  )
}