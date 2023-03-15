import { useContext, useRef } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

import { FinanceContext } from '@/app/lib/store/financeContext';
import { currencyFormatter } from '@/app/lib/utils';

import Modal from '../Modal';

const AddIncomeModal = ({ show, onClose }) => {
  const amountReference = useRef();
  const descriptionReference = useRef();
  const { income, addIncomeItem, removeIncomeItem } =
    useContext(FinanceContext);

  // Handler functions
  const addIncomeHandler = async event => {
    event.preventDefault();

    const newIncome = {
      amount: +amountReference.current.value,
      description: descriptionReference.current.value,
      createdAt: new Date()
    };

    try {
      await addIncomeItem(newIncome);
      descriptionReference.current.value = '';
      amountReference.current.value = '';
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteIncomeEntryHandler = async id => {
    try {
      await removeIncomeItem(id);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={addIncomeHandler} className="input-group">
        <div className="input-group">
          <label htmlFor="amount" className="text-sm text-gray-400">
            Income Amount
          </label>
          <input
            name="amount"
            type="number"
            ref={amountReference}
            min={0.01}
            step={0.01}
            placeholder="Enter income amount"
            id="amount"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="amount" className="text-sm text-gray-400">
            Description
          </label>
          <input
            name="description"
            type="text"
            ref={descriptionReference}
            placeholder="Enter income description"
            id="amount"
            required
          />
        </div>
        <button className="btn btn-secondary">Add Entry</button>
      </form>

      {/* Income History */}
      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold">Income History</h3>

        {income.map(income => {
          return (
            <div key={income.id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{income.description}</p>
                <small className="text-sm">
                  {new Date().toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </small>
              </div>
              <p className="flex items-center gap-2 font-semibold text-green-500">
                {currencyFormatter(income.amount)}
                <button
                  onClick={() => {
                    deleteIncomeEntryHandler(income.id);
                  }}
                >
                  <RiDeleteBinLine className="text-white" />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default AddIncomeModal;
