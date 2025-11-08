import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessage from '../../hooks/useGetMessage'
import MessageSkeleton from '../Skeleton/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

function Messages() {
  const{messages,loading} = useGetMessage()
  useListenMessages()
  console.log("messages :",messages);
  const lastMessageRef = useRef()
  useEffect(()=>{
      setTimeout(()=>{
          lastMessageRef.current?.scrollIntoView({behavior:"smooth"})
      },1000)
  },[messages])
  
  return (
    <div className='px-4 flex-1 overflow-auto '>

      {!loading && messages.length > 0 && messages.map((message)=>(
        <div key={message._id} ref={lastMessageRef}>
          <Message  message = {message}/>
        </div>
      ))}

       {loading && [...Array(6)].map((_,idx) => (<MessageSkeleton key={idx}/>))}
       {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start conersation</p>
       )}
    </div>
  )
}

export default Messages

// STARTER CODE
// import React from 'react'
// import Message from './Message'

// function Messages() {
//   return (
//     <div className='px-4 flex-1 overflow-auto '>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//     </div>
//   )
// }

// export default Messages

