import { React, useState, useEffect, useContext } from "react";
import api from '../../../utils/api';
import ImageProduct from "../../layouts/ImageProduct";
import { Button, Fab } from '@mui/material';
import { Context } from '../../../context/UserContext';
import { CartContext } from '../../../context/CartContext';
import Styles from './products.module.css';
import { WhatsApp } from '@mui/icons-material';
import FabWhats from "../../layouts/FabWhats";
import { formatBalance } from '../../../utils/utils'

export default function Products() {
  const [products, setProducts] = useState([]);
  const { authenticated } = useContext(Context);
  const { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    api.get('products').then((response) => {
      setProducts(response.data.products)
    })
  }, []);


  return (
    <>
      <Fab className={Styles.fab}>
        <WhatsApp />
      </Fab>
      <h1>Produtos</h1>
      <div className={Styles.product_container}>
        {products.map((product) => (
          <div key={product._id} className={Styles.card_product}>
            <h3>{product.name}</h3>
            <ImageProduct
              src={`${process.env.REACT_APP_API_LOCAL}images/products/${product.image}`}
              alt={product.name}
            />
            <div className={Styles.product_info}>
              {product.description}<br />
              {formatBalance(product.price)}
            </div>
            <Button variant='contained' color="warning" size='small'>ver</Button>
            {authenticated ?
              (<>
                <Button variant='contained' color="success" size='small'
                  onClick={() => addProductToCart(product._id, product.name, product.dpt, product.price, product.image, product.qty)}>
                  ADD ao Carrinho
                </Button>
              </>) :
              (<> </>)
            }
          </div>
        ))}
      </div>
    </>
  )
}