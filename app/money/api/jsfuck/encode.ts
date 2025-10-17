// pages/api/jsfuck/encode.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text }: { text?: string } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    // Simple encoding for demonstration
    const encoded = text.split('').map(char => {
      const code = char.charCodeAt(0);
      return `String.fromCharCode(${code})`;
    }).join('+');

    res.status(200).json({ encoded });
  } catch (error) {
    res.status(500).json({ 
      error: 'Encoding failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}