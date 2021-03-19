import React, { useEffect, useState } from 'react'
import { connect, Provider } from 'react-redux'
import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import professionActions from '../Redux/actions/professionActions'
import Professional from './Professional'


const Profesionales = (props) => {
    const [providers, setProviders] = useState([])
    const id = props.match.params.id

    useEffect(() => {
        if (props.providers.length === 0) {
            props.history.push('/')
            return false
        }
        const professionals = props.providers.respuesta.filter(provider => {
            return id === provider.idProfession._id
        })
        setProviders(professionals)

    }, [])

    return (
        <>
            <div className="profesionales">
                <h2>Elegí tu profesional favorito</h2>
                {providers && providers.map(professionals => {
                    return (
                        <Professional professionals={professionals} key={professionals._id} />
                    )
                })}
                <div className="back">
                    <Link to="/"><button className="contract">Volver</button></Link>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        providers: state.professionR.providers
    }
}


export default connect(mapStateToProps)(Profesionales)