import axios from 'axios'
import Api from '../../components/Api'

const professionActions = {
  getProfessions: () =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.get(Api+'/professions/')
        dispatch({
          type: "GET_PROFESSIONS",
          payload: response.data
        })
      }catch(error){
        console.log(error)
      }
    }
  },
  getProviders: () =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.get(Api+'/user/providers/')
        dispatch({
          type: "GET_PROVIDERS",
          payload: response.data
        })
      }catch(error){
        console.log(error)
      }
    }
  }
}

export default professionActions