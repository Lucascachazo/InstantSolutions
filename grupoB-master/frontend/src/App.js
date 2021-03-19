import './App.css'
import { connect } from 'react-redux'
import React from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Footer from './components/Footer'
import RegistroUsuario from './components/RegistroUsuario'
import RegistroProvedor from './components/RegistroProvedor'
import Profesionales from './components/Profesionales'
import signIn from './components/SignIn'
import userActions from './Redux/actions/userActions';
import Profesional from './components/Details';
import Details from './components/Details'
import ResetPassword from './components/ResetPassword'
import ForgotPassword from './components/ForgotPassword'

const App = (props) => {
if(props.loggedUser){
  var links =
  <>
    <Switch>
      <Route exact path='/' component={LandingPage}/>
        <Route exact path='/profesional' component = {Profesional} />
        <Route path='/profesionales/:id' component = {Profesionales}/>
        <Route exact path='/details/:id' component = {Details} />
      <Redirect to ="/"/>
    </Switch>
  </>
}else if(localStorage.getItem('token')){
props.preserveLog(localStorage.getItem('token'))
}else{
   links =
  <>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/registerService' component={RegistroProvedor}/>
        <Route path='/registerUser' component={RegistroUsuario}/>
        <Route path='/signIn'component={signIn}/>
        <Route exact path='/details/:id' component = {Details} />
        <Route exact path='/forgotpassword' component={ForgotPassword}/>
        <Route exact path='/resetpassword/:token' component={ResetPassword}/>
        <Redirect to ="/"/>

      </Switch>
  </>
}
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        {links}
      </BrowserRouter>
      <Footer/>
    </>
  )
}
const mapStateToProps = state => {
  return {
    loggedUser: state.userR.loggedUser
  }
}
const mapDispatchToProps = {
  preserveLog: userActions.preserveLog
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

