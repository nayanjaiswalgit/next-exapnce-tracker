'use client';
import { Input } from '@/components/nayana-ui/input';
import { ChangeEvent, useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";

export default function TransactionForm() {
    const [expenses, setExpenses] = useState([{ amount: '', description: '', category: 'Groceries' }]);
    const [showTransactions, setShowTransactions] = useState(false);

    const handleExpenseChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newExpenses = expenses.map((expense, i) =>
            i === index ? { ...expense, [event.target.name]: event.target.value } : expense
        );
        setExpenses(newExpenses);
    };

    const addExpense = () => setExpenses([...expenses, { amount: '', description: '', category: 'Groceries' }]);

    const removeExpense = (index: number) => setExpenses(expenses.filter((_, i) => i !== index));
    const toggleTransactions = () => setShowTransactions(!showTransactions);


    return (


        <form className="p-6 space-y-6 bg-white shadow rounded-md max-w-md mx-auto">



            {showTransactions

                && <>
                    <div>
                        <label htmlFor="merchant" className="block text-sm font-medium text-gray-700">Merchant</label>
                        <Input type="text" id="merchant" name="merchant" className="mt-1 block w-full border-gray-300 rounded-md" />
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                        <Input type="date" id="date" name="date" className="mt-1 block w-full border-gray-300 rounded-md" />
                    </div>


                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                        <Input type="text" id="notes" name="notes" className="mt-1 block w-full border-gray-300 rounded-md" />
                    </div>
                </>
            }
            <div className="mt-6">
                <div className="flex items-center justify-between bg-white shadow p-4 rounded-lg">
                    <h3 className="text-xl  text-gray-700">Expenses</h3>
                    <div onClick={addExpense} className="cursor-pointer text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out">
                        <IoIosAddCircleOutline size={24} />
                    </div>
                </div>

                {expenses.map((expense, index) => (
                    <div key={index} className="mt-4 space-y-4 bg-gray-50 p-4 rounded-md shadow-inner">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1">
                                <label htmlFor={`expense-description-${index}`} className="block text-sm font-medium text-gray-700">Name</label>
                                <Input
                                    type="text"
                                    id={`expense-description-${index}`}
                                    name="description"
                                    value={expense.description}
                                    onChange={(e) => handleExpenseChange(index, e)}
                                    className="mt-1 block w-full border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="flex-shrink-0 w-24">
                                <label htmlFor={`expense-amount-${index}`} className="block text-sm font-medium text-gray-700">Amount</label>
                                <Input
                                    type="number"
                                    id={`expense-amount-${index}`}
                                    name="amount"
                                    value={expense.amount}
                                    onChange={(e) => handleExpenseChange(index, e)}
                                    className="mt-1 block w-full border-gray-300 rounded-md"
                                    inputMode="numeric"
                                    maxLength={5}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor={`expense-category-${index}`} className="block text-sm font-medium text-gray-700">Category</label>
                            <Input
                                type="text"
                                id={`expense-category-${index}`}
                                name="category"
                                value={expense.category}
                                onChange={(e) => handleExpenseChange(index, e)}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeExpense(index)}
                            className="text-red-600 hover:text-red-900"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <div className="mt-6">
                    <div onClick={toggleTransactions} >
                        {!showTransactions ? <div className='flex items-center justify-start gap-2'> <IoIosAddCircleOutline /> More Options</div> : 'Hide '}
                    </div>
                </div>

            </div>

            <button type="submit" className="mt-6 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700">
                Submit
            </button>
        </form>
    );
}
