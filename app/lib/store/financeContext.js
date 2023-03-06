'use client';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs
} from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';

import { db as database } from '../firebase/firebase';

export const FinanceContext = createContext({
  incomes: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {}
});

export default function FinanceContextProvider({ children }) {
  const [income, setIncome] = useState([]);

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

  const values = { income, addIncomeItem, removeIncomeItem };

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

      setIncome(data);
    };
    getIncomeData();
  }, []);

  return (
    <FinanceContext.Provider value={values}>{children}</FinanceContext.Provider>
  );
}
