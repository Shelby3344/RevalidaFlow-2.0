# Requirements Document

## Introduction

Sistema de conversa por voz em tempo real para o treino com IA, permitindo que o usuário converse com o paciente simulado usando microfone e recebendo respostas em áudio de alta qualidade. Utiliza a OpenAI Realtime API para comunicação bidirecional de áudio em tempo real.

## Glossary

- **Realtime_API**: API da OpenAI que permite comunicação de áudio bidirecional em tempo real via WebSocket
- **Sistema_Voz**: Módulo responsável por capturar áudio do microfone, enviar para a API e reproduzir respostas
- **Paciente_IA**: Agente de IA que simula um paciente médico respondendo às perguntas do usuário
- **WebSocket**: Protocolo de comunicação bidirecional persistente
- **VAD**: Voice Activity Detection - detecção automática de quando o usuário está falando

## Requirements

### Requirement 1

**User Story:** As a medical student, I want to talk to the AI patient using my microphone, so that I can practice consultations in a more realistic and natural way.

#### Acceptance Criteria

1. WHEN the user clicks the microphone button THEN the Sistema_Voz SHALL request microphone permission and start capturing audio
2. WHEN the user speaks into the microphone THEN the Sistema_Voz SHALL stream the audio to the Realtime_API in real-time
3. WHEN the Realtime_API detects end of speech (VAD) THEN the Sistema_Voz SHALL stop capturing and wait for response
4. WHEN the Realtime_API sends audio response THEN the Sistema_Voz SHALL play the audio immediately
5. WHEN the user clicks the microphone button while recording THEN the Sistema_Voz SHALL stop recording and send the audio

### Requirement 2

**User Story:** As a medical student, I want the AI patient to respond with a natural voice, so that the simulation feels more realistic.

#### Acceptance Criteria

1. WHEN the Paciente_IA generates a response THEN the Sistema_Voz SHALL use OpenAI TTS with voice "nova" for female patient or "onyx" for male patient
2. WHEN audio is playing THEN the Sistema_Voz SHALL display a visual indicator showing the patient is speaking
3. WHEN the user clicks stop while audio is playing THEN the Sistema_Voz SHALL immediately stop playback

### Requirement 3

**User Story:** As a medical student, I want to see the transcription of my speech and the patient's response, so that I can review the conversation.

#### Acceptance Criteria

1. WHEN the user speaks THEN the Sistema_Voz SHALL display the transcribed text in the chat
2. WHEN the Paciente_IA responds THEN the Sistema_Voz SHALL display the response text in the chat
3. WHEN transcription fails THEN the Sistema_Voz SHALL display an error message and allow retry

### Requirement 4

**User Story:** As a medical student, I want to switch between voice and text input, so that I can choose the most convenient method.

#### Acceptance Criteria

1. WHEN the user is in voice mode THEN the Sistema_Voz SHALL display a prominent microphone button
2. WHEN the user types in the text input THEN the Sistema_Voz SHALL allow sending text messages normally
3. WHEN switching between modes THEN the Sistema_Voz SHALL maintain conversation history

### Requirement 5

**User Story:** As a medical student, I want the system to work without an API key using basic features, so that I can try the system before configuring.

#### Acceptance Criteria

1. WHEN no API key is configured THEN the Sistema_Voz SHALL use Web Speech API for speech recognition
2. WHEN no API key is configured THEN the Sistema_Voz SHALL use Web Speech API for text-to-speech
3. WHEN API key is configured THEN the Sistema_Voz SHALL use OpenAI Realtime API for superior quality

### Requirement 6

**User Story:** As a medical student, I want clear visual feedback during voice interaction, so that I know the system state.

#### Acceptance Criteria

1. WHILE the microphone is active THEN the Sistema_Voz SHALL display a pulsing red indicator
2. WHILE waiting for AI response THEN the Sistema_Voz SHALL display a loading animation
3. WHILE audio is playing THEN the Sistema_Voz SHALL display an audio waveform or speaker animation
4. WHEN an error occurs THEN the Sistema_Voz SHALL display a clear error message with recovery options
