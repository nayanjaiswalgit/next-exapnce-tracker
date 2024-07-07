'use client'
import { useState } from 'react';

const users = [
  {
    name: 'Cody Fisher',
    experience: 'Hobbyist',
    role: 'B G S',
    country: 'UK',
    plants: 128,
    rating: 4.1,
    expertise: 'Monstera, Anthurium, Philodendron',
    expertiseCount: 20,
  },
  {
    name: 'Kathryn Murphy',
    experience: 'PRO',
    role: 'G C',
    country: 'Belgium',
    plants: 29,
    rating: 5,
    expertise: 'Monstera, Anthurium, Philodendron',
    expertiseCount: 4,
  },
  {
    name: 'Jerome Bell',
    experience: 'PRO',
    role: 'S C',
    country: 'Netherlands',
    plants: 48,
    rating: 4.8,
    expertise: 'Monstera, Anthurium, Philodendron',
    expertiseCount: 5,
  },
  {
    name: 'Leslie Alexander',
    experience: 'Hobbyist',
    role: 'B',
    country: 'Germany',
    plants: 34,
    rating: 3.7,
    expertise: 'Monstera, Anthurium, Philodendron',
    expertiseCount: 10,
  },
  {
    name: 'Devon Lane',
    experience: 'Hobbyist',
    role: 'B C',
    country: 'Italy',
    plants: 29,
    rating: 5,
    expertise: 'Monstera, Anthurium, Philodendron',
    expertiseCount: 20,
  },
  {
    name: 'Annette Black',
    experience: 'PRO',
    role: 'G S C',
    country: 'Australia',
    plants: 16,
    rating: 5,
    expertise: 'Monstera, Anthurium, Philodendron',
    expertiseCount: 11,
  },
  {
    name: 'Brooklyn Simmons',
    experience: 'Hobbyist',
    role: 'G',
    country: 'Denmark',
    plants: 30,
    rating: 5,
    expertise: 'Monstera, Anthurium, Philodendron',
    expertiseCount: 11,
  },
];

function UserRow() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex">
          <select
            className="rounded-md border border-gray-300 px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Experience</option>
          </select>
          <select
            className="rounded-md border border-gray-300 px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Role</option>
          </select>
          <select
            className="rounded-md border border-gray-300 px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Location</option>
          </select>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Apply
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline">
            Sort by
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium text-gray-500">
          User {`\u00A0\u00A0`}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 13l-5 5m0-5l-5-5m5 5l5-5"
            />
          </svg>
        </div>
        <div className="flex">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`${
                pageNumber === currentPage? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              } font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-1`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center flex-col">
        {currentItems.map((user) => (
          <div
            key={user.name}
            className="w-full md:w-1/2 xl:w-1/3 p-6"
          >
            <div className="bg-white rounded shadow-md">
              <div className="px-4 py-5">
                <h2 className="text-lg font-bold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.experience}</p>
                <p className="text-sm text-gray-500">{user.role}</p>
                <p className="text-sm text-gray-500">{user.country}</p>
                <p className="text-sm text-gray-500">{user.plants} plants</p>
                <p className="text-sm text-gray-500">Rating: {user.rating}</p>
                <p className="text-sm text-gray-500">{user.expertise}</p>
                <p className="text-sm text-gray-500">{user.expertiseCount} expertise</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRow;