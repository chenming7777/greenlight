import React from 'react'
import './Modal.css'

const Modal = ({isOpen, close, children}) => {
  return (
    <div className={(!isOpen) ? "modal display-none" : "modal"}>
        <div className='modal-main'>
            { children }
            <button onClick={close}>close</button>
        </div>
    </div>
  )
}

export default Modal