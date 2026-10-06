import { useRef, useState } from 'react'

function VoiceCommand({ onCommand }) {
  const [listening, setListening] = useState(false)
  const [message, setMessage] = useState('')

  const recognitionRef = useRef(null)

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setMessage('Voice recognition is not supported in this browser.')
      return
    }

    const recognition = new SpeechRecognition()

    recognition.lang = 'en-IN'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setListening(true)
      setMessage('Listening...')
    }

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript.trim()

      setMessage(`Heard: "${transcript}"`)
      onCommand(transcript)
    }

    recognition.onerror = (event) => {
  setListening(false)
  setMessage(`Voice error: ${event.error}`)
  console.error('Voice recognition error:', event.error)
}

    recognition.onend = () => {
      setListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  return (
    <div className="voice-command">
      <button
        className={`voice-button ${listening ? 'listening' : ''}`}
        onClick={startListening}
      >
        {listening ? '🎙 Listening...' : '🎤 Voice Command'}
      </button>

      {message && (
        <span className="voice-message">
          {message}
        </span>
      )}
    </div>
  )
}

export default VoiceCommand