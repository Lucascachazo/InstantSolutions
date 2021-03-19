import React, { useState, useEffect } from 'react'
import { Alert } from 'rsuite'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions'
import { FaEye } from "react-icons/fa";
import Api from './Api'

function RegistroProvedor(props) {
    const [hidden, setHidden] = useState(true)
    const [newProfessional, setNewProfessional] = useState({})
    const [professions, setProfessions] = useState([])
    const countries = require('../data/dataContryNames.json')
    // Funcion para ler input
    useEffect(() => {
        fetch(Api + '/professions/')
            .then(response => response.json())
            .then(data => setProfessions(data.response))
    }, [])

    const readInput = e => {
        const property = e.target.name
        var value = e.target.value
        if (property === 'fileUrlPic') value = e.target.files[0]
        if (property === 'fileWorkPic') value = e.target.files[0]
        if (property === 'fileWorkPic2') value = e.target.files[0]

        setNewProfessional({
            ...newProfessional,
            [property]: value
        })
    }
    //Funcion para enviar formulario 
    const validarUsuario = async () => {
        if (newProfessional.firstName === '' || newProfessional.lastName === '' || newProfessional.email === '' || newProfessional.phone === '' || newProfessional.password === '' || newProfessional.country === '' || newProfessional.idProfession === '') {
            Alert.error('Todos los campos deben estar completos', 4000)
            return false
        }
        const fdNewUser = new FormData()
        fdNewUser.append('firstName', newProfessional.firstName)
        fdNewUser.append('lastName', newProfessional.lastName)
        fdNewUser.append('fileUrlPic', newProfessional.fileUrlPic)
        fdNewUser.append('fileWorkPic', newProfessional.fileWorkPic)
        fdNewUser.append('fileWorkPic2', newProfessional.fileWorkPic2)
        fdNewUser.append('email', newProfessional.email)
        fdNewUser.append('phone', newProfessional.phone)
        fdNewUser.append('password', newProfessional.password)
        fdNewUser.append('country', newProfessional.country)
        fdNewUser.append('idProfession', newProfessional.idProfession)
        fdNewUser.append('rol', 'provider')
        const res = await props.signProviderUp(fdNewUser)
    }
    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            validarUsuario()
        }
    }

    return (
        <div className="registro">
            <div className="formulario">
                <h2>Registro Proveedor</h2>
                <div className="inputDiv">
                    <input name='firstName' type='text' placeholder='Ingrese su nombre' onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input name='lastName' type='' placeholder='Ingrese su apellido' onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input name='email' type='text' placeholder='Ingrese su email' onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input name='phone' type='text' placeholder='Ingrese su número de teléfono' onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <select name="country" type='text' placeholder='Elija su país' onChange={readInput} >
                        <option value=''>Selecciona un país</option>
                        {countries.map((country, i) => {
                            return <option key={"selectCountry" + i} value={country.value}>{country.label}</option>
                        })}
                    </select>
                </div>
                <div className="inputDiv">Elija su foto de Perfil
                    <input name='fileUrlPic' type='file' placeholder='Url de foto de perfil' onChange={readInput} />
                </div>
                <div className="inputDiv">Elija una foto de trabajo realizado por usted
                    <input name='fileWorkPic' type='file' placeholder='Foto de trabajo realizado' onChange={readInput} />
                </div>
                <div className="inputDiv">Elija otra foto de trabajo realizado por usted
                    <input name='fileWorkPic2' type='file' placeholder='Segunda foto de un trabajo realizado' onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <select name='idProfession' onChange={readInput}>
                        <option value=''>Seleccione el rubro de su oficio</option>
                        {professions.map(profession => {
                            return (
                                <>
                                    <option key={profession._id} value={profession._id}>{profession.type}</option>
                                </>
                            )
                        })}
                    </select>
                </div>
                <div className="inputDiv">
                    <input name='password' type={hidden ? 'password' : 'text'} placeholder='Contraseña' onChange={readInput} onKeyDown={pressEnter} />
                    < FaEye className="eye" onClick={() => setHidden(!hidden)} />

                </div>
                <div className="">
                    <button className="enviar" onClick={validarUsuario}>Enviar Registro</button>
                </div>

            </div>
        </div>
    )
}
const mapDispatchToProps = {
    signProviderUp: userActions.signProviderUp
}
export default connect(null, mapDispatchToProps)(RegistroProvedor)
