'use client';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import ExpenseCategoryItems from './components/ExpenseCategoryItems';
import AddIncomeModal from './components/Modals/AddIncomeModal';
import { currencyFormatter } from './lib/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = [
  {
    id: 1,
    title: 'Entertainment',
    total: 500,
    color: '#fff'
  },
  {
    id: 2,
    title: 'Food',
    total: 1000,
    color: 'purple'
  },

  {
    id: 3,
    title: 'Transportation',
    total: 2000,
    color: 'red'
  },
  {
    id: 4,
    title: 'Shopping',
    total: 3000,
    color: 'green'
  }
];

export default function Home() {
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  return (
    <>
      {/* Income Modal */}
      <AddIncomeModal show={showIncomeModal} onClose={setShowIncomeModal} />

      <main className="container max-w-2xl px-6 py-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter('100000')}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            className="btn btn-primary"
            // onClick={{() => ()}}
          >
            + Expense
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowIncomeModal(true)}
          >
            + Income
          </button>
        </section>

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl font-bold">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {data.map(expense => {
              return (
                <ExpenseCategoryItems
                  key={expense.id}
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
                />
              );
            })}
          </div>
        </section>

        {/* Chart Section */}
        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: data.map(expense => expense.title),
                datasets: [
                  {
                    label: 'Expense',
                    data: data.map(expense => expense.total),
                    backgroundColor: data.map(expense => expense.color),
                    hoverOffset: 4,
                    borderColor: ['#18181b'],
                    borderWidth: 5
                  }
                ]
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
