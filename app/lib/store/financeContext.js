/* eslint-disable sonarjs/no-useless-catch */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-useless-catch */
'use client';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';

import { db as database } from '../firebase/firebase';
import { authContext } from './authContext';

export const FinanceContext = createContext({
  incomes: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {},
  deleteExpenseItem: async () => {},
  deleteExpenseCategory: async () => {}
});

export default function FinanceContextProvider({ children }) {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const { user } = useContext(authContext);

  const addCategory = async category => {
    try {
      const collectionReference = collection(database, 'expenses');

      const documentSnapshot = await addDoc(collectionReference, {
        uid: user.uid,
        ...category,
        items: []
      });

      setExpenses(previousExpenses => {
        return [
          ...previousExpenses,
          {
            id: documentSnapshot.id,
            uid: user.uid,
            items: [],
            ...category
          }
        ];
      });
    } catch (error) {
      throw error;
    }
  };

  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    const documentReference = doc(database, 'expenses', expenseCategoryId);

    try {
      await updateDoc(documentReference, { ...newExpense });

      setExpenses(previousState => {
        const updateExpenses = [...previousState];

        const foundIndex = updateExpenses.findIndex(expense => {
          return expense.id === expenseCategoryId;
        });

        updateExpenses[foundIndex] = { id: expenseCategoryId, ...newExpense };

        return updateExpenses;
      });
      // eslint-disable-next-line sonarjs/no-useless-catch
    } catch (error) {
      throw error;
    }
  };

  const deleteExpenseItem = async (updatedExpense, expenseCategoryId) => {
    try {
      const documentReference = doc(database, 'expenses', expenseCategoryId);
      await updateDoc(documentReference, { ...updatedExpense });

      setExpenses(previousExpenses => {
        const updatedExpenses = [...previousExpenses];

        const foundIndex = updatedExpenses.findIndex(
          ex => ex.id === expenseCategoryId
        );

        updatedExpenses[foundIndex].items = {
          ...updatedExpense.items
        };
        updatedExpenses[foundIndex].total = updatedExpense.total;

        return updatedExpenses;
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteExpenseCategory = async expenseCategoryId => {
    try {
      const documentReference = doc(database, 'expenses', expenseCategoryId);
      await deleteDoc(documentReference);

      setExpenses(previousExpenses => {
        const updatedExpenses = previousExpenses.filter(
          expense => expense.id !== expenseCategoryId
        );

        return [...updatedExpenses];
      });
    } catch (error) {
      throw error;
    }
  };

  const addIncomeItem = async newIncome => {
    // Add to firebase
    const collectionReference = collection(database, 'incomes');
    try {
      const documentSnapshot = await addDoc(collectionReference, newIncome);

      // Update state
      setIncome(previousIncomes => {
        return [
          ...previousIncomes,
          {
            id: documentSnapshot.id,
            ...newIncome
          }
        ];
      });
    } catch (error) {
      alert(error.message);
      throw error;
    }
  };
  const removeIncomeItem = async id => {
    const documentReference = doc(database, 'incomes', id);
    try {
      await deleteDoc(documentReference);
      setIncome(previousIncomes => {
        return previousIncomes.filter(income => income.id !== id);
      });
    } catch (error) {
      alert(error.message);
      throw error;
    }
  };

  const values = {
    income,
    expenses,
    addIncomeItem,
    removeIncomeItem,
    addExpenseItem,
    addCategory,
    deleteExpenseItem,
    deleteExpenseCategory
  };

  useEffect(() => {
    if (!user) return;

    const getIncomeData = async () => {
      const collectionReference = collection(database, 'incomes');

      const q = query(collectionReference, where('uid', '==', user.uid));

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(document_ => {
        return {
          id: document_.id,
          ...document_.data(),
          createdAt: new Date(document_.data().createdAt.toMillis())
        };
      });

      setIncome(data);
    };

    const getExpensesData = async () => {
      const collectionReference = collection(database, 'expenses');

      const q = query(collectionReference, where('uid', '==', user.uid));

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(document_ => {
        return {
          id: document_.id,
          ...document_.data()
        };
      });

      setExpenses(data);
    };

    getIncomeData();
    getExpensesData();
  }, [user]);

  return (
    <FinanceContext.Provider value={values}>{children}</FinanceContext.Provider>
  );
}
