// import React from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const Dictaphone = () => {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   return (
//     <div>
//       <p>Microphone: {listening ? 'on' : 'off'}</p>
//         <button onClick={SpeechRecognition.startListening}>Start</button>
//         <button onClick={SpeechRecognition.stopListening}>Stop</button>
//         <button onClick={resetTranscript}>Reset</button>
//       <p>{transcript}</p>
//     </div>
//   );
// };
// export default Dictaphone;

import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import MicIcon from '@mui/icons-material/Mic';
import { Backdrop, CircularProgress, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dictaphone = () => {
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()

   useEffect(() => {
    if(message){
      navigate(`/filteredProducts/?search=${message}`)
    }
  },[message])

  const handleClose = () => {
    setOpen(false)
  }
 
  const commands = [
    {
      command: ['shirt', 'jeans', 'top'],
      callback: (command) => setMessage(command),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true
    },
    {
      command: '*',
      callback: (command) => setMessage(command)
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]

  const {listening, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })

  if (!browserSupportsSpeechRecognition) {
    return null
  }
  

  console.log(message)
  return (
    <>
    <MicIcon onClick={SpeechRecognition.startListening}/>
    {listening && <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <h4>Listening....</h4>
        <CircularProgress color="inherit" />
      </Backdrop>}
    </>
  )
}
export default Dictaphone