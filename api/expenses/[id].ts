import type { VercelRequest, VercelResponse } from '@vercel/node';
import storage from '../storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Expense ID is required' });
  }

  try {
    switch (req.method) {
      case 'DELETE':
        await storage.deleteExpense(id);
        res.status(200).json({ success: true });
        break;

      default:
        res.setHeader('Allow', ['DELETE']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Expense delete API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
