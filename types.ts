
export type Category = 'food' | 'transport' | 'bills' | 'shopping' | 'entertainment' | 'cigarettes' | 'other';

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  date: string;
  note: string;
}

export type Language = 'ar' | 'en';

export interface Translations {
  title: string;
  totalBalance: string;
  addExpense: string;
  amount: string;
  quantity: string;
  total: string;
  category: string;
  date: string;
  note: string;
  save: string;
  cancel: string;
  history: string;
  monthlySummary: string;
  categories: Record<Category, string>;
  noExpenses: string;
  confirmDelete: string;
  currency: string;
}
