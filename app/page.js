'use client';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { RiDeleteBinLine } from 'react-icons/ri';

import ExpenseCategoryItems from './components/ExpenseCategoryItems';
import Modal from './components/Modal';
// Firebase
import { db as database } from './lib/firebase/firebase';
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
  const [incomes, setIncomes] = useState([]);
  // console.log(incomes);

  const [showIncomeModal, setShowIncomeModal] = useState(false);

  const amountReference = useRef();
  const descriptionReference = useRef();

  // Handler functions
  const addIncomeHandler = async event => {
    event.preventDefault();

    const newIncome = {
      amount: amountReference.current.value,
      description: descriptionReference.current.value,
      createdAt: new Date()
    };

    // Add to firebase
    const collectionReference = collection(database, 'incomes');
    try {
      const documentSnapshot = await addDoc(collectionReference, newIncome);

      // Update state
      setIncomes(previousIncomes => {
        return [
          ...previousIncomes,
          {
            id: documentSnapshot.id,
            ...newIncome
          }
        ];
      });

      descriptionReference.current.value = '';
      amountReference.current.value = '';
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteIncomeEntryHandler = async id => {
    const documentReference = doc(database, 'incomes', id);
    try {
      await deleteDoc(documentReference);
      setIncomes(previousIncomes => {
        return previousIncomes.filter(income => income.id !== id);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionReference = collection(database, 'incomes');
      const querySnapshot = await getDocs(collectionReference);

      const data = querySnapshot.docs.map(document_ => {
        return {
          id: document_.id,
          ...document_.data(),
          createdAt: new Date(document_.data().createdAt.toMillis())
        };
      });

      setIncomes(data);
    };
    getIncomeData();
  }, []);

  return (
    <>
      {/* Add income Modal */}

      <Modal show={showIncomeModal} onClose={setShowIncomeModal}>
        <form onSubmit={addIncomeHandler} className="input-group">
          <div className="input-group">
            <label htmlFor="amount" className="text-gray-400 text-sm">
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
            <label htmlFor="amount" className="text-gray-400 text-sm">
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

          {incomes.map(income => {
            return (
              <div
                key={income.id}
                className="flex items-center justify-between"
              >
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
                <p className="flex items-center gap-2 text-green-500 font-semibold">
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
