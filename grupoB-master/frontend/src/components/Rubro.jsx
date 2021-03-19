import React from 'react'
import { Link } from 'react-router-dom'
import { Alert } from 'rsuite'


const Rubro = ({ profession, loggedUser }) => {
  const userNotLogged = () => {
    Alert.error('Tenés que iniciar sesión o registrarte para ingresar!')
  }
  return (
    <Link className="profession" to={'/profesionales/' + profession._id} onClick={!loggedUser && userNotLogged} >
      <div className="professionLink" style={{ backgroundImage: `url(${profession.urlPic})` }}>
      </div>
      <h6>{profession.type}</h6>
    </Link>
  )
}

export default Rubro
