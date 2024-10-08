import React, { useState } from 'react';

const RatingForm = ({ professor, onSubmitRating, onCancel }) => {
  const [teachingQuality, setTeachingQuality] = useState(0);
  const [fairness, setFairness] = useState(0);
  const [availability, setAvailability] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitRating({
      professorId: professor.id,
      teachingQuality,
      fairness,
      availability,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Rate {professor.name}</h2>
      <div>
        <label className="block mb-2">Teaching Quality:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={teachingQuality}
          onChange={(e) => setTeachingQuality(Number(e.target.value))}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Fairness:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={fairness}
          onChange={(e) => setFairness(Number(e.target.value))}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Availability:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={availability}
          onChange={(e) => setAvailability(Number(e.target.value))}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="flex space-x-4">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Submit Rating
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RatingForm;