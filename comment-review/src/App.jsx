import React, { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import './App.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  const addFeedback = (newFeedback) => {
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Customer Feedback & Issue Reporting </h1>
        <p>Professional Support Ticket System </p>
      </header>
      <main className="main-content">
        <FeedbackForm onFeedbackSubmit={addFeedback} />
        <FeedbackList feedbacks={feedbacks} />
      </main>
    </div>
  );
}

export default App;