const initState = {
  loggedUser: null,
  comments: []

}

const userReducer = (state = initState, action) =>{
    switch(action.type){
      case "USER_LOG":
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('firstName', action.payload.firstName)
        localStorage.setItem('urlPic', action.payload.urlPic)
        localStorage.setItem('idUser', action.payload.idUser)
        localStorage.setItem('_id', action.payload._id)
        localStorage.setItem('rol', action.payload.rol)
        localStorage.setItem('google', action.payload.google)
        
        return{
          ...state,
          loggedUser: action.payload
        }
      case "SIGN_OUT":
        return{
          ...state,
          loggedUser: null
        }
      case 'SEND_COMMENT':
        return{
          ...state,
          comments: action.payload.respuesta.review
        }
      case 'DEL_COMMENT':
      return{
        ...state
      }
      case 'RANK':
      return{
        ...state
      }
      case 'UPDATE_COMMENT':
        return{
          ...state
        }
      default :
          return state
      }
}
export default userReducer