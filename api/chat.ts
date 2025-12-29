export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { messages, systemPrompt, model, temperature, max_tokens } = await req.json();

    if (!messages || !systemPrompt) {
      return new Response('Messages and systemPrompt are required', { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return new Response('OpenAI API key not configured', { status: 500 });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature: temperature ?? 0.7,
        max_tokens: max_tokens || 300,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return new Response(`OpenAI API error: ${error}`, { status: response.status });
    }

    const data = await response.json();

    return new Response(JSON.stringify({
      content: data.choices[0].message.content,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Chat Error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
