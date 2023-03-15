/* eslint-disable unicorn/no-null */
import { useContext, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FinanceContext } from '@/app/lib/store/financeContext';

import Modal from '../Modal';

const AddExpensesModal = ({ show, onClose }) => {
  const [expenseAmount, setExpenseAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const { expenses, addExpenseItem, addCategory } = useContext(FinanceContext);

  const titleReference = useRef();
  const colorReference = useRef();

  const addExpenseItemHandler = async () => {
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

    try {
      await addExpenseItem(selectedCategory, newExpense);

      setSelectedCategory(null);
      setExpenseAmount('');
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  const addCategoryHandler = async () => {
    const title = titleReference.current.value;
    const color = colorReference.current.value;

    try {
      await addCategory({ title, color, total: 0 });
      setShowAddExpense(false);
    } catch (error) {
      alert(error);
    }
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
          <div className="flex items-center justify-between">
            <h3 className="text-2xl capitalize">Select expense category</h3>
            <button
              onClick={() => {
                setShowAddExpense(true);
              }}
              className="text-lime-400"
            >
              + New Category
            </button>
          </div>

          {showAddExpense && (
            <div className="flex items-center justify-between">
              <input
                type="text"
                placeholder="Enter title"
                ref={titleReference}
              />
              <label htmlFor="title">Pick a Color</label>
              <input className="w-24 h-10" type="color" ref={colorReference} />
              <button
                onClick={addCategoryHandler}
                className="btn btn-secondary"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowAddExpense(false);
                }}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </div>
          )}

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
