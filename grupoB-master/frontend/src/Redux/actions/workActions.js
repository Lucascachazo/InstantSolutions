import axios from 'axios'
import {Alert} from 'rsuite'
import Api from '../../components/Api'

const workActions = {
  getWorks: () =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.get(Api+'/work')
        dispatch({type:'GET_WORKS', payload:response.data.response})
      }
      catch(error){
        console.log(error)
      }
    }
  },
  
  addWork : (workData) =>{
    return async (dispatch,getState) =>{
      try {
        
        const response = await axios.post(Api+'/work',workData)
        if(response){
          const resp = await axios.post(Api+'/mail/sendMail', {idWork: response.data.response.work._id})
        }
        Alert.success('Enviaste una solicitud al profesional')
        // dispatch({
        //   type:"ADD_WORK"
        // })
      } catch (error) {
        console.log(error)
      }
    }
  },
  changeState:(idWork)=>{
    return async (dispatch,getState) =>{
      const response = await axios.put(Api+'/work',{idWork})
      if(response.data.success){
      //  Alert.success("La propuesta fue aceptada",3500)
      }else{
        Alert.error("Error",3500)
      }
      dispatch({
        type:"CHANGE_STATE"
      })

    }
  },
  deleteWorkbyId: (id) =>{
    return async (dispatch, getState) =>{
      try{
        const res = await axios.post(Api+'/mail/sendMail', id)
        const response = await axios.delete(Api+'/work/'+id.idWork)
        dispatch({type:'DEL_WORK', payload:response.data})
      }
      catch(error){
        console.log(error)
      }
    }
  },

  getConsumerWorks: (id) =>{
    return async (dispatch, getState) =>{
      try{
        
        const response = await axios.get(Api+'/userWork/'+ id)
        dispatch({type:'GET_WORK', payload:response.data.response})
      }
      catch(error){
       
      }
    }
  },
  sendMail: (idWork) =>{
    return async (dispatch, getState) =>{
      try {
        const response = await axios.post(Api+'/mail/sendMail', {idWork})
        dispatch({
          type: 'SEND_MAIL',
          
        })
        Alert.success('Se ha enviado un mail!')
      } catch (error) {
        console.log(error)
      }
    }
  },
  sendComment: (comment) =>{
    return async (dispatch, getState) =>{
      const respuesta = await axios.post(Api+'/comment', comment)
      dispatch({
        type: 'COMMENT',
        payload: respuesta.data
      })
    }
  },
  deleteComment: (idUser, commentId) =>{
    return async (dispatch, getState) =>{
      const respuesta = await axios.put(Api+'/delcomment', {idUser, commentId})
      dispatch({
        type: 'COMMENT',
        payload: respuesta.data
      })
      Alert.success('Eliminaste el comentario')
    }
  },
  updateComment: (idUser, commentId, comment) =>{
   return async (dispatch, getState) =>{
      const respuesta = await axios.post(Api+'/updatecomment', {idUser, commentId, comment})
      dispatch({
        type: 'COMMENT',
        payload: respuesta.data
      })
      Alert.success('Comentario actualizado')
    }
  },
  rankProvider : (value, id) =>{
    return async (dispatch, getState) =>{
      const respuesta = await axios.post(Api+'/rank', {value, id})

      dispatch({
        type: "RANK",
        payload: respuesta.data
      })
    }
  },
}

export default workActions