import ExpenseCategoryItems from "./components/ExpenseCategoryItems";
import { currencyFormatter } from "./lib/utils";

export default function Home() {
  return (
    <main className='container max-w-2xl px-6 py-6 mx-auto'>
      <section className='py-3'>
        <small className='text-gray-400 text-md'>My Balance</small>
        <h2 className='text-4xl font-bold'>{currencyFormatter(100000)}</h2>
      </section>

      <section className='flex items-center gap-2 py-3'>
        <button className='btn btn-primary'>+ Expense</button>
        <button className='btn btn-secondary'>+ Income</button>
      </section>

      {/* Expenses */}
      <section className='py-6'>
        <h3 className='text-2xl font-bold'>My Expenses</h3>
        <div className='flex flex-col gap-4 mt-6'>

          {/* Expense Cards */}
          <ExpenseCategoryItems
            color="#fff"
            title="Entertainment"
            amount={500}
          />
        </div>
      </section>
    </main>
  );
}
