import React from 'react';

const DynamicList = ({ label, items, onChange, onAdd, onRemove }) => {
  return (
    <div className="dynamic-section">
      <label><strong>{label}</strong></label>
      {items.map((item, index) => (
        <div key={index} className="dynamic-row">
          <input 
            type="text" 
            value={item} 
            placeholder="Write Your problem here by Steps Down..."
            onChange={(e) => onChange(index, e.target.value)} 
          />
          <button type="button" className="remove-btn" onClick={() => onRemove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={onAdd}>
        + Add steps 
      </button>
    </div>
  );
};

export default DynamicList;