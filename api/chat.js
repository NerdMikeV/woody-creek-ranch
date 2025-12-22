// Vercel Serverless Function for Claude API
// This handles chat requests from the frontend

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, systemPrompt } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array required' });
  }

  // Check for API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not configured');
    return res.status(500).json({ error: 'API not configured' });
  }

  try {
    // Format messages for Claude API (filter to just user/assistant, skip system)
    const formattedMessages = messages
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({
        role: m.role,
        content: m.content
      }));

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: systemPrompt || 'You are a helpful assistant.',
        messages: formattedMessages
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API error:', errorData);
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();
    
    // Extract text from response
    const message = data.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    return res.status(200).json({ message });

  } catch (error) {
    console.error('Chat handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
