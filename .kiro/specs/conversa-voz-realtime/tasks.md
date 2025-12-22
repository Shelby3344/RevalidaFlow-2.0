# Implementation Plan

- [x] 1. Create useVoiceChat hook with core functionality




  - [ ] 1.1 Create hook file with state management (isRecording, isSpeaking, isProcessing)
    - Implement useState for all voice states

    - Implement permission checking logic
    - _Requirements: 1.1, 6.2_
  - [ ] 1.2 Implement microphone recording with MediaRecorder API
    - Request microphone permission
    - Create MediaRecorder instance
    - Handle start/stop recording
    - Convert recorded audio to Blob
    - _Requirements: 1.1, 1.5_

  - [x]* 1.3 Write property test for recording state consistency

    - **Property 1: Recording state consistency**
    - **Validates: Requirements 1.1, 1.5**

- [x] 2. Implement OpenAI Whisper integration for speech-to-text

  - [ ] 2.1 Create transcribeAudio function using Whisper API
    - Send audio blob to OpenAI Whisper endpoint
    - Parse and return transcription
    - Handle errors gracefully
    - _Requirements: 3.1_
  - [ ] 2.2 Integrate transcription into useVoiceChat hook
    - Call transcribeAudio after recording stops

    - Update interimTranscript state
    - Call onTranscript callback

    - _Requirements: 3.1, 3.3_
  - [ ]* 2.3 Write property test for transcript generation
    - **Property 3: Transcript generation**

    - **Validates: Requirements 3.1**

- [ ] 3. Enhance audio playback with OpenAI TTS
  - [ ] 3.1 Update useOpenAIAudio hook to support voice selection
    - Add voice parameter based on patient gender
    - Ensure proper cleanup on unmount




    - _Requirements: 2.1_
  - [ ] 3.2 Integrate TTS into voice chat flow
    - Play AI response automatically after transcription

    - Handle playback state (isSpeaking)
    - Implement stop functionality
    - _Requirements: 2.2, 2.3_
  - [ ]* 3.3 Write property test for audio playback exclusivity
    - **Property 2: Audio playback exclusivity**
    - **Validates: Requirements 1.4, 2.2**

- [ ] 4. Update ChatPacienteIA component for voice mode
  - [ ] 4.1 Add voice mode UI with prominent microphone button
    - Add recording indicator (pulsing red)
    - Add speaking indicator (waveform/animation)
    - Add processing indicator

    - _Requirements: 6.1, 6.2, 6.3_
  - [ ] 4.2 Integrate useVoiceChat hook into component
    - Connect recording to message sending

    - Connect TTS to AI responses
    - Handle mode switching (voice/text)
    - _Requirements: 4.1, 4.2, 4.3_
  - [x]* 4.3 Write property test for mode switching preservation

    - **Property 5: Mode switching preservation**

    - **Validates: Requirements 4.3**

- [ ] 5. Implement fallback to Web Speech API
  - [x] 5.1 Add conditional logic for API key presence

    - Use OpenAI APIs when key is present
    - Fall back to Web Speech API when no key
    - Maintain same interface for both modes


    - _Requirements: 5.1, 5.2, 5.3_

  - [ ] 5.2 Ensure seamless experience in both modes
    - Same UI regardless of backend
    - Clear indication of which mode is active
    - _Requirements: 5.1, 5.2_

- [ ] 6. Add error handling and recovery
  - [ ] 6.1 Implement comprehensive error handling
    - Handle microphone permission denied
    - Handle API errors
    - Handle network failures
    - _Requirements: 3.3, 6.4_
  - [ ] 6.2 Add retry functionality
    - Allow retry after errors
    - Clear error state on retry
    - _Requirements: 3.3, 6.4_
  - [ ]* 6.3 Write property test for error recovery
    - **Property 4: Error recovery**
    - **Validates: Requirements 3.3, 6.4**

- [ ] 7. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
