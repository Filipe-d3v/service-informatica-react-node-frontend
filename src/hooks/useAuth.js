import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../utils/api'
import { useSnackbar } from 'notistack'

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()
  const id = useParams()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
    console.log(token)
  }, [])

  async function getUser() {
    try {
      const data = await api.get(`/users/${id}`).then((response) => {
        return response.data
      })
      await authUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function register(user) {
    try {
      const data = await api.post('/users/register', user).then((response) => {
        return response.data
      })
      await authUser(data)
    } catch (error) {

    }
  }

  async function authUser(data) {
    setAuthenticated(true)
    localStorage.getItem('token', JSON.stringify(data.token))
    navigate('/')
  }

  async function login(user) {
    try {
      const data = await api.post('/users/login', user).then((response) => {
        enqueueSnackbar(response.data.message, {variant: 'success'})
        return response.data
      })
      await authUser(data)
    } catch (error) {
      enqueueSnackbar(error.response.data.message, {variant: 'error'})
    }
  }

  function logout() {
    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    navigate('/login')
  }

  return { authenticated, login, register, logout, getUser }
}