'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passowrd, setPassword] = useState('');

  const onSubmit = event => {
    event.preventDefault();

    setName('');
    setEmail('');
    setPassword('');
  };
  return (
    <main className="container">
      <section className="p-10 border rounded-md border-light-700">
        <h1 className="text-3xl font-bold text-center">Welcome</h1>
        <h4 className="text-center">Create new Account</h4>
        <form action="" className="form" onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="full-name">Full Name</label>
            <input
              type="text"
              name="full-name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </div>
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
          Already have an account?
          <Link
            href="../login"
            className="font-bold text-slate-400 hover:text-white"
          >
            {' '}
            Login
          </Link>
        </p>
        <div>
          <button className="h-16 p-10 bg-black btn-new">
            Register with your Google account
          </button>
        </div>
      </section>
    </main>
  );
}
