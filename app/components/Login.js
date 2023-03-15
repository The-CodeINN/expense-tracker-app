'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [passowrd, setPassword] = useState('');

  const onSubmit = event => {
    event.preventDefault();

    setEmail('');
    setPassword('');
  };
  return (
    <main className="container">
      <section className="p-10 border rounded-md border-light-700">
        <h1 className="text-3xl font-bold text-center">Welcome</h1>
        <h4 className="text-center">Login to your Account</h4>
        <form action="" className="form" onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={passowrd}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="btn-new">
            Login
          </button>
        </form>
        <p className="py-2">
          No account yet?
          <Link
            href="../register"
            className="font-bold text-slate-400 hover:text-white"
          >
            {' '}
            Register
          </Link>
        </p>
        <Link
          href="../forget-password/"
          className="font-bold text-slate-400 hover:text-white"
        >
          Forget Password?
        </Link>
        <div>
          <button className="p-10 btn-new">
            Login with your Google account
          </button>
        </div>
      </section>
    </main>
  );
}
