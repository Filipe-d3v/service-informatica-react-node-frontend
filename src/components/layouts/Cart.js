import { React, useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import Styles from './cart.module.css'
import { Button, TextField } from '@mui/material';
import api from '../../utils/api';
import { useSnackbar } from 'notistack';
import { formatBalance } from '../../utils/utils';


export default function Cart() {
  const { productsToCart, addProductToCart, removeToCart, total } = useContext(CartContext);

  const { enqueueSnackbar } = useSnackbar();
  const [token] = useState(localStorage.getItem('token') || '');
  const [cashSale, setCashSale] = useState({});
  const [products, setProducts] = useState('')



  function handleChangeTypePayment(e) {
    setCashSale({ ...cashSale, type_payment: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('cashSale', cashSale)
    try {
      await api.post('/cashsales/create', cashSale, {
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

  useEffect(() => {
    let newProducts = "";

    productsToCart.map((product) => (
      newProducts += ` ${product.qty}, ${product.name}`
    ))
    setProducts(newProducts)
    setCashSale({ ...cashSale, products: newProducts })
  }, [productsToCart]);



  useEffect(() => {
    setCashSale({ ...cashSale, total: total })
  }, [total]);


  useEffect(() => {

    let newProducts = "";

    productsToCart.map((product) => (
      newProducts += ` ${product.qty}, ${product.name}`
    ))
    setProducts(newProducts)

    setCashSale({ type_payment: '', products: newProducts, total: total })


  }, [])



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
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="Total"
              name='total'
              value={formatBalance(total)}
            />
            <TextField
              type="text"
              name='products'
              value={products}
            />
            <TextField
              type='text'
              label='Forma de pagamento'
              name='type_payment'
              value={cashSale.type_payment}
              onChange={handleChangeTypePayment}
            />
            <Button
              type='contained'
              color='primary'
              onClick={handleSubmit}
            >
              Finalizar venda
            </Button>
          </form>

        </div>
      </div>
    </>
  )
}