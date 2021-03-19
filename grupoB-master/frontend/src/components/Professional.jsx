
import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillStarFill } from 'react-icons/bs'
import { GiCheckMark } from 'react-icons/gi'
const Professional = ({ professionals }) => {
  const { idUserBase, idProfession } = professionals
  const array = [...professionals.arrayValoration]
  const stars = Math.round(array.reduce((a, b) => (a + b)) / professionals.arrayValoration.length)
  return (
    <div>
      <Link to={'/details/' + professionals._id} className="profesional">
        <div className="user">
          <div className="fotoUser" style={{ backgroundImage: `url(.${idUserBase.urlPic})` }}></div>
          <div><h2>{idUserBase.firstName} {idUserBase.lastName}</h2></div>
          <div>{[...Array(5)].map((m, i) => {
            const ratingValue = i + 1
            return (
              <label key={i}>
                <input
                  className="starInput"
                  type="radio"
                  name="rating"
                />
                <BsFillStarFill className="star" color={(ratingValue <= stars) ? '#ffc107' : '#8C8C8C'} />
              </label>
            )
          })}</div>
        </div>
        <div>
          <div className="detailsProf">
            <div className="info">
              <h3>{idProfession.type}</h3>
              <div>
                {professionals.idProfession.descriptions.map(description => {
                  return <p><GiCheckMark className="icono" />{description}</p>
                })}
              </div>
            </div>
          </div>
          <div>
            <button className="contract">Ver perfil</button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Professional
