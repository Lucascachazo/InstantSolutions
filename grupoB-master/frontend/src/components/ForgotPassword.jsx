import { connect } from 'react-redux'
import { useState } from 'react'
import userActions from '../Redux/actions/userActions'

const ForgotPassword = ({ requestResetPass, history }) => {
  const [resetPass, setResetPass] = useState({})
  const resetPassword = async () => {
    const response = await requestResetPass(resetPass)
    if (response) {
      history.push('/')
    }
  }
  const leerInput = e => {
    const property = e.target.name
    var value = e.target.value
    setResetPass({
      ...resetPass,
      [property]: value
    })
  }
  return (
    <div className="registro">
      <div className="formulario">
        <h2 style={{ fontSize: '1.6rem', textAlign: 'center' }}>¡Recupera tu contraseña!</h2>
        <div className="inputDiv">
          <input name='email' type='text' placeholder='Ingresa tu dirección de correo electrónico' onChange={leerInput} />
        </div>
        <div className="">
          <button className="enviar" onClick={resetPassword}>Enviar Registro</button>
        </div>
      </div>
    </div>
  )
}
const mapDispatchToProps = {
  requestResetPass: userActions.requestResetPass
}
export default connect(null, mapDispatchToProps)(ForgotPassword)