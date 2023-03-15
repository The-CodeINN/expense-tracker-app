import { useState } from 'react';

import { currencyFormatter } from '../lib/utils';
import ViewExpenseModal from './Modals/ViewExpenseModal';

const ExpenseCategoryItems = ({ expense }) => {
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);

  return (
    <>
      <ViewExpenseModal
        show={showViewExpenseModal}
        onClose={setShowViewExpenseModal}
        expense={expense}
      />
      <button
        onClick={() => {
          setShowViewExpenseModal(true);
        }}
      >
        <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
          <div className="flex items-center gap-2">
            <div
              className="w-[25px] h-[25px] rounded-full"
              style={{ backgroundColor: expense.color }}
            />
            <h4 className="capitalize">{expense.title}</h4>
          </div>
          <p>{currencyFormatter(expense.total)}</p>
        </div>
      </button>
    </>
  );
};

export default ExpenseCategoryItems;
