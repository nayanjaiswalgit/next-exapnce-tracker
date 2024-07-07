// src/UserTable.js
import React from 'react';
import UserRow from './UserRow';

const users = [
  {
    id: 1,
    name: 'Cody Fisher',
    role: 'Hobbyist',
    country: 'UK',
    numPlants: 128,
    rating: 4.1,
    plantExpertise: ['Monstera', 'Anthurium', 'Philodendron'],
    experience: ['B', 'G', 'S'],
  },
  {
    id: 2,
    name: 'Kathryn Murphy',
    role: 'PRO',
    country: 'Belgium',
    numPlants: 29,
    rating: 5.0,
    plantExpertise: ['Monstera', 'Anthurium', 'Philodendron'],
    experience: ['G', 'C'],
  },
  // Add more user objects based on the screenshot data
];

function UserTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N of Plants</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant Expertise</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
