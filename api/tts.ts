export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { text, voice = 'nova', speed = 1.0 } = await req.json();

    if (!text) {
      return new Response('Text is required', { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return new Response('OpenAI API key not configured', { status: 500 });
    }

    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1-hd',
        input: text,
        voice: voice,
        speed: speed,
        response_format: 'mp3',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return new Response(`OpenAI API error: ${error}`, { status: response.status });
    }

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('TTS Error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
