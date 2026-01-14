
import React from 'react';
import { Expense, Language } from '../types';
import { TRANSLATIONS, CATEGORY_COLORS } from '../constants';

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
  lang: Language;
}

export const ExpenseList: React.FC<Props> = ({ expenses, onDelete, lang }) => {
  const t = TRANSLATIONS[lang];

  // ترتيب المصاريف من الأحدث إلى الأقدم
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p>{t.noExpenses}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-slate-700 mt-8 mb-4">{t.history}</h3>
      {sortedExpenses.map((expense) => (
        <div 
          key={expense.id} 
          className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group animate-in fade-in duration-500"
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner"
              style={{ backgroundColor: CATEGORY_COLORS[expense.category] }}
            >
              {t.categories[expense.category].charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{t.categories[expense.category]}</p>
              <p className="text-xs text-slate-400">{expense.date} {expense.note && `• ${expense.note}`}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold text-slate-700 text-lg">
              {expense.amount} <span className="text-[10px] font-normal opacity-50">{t.currency}</span>
            </p>
            <button
              onClick={() => {
                if(window.confirm(t.confirmDelete)) onDelete(expense.id);
              }}
              className="text-slate-300 hover:text-red-500 transition-colors p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
