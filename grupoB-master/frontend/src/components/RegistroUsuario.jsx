import React from 'react'
import { useState } from 'react'
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions'
import { Alert } from 'rsuite';
import { FaEye } from "react-icons/fa";


function RegistroUsuario({ signUp, googleSignUp }) {
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        country: '',
    })
    const [errores, setErrores] = useState([])
    const [errorObj, setErrorObj] = useState({})
    const [hidden, setHidden] = useState(true)

    const failedInputs = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        urlPic: null,
        country: null,
        phone: null
    }

    const countries = require('../data/dataContryNames.json')
    // Funcion para ler input
    const leerInput = e => {
        const property = e.target.name
        var value = e.target.value
        if (property === 'fileUrlPic') value = e.target.files[0]
        setNewUser({
            ...newUser,
            [property]: value
        })

    }
    //Funcion para enviar formulario 
    const validarUsuario = async () => {
        if (newUser.firstName === '' || newUser.lastName === '' || newUser.email === '' || newUser.phone === '' || newUser.password === '' || newUser.country === '') {
            Alert.error('Todos los campos deben estar completos', 4000)
            return false
        }
        //llenando el formData con la informacion de los input
        const fdNewUser = new FormData()
        fdNewUser.append('firstName', newUser.firstName)
        fdNewUser.append('lastName', newUser.lastName)
        fdNewUser.append('fileUrlPic', newUser.fileUrlPic)
        fdNewUser.append('email', newUser.email)
        fdNewUser.append('phone', newUser.phone)
        fdNewUser.append('password', newUser.password)
        fdNewUser.append('country', newUser.country)
        fdNewUser.append('rol', 'consumer')

        const res = await signUp(fdNewUser)

        //mostrar al usuario sí el objeto con la propiedad success es true o false
        //el objeto respuesta va a llegar como un array de strings
        if (res && !res.success) {
            setErrores(res.response)
            res.response.map(error => {
                failedInputs[error.label] = error.message
                return false
            })
            setErrorObj(failedInputs)
        }

    }
    //Respuesta de Google
    const responseGoogle = async (response) => {
        if (response.error) {
            Alert.error('Intente nuevamente', 4000)
        } else {
            const respuesta = await googleSignUp({
                firstName: response.profileObj.givenName,
                lastName: response.profileObj.familyName,
                email: response.profileObj.email,
                phone: "3513963871",
                googlePic: response.profileObj.imageUrl,
                password: `Aa${response.profileObj.googleId}`,
                country: 'Argentina',
                rol: 'consumer',
                google: 'true'

            })
            if (respuesta && !respuesta.success) {
                setErrores(respuesta.errores)
            }
        }
    }

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            validarUsuario()
        }
    }
    return (
        <>
            <div>

            </div>
            <div className="registro">
                <div className="formulario">
                    <h2>¡Ingresá tus datos!</h2>
                    <div className="inputDiv">
                        <input name='firstName' type='text' placeholder='Ingrese su nombre' onChange={leerInput} />
                        <small>{errorObj.firstName}</small>
                    </div>
                    <div className="inputDiv">
                        <input name='lastName' type='' placeholder='Ingrese su Apellido' onChange={leerInput} />
                        <small>{errorObj.lastName}</small>
                    </div>
                    <div className="inputDiv">
                        <small>{errorObj.email}</small>
                        <input name='email' type='text' placeholder='Ingrese su dirección de correo electrónico' onChange={leerInput} />
                    </div>
                    <div className="inputDiv">
                        <small>{errorObj.phone}</small>
                        <input name='phone' type='text' placeholder='Ingrese su número de teléfono' onChange={leerInput} />
                    </div>
                    <div className="inputDiv">
                        <small>{errorObj.country}</small>
                        <select name="country" type='text' placeholder='Seleccione su país' onChange={leerInput} >
                            <option value=''>Selecciona un país</option>
                            {countries.map((country, i) => {
                                return <option key={"selectCountry" + i} value={country.value}>{country.label}</option>
                            })}
                        </select>
                    </div>
                    <div className="inputDiv">
                        <label>Elija su foto de perfil
                        <small>{errorObj.userPicture}</small>
                            <input name='fileUrlPic' type='file' placeholder='Url de foto de perfil' onChange={leerInput} />
                        </label>
                    </div>
                    <div className="inputDiv">
                        <small>{errorObj.password}</small>
                        <input name='password' type={hidden ? 'password' : 'text'} placeholder='Elija su contraseña' onChange={leerInput} onKeyDown={pressEnter} />
                        < FaEye className="eye" onClick={() => setHidden(!hidden)} />
                    </div>
                    <div className="">
                        <button className="enviar" onClick={validarUsuario}>Enviar Registro</button>
                    </div>
                    <div>
                        <GoogleLogin className="google"
                            clientId="844411322334-bc3sorc4j8lcrmosuddqcab17jf1fs41.apps.googleusercontent.com"
                            buttonText="Crear cuenta con Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        loggedUser: state.userR.loggedUser
    }
}
const mapDispatchToProps = {
    signUp: userActions.signUp,
    googleSignUp: userActions.googleSignUp
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistroUsuario)
