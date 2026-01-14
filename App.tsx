
import React, { useState, useEffect } from 'react';
import { Expense, Language } from './types';
import { TRANSLATIONS } from './constants';
import { LanguageToggle } from './components/LanguageToggle';
import { Dashboard } from './components/Dashboard';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showForm, setShowForm] = useState(false);

  // تحميل البيانات واللغة عند بدء التطبيق
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
    
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  // حفظ البيانات عند التغيير
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const toggleLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExpense,
      id: crypto.randomUUID(),
    };
    setExpenses(prev => [...prev, expense]);
    setShowForm(false);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className={`min-h-screen pb-24 transition-all duration-300`}>
      {/* الهيدر */}
      <header className="bg-indigo-600 text-white pt-8 pb-16 px-6 rounded-b-[2.5rem] shadow-lg sticky top-0 z-40">
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">{t.title}</h1>
          <LanguageToggle lang={lang} onToggle={toggleLanguage} />
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="max-w-xl mx-auto px-4 -mt-10">
        <Dashboard expenses={expenses} lang={lang} />
        <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} lang={lang} />
      </main>

      {/* زر الإضافة العائم */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40 border-4 border-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>

      {/* المودال الخاص بالإضافة */}
      {showForm && (
        <ExpenseForm 
          lang={lang} 
          onSave={handleAddExpense} 
          onCancel={() => setShowForm(false)} 
        />
      )}
    </div>
  );
};

export default App;
