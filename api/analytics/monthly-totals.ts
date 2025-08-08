import type { VercelRequest, VercelResponse } from '@vercel/node';
import storage from '../storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { year, month } = req.query;
    
    if (!year || !month || typeof year !== 'string' || typeof month !== 'string') {
      return res.status(400).json({ message: 'Year and month parameters required' });
    }

    const totals = await storage.getMonthlyTotals(parseInt(year), parseInt(month));
    res.status(200).json(totals);
  } catch (error) {
    console.error('Monthly totals API error:', error);
    res.status(500).json({ message: 'Failed to fetch monthly totals' });
  }
}
