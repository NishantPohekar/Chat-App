import React from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import useConversation from '../../zustand/useConversation'

function Message({ message }) {
  const { authUser } = useAuthContext()
  const { selectedConversation } = useConversation()

  const fromMe = message.senderId === authUser._id
  const isReceiver = !fromMe

  const chatClassName = fromMe ? 'chat-end' : 'chat-start'
  const profilePic = fromMe ? authUser.profilepic : selectedConversation?.profilepic
  const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-700'
  const textColor = fromMe ? 'text-white' : 'text-gray-100'
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName} my-2`}>
      {/* Profile Avatar */}
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img alt='user avatar' src={profilePic} />
        </div>
      </div>

      {/* Message and timestamp */}
      <div
        className={`flex flex-col max-w-[70%] ${
          fromMe ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`chat-bubble ${bubbleBgColor} ${shakeClass} ${textColor} px-4 py-2 rounded-2xl shadow-md`}
        > 
          {message.message}
        </div>

        {/* Timestamp */}
        <div
          className={`opacity-60 text-[11px] mt-1 ${
            fromMe ? 'text-right pr-1' : 'text-left pl-1'
          } text-gray-300`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  )
}

export default Message
