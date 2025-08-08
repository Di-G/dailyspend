# Daily Expense Tracker

A modern expense tracking application built with React, TypeScript, and Vercel serverless functions.

## Features

- 📊 Daily expense tracking
- 🎨 Category management with color coding
- 📈 Analytics and charts
- 📅 Calendar view
- 📱 Responsive design
- ⚡ Fast and modern UI

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **UI Components**: Radix UI, Tailwind CSS
- **Charts**: Chart.js, Recharts
- **Backend**: Vercel Serverless Functions
- **State Management**: TanStack Query
- **Validation**: Zod

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Deployment to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Connect your repository to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository
   - Vercel will automatically detect the configuration

3. Deploy:
   - Vercel will automatically build and deploy your application
   - The API routes in the `/api` directory will be deployed as serverless functions
   - Your frontend will be served as static files

## Project Structure

```
├── api/                    # Vercel serverless functions
│   ├── analytics/         # Analytics API routes
│   ├── categories.ts      # Categories API
│   ├── expenses.ts        # Expenses API
│   ├── schema.ts          # Database schema
│   └── storage.ts         # In-memory storage
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utilities
│   └── index.html         # HTML template
├── shared/                # Shared types and schemas
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies and scripts
```

## API Endpoints

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `DELETE /api/categories/[id]` - Delete a category
- `GET /api/expenses` - Get expenses (with optional date filters)
- `POST /api/expenses` - Create a new expense
- `DELETE /api/expenses/[id]` - Delete an expense
- `GET /api/analytics/daily-total` - Get daily total
- `GET /api/analytics/category-totals` - Get category totals
- `GET /api/analytics/monthly-totals` - Get monthly totals
- `GET /api/analytics/weekly-totals` - Get weekly totals

## Environment Variables

No environment variables are required for this application as it uses in-memory storage.

## License

MIT
