/* eslint-disable unicorn/no-null */
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FinanceContext } from '@/app/lib/store/financeContext';

import Modal from '../Modal';

const AddExpensesModal = ({ show, onClose }) => {
  const [expenseAmount, setExpenseAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { expenses } = useContext(FinanceContext);

  const addExpenseItemHandler = () => {
    const expense = expenses.find(expense => expense.id === selectedCategory);

    // eslint-disable-next-line no-unused-vars
    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...expense.items,

        {
          amount: +expenseAmount,
          createdAt: new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          id: uuidv4()
        }
      ]
    };

    setSelectedCategory(null);
    setExpenseAmount('');
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label className="block text-sm font-bold" htmlFor="title">
          Enter an amount
        </label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter an amount"
          value={expenseAmount}
          onChange={event_ => setExpenseAmount(event_.target.value)}
        />
      </div>

      {/* Expense Categories */}
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl capitalize">Select a category</h3>
          {expenses.map(expense => {
            return (
              <button
                key={expense.id}
                onClick={() => {
                  setSelectedCategory(expense.id);
                  // onClose();
                }}
              >
                <div
                  style={{
                    boxShadow:
                      expense.id === selectedCategory ? '1px 1px 4px' : 'none'
                  }}
                  className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl"
                >
                  <div className="flex items-center gap-1">
                    {/* colored circle */}
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{ backgroundColor: expense.color }}
                    />
                    <h4 className="text-sm font-bold capitalize">
                      {expense.title}
                    </h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Add Expense Button */}
      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button className="btn btn-primary" onClick={addExpenseItemHandler}>
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
};

export default AddExpensesModal;
