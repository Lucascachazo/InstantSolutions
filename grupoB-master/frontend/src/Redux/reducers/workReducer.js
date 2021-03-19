const initState = {
   works:[],
   addWorks: [],
   currentWorks:0,
   oneWork: {} ,
   userWork: []
   }
 
 const workReducer = (state = initState, action) =>{
     switch(action.type){
       case 'GET_WORKS':
         return{
           ...state,
           works: action.payload
         }
       case "ADD_WORK":
         return {
           ...state.works,
           addWorks: action.payload,
           workId: action.payload.workId
          }
          case 'GET_WORK':
            return{
              ...state,
              userWork: action.payload
            }
          case 'CHANGE_STATE':
            return {
              ...state,
              currentWorks:state.currentWorks+1
            }
          case 'DEL_WORK':
            return{
              ...state
            }
          case 'SEND_MAIL':
            return{
              ...state
            }
            case 'COMMENT':
              return{
                ...state,
                //works: state.works.filter( work => work._id === action.payload.respuesta._id ? action.payload.respuesta : work)
              }
            
            case 'RANK':
              
            return{
              ...state,
              works: state.works.filter( work => work._id === action.payload.respuesta._id ? action.payload.respuesta : work)

            }
            
       default :
           return state
       }
 }
 export default workReducer