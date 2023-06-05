import { useState, useEffect } from 'react'
import styles from './message.module.css'
import bus from '../../utils/bus'

export default function Message() {
  const [message, setMessage] = useState('')
  const [visibility, setVisibiity] = useState(false)
  const [type, setType] = useState("")

  useEffect(() => {
    bus.addListener(`flash`, ({message, type}) => {
      setVisibiity(true)
      setMessage(message)
      setType(type)

      setTimeout(() => {
        setVisibiity(false)
      },3000)
    })
  },[])

  return (

    visibility && (
      <div className={`${styles.message} ${styles[type]}`}>
        {message}
      </div>
    )
  )


}