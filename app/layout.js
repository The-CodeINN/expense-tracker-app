'use client';

import './globals.css';

import Navbar from './components/Navbar';
import AuthContextProvider from './lib/store/authContext';
import FinanceContextProvider from './lib/store/financeContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <FinanceContextProvider>
            <Navbar />
            {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
