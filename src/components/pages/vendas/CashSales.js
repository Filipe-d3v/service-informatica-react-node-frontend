import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import styles from './vendas.module.css';
import { Divider } from "@mui/material";
import { formatBalance } from "../../../utils/utils";

export default function CashSales() {
  const [vendas, setVendas] = useState([] || '');
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    api.get('/cashsales', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setVendas(response.data.cashsale)
    })
  }, [token]);


  return (
    <>
      <h2>Vendas</h2>
      {vendas?.map((venda) => (
        <div className={styles.card_vendas} key={venda._id}>

          <div className={styles.data_venda}>
            <h3>Data da Venda:</h3>  <h4>{venda.date}</h4>
          </div>

          <Divider />
          <div className={styles.user_name}>
            <h4>Usuário:</h4> <h4>{venda.user.name}</h4>
          </div>

          <div className={styles.products}>
            Produtos:
            <h5>{venda.products}</h5>
          </div>
          <h4>Tipo de pagamento: {venda.type_payment}</h4>
          <h2>Total: {formatBalance(venda.total)}</h2>
        </div>
      ))}

    </>
  )
}