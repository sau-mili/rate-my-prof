import React, { useState, useEffect } from 'react';
import Login from './Login';
import ProfessorList from './ProfessorList';
import RatingForm from './RatingForm';
import professorsData from './professors.json';

const Alert = ({ children }) => (
  <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
    {children}
  </div>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setProfessors(professorsData);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSelectProfessor = (professor) => {
    setSelectedProfessor(professor);
  };

  const handleSubmitRating = (rating) => {
    setProfessors(
      professors.map((prof) =>
        prof.id === rating.professorId
          ? { ...prof, ratings: [...prof.ratings, rating] }
          : prof
      )
    );
    setSelectedProfessor(null);
    setMessage('Rating submitted successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const calculateMedianRating = (ratings) => {
    if (ratings.length === 0) return 'No ratings yet';
    const allRatings = ratings.flatMap((r) => [r.teachingQuality, r.fairness, r.availability]);
    const sorted = allRatings.sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? ((sorted[middle - 1] + sorted[middle]) / 2).toFixed(1)
      : sorted[middle].toFixed(1);
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Rate My Professor</h1>
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
      {message && <Alert>{message}</Alert>}
      {selectedProfessor ? (
        <RatingForm 
          professor={selectedProfessor} 
          onSubmitRating={handleSubmitRating} 
          onCancel={() => setSelectedProfessor(null)}
        />
      ) : (
        <ProfessorList
          professors={professors.filter((p) => p.department === user.department)}
          onSelectProfessor={handleSelectProfessor}
        />
      )}
      <h2 className="text-xl font-bold mt-8 mb-4">Professor Ratings:</h2>
      {professors.map((professor) => (
        <div key={professor.id} className="mb-4 p-4 border rounded">
          <h3 className="font-bold">{professor.name}</h3>
          <p>Department: {professor.department}</p>
          <p>Median Rating: {calculateMedianRating(professor.ratings)}</p>
        </div>
      ))}
    </div>
  );
};

export default App;