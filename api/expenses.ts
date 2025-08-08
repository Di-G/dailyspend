import type { VercelRequest, VercelResponse } from '@vercel/node';
import storage from './storage';
import { insertExpenseSchema } from './schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        const { date, startDate, endDate } = req.query;
        
        if (date && typeof date === 'string') {
          const expenses = await storage.getExpensesByDate(date);
          res.status(200).json(expenses);
        } else if (startDate && endDate && typeof startDate === 'string' && typeof endDate === 'string') {
          const expenses = await storage.getExpensesByDateRange(startDate, endDate);
          res.status(200).json(expenses);
        } else {
          const expenses = await storage.getExpenses();
          res.status(200).json(expenses);
        }
        break;

      case 'POST':
        console.log('Received expense data:', req.body);
        const validatedData = insertExpenseSchema.parse(req.body);
        console.log('Validated data:', validatedData);
        const expense = await storage.createExpense(validatedData);
        res.status(201).json(expense);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Expenses API error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
