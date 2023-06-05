import { React, useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import Styles from './cart.module.css'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import api from '../../utils/api';
import { useSnackbar } from 'notistack'

export default function Cart() {
  const { productsToCart, addProductToCart, removeToCart, calcTotal } = useContext(CartContext);
  const [cashSale, setCashSale] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [token] = useState(localStorage.getItem('token') || '');
  const [formOfPay, setFormaOfPay] = useState('');

  let total = calcTotal();

  async function createCashSale(sale) {
    try {
      await api.post('/cashsales/create', {}, {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
      })
        .then((response) => {
          enqueueSnackbar(response.data.message, { variant: 'success' })
          return response.data;
        })
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
  }
  function handleChange(e) {
    setFormaOfPay( e.target.value )
  }

  function handleSubmit(e) {
    e.preventDefault()
    createCashSale(cashSale)
  }

  return (
    <>
      <div className={Styles.cart_container}>
        {productsToCart.map((product) => (
          <div className={Styles.card} key={product._id}>

            <div >
              <img
                src={`${process.env.REACT_APP_API_LOCAL}/images/products/${product.image}`}
                alt={product.name} />
            </div>

            <div>
              <p style={{ fontWeight: "bold", fontSize: "18px", color: "#1976D2" }}>{product.name}</p>
              <p style={{ display: 'flex' }}> <h4 style={{ margin: '0' }}> Dpto: </h4> {product.dpt}</p>
              <p>Preço: {product.price.toFixed(2)}</p>
            </div>

            <section>
              <h4>QUANTIDADE</h4>
              <p>{product.qty}</p>
              <Button
                variant='contained' color='success' style={{ height: '25px' }}
                onClick={() => addProductToCart(product._id, product.name, product.dpt, product.price, product.image, product.qty)}
              >
                <p style={{ color: '#fff' }}>+</p>
              </Button>
              <Button
                variant='contained' color='error' style={{ height: '25px' }}
                onClick={() => removeToCart(product._id)}
              >
                <p style={{ color: '#fff' }}>-</p>
              </Button>
            </section>

          </div>

        ))}
        <div className={Styles.payment}>
          <p>Total: {total.toFixed(2)}</p>
          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-simple-select-label" variant='standard'>Forma de pagamento</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formOfPay}
              onChange={handleChange}
              label="pagamento"

            >
              <MenuItem value={"Dinheiro"}>Dinheiro</MenuItem>
              <MenuItem value={"Pix"}>Pix</MenuItem>
              <MenuItem value={"Cartão de crédito"}>Cartão de crédito</MenuItem>
              <MenuItem value={"Cartão de débito"}>Cartão de débito</MenuItem>
              <MenuItem value={"Transferência bancária"}>Transferência bancária</MenuItem>
            </Select>

            <Button variant='contained' color='success' style={{ height: '35px', marginTop: '1em' }}
              onClick={handleSubmit}
            >
              <h4>VENDER</h4>
            </Button>
          </FormControl>

        </div>
      </div>
    </>
  )
}