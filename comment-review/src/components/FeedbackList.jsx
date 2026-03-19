import React from 'react';
import FeedbackCard from './FeedbackCard';

const FeedbackList = ({ feedbacks }) => {
  return (
    <div className="feedback-list">
      <h3>Submitted Reports ({feedbacks.length})</h3>
      {feedbacks.length === 0 ? (
        <p className="empty-msg">No feedback submitted yet.</p>
      ) : (
        feedbacks.map((item, index) => (
          <FeedbackCard key={index} data={item} />
        ))
      )}
    </div>
  );
};

export default FeedbackList;