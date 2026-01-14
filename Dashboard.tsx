
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Expense, Language, Category } from '../types';
import { TRANSLATIONS, CATEGORY_COLORS } from '../constants';

interface Props {
  expenses: Expense[];
  lang: Language;
}

export const Dashboard: React.FC<Props> = ({ expenses, lang }) => {
  const t = TRANSLATIONS[lang];

  // حساب البيانات للرسوم البيانية
  const categoryData = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<Category, number>);

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name: t.categories[name as Category],
    value,
    color: CATEGORY_COLORS[name as Category]
  }));

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  if (expenses.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* إجمالي الرصيد */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
        <h3 className="text-slate-500 text-sm font-medium mb-1">{t.totalBalance}</h3>
        <p className="text-3xl font-bold text-slate-800">
          {total.toLocaleString()} <span className="text-sm font-normal text-slate-400">{t.currency}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* رسم بياني دائري للتصنيفات */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <h4 className="font-semibold text-slate-700 mb-4">{t.monthlySummary}</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center text-xs text-slate-600">
                <span className="w-3 h-3 rounded-full mr-2 rtl:ml-2" style={{ backgroundColor: d.color }}></span>
                {d.name}: {d.value}
              </div>
            ))}
          </div>
        </div>

        {/* رسم بياني بالأعمدة */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <h4 className="font-semibold text-slate-700 mb-4">{t.category}</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pieData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                   {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
