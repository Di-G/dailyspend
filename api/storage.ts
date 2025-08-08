import { randomUUID } from "crypto";

class MemStorage {
  private categories: Map<string, any>;
  private expenses: Map<string, any>;

  constructor() {
    this.categories = new Map();
    this.expenses = new Map();
    this.initializeDefaultCategories();
  }

  async initializeDefaultCategories() {
    const defaultCategories = [
      { name: "Food", color: "#EF4444" },
      { name: "Transport", color: "#3B82F6" },
      { name: "Shopping", color: "#10B981" },
      { name: "Entertainment", color: "#F59E0B" }
    ];
    
    for (const cat of defaultCategories) {
      await this.createCategory(cat);
    }
  }

  async getCategories() {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: any) {
    const id = randomUUID();
    const category = {
      ...insertCategory,
      id,
      createdAt: new Date()
    };
    this.categories.set(id, category);
    return category;
  }

  async deleteCategory(id: string) {
    this.categories.delete(id);
  }

  async getExpenses() {
    return Array.from(this.expenses.values());
  }

  async getExpensesByDate(date: string) {
    const expenses = Array.from(this.expenses.values()).filter(
      (expense) => expense.date === date
    );
    return expenses.map((expense) => ({
      ...expense,
      category: expense.categoryId ? this.categories.get(expense.categoryId) : undefined
    }));
  }

  async getExpensesByDateRange(startDate: string, endDate: string) {
    const expenses = Array.from(this.expenses.values()).filter(
      (expense) => expense.date >= startDate && expense.date <= endDate
    );
    return expenses.map((expense) => ({
      ...expense,
      category: expense.categoryId ? this.categories.get(expense.categoryId) : undefined
    }));
  }

  async createExpense(insertExpense: any) {
    const id = randomUUID();
    const expense = {
      ...insertExpense,
      details: insertExpense.details || null,
      categoryId: insertExpense.categoryId || null,
      id,
      createdAt: new Date()
    };
    this.expenses.set(id, expense);
    return expense;
  }

  async deleteExpense(id: string) {
    this.expenses.delete(id);
  }

  async getDailyTotal(date: string) {
    const expenses = Array.from(this.expenses.values()).filter(
      (expense) => expense.date === date
    );
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  }

  async getCategoryTotals(date: string) {
    const expenses = Array.from(this.expenses.values()).filter(
      (expense) => expense.date === date
    );
    const categoryTotals = new Map();
    
    expenses.forEach((expense) => {
      if (expense.categoryId) {
        const current = categoryTotals.get(expense.categoryId) || 0;
        categoryTotals.set(expense.categoryId, current + parseFloat(expense.amount));
      }
    });
    
    return Array.from(categoryTotals.entries()).map(([categoryId, total]) => ({
      categoryId,
      total,
      category: this.categories.get(categoryId)
    }));
  }

  async getMonthlyTotals(year: number, month: number) {
    const startDate = `${year}-${month.toString().padStart(2, "0")}-01`;
    const endDate = `${year}-${month.toString().padStart(2, "0")}-31`;
    const expenses = Array.from(this.expenses.values()).filter(
      (expense) => expense.date >= startDate && expense.date <= endDate
    );
    const dailyTotals = new Map();
    
    expenses.forEach((expense) => {
      const current = dailyTotals.get(expense.date) || 0;
      dailyTotals.set(expense.date, current + parseFloat(expense.amount));
    });
    
    return Array.from(dailyTotals.entries()).map(([date, total]) => ({
      date,
      total
    }));
  }

  async getWeeklyTotals(date: string) {
    const currentDate = new Date(date);
    const weeklyTotals = [];
    
    for (let i = 6; i >= 0; i--) {
      const day = new Date(currentDate);
      day.setDate(currentDate.getDate() - i);
      const dayString = day.toISOString().split("T")[0];
      const dailyTotal = await this.getDailyTotal(dayString);
      weeklyTotals.push({
        date: dayString,
        total: dailyTotal
      });
    }
    
    return weeklyTotals;
  }
}

// Create a singleton instance
const storage = new MemStorage();

export default storage;
