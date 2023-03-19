import { useContext } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import { FinanceContext } from '@/app/lib/store/financeContext';
import { currencyFormatter } from '@/app/lib/utils';

import Modal from '../Modal';

const ViewExpenseModal = ({ show, onClose, expense }) => {
  const { deleteExpenseItem, deleteExpenseCategory } =
    useContext(FinanceContext);

  const deleteExpenseItemHandler = async item => {
    try {
      // Remove expense item from expense
      const updatedItems = expense.items.filter(index => index.id !== item.id);

      // Update expense balance
      const updatedExpense = {
        items: [...updatedItems],
        total: expense.total - item.amount
      };
      await deleteExpenseItem(updatedExpense, expense.id);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteExpenseCategoryHandler = async () => {
    try {
      await deleteExpenseCategory(expense.id);
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">{expense.title}</h2>
        <button
          onClick={deleteExpenseCategoryHandler}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>

      <div>
        <h3 className="my-4 text-2xl">Expense History</h3>
        {expense &&
          expense.items.map(item => {
            return (
              <div key={item.id} className="flex items-center justify-between">
                <small>{item.createdAt}</small>
                <p className="flex items-center gap-2">
                  {currencyFormatter(item.amount)}
                  <button
                    onClick={() => {
                      deleteExpenseItemHandler(item);
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </p>
              </div>
            );
          })}
      </div>
    </Modal>
  );
};

export default ViewExpenseModal;
