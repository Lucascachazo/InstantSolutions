import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import userActions from '../Redux/actions/userActions'
import { Alert } from 'rsuite'

const ResetPassword = ({ match, validateResetPassword, validateResetUser, history }) => {
  const [respuesta, setRespuesta] = useState({})
  const [resetPass, setResetPass] = useState({})
  useEffect(() => {
    validate()
  }, [])

  if (respuesta.success === false) {
    history.push('/')
  }
  const validate = async () => {
    setRespuesta(await validateResetUser(match.params.token))
  }


  const resetPasswordA = async () => {
    if (resetPass.password === resetPass.confirmPassword) {
      const changePassword = await validateResetPassword(resetPass)
      if (changePassword) {
        history.push('/signup')
      }
    } else {
      Alert.warning("Las contraseñas deben coincidir.")
    }
  }
  const leerInput = e => {
    const property = e.target.name
    var value = e.target.value
    setResetPass({
      ...resetPass,
      tokenResetPassword: match.params.token,
      [property]: value
    })
  }
  return (
    <div className="registro">
      <div className="formulario">
        <h2>¡Restablece tu contraseña!</h2>
        <div className="inputDiv">
          <input name='password' type='password' placeholder='Contraseña' onChange={leerInput} />
        </div>
        <div className="inputDiv">
          <input name='confirmPassword' type='password' placeholder='Confirma la contraseña' onChange={leerInput} />
        </div>
        <div className="">
          <button className="enviar" onClick={resetPasswordA}>Enviar Registro</button>
        </div>
      </div>
    </div>
  )
}
const mapDispatchToProps = {
  validateResetPassword: userActions.validateResetPassword,
  validateResetUser: userActions.validateResetUser
}
export default connect(null, mapDispatchToProps)(ResetPassword)