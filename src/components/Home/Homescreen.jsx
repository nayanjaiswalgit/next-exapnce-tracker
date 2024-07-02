import ExpenseList from "./ExpenseList"

const Homescreen = () => {
  return (
    <div className="bg-white w-full h-full md:rounded-l-[2rem] rounded-r-[1rem] p-2 overflow-hidden">
      <ExpenseList/>
    </div>
  )
}

export default Homescreen