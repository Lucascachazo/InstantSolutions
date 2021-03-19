import React, { useState } from 'react'
import { connect } from 'react-redux'
import workActions from '../Redux/actions/workActions'
import { MdCancel, MdDelete, MdEdit, MdSend } from "react-icons/md";
const Comment = (props) => {

  const { comment, reload, setReload } = props
  const [visible, setVisible] = useState(false)
  const [input, setInput] = useState(comment.comment)

  const delComment = async () => {
    await props.deleteComment(props.id, comment._id)
    setReload(!reload)
  }
  const editComment = async () => {
    await props.updateComment(props.id, comment._id, input)
    setVisible(!visible)

    setReload(!reload)
  }

  const displayInput = () => {
    setVisible(!visible)
  }

  const readInput = (e) => {
    setInput(e.target.value)
  }

  return (
    <div className="comment">
      <h5>{comment.idUser.idUserBase.firstName} {comment.idUser.idUserBase.lastName}</h5>
      {visible ? (
        <>
          <div className="commentDiv">
            <MdCancel onClick={displayInput} className='commentIcons' />
            <input type="text" value={input} onChange={readInput} /> <MdSend onClick={editComment} className='sendEditBtn' />
          </div>
        </>
      ) : (
          <>
            <h6>{comment.comment}</h6>
            {props.loggedUser.idUser === comment.idUser._id && (
              <div className="commentBtns">
                < MdDelete onClick={delComment} className='commentIcons' />
                <MdEdit onClick={displayInput} className='commentIcons' />
              </div>
            )}
          </>
        )}
    </div>
  )
}



const mapStateToProps = state => {
  return {

    loggedUser: state.userR.loggedUser
  }
}
const mapDispatchToProps = {
  deleteComment: workActions.deleteComment,
  updateComment: workActions.updateComment
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
