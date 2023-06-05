import Styles from './imageproduct.module.css'

export default function ImageProduct({ src, alt }) {
  return (
    <img className={`${Styles.image_product}`}
      src={src}
      alt={alt}
    />
  )
}