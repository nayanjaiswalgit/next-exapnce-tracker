'use client'
import React, { useState } from 'react';
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
    transition: `max-height ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
    maxHeight: 0,
    opacity: 0,
    overflow: 'hidden',
};

const transitionStyles = {
    entering: { maxHeight: '1000px', opacity: 1 },
    entered: { maxHeight: '1000px', opacity: 1 },
    exiting: { maxHeight: 0, opacity: 0 },
    exited: { maxHeight: 0, opacity: 0 },
};

const ExpandableTable = ({ expenses, theme }) => {
    const [expandedRows, setExpandedRows] = useState([]);
    const [expandAll, setExpandAll] = useState(false);
    const [editMode, setEditMode] = useState({});
    const [editedExpenses, setEditedExpenses] = useState(expenses);

    const handleRowClick = (index) => {
        const isExpanded = expandedRows.includes(index);
        if (isExpanded) {
            setExpandedRows(expandedRows.filter((i) => i !== index));
        } else {
            setExpandedRows([...expandedRows, index]);
        }
    };

    const handleExpandAll = () => {
        if (expandAll) {
            setExpandedRows([]);
        } else {
            setExpandedRows(expenses.map((_, index) => index));
        }
        setExpandAll(!expandAll);
    };

    const toggleEditMode = (index) => {
        setEditMode({ ...editMode, [index]: !editMode[index] });
    };

    const handleInputChange = (index, field, value) => {
        const updatedExpenses = editedExpenses.map((expense, i) => {
            if (i === index) {
                return { ...expense, [field]: value };
            }
            return expense;
        });
        setEditedExpenses(updatedExpenses);
    };

    const handleSave = (index) => {
        // Save logic here, possibly an API call to save the updated expense
        setEditMode({ ...editMode, [index]: false });
    };

    const handleCancel = (index) => {
        setEditedExpenses(expenses); // Reset to original expenses
        setEditMode({ ...editMode, [index]: false });
    };

    return (
        <div className={`overflow-x-auto ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <button
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleExpandAll}
            >
                {expandAll ? 'Collapse All' : 'Expand All'}
            </button>
            <table className="min-w-full shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}>
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Total</th>
                        <th className="px-4 py-2 text-left">Details</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {editedExpenses.map((expense, index) => (
                        <React.Fragment key={index}>
                            <tr className={`border-b cursor-pointer ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                                <td className="px-4 py-2">
                                    {editMode[index] ? (
                                        <input
                                            type="text"
                                            value={expense.title}
                                            onChange={(e) =>
                                                handleInputChange(index, 'title', e.target.value)
                                            }
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        expense.title
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editMode[index] ? (
                                        <input
                                            type="text"
                                            value={expense.description}
                                            onChange={(e) =>
                                                handleInputChange(index, 'description', e.target.value)
                                            }
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        expense.description
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editMode[index] ? (
                                        <input
                                            type="date"
                                            value={new Date(expense.date).toISOString().split('T')[0]}
                                            onChange={(e) =>
                                                handleInputChange(index, 'date', e.target.value)
                                            }
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        new Date(expense.date).toLocaleDateString()
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editMode[index] ? (
                                        <input
                                            type="number"
                                            value={expense.total}
                                            onChange={(e) =>
                                                handleInputChange(index, 'total', e.target.value)
                                            }
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        `$${expense.total}`
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {expandedRows.includes(index) ? '-' : '+'}
                                </td>
                                <td className="px-4 py-2">
                                    {editMode[index] ? (
                                        <>
                                            <button
                                                onClick={() => handleSave(index)}
                                                className="mr-2 bg-green-500 text-white px-4 py-2 rounded"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => handleCancel(index)}
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => toggleEditMode(index)}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="6" className="p-0">
                                    <Transition in={expandedRows.includes(index)} timeout={duration}>
                                        {state => (
                                            <div
                                                style={{
                                                    ...defaultStyle,
                                                    ...transitionStyles[state]
                                                }}
                                                className={`px-4 py-2 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
                                            >
                                                {expense.expenses.length > 0 ? (
                                                    <ul>
                                                        {expense.expenses.map((item, i) => (
                                                            <li key={i} className="flex justify-between py-1">
                                                                <span>{item.name}</span>
                                                                <span>${item.price}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <span>No additional details</span>
                                                )}
                                            </div>
                                        )}
                                    </Transition>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const initialExpenses = [
    {
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        expenses: [],
        title: "Weekly groceries",
        total: 300,
        description: "Groceries for the week"
    },
    {
        transactionId: "12344555",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        total: 300,
        description: "Groceries for the week",
        expenses: [],
        title: "Weekly groceries"
    },
    {
        transactionId: "1234d4555",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        expenses: [],
        title: "Weekly groceries"
    },
    {
        transactionId: "1234d4545655",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        expenses: [],
        title: "Weekly groceries"
    },
    {
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        expenses: [
            {
                name: "Fruit and vegetables",
                quantity: 1,
                price: 10,
                category: "groceries"
            },
            {
                name: "Fruit and vegetables",
                quantity: 1,
                price: 10,
                category: "groceries"
            }
        ],
        title: "Weekly groceries"
    },
    {
        transactionId: "1234w4545dd655",
        icon: "Store",
        date: "2024-07-21T00:00:00.000Z",
        total: 300,
        description: "Groceries for the week",
        expenses: [
            {
                name: "Fruit and vegetables",
                quantity: 1,
                price: 10,
                category: "groceries"
            },
            {
                name: "Fruit and vegetables",
                quantity: 1,
                price: 10,
                category: "groceries"
            }
        ],
        title: "Weekly groceries"
    }
];

const Home = () => {
    const [expenses, setExpenses] = useState(initialExpenses);
    const [theme, setTheme] = useState('light'); // Default theme

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={`container mx-auto p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <button
                onClick={toggleTheme}
                className={`mb-4 px-4 py-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}
            >
                Toggle Theme
            </button>
            <h1 className="text-2xl font-bold mb-4">Expenses</h1>
            <ExpandableTable expenses={expenses} theme={theme} />
        </div>
    );
};

export default Home;
