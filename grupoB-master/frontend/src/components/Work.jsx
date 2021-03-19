import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import workActions from '../Redux/actions/workActions'
import { Timeline, Icon } from 'rsuite'

const Work = (props) => {
   const { work, getWorks, changeState, reload, setReload, loggedUser, deleteWorkbyId, sendMail } = props
   const { idUserConsumer, idUserProvider, state, _id } = work

   const [visible, setVisible] = useState(true)
   const [currentState, setCurrentState] = useState('')

   async function acceptProposal() {
      await changeState(_id)
      await sendMail(_id)
      setReload(!reload)
      setVisible(!visible)

   }

   const finishWork = async () => {
      await changeState(_id)
      await sendMail(_id)
      setReload(!reload)

   }
   const declineProposal = async () => {

      await deleteWorkbyId(_id)
      setReload(!reload)


   }
   useEffect(() => {
      if (state === 1) {
         setCurrentState('Pendiente de aprobación')
      } else if (state === 2) {
         setCurrentState('Trabajo aprobado')
      } else if (state === 3) {
         setCurrentState('Trabajo terminado')
      }
   }, [state])



   return (

      <div className="workContainer">
         {loggedUser && loggedUser.rol === "consumer" ?
            (
               <div className="workDetails">
                  <div className='radius' style={{ width: '50px', height: '50px', backgroundImage: `url('${idUserProvider.idUserBase.urlPic.startsWith('.') ? (window.location.pathname !== '/' ? '.' : '') : ''}${idUserProvider && idUserProvider.idUserBase.urlPic}')`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
                  <h5>{idUserProvider && idUserProvider.idUserBase.firstName} {idUserProvider && idUserProvider.idUserBase.lastName}</h5>
                  <small>{idUserProvider && idUserProvider.idUserBase.email}</small>
                  <h5 className={state === 3 ? 'success' : ''}>{currentState}</h5>

               </div>

            ) :

            <div className="workDetails">
               <div className='radius' style={{ width: '50px', height: '50px', backgroundImage: `url('${idUserConsumer.idUserBase.urlPic.startsWith('.') ? (window.location.pathname !== '/' ? '.' : '') : ''}${idUserConsumer && idUserConsumer.idUserBase.urlPic}')`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
               <h5>{idUserConsumer && idUserConsumer.idUserBase.firstName} {idUserConsumer && idUserConsumer.idUserBase.lastName}</h5>
               <small>{idUserConsumer && idUserConsumer.idUserBase.email}</small>
               <h5 className={state === 3 ? 'success' : ''}>{currentState}</h5>
               {state === 1 &&
                  (
                     <>
                        <button onClick={acceptProposal} className="workBtn">Aceptar</button>
                        <button onClick={declineProposal} className="workBtn">Rechazar trabajo</button>
                     </>
                  )
               }
               {
                  state === 2 &&
                  <button onClick={finishWork} className="workBtn">Trabajo terminado</button>

               }

            </div>

         }
         <div className="workTimeline">
            <Timeline className="custom-timeline">
               {state && state === 1 ?
                  <Timeline.Item className="stateTimeLine" dot={<Icon icon="check" size="2x" style={{ background: '#15b215', color: '#fff' }} />}>
                     <p>Pendiente de aprobación</p>
                  </Timeline.Item> :
                  <Timeline.Item className="stateTimeLine" dot={<Icon icon="check" size="2x" />}>
                     <p>Pendiente de aprobación</p>
                  </Timeline.Item>}
               {state && state === 2 ?
                  <Timeline.Item className="stateTimeLine" dot={<Icon icon="check" size="2x" style={{ background: '#15b215', color: '#fff' }} />}>
                     <p>Trabajo aceptado</p>
                  </Timeline.Item> :
                  <Timeline.Item className="stateTimeLine" dot={<Icon icon="check" size="2x" />}>
                     <p>Trabajo aceptado</p>
                  </Timeline.Item>}
               {state && state === 3 ?
                  <Timeline.Item className="stateTimeLine" dot={<Icon icon="check" size="2x" style={{ background: '#15b215', color: '#fff' }} />}>
                     <p>Trabajo terminado</p>
                  </Timeline.Item> :
                  <Timeline.Item className="stateTimeLine" dot={<Icon icon="check" size="2x" />}>
                     <p>Trabajo terminado</p>
                  </Timeline.Item>}
            </Timeline>
         </div>
         <hr />
      </div>
   )
}
const mapStateToProps = state => {
   return {
      loggedUser: state.userR.loggedUser,
      providers: state.professionR.providers

   }
}
const mapDispatchToProps = {
   changeState: workActions.changeState,
   deleteWorkbyId: workActions.deleteWorkbyId,
   sendMail: workActions.sendMail,
   getWorks: workActions.getWorks

}

export default connect(mapStateToProps, mapDispatchToProps)(Work)