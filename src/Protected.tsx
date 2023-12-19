import React, { useContext, useEffect } from 'react'
import AuthContext from './context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Protected({compo}) {
    const {isLoggedIn} = useContext(AuthContext)
    const navigate = useNavigate();
    useEffect(() => {
        if(!isLoggedIn){
          navigate('/')
        }
    })
  return (
    <>
      {compo}
    </>
  )
}

export default Protected