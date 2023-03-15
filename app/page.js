'use client';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import ExpenseCategoryItems from './components/ExpenseCategoryItems';
import AddExpensesModal from './components/Modals/AddExpensesModal';
import AddIncomeModal from './components/Modals/AddIncomeModal';
import { FinanceContext } from './lib/store/financeContext';
import { currencyFormatter } from './lib/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpensesModal, setShowExpensesModal] = useState(false);
  const [balance, setBalance] = useState(0);

  const { expenses, income } = useContext(FinanceContext);

  const totalIncome = useMemo(() => {
    let total = 0;
    for (const element of income) {
      total += element.amount;
    }
    return total;
  }, [income]);

  const totalExpenses = useMemo(() => {
    let total = 0;
    for (const expense of expenses) {
      total += expense.total;
    }
    return total;
  }, [expenses]);

  useEffect(() => {
    setBalance(totalIncome - totalExpenses);
  }, [totalIncome, totalExpenses]);

  return (
    <>
      {/* Income Modal */}
      <AddIncomeModal show={showIncomeModal} onClose={setShowIncomeModal} />

      {/* Expenses Modal */}
      <AddExpensesModal
        show={showExpensesModal}
        onClose={setShowExpensesModal}
      />

      <main className="container max-w-2xl px-6 py-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            className="btn btn-primary"
            onClick={() => setShowExpensesModal(true)}
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
            {expenses.map(expense => {
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
                labels: expenses.map(expense => expense.title),
                datasets: [
                  {
                    label: 'Expense',
                    data: expenses.map(expense => expense.total),
                    backgroundColor: expenses.map(expense => expense.color),
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
