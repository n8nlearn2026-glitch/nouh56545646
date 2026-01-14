
import React, { useState } from 'react';
import { Category, Expense, Language } from '../types';
import { TRANSLATIONS, CATEGORIES } from '../constants';

interface Props {
  onSave: (expense: Omit<Expense, 'id'>) => void;
  onCancel: () => void;
  lang: Language;
}

export const ExpenseForm: React.FC<Props> = ({ onSave, onCancel, lang }) => {
  const t = TRANSLATIONS[lang];
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [category, setCategory] = useState<Category>('food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  const totalCalculated = (Number(amount) || 0) * (Number(quantity) || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    
    onSave({
      amount: totalCalculated,
      category,
      date,
      note
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <form 
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">{t.addExpense}</h2>
          {Number(quantity) > 1 && (
            <div className="bg-indigo-50 px-3 py-1 rounded-full">
              <span className="text-xs text-indigo-600 font-medium">{t.total}: </span>
              <span className="text-sm font-bold text-indigo-700">{totalCalculated.toFixed(2)} {t.currency}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">{t.amount}</label>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">{t.quantity}</label>
              <input
                type="number"
                min="1"
                step="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">{t.category}</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                    category === cat 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.categories[cat]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">{t.date}</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">{t.note}</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="..."
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            {t.save}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors"
          >
            {t.cancel}
          </button>
        </div>
      </form>
    </div>
  );
};
