import React, { useEffect, useState } from "react";
import api from "../../../utils/api";

export default function CashSales(){
  const [cashSales, setCashSales] = useState({})
  
  useEffect(() => {
    api.get('/cashsales').then((response) => {
      setCashSales(response.data.cashSales)
    })
  }, [])
  return(
    <>
      <h2>Vendas</h2>

      {cashSales.map((cashSale) => (
        <div key={cashSale._id}>
          {cashSale.date}
          {cashSale.user.name}
        </div>
      ))}
    </> 
  )
}