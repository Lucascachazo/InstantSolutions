import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi';
import Logo from '../assets/logo3.png'
import userPic from '../assets/user.svg'
import userActions from '../Redux/actions/userActions'
import workActions from '../Redux/actions/workActions'
import MenuUser from './MenuUser'

const Navbar = ({ loggedUser, signOut, getWorks }) => {
  const [nav, setNav] = useState(true)

  const openNav = () => {
    setNav(!nav)
  }

  const logOut = () => {
    openNav()
    signOut()
    localStorage.clear()
  }

  return (
    <nav>
      <FiMenu className="burger" onClick={openNav} />
      <div className={nav ? "navBar" : "navBar activeNav"}>
        <div className="logoName">
          <div className="logoDiv" >
            <img src={Logo} alt="" />
          </div>
          {loggedUser && (

            <h3 className="navUserName">Hola, {loggedUser.firstName}!</h3>

          )}

        </div>
        <div className="links">
          {!loggedUser && (
            <NavLink to="/registerService" className="navBarLinks">
              <button className="registerBtn" onClick={openNav}>Registrate como Prestador</button>
            </NavLink>
          )}
          <NavLink exact to="/" className="navBarLinks" onClick={openNav}>
            Inicio
        </NavLink>
          {!loggedUser ? (
            <>
              <NavLink to="/registerUser" className="navBarLinks" onClick={openNav}>
                Registrate
            </NavLink>
              <NavLink to="/signIn" className="navBarLinks" onClick={openNav}>
                Iniciar sesión
            </NavLink>
              <div className="userPic" style={{ backgroundImage: `url(${loggedUser ? loggedUser.urlPic : userPic})` }}></div>

            </>
          ) : (
              <>
                <Link to='/' className="navBarLinks" onClick={logOut} >Sign Out</Link>
                <div className="userPic" style={{ backgroundImage: `url(${loggedUser ? loggedUser.urlPic : userPic})` }}></div>
                <MenuUser />
                {/* TESTEANDO CESAR */}
              </>
            )}
        </div>
      </div>

    </nav>
  )
}

const mapStateToProps = state => {
  return {
    loggedUser: state.userR.loggedUser
  }
}

const mapDispatchToProps = {
  signOut: userActions.signOut,
  getWorks: workActions.getWorks
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)


























































