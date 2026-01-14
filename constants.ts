
import { Category, Translations } from './types';

export const CATEGORIES: Category[] = ['food', 'transport', 'bills', 'shopping', 'entertainment', 'cigarettes', 'other'];

export const TRANSLATIONS: Record<'ar' | 'en', Translations> = {
  ar: {
    title: 'تتبع مصاريفي',
    totalBalance: 'إجمالي الصرف',
    addExpense: 'إضافة مصروف',
    amount: 'المبلغ',
    quantity: 'العدد / الكمية',
    total: 'الإجمالي',
    category: 'التصنيف',
    date: 'التاريخ',
    note: 'ملاحظة',
    save: 'حفظ',
    cancel: 'إلغاء',
    history: 'سجل العمليات',
    monthlySummary: 'ملخص الشهر',
    noExpenses: 'لا توجد مصاريف مضافة بعد.',
    confirmDelete: 'هل أنت متأكد من الحذف؟',
    currency: 'د.أ',
    categories: {
      food: 'أكل',
      transport: 'مواصلات',
      bills: 'فواتير',
      shopping: 'تسوق',
      entertainment: 'ترفيه',
      cigarettes: 'سجائر',
      other: 'أخرى'
    }
  },
  en: {
    title: 'Expense Tracker',
    totalBalance: 'Total Spending',
    addExpense: 'Add Expense',
    amount: 'Amount',
    quantity: 'Quantity',
    total: 'Total',
    category: 'Category',
    date: 'Date',
    note: 'Note',
    save: 'Save',
    cancel: 'Cancel',
    history: 'History',
    monthlySummary: 'Monthly Summary',
    noExpenses: 'No expenses added yet.',
    confirmDelete: 'Are you sure you want to delete?',
    currency: 'JOD',
    categories: {
      food: 'Food',
      transport: 'Transport',
      bills: 'Bills',
      shopping: 'Shopping',
      entertainment: 'Entertainment',
      cigarettes: 'Cigarettes',
      other: 'Other'
    }
  }
};

export const CATEGORY_COLORS: Record<Category, string> = {
  food: '#ef4444', // Red
  transport: '#3b82f6', // Blue
  bills: '#f59e0b', // Amber
  shopping: '#10b981', // Emerald
  entertainment: '#8b5cf6', // Violet
  cigarettes: '#78350f', // Brown
  other: '#6b7280' // Gray
};
