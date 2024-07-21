'use client'
import React, { useState } from 'react';
import { Transition } from 'react-transition-group';


const BulkEditForm = ({ selectedExpenses, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [total, setTotal] = useState('');

    const handleSave = () => {
        onSave({ title, description, total });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl mb-4">Bulk Edit Expenses</h2>
                <div className="mb-4">
                    <label className="block mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Total</label>
                    <input
                        type="number"
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onCancel}
                        className="mr-2 bg-gray-300 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};




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

const ExpandableTable = ({ expenses }) => {
    const [expandedRows, setExpandedRows] = useState([]);
    const [expandAll, setExpandAll] = useState(false);
    const [selectedExpenses, setSelectedExpenses] = useState([]);
    const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);

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

    const handleSelectExpense = (index) => {
        const isSelected = selectedExpenses.includes(index);
        if (isSelected) {
            setSelectedExpenses(selectedExpenses.filter((i) => i !== index));
        } else {
            setSelectedExpenses([...selectedExpenses, index]);
        }
    };

    const handleBulkEdit = () => {
        setIsBulkEditOpen(true);
    };

    const handleSaveBulkEdit = (updatedData) => {
        const updatedExpenses = expenses.map((expense, index) => {
            if (selectedExpenses.includes(index)) {
                return {
                    ...expense,
                    ...updatedData,
                    total: updatedData.total || expense.total,
                };
            }
            return expense;
        });
        // Update expenses with the new data (you might want to call an API to save this)
        console.log(updatedExpenses);
        setIsBulkEditOpen(false);
        setSelectedExpenses([]);
    };

    const handleCancelBulkEdit = () => {
        setIsBulkEditOpen(false);
        setSelectedExpenses([]);
    };

    return (
        <div className="overflow-x-auto">
            <button
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleExpandAll}
            >
                {expandAll ? 'Collapse All' : 'Expand All'}
            </button>
            {selectedExpenses.length > 0 && (
                <button
                    className="mb-4 ml-2 bg-green-500 text-white px-4 py-2 rounded"
                    onClick={handleBulkEdit}
                >
                    Edit Selected
                </button>
            )}
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-2 bg-gray-200">Select</th>
                        <th className="px-4 py-2 text-left bg-gray-200">Title</th>
                        <th className="px-4 py-2 text-left bg-gray-200">Description</th>
                        <th className="px-4 py-2 text-left bg-gray-200">Date</th>
                        <th className="px-4 py-2 text-left bg-gray-200">Total</th>
                        <th className="px-4 py-2 text-left bg-gray-200">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <React.Fragment key={index}>
                            <tr className="border-b cursor-pointer">
                                <td className="px-4 py-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedExpenses.includes(index)}
                                        onChange={() => handleSelectExpense(index)}
                                    />
                                </td>
                                <td className="px-4 py-2" onClick={() => handleRowClick(index)}>
                                    {expense.title}
                                </td>
                                <td className="px-4 py-2" onClick={() => handleRowClick(index)}>
                                    {expense.description}
                                </td>
                                <td className="px-4 py-2" onClick={() => handleRowClick(index)}>
                                    {new Date(expense.date).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2" onClick={() => handleRowClick(index)}>
                                    ${expense.total}
                                </td>
                                <td className="px-4 py-2" onClick={() => handleRowClick(index)}>
                                    {expandedRows.includes(index) ? '-' : '+'}
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
                                                className="px-4 py-2 bg-gray-100"
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
            {isBulkEditOpen && (
                <BulkEditForm
                    selectedExpenses={selectedExpenses}
                    onSave={handleSaveBulkEdit}
                    onCancel={handleCancelBulkEdit}
                />
            )}
        </div>
    );
};


const expenses = [
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
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Expenses</h1>
            <ExpandableTable expenses={expenses} />
        </div>
    );
};

export default Home;
