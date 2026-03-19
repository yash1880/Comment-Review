import React from 'react';

const FeedbackCard = ({ data }) => {
  return (
    <div className={`feedback-card priority-${data.priority.toLowerCase()}`}>
      <div className="card-header">
        <h4>{data.name} <span className="category-tag">{data.category}</span></h4>
        <span className="timestamp">{data.timestamp}</span>
      </div>
      
      <p><strong>Description:</strong> {data.description}</p>

      {/* Conditional Rendering for Steps */}
      {data.steps.length > 0 && data.steps[0] !== "" && (
        <div className="card-section">
          <h5>Steps to Reproduce:</h5>
          <ul>
            {data.steps.map((step, i) => <li key={i}>{step}</li>)}
          </ul>
        </div>
      )}

      {/* Uncontrolled Data Display */}
      {data.screenshot && (
        <div className="card-section">
          <h5>Screenshot Preview:</h5>
          <img src={data.screenshot} alt="Issue Proof" className="preview-img" />
        </div>
      )}

      {data.notes && (
        <p className="notes-text"><strong>Notes:</strong> {data.notes}</p>
      )}
      
      <div className="priority-badge">{data.priority} Priority</div>
    </div>
  );
};

export default FeedbackCard;