import React from "react";
import Styles from './main.module.css'

export default function Main({ children }) {
  return (
    <>
      <main className={Styles.container}>
        {children}
      </main>
    </>
  )
}