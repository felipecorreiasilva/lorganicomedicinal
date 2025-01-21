import React, { ReactNode } from 'react'
import { IoClose } from 'react-icons/io5'

interface ModalProps {
    open: boolean,
    onClose: () => void,
    children: ReactNode
}

const Modal = ({open,onClose,children}:ModalProps) => {
  return (
    <div
    onClick={onClose}
    className={`fixed inset-0 flex justify-center  items-center transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}
    >
        {/* modal */}
        <div 
        onClick={e => e.stopPropagation()}
        className={`bg-dashboard-900 rounded-xl shadow p-6 transition-all overflow-y-scroll scrollbar-none h-[80%]
            ${open ? "scale-100 opacity-100":"scale-125 opacity-0"}`}>
                <button 
                onClick={onClose}
                className='absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-dashboard-800 hover:bg-dashboard-800/80 hover:text-gray-600'>
                    <IoClose />
                </button>
                {children}
        </div>
    </div>
  )
}

export default Modal