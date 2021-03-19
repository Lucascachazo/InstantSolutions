import axios from 'axios'
import {Alert} from 'rsuite'
import Api from '../../components/Api'

const userActions = {
   signUp: (fdNewUser) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post(Api+'/user/customer', fdNewUser,{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        })
        
        if(response.data.success===false){
          
          var errors=[]
          response.data.errores && response.data.errores.details.map(error=>{
            switch (error.path[0]) {
              case 'firstName':
                errors.push({label:error.context.label,message:"El nombre debe tener minimo 2 caracteres."})
                break;
              case 'lastName':
                errors.push({label:error.context.label,message:"El apellido debe tener minimo 2 caracteres."})
                break;
              case 'urlPic':
                errors.push({label:error.context.label,message:"Debe contener formato de url real."})
                break;
              case 'email':
                errors.push({label:error.context.label,message:"El correo tiene que contener un arroba y un dominio como minimo."})
                break;
              case 'phone':
                errors.push({label:error.context.label,message:"El telefono debe tener al menos 10 caracteres, sin 0 al principio y ningún caracter especial."})
                break;
              case 'password':
                errors.push({label:error.context.label,message:"La contraseña debe tener al menos 6 a 8 caracteres y una mayuscula y una minuscula."})
                break;
              case 'country':
                errors.push({label:error.context.label,message:"Debes seleccionar algun país."})
                break;
            }
          })
        }
        dispatch({
          type: "USER_LOG",
          payload: response.data.response
        })
        Alert.success('Tu cuenta fue creada con éxito')
        return ({success: true})
      }catch(err){
        return({success: false, response: errors})
      }
    }
  },  
  googleSignUp: (newUser) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post(Api+'/user/customer', newUser)
        if(response.data.success===false){
          var errors=[]
          response.data.errores && response.data.errores.details.map(error=>{
            switch (error.path[0]) {
              case 'firtsName':
                errors.push({label:error.context.label,message:"El nombre debe tener minimo 2 caracteres."})
                break;
              case 'lastName':
                errors.push({label:error.context.label,message:"El apellido debe tener minimo 2 caracteres."})
                break;
              case 'urlPic':
                errors.push({label:error.context.label,message:"Debe contener formato de url real."})
                break;
              case 'email':
                errors.push({label:error.context.label,message:"El correo tiene que contener un arroba y un dominio como minimo."})
                break;
              case 'phone':
                errors.push({label:error.context.label,message:"El telefono debe tener al menos 10 caracteres, sin 0 al principio y ningún caracter especial."})
                break;
              case 'password':
                errors.push({label:error.context.label,message:"La contraseña debe tener al menos 6 a 8 caracteres y una mayuscula y una minuscula."})
                break;
              case 'country':
                errors.push({label:error.context.label,message:"Debes seleccionar algun país."})
                break;
            }
          })
        }
        dispatch({
          type: "USER_LOG",
          payload: response.data.response
        })
        return ({success:true,response:["Tu cuenta fue creada con éxito!"]})
      }catch(err){
        Alert.error('Uy! Algo salió mal!')
      }
    }
  },    
  signProviderUp: (fdNewUser) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post(Api+'/user/provider', fdNewUser,{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        })
        if(!response.data.success){
          return response.data
        }
        dispatch({
          type: "USER_LOG",
          payload: response.data.response
        })
        Alert.success("Tu cuenta fue creada con éxito!")
      }catch(err){
        console.log(err)
        Alert.error('Uy! Algo salió mal!')
      }
    }
  },
  signOut: () =>{
    return async (dispatch, getState) =>{
      dispatch({
        type: "SIGN_OUT",
      })
      Alert.success('Nos vemos pronto!')
    }
  },
  preserveLog: (token) =>{
    const idUser=localStorage.getItem('idUser')
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post(Api+'/user/storage', {token,idUser}, {
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
         dispatch({
           type: "USER_LOG",
           payload: response.data.response
         })
        
      }
      catch(error){
        console.log(error)
    //     if(error.response.status === 401){
    //       localStorage.clear()
    //   return false
    // }
      }
    }
  },
  signIn: (user) => {
      return async (dispatch, getState) => {
          const respuesta = await axios.post(Api+'/user/signIn', user)
          if (!respuesta.data.success) {
            
              return respuesta.data
          }
          Alert.success("Hola " + respuesta.data.response.firstName + '!')
          dispatch({type:'USER_LOG', payload: respuesta.data.response})
      }
  },
  requestResetPass:(userMail) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.post(Api+'/user/requestresetpass', userMail)
      if (!respuesta.data.success) {
          Alert.error(`${respuesta.data.response}`,5000)
      }else{
        Alert.success(`${respuesta.data.response}`,5000)
        return true
      }
    }
  },
  validateResetPassword:(newPasswordData) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.post(Api+'/user/resetpassword', newPasswordData)
      if (!respuesta.data.success) {
        Alert.error(`${respuesta.data.response}`,5000)
      }else{
        Alert.success(`${respuesta.data.response}`,5000)
        return true
      }
      
    }
  },
  validateResetUser:(token) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.post(Api+'/user/requestresetuser', {token})
      
      if (respuesta.data.success===false){
        return respuesta.data
      }else{
        return respuesta.data
      }      
    }
  },
  
}

export default userActions