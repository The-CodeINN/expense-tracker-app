'use client';

import './globals.css';

import Navbar from './components/Navbar';
import FinanceContextProvider from './lib/store/financeContext';

// export const metadata = {
//   title: 'Expense Tracker',
//   description: 'Generated by create next app'
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FinanceContextProvider>
          <Navbar />
          {children}
        </FinanceContextProvider>
      </body>
    </html>
  );
}
