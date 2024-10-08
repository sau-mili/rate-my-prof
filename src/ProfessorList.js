// ProfessorList.js
import React from 'react';

const ProfessorList = ({ professors, onSelectProfessor }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select a Professor:</h2>
      <ul>
        {professors.map((professor) => (
          <li 
            key={professor.id}
            className="cursor-pointer p-4 mb-2 border rounded hover:bg-gray-100"
            onClick={() => onSelectProfessor(professor)} // Pass the professor object to the parent
          >
            {professor.name} ({professor.department})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfessorList;
