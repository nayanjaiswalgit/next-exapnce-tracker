import React from "react";

const expenses =
  [
    {
      "icon": "Store",
      "date": "2024-07-21T00:00:00.000Z",
      "expenses": [],
      "title": "Weekly groceries",
      "total": 300,
      "description": "Groceries for the week"

    },
    {
      "transactionId": "12344555",
      "icon": "Store",
      "date": "2024-07-21T00:00:00.000Z",
      "total": 300,
      "description": "Groceries for the week",

      "expenses": [],
      "title": "Weekly groceries",

    },
    {
      "transactionId": "1234d4555",
      "icon": "Store",
      "date": "2024-07-21T00:00:00.000Z",

      "expenses": [],
      "title": "Weekly groceries",

    },
    {
      "transactionId": "1234d4545655",
      "icon": "Store",
      "date": "2024-07-21T00:00:00.000Z",

      "expenses": [


      ],
      "title": "Weekly groceries",
    },
    {
      "icon": "Store",
      "date": "2024-07-21T00:00:00.000Z",

      "expenses": [
        {
          "name": "Fruit and vegetables",
          "quantity": 1,
          "price": 10,
          "category": "groceries"

        },
        {
          "name": "Fruit and vegetables",
          "quantity": 1,
          "price": 10,
          "category": "groceries"

        }
      ],
      "title": "Weekly groceries",
    },
    {
      "transactionId": "1234w4545dd655",
      "icon": "Store",
      "date": "2024-07-21T00:00:00.000Z",
      "total": 300,
      "description": "Groceries for the week",

      "expenses": [
        {
          "name": "Fruit and vegetables",
          "quantity": 1,
          "price": 10,
          "category": "groceries"

        },
        {
          "name": "Fruit and vegetables",
          "quantity": 1,
          "price": 10,
          "category": "groceries"
        }
      ],
      "title": "Weekly groceries",
    }

  ];


const ExpenseItem = ({ expense }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{expense.title}</h2>
          <p className="text-gray-600">{expense.description}</p>
          <p className="text-gray-600">
            {new Date(expense.date).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">${expense.total}</p>
        </div>
      </div>
      <div className="mt-2">
        {expense.expenses.map((item: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
          <div key={index} className="flex justify-between">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};




const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {expenses.map((expense, index) => (
          <ExpenseItem key={index} expense={expense} />
        ))}
      </div>
    </div>
  );
};

export default Home;
