import { createContext } from "react";

import useAuth from '../hooks/useAuth';

const Context = createContext()

function UserProvider({ children }) {
  const { authenticated, login, register, logout, getUser } = useAuth()

  return <Context.Provider value={{ authenticated, register, login, logout, getUser }}>
    {children}
  </Context.Provider>
}

export {Context, UserProvider}