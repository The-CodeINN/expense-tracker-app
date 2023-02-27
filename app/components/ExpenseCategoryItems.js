import { currencyFormatter } from "../lib/utils"

const ExpenseCategoryItems = ({color, title, amount}) => {
  return (
      <div className='flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl'>
            <div className='flex items-center gap-2'>
              <div className='w-[25px] h-[25px] rounded-full' style={{backgroundColor: color}} />
            <h4 className='capitalize'>{title}</h4>
            </div>
            <p>
              {currencyFormatter(amount)}
            </p>
          </div>
  )
}

export default ExpenseCategoryItems