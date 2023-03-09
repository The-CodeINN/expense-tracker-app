'use client';
import { useState } from 'react';

export default function Recovery() {
  const [email, setEmail] = useState('');

  const onSubmit = event => {
    event.preventDefault();

    setEmail('');
  };
  return (
    <main className="container">
      <section className="p-10 border rounded-md border-light-700">
        <h1 className="text-3xl font-bold text-center">Welcome</h1>
        <h4 className="text-center">
          Provide your Email to receive a verifcation code
        </h4>
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
          <button type="submit" className="btn-new">
            Email me a reset password code
          </button>
        </form>
      </section>
    </main>
  );
}
