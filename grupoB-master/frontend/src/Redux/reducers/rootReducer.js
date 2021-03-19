import {combineReducers} from 'redux'
import UserResucer from './userReducer'
import professionReducer from './professionReducer'
import workReducer from './workReducer'

const rootReducer = combineReducers({
userR: UserResucer,
professionR: professionReducer,
workR: workReducer
})

export default rootReducer